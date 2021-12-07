// plugin.js
const { template } = require('@babel/core');

let off = true

const coverageTemplate = template(`
        window.global = 123
`);
const coverageTemplate1 = template(`
        console.log(window.global)
`);
const cv = coverageTemplate();
const cv1 = coverageTemplate1();
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
                    if (off){
                        console.log(path.node)
                        path.node.body.unshift(cv)
                        path.node.body.unshift(cv1)
                        off = false
                    }

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
