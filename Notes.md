
As a client application consuming your api application,
I want to be able to receive a list of movies from the api,
so that I can list them on my interface.

As a client application consuming your application,
I want to be able to search by title for movies from the api,
so that I can list them on my interface.

## ROUTE 1

/movies	GET

200 - list of all or book by id (array)
400 - invalid id
404 - book not found


## ROUTE 2

/movies?title={titleQuery}	GET

string match movie titles

200 - list of all matches (array)
400 - invalid titleQuery
404 - no results


## ROUTE 3

/movies/{movieId}	GET
/movies/:id	GET 

match movie's id

200 - matching movie
400 - invalid id supplies
404 - no matches


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


## ROUTE 5

/movies/{movieId}	DELETE

deletes movie by id

(extrapolation)
200 - movie was deleted
400 - invalid id


## Stretch Goal:

Use cookies to set 2 cookies named firstName and lastName. Create a route/endpoint named setCookie that sets the cookies with your first name and last name. Create a route/endpoint named readCookie that displays your name on the browser using the cookies that were set.