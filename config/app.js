import appConfig from './utils/appConfig'

export default appConfig({
    structure: {
        build: 'build',
        config: 'config',
        tasks: 'tasks',
        src: {
            dir: 'src',
            server: 'server.jsx',
            client: 'client.jsx'
        }
    }
});