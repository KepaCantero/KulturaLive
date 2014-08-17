var ListSalasView = function(template, listItemTemplate) {

	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		var cuerpo = $('#home2');

		//Esto hace que al cambiar de página se vaya a la parte de arriba.
		window.scrollTo(0, 0);
		//$('html,body').scrollTop(0);

		this.el.on('click', '.back-button', function(event) {
			window.history.back();
		});
	};

	this.render = function() {
		this.el.html(template());
		return this;
	};
	
	this.findSalasByName = function() {
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/salas',
	        dataType: "json",
	        success: function(data){
	            $('.lista-salas').html(listItemTemplate(data));
	        }
	    });
    };

	this.initialize();

}; 