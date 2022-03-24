const client = require('./api');
const fs = require('fs');
const { output, promise, checkFile } = require('./utils');
const { close: subtitle } = require('./text.json');

const sync = process.argv.pop() === 'sync';

const syncProjects = async (items = [], offset) => {
	const response = await promise(client.projects.getProjects({ workspace: process.env.workspace, limit: 100, offset }));
	const offsetToken = response._response?.next_page?.offset;

	items = [...items, ...response.data];
	if (offsetToken) return syncProjects(items, offsetToken);

	const data = items.map(proj => ({
		title: proj.name,
		subtitle: proj.gid,
		arg: proj.gid,
	}));
	fs.writeFile('projects.json', JSON.stringify(data), () => {});

	return data;
};

(async () => {
	if (sync) {
		await syncProjects();
		output({ title: 'Projects synced successfully!', subtitle });
	} else {
		const file = checkFile('projects.json', '[]');
		if (file.length) {
			output(file);
		} else {
			// write the file
			const data = await syncProjects();
			output(data);
		}
	}
})();
