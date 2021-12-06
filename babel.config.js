module.exports = function (api) {
    api.cache(true);
    const presets = [];
    const plugins = [['./lib',{a:'1'}]];
    return {
        presets,
        plugins
    };
}