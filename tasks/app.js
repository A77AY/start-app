import gulp, {task} from 'gulp'
import {log, colors} from 'gulp-util'
import path from 'path'
import fs from 'fs'
import config from '../config/app'

function collectFiles(pth, saveDir, file, files) {
    var filePath = path.relative(saveDir, file.path);
    if (filePath[0] !== '.') filePath = './' + filePath;
    var fileName = path.parse(file.path).name;
    var nameParts = path.relative(pth, file.path).split(path.sep);
    if (nameParts.length === 1) {
        if (files[fileName]) files[fileName].path = filePath.split(path.sep).join('/');
        else files[fileName] = {path: filePath.split(path.sep).join('/')};
    } else {
        var currentRoot = files;
        for (var i = 0; i < nameParts.length - 1; ++i) {
            if (i === nameParts.length - 2) {
                if (currentRoot[fileName]) currentRoot[fileName].path = filePath.split(path.sep).join('/');
                else currentRoot[fileName] = {path: filePath.split(path.sep).join('/')};
            } else {
                if (!currentRoot[nameParts[i]]) currentRoot[nameParts[i]] = {};
                if (!currentRoot[nameParts[i]].child) currentRoot[nameParts[i]].child = {};
                currentRoot = currentRoot[nameParts[i]].child;
            }
        }
    }
}

function indexGenerator(root) {
    var modules = '';
    for (var key in root) {
        if (root[key].child) modules += indexGenerator(root[key].child);
        if (root[key].path) modules += "export { default as " + key + " } from '" + root[key].path + "';\n";
    }
    return modules;
}

function importGenerator(root) {
    var modules = '';
    for (var key in root) {
        if (root[key].child) modules += importGenerator(root[key].child);
        if (root[key].path) modules += "import " + key + " from '" + root[key].path + "';\n";
    }
    return modules;
}

function routesGenerator(root) {
    var routes = '';
    var tagName = '';
    var pth = '';
    for (var key in root) {
        if (!root[key].path) continue;
        tagName = 'Route';
        pth = ' path=';
        switch (key) {
            case 'App':
                pth += '"/"';
                break;
            case 'Home':
                tagName = 'IndexRoute';
                pth = '';
                break;
            default:
                pth += '{' + key + '.path}';
        }
        routes += '\n<' + tagName + pth + ' component={' + key + '}' + (
                root[key].child
                    ? '>' + routesGenerator(root[key].child) + '\n</' + tagName
                    : '/'
            ) + '>';
    }
    return routes;
}

function createRoutes(saveDir, files) {
    var routesContent = "import React from 'react';\n";
    routesContent += "import {Route, IndexRoute} from 'react-router';\n";
    routesContent += importGenerator(files);
    routesContent += '\nexport default (' + routesGenerator(files) + '\n);';
    fs.writeFile(saveDir + '/routes.js', routesContent, function (err) {
        if (err)  return console.log(err);
    });
}

task('app:index,routes', (done) => {
    const srcDirs = [
        config.structure.src.containers,
        config.structure.src.template,
        config.structure.src.components
    ];
    const saveRootPath = path.join(config.root, 'node_modules', '_');
    srcDirs.forEach((srcDir) => {
        const isCreateRoutes = srcDir === srcDirs[0];
        const watchPaths = [path.join(srcDir.path, '**/*.*')];
        const savePath = path.join(saveRootPath, srcDir.name);
        let lastIndexContent = '';
        const createIndex = (type) => {
            const files = {};
            gulp.src(watchPaths, {read: false})
                .on('data', (file) => {
                    collectFiles(srcDir.path, savePath, file, files);
                })
                .on('end', () => {
                    if (isCreateRoutes) {
                        files.routes = {
                            path: './routes.js'
                        };
                    }
                    const indexContent = indexGenerator(files);
                    if (lastIndexContent !== indexContent) {
                        lastIndexContent = indexContent;
                        fs.writeFile(path.join(savePath, 'index.js'), indexContent, (err) => {
                            if (err) return console.log(err);
                        });
                        log(colors.blue(
                            (type === 0
                                ? `File is added to the directory ${srcDir.dir}`
                                : `File from the directory ${srcDir.dir} deleted`)
                            + ', the index is updated'
                        ));
                        if (isCreateRoutes) {
                            const routesFiles = {
                                App: files.App
                            };
                            delete files.routes;
                            delete files.Template;
                            delete files.App;
                            routesFiles.App.child = files;
                            createRoutes(savePath, routesFiles);
                            log(colors.blue(`Routes updated`));
                        }
                    }
                });
        };
        gulp.watch(watchPaths, {
                awaitWriteFinish: {
                    stabilityThreshold: 250
                }
            })
            .on('add', ()=>createIndex(0))
            .on('unlink', ()=>createIndex(1));
    });
    done();
});