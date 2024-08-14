const myPlugin = {
    install(app) {
        app.config.globalProperties.getEnv = () => {
            return import.meta.env;
        },
        app.config.globalProperties.firebase = () => {
            return import.meta.env;
        }
    }
}

export default myPlugin;
