const client = require('./api');
const fs = require('fs');
const { output, promise, checkFile } = require('./utils');
const { close: subtitle } = require('./text.json');

const sync = process.argv.pop() === 'sync';

const getProjectSections = async id => {
    const response = await promise(client.sections.getSectionsForProject(id));
    const data = response.data.map(sec => ({
        title: sec.name,
        subtitle: sec.gid,
        arg: sec.gid
    }));
    return data;
};

const syncAllSections = async () => {
    const response = await promise(client.projects.getProjects({ workspace: process.env.workspace }));
    const projects = response.data.map(proj => proj.gid);

    const data = {};

    for(const id of projects){
        const sections = await getProjectSections(id);
        data[id] = sections;
    }

    fs.writeFileSync('sections.json', JSON.stringify(data));
};

(async () => {
    if(sync){
        await syncAllSections();
        output({ title: 'Sections synced successfully!', subtitle });
    } else {
        const file = checkFile('sections.json', '{}');

        const projectId = process.env.projectId;
        if(projectId){
            // look for the project id in the sections.json file, if not found sync the data and add it
            const sections = file[projectId];
            if(sections){
                output(sections);
            } else {
                const sections = await getProjectSections(projectId);
                output(sections);

                // add sections for file
                file[projectId] = sections;
                fs.writeFileSync('sections.json', JSON.stringify(file));
            }
        } else {
            output({ title: 'Project is missing, use the -p flag to select a project', subtitle: 'Press esc to cancel or press enter to continue' });
        }
    }
})();