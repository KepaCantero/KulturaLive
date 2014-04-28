// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
	
    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html());
	var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
	var employeeTpl = Handlebars.compile($("#employee-tpl").html());
	var detailsURL = /^#concerts\/(\d{1,})/;
    
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
	    if (!hash) {
	        slider.slidePage(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
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