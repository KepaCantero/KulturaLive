var ListConcertsView = function(controller, template, listItemTemplate) {

	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		var cuerpo = $('#home2');

		//Esto hace que al cambiar de página se vaya a la parte de arriba.
		window.scrollTo(0, 0);

		this.el.on('click', '#buttonSearch', function() {
			/*if (cuerpo.hasClass('left-nav')) {
				$('.side-nav').css("display", "none");
				cuerpo.removeClass('left-nav');
			}
			
			db.findByName($('#inputPelicula').val(), $('#inputId').val(), $('#inputFecha').val(),0,10).done(function(concerts) {
				$('.lista-conciertos').html(listItemTemplate(concerts));
			});
			
			$.ajax({
		        type: 'GET',
		        url: 'http://kometa.esy.es/api/v1/concerts',
		        dataType: "json",
		        success: function(data){
		            $('.lista-conciertos').html(listItemTemplate(data));
		        }
		    });*/
					
		});

		this.el.on('click', '.back-button', function(event) {
			window.history.back();
		});
		
		this.el.on("click", "img", function(){                
            var string = $(this).attr('src').split("_");
            var string = string[1].split(".");
            var id = string[0];
            
            var match = $(this).attr('src').match(/concierto/g);
            if (match) {
			    window.location.hash ="#mainMenu/concertsList/"+id;
                return;
		     }
                    
       });

		this.el.on('click', '#slide-menu-button', function() {			
			if ( $('#busquedaConciertos').css("display") == "block" ){
				$('#busquedaConciertos').css("display", "none");
				//alert("block");
			} else {
				$('#busquedaConciertos').css("display", "block");
				//alert("none");
			}
		});
		
		this.el.on('click', '#butBusqConciertos', function() {
			if ($('#inputBusqConciertos').val() != ""){
				$('#busquedaConciertos').css("display", "none");
				controller.findByName( $('#inputBusqConciertos').val() );
				$('#inputBusqConciertos').val("");
			}
		});
	};

	this.render = function() {
		this.el.html(template());
		return this;
	};
	
	/*this.findByName = function() {
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/concerts',
	        dataType: "json",
	        success: function(data){
	            $('.lista-conciertos').html(listItemTemplate(data));
	        }
	    });
    };*/

	this.initialize();

}; 