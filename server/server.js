const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

const fakeDb = require('./fakeDatabase');
let id = 0;

app.get('/api/quotes', (req, res) => {
  // fakeDb is the array of quotes in the fakeDatabase.js file
  // respond with all quotes
  res.status(200).send(fakeDb)
})

app.post('/api/quotes', (req, res) => {
  /*
req = {
  body: {
    quote: 'whatever we send in the body'
  }
}
*/
  id++;
  // increment the id variable above. this will make sure that each new quote object has a different id
  let newQuote = {
    id: id,
    quote: req.body.quote
  }
  // push the new object into the fakeDb array
  fakeDb.push(newQuote);
  res.status(200).send('quote added')
})

app.delete('/api/quotes/:id', (req, res) => {
  /*
req = {
params: {
  id: the number sent in the url with the axios.delete request
}
}
*/
  console.log(req.params.id)
  for (let i = 0; i < fakeDb.length; i++) {
    if (fakeDb[i].id === parseInt(req.params.id)) {
      console.log('removed')
      fakeDb.splice(i, 1)
    }
  }
  res.status(200).send('removed')
})




const port = 3005;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})