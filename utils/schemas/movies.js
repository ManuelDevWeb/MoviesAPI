const joi = require('@hapi/joi');

//Esquemas individuales
//Estructura que debe tener el id de la pelicula (String y Expresion regular)
const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
//Estructura que debe tener el title de la pelicula (String y maximo 80 caracteres)
const movieTitleSchema = joi.string().max(80);
//Estructura que debe tener el año de la pelicula (Number, minimo 1888, maximo 2077)
const movieYearSchema = joi.number().min(1888).max(2077);
//Estructura que debe tener el cover de la pelicula (String y uri)
const movieCoverSchema = joi.string().uri();
//Estructura que debe tener la descripcion de la pelicula (String y maximo 300)
const movieDescriptionSchema = joi.string().max(300);
//Estructura que debe tener la duracion de la pelicula (String, minimo 1 y maximo 300)
const movieDurationSchema = joi.number().min(1).max(300);
//Estructura que debe tener el rating de la pelicula (String y maximo 5)
const movieContentRatingSchema = joi.string().max(5);
//Estructura que debe tener el source de la pelicula (String y uri)
const movieSourceSchema = joi.string().uri();
//Estructura que debe tener los tags de la pelicula (Array, items(String y maximo 50))
const movieTagsSchema = joi.array().items(joi.string().max(50));

//Estructura que debe tener la pelicula al crearla desde el body
const createMovieSchema = {
    //Require indica que debe ingresarse 
    title: movieTitleSchema.required(),
    year: movieYearSchema.required(),
    cover: movieCoverSchema.required(),
    description: movieDescriptionSchema.required(),
    duration: movieDurationSchema.required(),
    contentRating: movieContentRatingSchema.required(),
    source: movieSourceSchema.required(),
    tags: movieTagsSchema
}

//Estructura que debe tener la pelicula al actualizarla desde el body
const updateMovieSchema = {
    title: movieTitleSchema,
    year: movieYearSchema,
    cover: movieCoverSchema,
    description: movieDescriptionSchema,
    duration: movieDurationSchema,
    contentRating: movieContentRatingSchema,
    source: movieSourceSchema,
    tags: movieTagsSchema
}

//Exportamos modulos
module.exports = {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
}