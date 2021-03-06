const { template } = require('@babel/core');
const fs = require('fs')

let off = true
const islinTemplate = template(`
        window.__islin__ = {
        commitSha: 'COMMIT_SHA',
        projectId: 'PROJECT_ID',
        dsn: 'DSN',
        processCwd: 'PROCESS_CWD'
        }
`);
const consoleLogIslinTemplate = template(`
        console.log(window.__islin__)
`);

module.exports = function({ types: babelTypes }, config) {
    return {
        name: "babel-plugin-islin",
        visitor: {
            Program:{
                exit(path) {
                    if (off){
                        const islin = islinTemplate({
                            COMMIT_SHA:config.commitSha,
                            PROJECT_ID: String(config.projectId),
                            DSN: config.dsn,
                            PROCESS_CWD: process.cwd()
                        });
                        const consoleLogIslin = consoleLogIslinTemplate();
                        path.node.body.unshift(islin)
                        path.node.body.unshift(consoleLogIslin)
                        off = false
                    }
                }
            }
        }
    };
};
