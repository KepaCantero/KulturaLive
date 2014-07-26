var ListConcertsView = function(db, template, listItemTemplate) {

	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		var cuerpo = $('#home2');

		//Esto hace que al cambiar de página se vaya a la parte de arriba.
		window.scrollTo(0, 0);
		//$('html,body').scrollTop(0);

		this.el.on('click', '#buttonSearch', function() {
			if (cuerpo.hasClass('left-nav')) {
				$('.side-nav').css("display", "none");
				cuerpo.removeClass('left-nav');
			}
			
			db.findByName($('#inputPelicula').val(), $('#inputId').val(), $('#inputFecha').val(),0,10).done(function(concerts) {
				$('.employee-list').html(listItemTemplate(concerts));
			});		
		});

		this.el.on('click', '.back-button', function(event) {
			//history.go(-1);
			window.history.back();
			/*event.preventDefault();
    		history.back(1);*/
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
			if (cuerpo.hasClass('left-nav')) {
				$('.side-nav').css("display", "none");
				cuerpo.removeClass('left-nav');
			} else {
				$('.side-nav').css("display", "block");
				cuerpo.addClass('left-nav');				
			}
		});
	};

	this.render = function() {
		this.el.html(template());
		return this;
	};

	this.findByName = function() {
		db.findByName($('#inputPelicula').val(), $('#inputId').val(), $('#inputFecha').val(), 0, 10).done(function(concerts) {
			$('.employee-list').html(listItemTemplate(concerts));
		});
	};

	this.initialize();

}; 