const asana = require('asana');
const client = asana.Client.create().useAccessToken(process.env.accessToken);

let query = process.argv[2];
let openUrl = false;
if(query.endsWith('-a:')){
    openUrl = true;
    query = query.slice(0, -3);
} else if(query.endsWith('-a')){
    query = query.slice(0, -2);
} else if(query.endsWith(':')){
    openUrl = true;
    query = query.slice(0, -2);
}
const [name, notes] = query.split(';');

client.tasks.createTask({
    workspace: process.env.workspace,
    assignee: process.env.assignee,
    name,
    notes
}).then(res => {
    const url = res.permalink_url;
    if(openUrl) console.log(url);
}).catch(err => console.log(err.value));