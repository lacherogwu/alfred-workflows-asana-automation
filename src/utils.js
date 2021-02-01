const output = data => console.log(JSON.stringify({ items: data.length ? data : [data] }));

module.exports = {
    output,
};