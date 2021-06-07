//Server el cual su única mision es levantar un server para pruebas

const express = require('express');
//Supertest levanta un servidor temporal
const supertest = require('supertest');

function testServer(route) {
    const app = express();
    route(app);
    return supertest(app);
}

module.exports = testServer;