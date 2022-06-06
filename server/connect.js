const Pool = require('pg').Pool

const connect = new Pool({
    user: 't193116',
    host: 'dev.vk.edu.ee',
    database: 'DB_Svarkova',
    password: 't193116',
    port: 5432,
});

module.exports = connect;