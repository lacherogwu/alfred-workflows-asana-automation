const client = require('./api');
const { promise } = require('./utils');

let query = process.argv[2];
let openUrl = false;
query = query.replace(/\s(-\w)(?!\S)/gm, '');
if(query.endsWith(' :')){
    openUrl = true;
    query = query.slice(0, -2);
}

let [title, description] = query.split(';');

// html formatter
const htmlFormat = [
    { symbol: '*', tag: 'b' },
    // { symbol: '_', tag: 'em' },
    // { symbol: '~', tag: 'del' },
    // { symbol: '`', tag: 'code' },
];

htmlFormat.forEach(({ symbol, tag }) => {
    if(!description) return;

    const regex = new RegExp(`\\${symbol}([^${symbol}]*)\\${symbol}`, 'gm');
    const match = description.match(regex);
    if(!match) return;

    match.forEach(m => {
        let formatted = m;
        for(let i=0; i<2; i++){
            formatted = formatted.replace(symbol, `<${i > 0 ? '/' : ''}${tag}>`);
        }
        description = description.replace(m, formatted);
    });
});

// new line
if(description) description = description.replace(/\\n/gm, '\n');

(async () => {
    const response = await promise(client.tasks.createTask({
        workspace: process.env.workspace,
        assignee: process.env.assignee ? process.env.assignee : process.env.me,
        projects: process.env.projectId ? [process.env.projectId] : undefined,
        name: `${title || ''}`,
        html_notes: `<body>${description || ''}</body>`
    }));

    const url = `${response.permalink_url}/f`;

    const sectionId = process.env.sectionId;
    if(sectionId){
        await promise(client.sections.addTask(sectionId, { task: response.gid }));
    }
    if(openUrl) console.log(url);
})();