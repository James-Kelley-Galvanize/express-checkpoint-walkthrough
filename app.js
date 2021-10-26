const express = require("express");
const {uniqueId}= require('lodash')

let movieData = require("./dummyData");

const app = express();
const port = 8080;

movieData = movieData.map(movie => {
  movie.id = uniqueId()
  return movie;
})

let nextId = movieData.length+1;


app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello film buffs!");
});

app.get('/movies/', (req, res)=>{
 

  if(req.query.titleQuery){
    let {titleQuery} = req.query
 /*
  ## ROUTE 2
  
  /movies?title={titleQuery}	GET
  
  string match movie titles
  
  200 - list of all matches (array)
  400 - invalid titleQuery
  404 - no results
  */
    if (titleQuery.length === 0 || typeof titleQuery === 'number'){
      res.status(400).end()
    } else { // if query is viable
      let matches = movieData.filter(movie=>movie.title.toLowerCase().includes(titleQuery.toLowerCase()))

      if (!matches.length){
        res.status (404).end()
      } else{
        res.status(200).json(matches)
      }

    }
  }
  else {

    res.status(200).json(movieData)
  }
 
 
})


app.get("/movies/:id", (req, res)=>{
/*
## ROUTE 3

/movies/{movieId}	GET
/movies/:id	GET 

match movie's id

200 - matching movie
400 - invalid id supplies
404 - no matches
*/
 let {id} = req.params
 id = parseInt(id)

 if( typeof id !== 'number' || id <=0 || id=== NaN){
   res.status(400).end()
 } else{
    let matches = movieData.filter(movie => movie.id === id);

    if (!matches.length){
      res.status(404).end()
    } else{
      res.status(200).json(matches[0])
    }

 }

})

app.post('/movies', (req,res)=>{
  /*
  
  ## ROUTE 4
  
  /movies	POST
  
  movie as JSON in body to be added to the list, with format as follows:
  {
  "title": "From Paris With Love",
  "runtime": 94,
  "release_year": 2010,
  "director": "Pierre Morel",
  }
  
  200 - movie posted - send movie info object WITH new id number
  */
  let newMovie = req.body
  newMovie= {id:uniqueId(), ...newMovie}
  nextId ++;

  movieData.push(newMovie)
  res.status(200).json(newMovie)

})

app.delete('/movies/:id', (req,res)=>{
/*
## ROUTE 5

/movies/{movieId}	DELETE

deletes movie by id

(extrapolation)
200 - movie was deleted
400 - invalid id
*/

  let {id} = req.params
  id = parseInt(id)

  if( typeof id !== 'number' || id <=0 || id === NaN){
    res.status(400).end()
  } else {
    movieData = movieData.filter(movie => movie.id !== id)
    res.status(200).send('Movie deleted')
  }

})



app.listen(port, () => {
  console.log(`MovieDB Server listening at ${port}!`);
});
