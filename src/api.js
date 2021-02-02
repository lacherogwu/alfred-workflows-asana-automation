const asana = require('asana');

const deprecationHeaders = { defaultHeaders: { 'asana-enable': 'new_user_task_lists' } };
const client = asana.Client.create(deprecationHeaders).useAccessToken(process.env.accessToken);

module.exports = client;