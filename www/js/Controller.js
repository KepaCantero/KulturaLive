var Controller = function() {
	//var ajax = new Ajax();
	//var DB = new WebSqlAdapter();
	var slider = new PageSlider($('body'));
	var body = $('#home2');

	var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var diasSemana = ["Domingo", "Lunes", "Martes", "Mi�rcoles", "Jueves", "Viernes", "S�bado"];
	
	
	//TEMPLATES
	var homeApp = Handlebars.compile($("#initialPage-tpl").html());
	var concertDetailTpl = Handlebars.compile($("#concert-tpl").html());
	var homeTpl = Handlebars.compile($("#home-tpl").html());
	var concertsListLiTpl = Handlebars.compile($("#concert-li-tpl").html());
	var fotoramaTpl = Handlebars.compile($("#fotorama-tpl").html());
	//var userFormTpl = Handlebars.compile($("#userForm-tpl").html());
	var dummyTpl = Handlebars.compile($("#dummy-tpl").html());
	var ticketDetailTpl = Handlebars.compile($("#ticketDetails-tpl").html());
    var listadoSalasTpl = Handlebars.compile($("#salas-tpl").html());
    var itemSalasTpl = Handlebars.compile($("#salas-li-tpl").html());
    var detalleSala =  Handlebars.compile($("#sala-tpl").html());
    var dummyAnuncioTpl=  Handlebars.compile($("#dummyAnuncio-tpl").html()); 
    
    
	this.initialize = function() {
		console.log("Estoy en Controller initialize");
		//return DB.initialize();
		var deferred = $.Deferred();
		deferred.resolve();            
        return deferred.promise();
	};

	this.LoadTicketDetails = function(concertID) {
		/*DB.LoadUser().done(function(userData) {
			console.log(userData.name);
			slider.slidePage(new ticketDetailsView(ticketDetailTpl, userData, concertdetails).render().el);
			return;
		});*/
        $.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/getConcertDetails/' + concertID,
	        dataType: "json",
	        success: function(data){
            	
                var date = new Date(data.concert[0].codigo_fecha * 1000);
            	var mes = date.getMonth();
            	var dia = date.getDate();
            	var diaSemana = date.getDay();
        		var diaMes = "" + diasSemana[diaSemana] + ", " + dia + " de " + meses[mes];
            	data.concert[0].nuevaFecha = diaMes;
            	
            	var hour = date.getHours();
            	var minutos = date.getMinutes();
            	if (minutos == "0") {
            		minutos = "00";
        		}
                
            	 data.concert[0].hora = "" + hour + ":" + minutos;
	             slider.slidePage(new ticketDetailsView(ticketDetailTpl,data.concert[0]).render().el);
	             
                }
            
            });	
		      
               
            
              
	            //alert(JSON.stringify(data));
            
	   
	};

	this.LoadMainMenu = function() {
		slider.slidePage(new MainMenuView(homeApp).render().el);
	};

	this.LoadUserForm = function() {
		slider.slidePage(new userFormView(userFormTpl).render().el);
	};

	this.LoadConcert = function(concertID) {
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/getConcertDetails/' + concertID,
	        dataType: "json",
	        success: function(data){
            	var date = new Date(data.concert[0].codigo_fecha * 1000);
            	var mes = date.getMonth();
            	var dia = date.getDate();
            	var diaSemana = date.getDay();
        		var diaMes = "" + diasSemana[diaSemana] + ", " + dia + " de " + meses[mes];
            	data.concert[0].nuevaFecha = diaMes;
            	
            	var hour = date.getHours();
            	var minutos = date.getMinutes();
            	if (minutos == "0") {
            		minutos = "00";
        		}
            	data.concert[0].hora = "" + hour + ":" + minutos;
	            
	            slider.slidePage(new ConcertDetailsView(concertDetailTpl, data).render().el);
	            //alert(JSON.stringify(data));
            }
	    });	
	};

	this.LoadAllConcerts = function() {
		slider.slidePage(new ListConcertsView(this, homeTpl, concertsListLiTpl).render().el);
        this.InsertConcerts();
	};

	this.LoadDummy = function() {
		slider.slidePage(new DummyView(dummyTpl).render().el);
	};

    this.LoadAllSalas = function() {
		slider.slidePage(new ListSalasView(listadoSalasTpl, itemSalasTpl).render().el);
		this.insertSalas();
	};
	
	this.LoadDetalleSala = function(salaID) {
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/getSalaDetails/' + salaID,
	        dataType: "json",
	        //data: {"id" : salaID},
	        success: function(sala){
	            slider.slidePage(new SalaDetalleView(detalleSala, sala).render().el);
	            //alert(JSON.stringify(sala));
            }
	    });	
	};
	
    this.LoadDetalleAnuncio = function() {
		slider.slidePage(new DummyView(dummyAnuncioTpl).render().el);
	};

	this.InsertConcerts = function() {		
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/concerts',
	        //url: 'http://kepacantero.esy.es/kulturaliveapi/v1/concerts',
	        dataType: "json",
	        success: function(data){
	        	var len = data.concerts.length;
                var fecha = "";
                 
                for (var i = 0; i < len; i++) {
                	var date = new Date(data.concerts[i].codigo_fecha * 1000);
                	var mes = date.getMonth();
                	var dia = date.getDate();
                	var diaSemana = date.getDay();
                	var diaMes = "" + diasSemana[diaSemana] + ", " + dia + " de " + meses[mes];
                	var comprob = "" + dia + " " + mes;
                	if (comprob != fecha) {
                    	fecha = comprob;                    	
                    	data.concerts[i].nuevaFecha = diaMes;
                	}                	
                	data.concerts[i].diaMes = diaMes;
                	var hora = date.getHours();
                	var minutos = date.getMinutes();
                	if (minutos == "0") {
                		minutos = "00";
            		}
                	data.concerts[i].hora = "" + hora + ":" + minutos;
                    //Esto permite poner headers con la fecha a la lista de conciertos.
                    //Para ello a�ade al array una variable "nuevaFecha" solo cuando la fecha sea distinta a la anterior.
                    
                }
	        
	            $('.lista-conciertos').html(concertsListLiTpl(data));
	            
	            //Aqu� se pasan los datos a rslides (galer�a) y se arranca. Si LoadAds() va fuera, no funciona.
	            $('#fotorama').html(fotoramaTpl(data));
	            LoadAds();
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert(errorThrown);
	        }
	    });
	};

	this.insertSalas = function() {
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/salas',
	        dataType: "json",
	        success: function(listaSalas){
	            $('.lista-salas').html(itemSalasTpl(listaSalas));
	            //alert(JSON.stringify(listaSalas));
	        }
	    });
	};

	var LoadAds = function() {
		//$(".rslides").responsiveSlides({
		$("#fotorama").responsiveSlides({
		  auto: true,             // Boolean: Animate automatically, true or false
		  speed: 500,            // Integer: Speed of the transition, in milliseconds
		  timeout: 2000,          // Integer: Time between slide transitions, in milliseconds
		  pager: false,           // Boolean: Show pager, true or false
		  nav: false,             // Boolean: Show navigation, true or false
		  random: false,          // Boolean: Randomize the order of the slides, true or false
		  pause: false,           // Boolean: Pause on hover, true or false
		  pauseControls: false,    // Boolean: Pause when hovering controls, true or false
		  prevText: "",   // String: Text for the "previous" button
		  nextText: "",       // String: Text for the "next" button
		  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
		  manualControls: "",     // Selector: Declare custom pager navigation
		  namespace: "rslides",   // String: Change the default namespace used
		  before: function(){},   // Function: Before callback
		  after: function(){}     // Function: After callback
		});
	};
	
	this.findByName = function(query){
		//alert(query);
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/searchConcert/' + query,
	        dataType: "json",
	        success: function(data){
	        
	        	var len = data.concerts.length;
                var fecha = "";
                                
                for (var i = 0; i < len; i++) {
                	var date = new Date(data.concerts[i].codigo_fecha * 1000);
                	var mes = date.getMonth();
                	var dia = date.getDate();
                	var diaSemana = date.getDay();
                	var diaMes = "" + diasSemana[diaSemana] + ", " + dia + " de " + meses[mes];
                	var comprob = "" + dia + " " + mes;
                	//Esto permite poner headers con la fecha a la lista de conciertos.
                    //Para ello a�ade al array una variable "nuevaFecha" solo cuando la fecha sea distinta a la anterior.
                    if (comprob != fecha) {
                    	fecha = comprob;                    	
                    	data.concerts[i].nuevaFecha = diaMes;
                	}                	
                	data.concerts[i].diaMes = diaMes;
                	var hora = date.getHours();
                	var minutos = date.getMinutes();
                	if (minutos == "0") {
                		minutos = "00";
            		}
                	data.concerts[i].hora = "" + hora + ":" + minutos;
                    
                }
	        
	        	//alert(JSON.stringify(data));
	            //$('.lista-conciertos').html("");
	            $('.lista-conciertos').html(concertsListLiTpl(data));
	        }
	    });
	};
};

