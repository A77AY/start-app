import appConfig from './utils/appConfig'

export default appConfig({
    server: {
        host: 'localhost',
        port: 8080
    },
    structure: {
        build: 'build',
        config: 'config',
        tasks: 'tasks',
        public: 'public',
        src: {
            dir: 'src',
            server: 'server.jsx',
            client: 'client.jsx',
            components: 'components',
            containers: {
                dir: 'containers',
                index: 'Index'
            },
            template: {
                dir: 'template',
                template: 'Template.jsx'
            }
        }
    }
});