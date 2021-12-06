// plugin.js
const { template } = require('@babel/core');
const coverageTemplate = template(`
        var global = 123;
`);
const cv = coverageTemplate();
module.exports = function({ types: babelTypes }) {
    return {
        name: "deadly-simple-plugin-example",
        visitor: {
            Identifier(path) {
                // console.log(path.type, path.node.name)
            },
            CallExpression(path) {
                console.log(path.type, path.node.body)
            },
            Program:{
                exit(path) {
                    path.node.body.unshift(cv)
                }
            }
        },
        // programVisitor:{
        //     exit(path) {
        //         console.log(path,'exit')
        //     },
        // }
    };
};