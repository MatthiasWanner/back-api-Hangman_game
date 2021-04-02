const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const wilders = require('./wordsapi_sample');

app.get('/words', (req, res) => {
    const { words } = req.query;
  
    res.status(200).json(words);
    // if (lang) {
    //   const filteredWilders = [...wilders.values()].filter((wilder) => wilder.lang.toLowerCase() === lang.toLowerCase());
  
    //   if (filteredWilders.length < 1) {
    //     return res.sendStatus(204);
    //   }
  
    //   return res.status(200).json(filteredWilders);
    // }
  
    // return res.status(200).json([...wilders.values()]);
  });