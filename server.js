const express = require('express');
const { restart } = require('nodemon');
const PORT = process.env.PORT || 5000;
const app = express();
const WORDSAPI = require('./wordsapi_sample');
const REGEX = /[^a-z]+/i;
// function that return an array of global object in JSON file, and add a proprity "word" which countain the word in upper string
const exploitObject = (object) => {
  const keys = Object.keys(object);
  const array = [];
  keys.forEach((key) => {
    newObject = {};
    newObject = object[key];
    newObject.word = `${key.toUpperCase()}`;
    array.push(newObject);
    });
  return array;
}

const filterByLength = (object, value) => {
  const wordsArray = exploitObject(object);
  const wordsArrayFiltered = wordsArray.filter((word) => word.letters === value && !REGEX.test(word.word));
  return wordsArrayFiltered;
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next(); // dont' forget the next function to continue middlewares of your Express Applications
});

app.get('/api/wordsapi', (req, res) => {
  res.status(200).json(exploitObject(WORDSAPI));
});

app.get('/api/wordsapi/length/:length', (req, res) => {
  const lengthRequired = +req.params.length;
  const result = filterByLength(WORDSAPI, lengthRequired);
  if(result.length !== 0){
    res.status(200).json(result);
  }else{
    res.status(202).send('Sorry, no result');
  }
});

app.get('/api/wordsapi/random/:length', (req, res) => {
  const lengthRequired = +req.params.length;
  const result = filterByLength(WORDSAPI, lengthRequired);
  const randomIndex = Math.floor(Math.random()* (result.length));
  if(result.length !== 0){
    res.status(200).json(result[randomIndex].word);
  }else{
    restart.status(202).send('Sorry, no result');
  }
});



  app.listen(PORT, () => {
    console.log(`Express running on port ${PORT}`);
  });