//Importando express
const express = require('express');

//Importando capa de servicios
const MoviesService = require('../services/movies.js');

//Importando las estructuras de los schemas
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies');

//Importando validation
const validationHandler = require('../utils/middleware/validationHandler');

//Importando cache
const cacheResponse = require('../utils/cacheResponse');
//Importando el tiempo
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

//Funcion que recibe una aplicación de express
function moviesApi(app) {
    const router = express.Router();
    //Ruta de inicio
    app.use('/api/movies', router);

    //Instanciando capa de servicios
    const moviesService = new MoviesService();


    //Ruta home para obtener por metodo get toda la información de las películas
    router.get("/", async(req, res, next) => {
        //Agregando cache (5min puesto se agregan peliculas con frecuencia)
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

        //Datos que ingresamos desde el query
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });
            //throw new Error('Error getting movies');

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (err) {
            //Manejo de error con express
            next(err);
        }
    })

    //El middleware lo colocamos entre la ruta y la definicion de la ruta
    //Metodo get que obtiene la pelicula de acuerdo al id que enviemos
    router.get("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async(req, res, next) => {
        //Agregando cache (5min puesto se agregan peliculas con frecuencia)
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        //Datos que ingresamos desde la url (Igual nombre que en la url)
        const { movieId } = req.params;
        try {
            const movie = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data: movie,
                message: 'movie retrieved'
            })
        } catch (err) {
            //Manejo de error con express
            next(err);
        }
    })


    //Metodo post que nos permite agregar peliculas 
    router.post("/", validationHandler(createMovieSchema), async(req, res, next) => {
        //Enviamos el cuerpo movie a traves del body 
        const { body: movie } = req;
        try {
            //Devolviendo el id de la primera pelicula
            const createMovieId = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createMovieId,
                message: 'movie created'
            })
        } catch (err) {
            //Manejo de error con express
            next(err);
        }
    })

    //El middleware lo colocamos entre la ruta y la definicion de la ruta (Podemos pasar varios middlewares)
    //Metodo put que nos permite actualizar pelicula acorde al id que enviemos
    router.put("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async(req, res, next) => {
        //Enviamos el cuerpo movie a traves del body 
        const { body: movie } = req;
        //Datos que ingresamos desde la url (Igual nombre que en la url)
        const { movieId } = req.params;
        try {
            //Devolviendo el id de la pelicula que actualizo
            const updatedMovieId = await moviesService.updateMovie({ movie, movieId });

            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            })
        } catch (err) {
            //Manejo de error con express
            next(err);
        }
    })

    //Metodo patch que nos permite actualizar los datos correspondientes a un recurso 
    router.patch("/:movieId", async(req, res, next) => {
        //Enviamos el cuerpo movie a traves del body
        const { body: movie } = req;
        //Datos que ingresamos desde la url (Igual nombre que en la url)
        const { movieId } = req.params;
        try {
            //Devolviendo el id de la pelicula que se actualizo parcialmente
            const updatedPartialMovieId = await moviesService.updatePartialMovie({ movie, movieId });

            res.status(200).json({
                data: updatedPartialMovieId,
                message: 'Movie updated partially'
            })
        } catch (err) {
            //Manejo de error con express
            next(err);
        }
    })

    //Metodo delete que nos permite eliminar una pelicula acorde al id que enviemos
    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async(req, res, next) => {
        //Datos que ingresamos desde la url (Igual nombre que en la url)
        const { movieId } = req.params;
        try {
            //Devolviendo el id de la pelicula que actualizo
            const deletedMovie = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deletedMovie,
                message: 'movie deleted'
            })
        } catch (err) {
            //Manejo de error con express
            next(err);
        }
    })
}

//Exportanto función
module.exports = moviesApi;