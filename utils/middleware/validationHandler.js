//Capa de manejo de validaciones

const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

const validate = (data, schema) => {
    const { error } = joi.object(schema).validate(data)

    return error
}

function validationHandler(schema, check = 'body') {
    return function(req, res, next) {
        const error = validate(req[check], schema);

        //Si existe un error, llamamos la funcionalidad con error
        error ? next(boom.badRequest(error)) : next();
    }
}

module.exports = validationHandler;