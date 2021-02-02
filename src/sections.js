const client = require('./api');
const fs = require('fs');
const { output, promise } = require('./utils');

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

    const filename = 'sections.json';
    let file;
    if(fs.existsSync(filename)){
        file = JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8' }));
    } else {
        fs.writeFileSync('sections.json', '{}');
        file = {};
    }

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
        await syncAllSections();
        output({ title: 'Sections synced successfully!', subtitle: 'Press enter to close' });
    }
})();