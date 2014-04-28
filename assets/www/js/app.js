// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
	
    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeListTpl = Handlebars.compile($("#homeList-tpl").html());
    var homeTpl = Handlebars.compile($("#home-tpl").html());
	var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
	var employeeTpl = Handlebars.compile($("#employee-tpl").html());
	var detailsURL = /^#concerts\/(\d{1,})/;
    var mainList =  /^#concerts\/(\d{0})/;
    var homeApp = $( "initialPage" );
    var adapter = new WebSqlAdapter();
   
    var slider = new PageSlider($('body'));
    
	adapter.initialize().done(function () {
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
	        slider.slidePage(new HomeMenuView(homeTpl).render().el);
	        //Esto deber�a cargar todos los conciertos al cargar HomeView, pero no, da error en la transacci�n sql
	        return;
	    }
       
       
       var match = hash.match(mainList);
       if (match) {
	        slider.slidePage(new HomeListView(adapter, homeListTpl, employeeLiTpl).render().el);
	        //Esto deber�a cargar todos los conciertos al cargar HomeView, pero no, da error en la transacci�n sql
	        adapter.findByName($('.search-key').val()).done(function(concerts) {
	            $('.employee-list').html(employeeLiTpl(concerts));
	        });
	        return;
	    }
       
       
       
	    var match = hash.match(detailsURL);
	    if (match) {
	        adapter.findById(Number(match[1])).done(function(concerts) {
	            slider.slidePage(new EmployeeView(adapter, employeeTpl, concerts).render().el);
	        });
	    }
	}
	
}());