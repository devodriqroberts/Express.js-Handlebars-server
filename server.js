const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log.')
        }
    });

    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Sorry this page is currently down for maintenance. Will be back up soon!'
    })
})

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    
    res.render('home.hbs', {
        pageTitle: 'This is my home page',
        welcomeMessage: 'Welcome!',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',

    })
})

app.get('/bad', (req, res) => {
    res.send({
        bad: "Bad request route"
    })
})




app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});