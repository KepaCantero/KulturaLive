// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
	
    /* ---------------------------------- Local Variables ---------------------------------- */
    
    var detailsURL = /^#concerts\/(\d{1,})/;
    var mainConcertsList =  /^#mainConcertsList\//;
    var controller = new Controller();    
 
    
	controller.initialize().done(function () {
	    route();
        $(".owl-carousel").owlCarousel();
	});

    /* --------------------------------- Event Registration -------------------------------- */
	document.addEventListener('deviceready', function () {

        FastClick.attach(document.body);

        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);

	$(window).on('hashchange', route);

    /* ---------------------------------- Local Functions ---------------------------------- */
   
   function route() {
	    var hash = window.location.hash;
        	   
        console.log (hash);
       
       
       if (!hash) {
	        
           console.log ("slider.slidePage LoadMovies");                     
           controller.LoadMainMenu();           
	       return;
	    }
       
       
       var match = hash.match(mainConcertsList);
       if (match) {
            console.log ("slider.slidePage LoadMovies");                       
            controller.LoadAllConcerts();            
            return;
	    }
       
	    var match = hash.match(detailsURL);
	    if (match) {
	        console.log ("App/getConcert");
            controller.LoadConcert(match[1]);
	       return;    
	    }
	}
	
}());