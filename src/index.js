const client = require('./api');
const { promise } = require('./utils');

let query = process.argv[2];
let openUrl = false;
query = query.replace(/\s(-\w)(?!\S)/gm, '');
if(query.endsWith(' :')){
    openUrl = true;
    query = query.slice(0, -2);
}

const [name, notes] = query.split(';');

(async () => {
    const response = await promise(client.tasks.createTask({
        workspace: process.env.workspace,
        assignee: process.env.assignee ? process.env.assignee : process.env.me,
        projects: process.env.projectId ? [process.env.projectId] : undefined,
        name,
        notes
    }));

    const url = response.permalink_url;
    if(openUrl) console.log(url);
})();