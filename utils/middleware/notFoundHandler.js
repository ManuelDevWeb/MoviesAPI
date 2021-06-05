//Capa de manejo de errores 404

const boom = require('@hapi/boom');

//Middleware para manejar el error 404
function notFoundHandler(req, res) {
    const { output: { statusCode, payload } } = boom.notFound();

    res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;