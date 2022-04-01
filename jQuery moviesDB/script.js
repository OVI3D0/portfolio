$(document).ready(function() {
    // key needed to make calls to the moviesdb api
    const apikey = "ae0dcedd2f7e08d9767c06107fcd436d"
    let genre;
    let genres;

    // Set up genre selector
    $.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`, function(data) {
        // set the data returned to a variable
        genre = data.genres
        // for each array returned by the genre call
        $.each(genre, function(index) {
            // Add it as an option in the 'genre' selector
            $('#genSelect').append(
                `
                <option value="${genre[index].id}">${genre[index].name}</option>
                `
            )
        })
    })


    // Get movies by rating/genre
    $(document).on('click', '#btn', function() {

        // Clear any posters that might be there
        $('.card').remove();

        // fetch 20 most popular movies
        $.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`, function(data) {
            // Grab the value of our rating/genre selectors
            let rating = $('#rating').val();
            let genSelect = $('#genSelect').val();
            
            // put the results from the api fetch into a variable
            let movie = data.results;

            // compares each movies genre ID's with the selected Genre's ID
            // If they match, return true
            function genCmp(genres) {
                for(let i = 0; i < genres.length; i++) {
                    if(genres[i] == genSelect) {
                        return true;
                    }
                }
            }

            // For each movie that we returned
            $.each(movie, function(index) {
                genres = movie[index].genre_ids;
                // call the function comparing each movies genres with the selected one
                genCmp(genres);

            // if both the selectors are their default values
                if((rating == 'Rating') && (genSelect == 'undefined')) {
                    // just return every movie
                    $('#container').append(
                        `
                        <div class="card m-3 pt-1" style="width: 18rem;">
                            <a target="_blank" href="https://www.themoviedb.org/movie/${movie[index].id}">
                                <img src="https://image.tmdb.org/t/p/w500${movie[index].poster_path}" class="card-img-top" alt="...">
                            </a>                                
                        <div class="card-body">
                            <h5 class="card-title">${movie[index].title}</h5>
                            <p class="card-text">${movie[index].overview}</p>
                        </div>
                    </div>
                        `
                    )
                // else, if rating is default but the genre matches
                } else if((rating == 'Rating') && genCmp(genres)){

                    $('#container').append(
                        `
                        <div class="card m-3 pt-1" style="width: 18rem;">
                            <a target="_blank" href="https://www.themoviedb.org/movie/${movie[index].id}">
                                <img src="https://image.tmdb.org/t/p/w500${movie[index].poster_path}" class="card-img-top" alt="...">
                            </a>                                
                        <div class="card-body">
                            <h5 class="card-title">${movie[index].title}</h5>
                            <p class="card-text">${movie[index].overview}</p>
                        </div>
                    </div>
                        `
                    )
                // else, if the movies rating avg is higher than the selectors,
                // and the genre is undefined
                } else if((movie[index].vote_average >= rating) && (genSelect == 'undefined')) {

                    $('#container').append(
                        `
                        <div class="card m-3 pt-1" style="width: 18rem;">
                            <a target="_blank" href="https://www.themoviedb.org/movie/${movie[index].id}">
                                <img src="https://image.tmdb.org/t/p/w500${movie[index].poster_path}" class="card-img-top" alt="...">
                            </a>                                
                        <div class="card-body">
                            <h5 class="card-title">${movie[index].title}</h5>
                            <p class="card-text">${movie[index].overview}</p>
                        </div>
                    </div>
                        `
                    )

                } else {
                    // else, only return movies with both a vote average higher than the selected one
                    // and matching the genre that was selected
                    if((movie[index].vote_average >= rating) && genCmp(genres)) {
                        $('#container').append(
                            `
                            <div class="card m-3 pt-1" style="width: 18rem;">
                                <a target="_blank" href="https://www.themoviedb.org/movie/${movie[index].id}">
                                    <img src="https://image.tmdb.org/t/p/w500${movie[index].poster_path}" class="card-img-top" alt="...">
                                </a>                                
                                <div class="card-body">
                                    <h5 class="card-title">${movie[index].title}</h5>
                                    <p class="card-text">${movie[index].overview}</p>
                                </div>
                            </div>
                            `
                        )
                    }
                }
            })
        })
    })

});