var Ajax = function ()
{
    this.getMovies = function () {
       var deferred = $.Deferred();
        console.log("ajax call");
        $.jsonp({
                url: 'http://api.rottentomatoes.com/api/public/v1.0/' + 'lists/dvds/current_releases.json',
                data: { 
                    page: 1, 
                    page_limit: 10,
                    apikey: 'xugmssra9wqy3c6vqwh2cam8',
                    itemsPerPage:10
                },
                callbackParameter: 'callback'
            })
            .pipe(function(data) {
                
                console.log("llamada correcta");
         
                deferred.resolve(data.movies);
            });
        return deferred.promise();
    
    };
  
  
  
};