const ts = require('time-stamp');

function generate() {
    const obj = {
        department: 'Tech',
        createdAt: ts(),
        purpose: 'Internal Discussion',
        calledBy: 'Someone',
    };

    return obj;
}

module.exports.generate = generate;
