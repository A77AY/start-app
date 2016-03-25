import path from 'path'
import serverWebpackConfig from './webpack/server'

export default {
    execMap: {
        js: 'node'
    },
    script: path.join(serverWebpackConfig.output.path, 'server.js'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
};