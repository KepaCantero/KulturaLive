// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
	
    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html());
	var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
	var employeeTpl = Handlebars.compile($("#employee-tpl").html());
	var detailsURL = /^#concerts\/(\d{1,})/;
    var mainList =  /^#concerts\/(\d{0})/;
    var homeApp = $( "initialPage" );
    
    var controller = new Controller();    
    var slider = new PageSlider($('body'));
    
	controller.initialize().done(function () {
	    route();
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
        	   
     
       //launch the initial page
       
       if (!hash) {
	        
           console.log ("slider.slidePage LoadMovies");                     
           slider.slidePage(homeApp);
	       return;
	    }
       
       
       var match = hash.match(mainList);
       if (match) {
            console.log ("slider.slidePage LoadMovies");           
            slider.slidePage(new ListConcertsView(homeTpl, employeeLiTpl).render().el);
            controller.LoadAllConcerts();            
            return;
	    }
       
	    var match = hash.match(detailsURL);
	    if (match) {
	        var concert= controller.LoadConcert(match[1]);
            slider.slidePage(new ConcertDetailView(adapter, employeeTpl, concert).render().el);
	       return;    
	    }
	}
	
}());