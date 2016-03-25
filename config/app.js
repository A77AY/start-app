import appConfig from './utils/appConfig'

export default appConfig({
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
            containers: 'containers',
            template: 'template'
        }
    }
});