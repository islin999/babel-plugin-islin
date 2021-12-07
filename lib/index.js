const { template } = require('@babel/core');
const fs = require('fs')

let off = true
const commitSha = fs.readFileSync('./.git/refs/remotes/origin/master', 'utf8')
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
    const islin = islinTemplate({
        COMMIT_SHA:commitSha.replace('\n',''),
        PROJECT_ID: String(config.projectId),
        DSN: config.dsn,
        PROCESS_CWD: process.cwd()
    });
    const consoleLogIslin = consoleLogIslinTemplate();
    return {
        name: "babel-plugin-islin",
        visitor: {
            Program:{
                exit(path) {
                    if (off){
                        path.node.body.unshift(islin)
                        path.node.body.unshift(consoleLogIslin)
                        off = false
                    }
                }
            }
        }
    };
};
