var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;

    // const url = (!process.env.PORT) ? 'mongodb://localhost:27017/toy_db' : 'mlab url'
    const url = 'mongodb+srv://mongodb:mongodb@cluster0-mmiqp.mongodb.net/test?retryWrites=true';
    const dbName = 'TOY_DB';

    const client = new MongoClient(url, { useNewUrlParser: true });

    return client.connect()
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', () => {
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db(dbName);
            return dbConn;
        })
}

module.exports = {
    connect: connectToMongo
}
