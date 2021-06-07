/*
    Test para nuestros servicios, se testea lo que va a devolver y no
    las librerias que llaman, por ende se creo el archivo mongoLib,
    el cual mockea la libreria de mongo.
*/

//Assert verifica si es verdad o no la comparación en los test
const assert = require('assert');
//Proxyquire inyecta los mocks cuando se requieren los paquetes
const proxyquire = require('proxyquire');

//Importando las utilidades del archivo de mocks mongoLib
const { getAllStub, MongoLibMock } = require('../utils/mocks/mongoLib');
//Importando las utilidades del archivo de mocks movies
const { moviesMock } = require('../utils/mocks/movies');

//Descripcion del test (services/movies.js)
describe('services - movies', () => {
    //Incluyendo nuestros servicios
    const MoviesServices = proxyquire('../services/movies.js', {
        //Cada que llamemos la ruta, quien va a servir de servicios es MongoLibMock
        '../lib/mongo.js': MongoLibMock
    });

    //Instancia del servicio
    const moviesService = new MoviesServices();

    //Cuando se llame el metodo getMovies
    describe("When getMovies method is called", async function() {
        //Validando que el metodo se llama en la libreria
        it('should call the getall MongoLib method', async function() {
            await moviesService.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        })

        //Validando que retorne la coleccion de peliculas
        it('should return an array of movies', async function() {
            const result = await moviesService.getMovies({});
            //Resultado esperado
            const expected = moviesMock;
            //Comparando que el resultado sea igual al esperado
            assert.deepEqual(result, expected);
        })
    })
})