module.exports = function (api) {
    api.cache(true);
    const presets = [];
    const plugins = [
        ['./lib',
            {
                projectId: 85615
            }]
    ];
    return {
        presets,
        plugins
    };
}

