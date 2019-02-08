Liri bot

Liri is a node.js command line application that takes in parameters and gives back data. The user must enter 'node liri.js' into the command line followed by a command and then a search.

Possible commands are: 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'. 

'concert-this' uses the Bandsintown API to retrieve all upcoming concerts for an artist that is searched. The venue name, location, and date. 

'spotify-this-song' uses the Spotify API to retrieve data about the song entered in the search parameter. The song titles that contain the search parameter or parts of it. The user will receive the artist, song name, a link to preview the song, and the album name.

'movie-this' uses the OMDb API to retreive data about the movie entered in the search parameter. The result will include the title, release year, IMDb rating, country or countries it was filmed in, langauge, plot, and actors/actresses in the movie.

'do-what-it-says' is a command that reads the random.txt file and executes the parameters inside of it. By default it is set to 'spotify-this-song,I Want It That Way', but this can be changed to any of the other commands with any search. 

All results are returned in the command line, but also into a separate text file named 'log.txt' as well.

![concert-this](images/Screenshot(63).png)
![movie-this & spotify-this-song](images/Screenshot(64).png)
![do-what-it-says](images/Screenshot(65)png)
