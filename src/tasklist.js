const client = require('./api');
const { promise, output } = require('./utils');

// let query = process.argv[2];
let tagId = process.argv[2];

function filterTasksByDueOn(tt) {
    if (!tt.due_on) {
        return true;
    }
    var dt = tt.due_on;
    var parts = dt.split('-');
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    var enddate = new Date();
    enddate.setDate(enddate.getDate() + 7);
    return mydate < enddate;
}

(async () => {
    // client.dispatcher.debug(true);
    const response = await promise(client.tasks.findByTag(tagId, {
        completed_since: 'now',
        opt_fields: 'id,name,assignee_status,completed,due_on'
    }));
    // output(response);
    const response1data = response.data.filter(filterTasksByDueOn);
    const data = response1data.map(i => ({
        title: i.name,
        subtitle: `${i.due_on}`,
        arg: i.gid
    }));
    output(data);
})();