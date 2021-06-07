/*
    Mockeando la libreria de mongo
*/

//Sinon crea mocks para tests
const sinon = require('sinon');

//Importando las funcionalidades necesarias del mock de movies
const { moviesMock, filteredMoviesMocks } = require('./movies');

//Creación de los stub
const getAllStub = sinon.stub();

//Cuando se llame con la coleccion movies, resuelva con los mocks de las peliculas
getAllStub.withArgs('movies').resolves(moviesMock);

//Cuando se llame con la coleccion movies y un query
const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMocks('Drama'));

//Cuando se llame la funcionalidad create, resuelve con la primer pelicula de nuestros mocks
const createStub = sinon.stub().resolves(moviesMock[0].id);

//Clase con los metodos de la libreria de mongo
class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }

    create(collection, data) {
        return createStub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    MongoLibMock
};