var Ajax = function ()
{
    var concerts = [
        {"id": 1, "bandName": "Metal Bulls", "date": "2014-05-01 22:00:00", "pic": "concierto_01.jpg"},
        {"id": 2, "bandName": "Guardian Legends", "date": "2014-05-25 21:00:00", "pic": "concierto_02.jpg"},
        {"id": 3, "bandName": "Contra Warriors", "date": "2014-05-12 21:30:00", "pic": "concierto_03.jpg"},
        {"id": 4, "bandName": "Sound Lords", "date": "2014-06-01 23:00:00", "pic": ""},
        {"id": 5, "bandName": "DJ Chamaleon", "date": "2014-07-09 22:45:00", "pic": "concierto_05.jpg"},
        {"id": 6, "bandName": "Flying Noises", "date": "2014-05-16 23:30:00", "pic": ""},
        {"id": 7, "bandName": "Laser Meat Boys", "date": "2014-08-07 21:30:00", "pic": "concierto_07.jpg"},
        {"id": 8, "bandName": "Krazy Gurls", "date": "2014-09-22 20:00:00", "pic": ""},
        {"id": 9, "bandName": "Power to da People", "date": "2014-07-26 18:00:00", "pic": "concierto_09.jpg"},
        {"id": 10, "bandName": "C. G. Fatty", "date": "2014-06-12 21:30:00", "pic": "concierto_10.jpg"},
    ];
        
    this.getMovies = function () {
       var deferred = $.Deferred();
        console.log("ajax call: getMovies");
        $.jsonp({
                url: 'http://api.rottentomatoes.com/api/public/v1.0/' + 'lists/dvds/current_releases.json',
                data: {
                    page: 1, 
                    page_limit: 10,
                    apikey: 'xugmssra9wqy3c6vqwh2cam8',
                    itemsPerPage:10,
                    beforeSend: function () {
                        console.log("beforeSend");
                        $('#loading').html('<img src="assets/images/preLoader.gif"> loading...');
                        $('#loading').center();
                        $('#loading').show();
                    }
                },
                callbackParameter: 'callback'
            })
            .pipe(function(data) {
                
                console.log("llamada correcta");
                for (var i = 0; i < 10; i++) {
                	concerts[i].id = i + 1;
                    concerts[i].bandName = data.movies[i].title;
                    concerts[i].date = data.movies[i].year;
                    concerts[i].pic = "";
                }
                $('#loading').hide();      
                deferred.resolve(concerts);
            });
        return deferred.promise();    
    };
};
    