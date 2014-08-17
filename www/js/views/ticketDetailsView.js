var ticketDetailsView = function(template,concert) {

    this.initialize = function() {
        this.el = $('<div/>');
        
        this.el.on('click', '.back-button', function() {
			history.go(-1);
		});
		
		this.el.on('click', '#buttonUserForm', function() {
			$.ajax({
		        type: 'POST',
		        //url: 'http://kometa.esy.es/api/v1/verifyTicket',
		        url: 'http://kepacantero.esy.es/kulturaliveapi/v1/verifyTicket',
		        dataType: "json",
		        data: {	"nombre" : $('#inputNombre').val(), 
		        		"apellidos" : $('#inputApellidos').val(), 
		        		"dni" : $('#inputDni').val(), 
		        		"email" : $('#inputEmail').val(), 
		        		"nentradas" : $('#inputNentradas').val(), 
		        		"id_conciertos" : $('#idConcert').html(), 
		        		"grupos" : $('#gruposConcert').html()
        		},
		        success: function(data, textStatus, jqXHR){
		            callCECA(data);
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            console.log("Error: " + errorThrown);
		            console.log("textStatus: " + textStatus);
		            console.log("jqXHR: " + jqXHR);
		        }
		    });
		});
    };

    this.render = function() {
        this.el.html(template(concert));
        return this;
    };
	
	function callCECA(data) {
        
         
        var url = "http://kepacantero.esy.es/kulturaliveapi/v1/ceca/"+data.codigo; 
        //var url = "http://kepacantero.esy.es/kulturaliveapi/v1/ceca/"+dato; 
        //console.log(url);
        var ref = window.open(encodeURI(url), '_blank', 'location=yes,closebuttoncaption=Cerrar');
        		
        
        };

	
    this.initialize();

};