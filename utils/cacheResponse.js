require('dotenv').config();

//Verificar si no tenemos el cache activado
function cacheResponse(res, seconds) {
    //Solo generamos cache en modo produccion
    if (process.env.NODE_ENV.trim() === 'production') {
        res.set('Cache-Control', `public, max-age=${seconds}`);
    }
}

//Solo debemos agregar cache en las rutas que contienen información que no se agrego en el momento (delete, post, create, put)

//Para probar el cache se debe levantar la app en modo produccion: npm run start

module.exports = cacheResponse;