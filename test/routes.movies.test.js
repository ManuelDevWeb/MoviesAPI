/*
    Test para nuestros endpoints (Ubicados en capa de rutas), tienen la responsabilidad
    de probar que lleguen los datos y devuelva los datos correspondientes.

    Verificar que las rutas hagan su trabajo.

    mocha: nos ayuda a correr los test
*/

//Assert verifica si es verdad o no la comparación en los test
const assert = require('assert');
//Proxyquire inyecta los mocks cuando se requieren los paquetes
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');

const testServer = require('../utils/testServer.js');

//Descripcion del test (routes/movies.js)
describe('routes - movies', () => {
    const route = proxyquire('../routes/movies.js', {
        //Cada que llamemos la ruta, quien va a servir de servicios es MoviesServiceMock
        '../services/movies': MoviesServiceMock
    });

    //Test especifico para esta ruta
    const request = testServer(route);

    describe('GET /movies', () => {
        //Valida si responde un status 200
        it('should respond with status 200', (done) => {
            request.get('/api/movies').expect(200, done);
        });

        //Valida que responda con la lista de peliculas
        it('should respond with list of movies', (done) => {
            request.get('/api/movies').end((err, res) => {
                //deepEqual permite comparar objetos
                assert.deepEqual(res.body, {
                    //Debe estar igual la respuesta que pusimos en la ruta para que no muestre error
                    data: moviesMock,
                    message: 'movies listed'
                });

                //Indicamos cuando finaliza el test
                done();
            })
        })

        //Validando que responda con una pelicula
        it('should response requested movie', (done) => {
            //Id de la pelicula
            const movieIdMock = '5f240efcf373ccfcf8ec4750';
            request.get(`/api/movies/${movieIdMock}`).end((err, res) => {
                //deepEqual permite comparar objetos
                assert.deepEqual(res.body, {
                    data: moviesMock[1],
                    message: 'movie retrieved',
                });

                //Indicamos cuando finaliza el test
                done();
            });
        });
    });

    describe('POST /movies', () => {
        //Valida si responde un status 201
        it('should response with status 201', (done) => {
            request.post('/api/movies').expect(201, done);
        });

        //Valida que responda el id de la pelicula creada
        it('should response with movie id created', (done) => {
            request.post('/api/movies').send(moviesMock[1]).end((err, res) => {
                //deepEqual permite comparar objetos
                assert.deepEqual(res.body, {
                    data: moviesMock[1].id,
                    message: 'movie created',
                });

                //Indicamos cuando finaliza el test
                done();
            });
        });
    });

    describe('PUT /movies', () => {
        //Id de la pelicula
        const movieIdMock = '5f240efcf373ccfcf8ec4750';
        //Valida si responde un status 200
        it('should response with status 200', (done) => {
            request.put(`/api/movies/${movieIdMock}`).expect(200, done);
        })

        //Valida que responda con la pelicula actualizada
        it('should response with movie updated', (done) => {
            request.put(`/api/movies/${movieIdMock}`).send(moviesMock[1]).end((err, res) => {
                //deepEqual permite comparar objetos
                assert.deepEqual(res.body, {
                    data: moviesMock[1],
                    message: 'movie updated'
                });

                //Indicamos cuando finaliza el test
                done();
            })
        })
    });

    describe('DELETE /movies', () => {
        //Id de la pelicula
        const movieIdMock = '5f240efcf373ccfcf8ec4750';
        //Valida si responde un status 200
        it('should response with status 200', (done) => {
            request.put(`/api/movies/${movieIdMock}`).expect(200, done);
        })

        //Valida que responda con la pelicula eliminada
        it('should responde with movie deleted', (done) => {
            request.delete(`/api/movies/${movieIdMock}`).end((err, res) => {
                //deepEqual permite comparar objetos
                assert.deepEqual(res.body, {
                    data: moviesMock[1],
                    message: 'movie deleted',
                });
                //Indicamos cuando finaliza el test
                done();
            });
        })
    })

    //Para probar el test ejecutamos: npm run test
})