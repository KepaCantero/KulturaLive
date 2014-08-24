var concertsListView = function(controller, template, listItemTemplate) {

	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		var cuerpo = $('#home');

		//var myScroll = new IScroll('.content-conciertos');

		//Esto hace que al cambiar de p�gina se vaya a la parte de arriba.
		window.scrollTo(0, 0);

		this.el.on('click', '.back-button', function(event) {
			history.go(-1);
		});
		
		/*this.el.on('keyup', '#inputBusqConciertos', function(event) {
			console.log("���ARRIBAAAAAAAAAAAAAAAA!!!");
			window.scrollTo(0, 0);
		});*/
		
		
		this.el.on("click", "img", function(){                
            var string = $(this).attr('src').split("_");
            var string = string[1].split(".");
            var id = string[0];
            
            var match = $(this).attr('src').match(/concierto/g);
            if (match) {
			    window.location.hash ="#mainMenu/ticketDetails/"+id;
                return;
		     }
                    
        });

		this.el.on('click', '#slide-menu-button', function() {			
			if ( $('#busquedaConciertos').css("display") == "block" ){
				$('#busquedaConciertos').css("display", "none");
				$("#home").css("overflow", "auto");
			} else {
				$('#busquedaConciertos').css("display", "block");
				$("#home").css("overflow", "hidden");
			}
		});
		
		this.el.on('click', '#butBusqConciertos', function() {
			if ($('#inputBusqConciertos').val() != ""){
				$('#busquedaConciertos').css("display", "none");
				$("#home").css("overflow", "auto");
				controller.findByName( $('#inputBusqConciertos').val() );
				$('#inputBusqConciertos').val("");
			}
		});
	};

	this.render = function() {
		this.el.html(template());
		return this;
	};

	this.initialize();

}; 