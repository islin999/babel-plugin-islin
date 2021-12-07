module.exports = function (api) {
    api.cache(true);
    const presets = [];
    const plugins = [['./lib', {projectId: 85615, dsn: 'http://10.128.13.42:9999/api/v1/coverage/client'}]];
    return {
        presets,
        plugins
    };
}

