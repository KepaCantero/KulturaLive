var concertDetailsView = function(template,concert) {

    this.initialize = function() {
        this.el = $('<div/>');
        
        this.el.on('click', '.back-button', function() {
			history.go(-1);
		});
		
		this.el.on('click', '#buttonUserForm', function() {
			$.ajax({
		        type: 'POST',
		        url: 'http://kometa.esy.es/api/v1/verifyTicket',
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
                    console.log(data);
                  
		          //  alert(JSON.stringify(data));
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            /*console.log("Error: " + errorThrown);
		            console.log("textStatus: " + textStatus);
		            console.log("jqXHR: " + jqXHR);*/
                    alert("error1")
		            alert(errorThrown);
		        }
		    });
		});
    };

    this.render = function() {
        this.el.html(template(concert));
        return this;
    };
	
	function callCECA(data) {
		
		var url = "http://kometa.esy.es/api/v1/ceca/" + data.codigo;
 	   
        var ref = window.open(encodeURI(url), '_blank', 'location=yes');
		
     	/*ref.addEventListener('loadstart', function(event) { 
     		console.log(event.url);
     		if (event.url == "http://www.kulturalive.com/index.php?len=cas"){
     			ref.close();
     		} else if (event.url == "http://www.kulturalive.com/index.php?len=cas&conf=ok"){
     			alert("La compra ha sido correcta.");	
     		}
 		});
 		*/
 		//Esto nos devuelve a Main Menu si cerramos InAppBrowser
 		//history.go(-(history.length-2));
 		
 		/*ref.addEventListener('exit', function(event){
 			alert(event.url);
 		});*/
		  
	};
	
    this.initialize();

};