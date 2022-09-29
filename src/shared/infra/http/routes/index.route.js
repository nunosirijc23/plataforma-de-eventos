const { Router } = require('express');

const index = Router();

index.get('/', (request, response) => {
    return response.render('index', {
        title: 'SPREAD'
    });
});

module.exports = index;