import gulp, {task} from 'gulp'
import {log, colors} from 'gulp-util'
import path from 'path'
import fs from 'fs'
import config from '../config/app'
import del from 'del'

const srcDirs = [
    config.structure.src.containers,
    config.structure.src.template,
    config.structure.src.components
];
const savePath = path.join(config.root, 'node_modules', '_');

task('app:clear', (done) => {
    del([path.join(savePath, '*')], {force: true});
    log(colors.yellow('Old index and route files is removed'));
    done();
});

task('app:index,routes', (done) => {
    const indexGenerator = (root) => {
        var modules = '';
        for (var key in root) {
            if (root[key].child) modules += indexGenerator(root[key].child);
            if (root[key].path) modules += "export { default as " + key + " } from '" + root[key].path + "';\n";
        }
        return modules;
    };
    const importGenerator = (root) => {
        let modules = '';
        for (var key in root) {
            if (root[key].child) modules += importGenerator(root[key].child);
            if (root[key].path) modules += "import " + key + " from '" + root[key].path + "';\n";
        }
        return modules;
    };
    const routesGenerator = (root) => {
        let routes = '';
        let tagName = '';
        let props = '';
        for (const key in root) {
            if (!root[key].path) continue;
            tagName = 'Route';
            props = ' path=';
            switch (key) {
                case 'App':
                    props += '"/"';
                    break;
                case config.structure.src.containers.index.name:
                    tagName = 'IndexRoute';
                    props = '';
                    break;
                default:
                    props += '{' + key + '.path}';
            }
            routes += `\n<${tagName}${props} component={${key}}${root[key].child ? `>${routesGenerator(root[key].child)}\n</${tagName}` : `/`}>`;
        }
        return routes;
    };
    gulp.series('app:clear')();
    let currentCount = srcDirs.length;
    srcDirs.forEach((srcDir) => {
        const isCreateRoutes = srcDir === srcDirs[0];
        const watchPaths = [path.join(srcDir.path, '**/*.*')];
        let lastIndexContent = '';
        const createIndex = (type, cb = () => {}) => {
            const files = {};
            gulp.src(watchPaths, {read: false})
                .on('data', (file) => {
                    let filePath = path.relative(savePath, file.path);
                    if (filePath[0] !== '.') filePath = './' + filePath;
                    const fileName = path.parse(file.path).name;
                    const nameParts = path.relative(srcDir.path, file.path).split(path.sep);
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
                        fs.writeFile(path.join(savePath, srcDir.name + '.js'), indexContent, (err) => {
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
                            delete files.App;
                            routesFiles.App.child = files;
                            const routesContent = `import React from 'react';\nimport {Route, IndexRoute} from 'react-router';\n${importGenerator(routesFiles)}\nexport default (${routesGenerator(routesFiles)}\n);`;
                            fs.writeFile(path.join(savePath, 'routes.js'), routesContent, (err) => {
                                if (err)  return console.log(err);
                            });
                            log(colors.blue(`The routes is updated`));
                        }
                    }
                    cb();
                });
        };
        createIndex(0, () => {
            if (!--currentCount) done();
        });
        gulp.watch(watchPaths, {
                awaitWriteFinish: {
                    stabilityThreshold: 250
                }
            })
            .on('add', () => createIndex(0))
            .on('unlink', () => createIndex(1));
    });
});