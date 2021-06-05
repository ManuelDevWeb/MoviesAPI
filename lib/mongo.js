//Importando MongoDB
const { MongoClient, ObjectId } = require('mongodb');

//Importando la configuración con las variables de entorno
const { config } = require('../config/index');

//Variables
//encodeURIComponente permite que al tener caracteres especiales no hayan problemas en la conexión
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//URI de nuestra base de datos
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        //Definiendo el cliente
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        //Base de datos
        this.dbName = DB_NAME;
    }

    //Metodo para conectar a la BD
    connect() {
        /*
            Patron singleton: cada vez que nos conectemos a la base no cree un nuevo cliente, mas bien 
            si el cliente ya esta registrado y la conexión ya esta abierta usar esa misma conexión de 
            esa manera evitamos saturar y tener fallos a futuro.
        */

        //Si no existe la conexión se ejecuta este código
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    //Si hay un error, hacemos reject de la promesa con el error
                    if (err) {
                        reject(err);
                    }

                    console.log('Connected succesfully to mongo');
                    //Si no hay error resolvemos la promesa con nuestra conexión a la BD
                    resolve(this.client.db(this.dbName));
                })
            })
        }

        return MongoLib.connection;
    }

    /*
        Los métodos de MongoDB para implementar un CRUD son:

        -> Create
        -> insertOne
        -> Read
        -> find
        -> findOne
        -> Update
        -> updateOne
        -> Delete
        -> deleteOne
    */

    //Obtener todos
    getAll(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    //Obtener un elemento
    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) })
        })
    }

    //Crear un elemento
    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => {
            result.insertedId
        })
    }

    //Actualizar un elemento
    update(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
        }).then(result => {
            result.upsertedId || id
        })
    }

    //Eliminar un elemento
    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => {
            id
        })
    }
}

module.exports = MongoLib;