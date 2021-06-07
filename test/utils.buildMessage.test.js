/*
    Test para la utilidad de Build Message
*/

//Assert verifica si es verdad o no la comparación en los test
const assert = require('assert');

//Importando la funcionalidad de buildMessage
const buildMessage = require('../utils/buildMessage');

//Descripcion del test (utils/buildMessage.js)
describe('utils - buildMessage', function() {
    //Cuando recibimos una entidad
    describe('when receives an entity and an action', function() {
        //Validando que retorne el respectivo mensaje
        it('should return the respective message', function() {
            const result = buildMessage('movie', 'create');
            //Resultado esperado
            const expected = 'movie created';
            //Comparando que el resultado sea igual al esperado
            assert.strictEqual(result, expected);
        })
    });

    //Cuando sea una lista
    describe('wehn receives an entity and an action and is a list', function() {
        //Validando que retorne el respectivo mensaje con la entidad en plural (Cuando listamos peliculas)
        it('should return the respective message with the entity in plural', function() {
            const result = buildMessage('movie', 'list');
            //Resultado esperado
            const expected = 'movies listed';
            //Comparando que el resultado sea igual al esperado
            assert.strictEqual(result, expected);
        })
    })
})