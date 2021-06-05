//Importando el archivo mongo.js
const MongoLib = require('../lib/mongo');

//Servicio que tiene toda la lógica de negocio
class MoviesService {
    constructor() {
        //Nombre de nuestra coleccion
        this.collection = 'movies';
        this.mongoDB = new MongoLib();
    }

    //Funcion para obtener todas las peliculas
    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const movies = await this.mongoDB.getAll(this.collection, query);
        //Si no encuentra datos devuelve un arreglo vacio
        return movies || [];
    }

    //Funcion para obtener una pelicula
    async getMovie({ movieId }) {
        const movie = await this.mongoDB.get(this.collection, movieId);
        return movie || {};
    }

    //Funcion para crear una pelicula
    async createMovie({ movie }) {
        const createMovie = await this.mongoDB.create(this.collection, movie);
        return createMovie;
    }

    //Funcion para actualizar una pelicula
    async updateMovie({ movieId, movie }) {
        const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        return updatedMovieId;
    }

    //Funcion para actualizar parcialmente los datos correspondientes a una pelicula
    async updatePartialMovie() {
        const updatedPartialMovieId = await Promise.resolve(moviesMock[0].id);
        return updatedPartialMovieId;
    }

    //Funcion para eliminar una pelicula
    async deleteMovie({ movieId }) {
        const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
        return deletedMovieId;
    }
}

module.exports = MoviesService;