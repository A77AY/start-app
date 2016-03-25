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

task('app:index', (done) => {
    const dirs = [
        config.structure.src.template.name,
        config.structure.src.containers.name,
        config.structure.src.components.name
    ];
    dirs.forEach((dirName) => {
        const pth = path.join(config.structure.src.path, dirName);
        const dir = path.join(pth, '**/*.*');
        const saveDir = path.join(config.root, 'node_modules', '_', dirName);
        let lastIndexContent = '';
        gulp.watch([dir], {
                awaitWriteFinish: {
                    stabilityThreshold: 500
                }
            })
            .on('add', ()=> {
                const files = {};
                gulp.src(dir, {read: false})
                    .on('data', (file) => {
                        collectFiles(pth, saveDir, file, files);
                    })
                    .on('end', () => {
                        const indexContent = indexGenerator(files);
                        if (lastIndexContent !== indexContent) {
                            lastIndexContent = indexContent;
                            fs.writeFile(path.join(saveDir, 'index.js'), indexContent, (err) => {
                                if (err) return console.log(err);
                            });
                            log(colors.blue(`index for ${dirName} updated`));
                        }
                    });
            })
            .on('unlink', ()=> {
                const files = {};
                gulp.src(dir, {read: false})
                    .on('data', (file) => {
                        collectFiles(pth, saveDir, file, files);
                    })
                    .on('end', () => {
                        const indexContent = indexGenerator(files);
                        if (lastIndexContent !== indexContent) {
                            lastIndexContent = indexContent;
                            fs.writeFile(path.join(saveDir, 'index.js'), indexContent, (err) => {
                                if (err) return console.log(err);
                            });
                            log(colors.blue(`index for ${dirName} updated`));
                        }
                    });
            });
    });
    done();
});