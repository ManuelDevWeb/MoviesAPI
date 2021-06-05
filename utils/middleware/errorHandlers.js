//Capa de manejo de errores
const { config } = require('../../config/index');
//Importando boom para un mejor manejo de errores con status Http
const boom = require('@hapi/boom');

//Middleware para definir si necesito el stack o no (Stack es la información relacionada al error)
function withErrorStack(error, stack) {
    //Si estamos en modo desarrollador imprimimos el error y el stack
    if (config.dev) {
        //Spread operator porque el error trae unas propiedades status, message, etc
        return {...error, stack }
    }

    return error;
}

//Middleware que imprime el error
function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

//Middleware para los errores por boom
function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
}

//Middleware para dar manejo al error
function errorHandler(err, req, res, next) {
    const { output: { statusCode, payload } } = err;
    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack))
}

module.exports = {
    logErrors,
    errorHandler,
    wrapErrors
}