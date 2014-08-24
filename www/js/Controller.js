var Controller = function() {
	//var ajax = new Ajax();
	//var DB = new WebSqlAdapter();
	var slider = new PageSlider($('body'));
	var body = $('#home');

    
	
    
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var diasSemana = ["Domingo", "Lunes", "Martes", "Mi�rcoles", "Jueves", "Viernes", "S�bado"];
    
    //TEMPLATES
	var homeApp = Handlebars.compile($("#initialPage-tpl").html());
	
	var homeTpl = Handlebars.compile($("#home-tpl").html());
	
	var fotoramaTpl = Handlebars.compile($("#fotorama-tpl").html());
	
    
	var dummyTpl = Handlebars.compile($("#dummy-tpl").html());
	var dummyAnuncioTpl=  Handlebars.compile($("#dummyAnuncio-tpl").html()); 
    
    
    var salasListTpl = Handlebars.compile($("#salasListTpl").html());    
    var salaDetailsTpl = Handlebars.compile($("#salaDetailsTpl").html());
   
    
    var concertsListTpl = Handlebars.compile($("#concertListTpl").html());
    var concertDetailsTpl = Handlebars.compile($("#concertDetailsTpl").html());
    
    
    
   
    
    //SPINNER AJAX
    var opts = {
	  lines: 8, // The number of lines to draw
	  length: 12, // The length of each line
	  width: 6, // The line thickness
	  radius: 12, // The radius of the inner circle
	  corners: 1, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#800000', // #rgb or #rrggbb or array of colors
	  speed: 0.7, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: false, // Whether to render a shadow
	  hwaccel: true, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: '50%', // Top position relative to parent
	  left: '50%' // Left position relative to parent
	};
			
	var target = document.getElementById('home');
	var spinObj = new Spinner(opts).spin();
	
	//FUNCIONES
    
	this.initialize = function() {
		//console.log("Estoy en Controller initialize");
		//return DB.initialize();
		var deferred = $.Deferred();
		deferred.resolve();            
        return deferred.promise();
	};

	

	this.LoadMainMenu = function() {
		slider.slidePage(new MainMenuView(homeApp).render().el);
	};

	

	
    this.LoadConcertsList = function() {
		slider.slidePage(new concertsListView(this, homeTpl, concertsListTpl).render().el);
        $.ajax({
	        type: 'GET',
                        
	        url: 'http://kometa.esy.es/api/v1/concertsList',
	        dataType: "json",
	        ajaxStart: spinner("on"),
	        success: function(data){                  
	        	
                $('.lista-conciertos').html(concertsListTpl(data));	            
	            //Aqu� se pasan los datos a rslides (galer�a) y se arranca. Si LoadAds() va fuera, no funciona.
	            $('#fotorama').html(fotoramaTpl(data));
	            LoadAds();                
	            spinner("off");
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert(errorThrown);
	            spinner("off");
	        }
	    });
       
    
	};
    this.LoadConcertDetails = function(concertID) {
		
	   $.ajax({
	        type: 'GET',       
	        url: 'http://kometa.esy.es/api/v1/concertDetails/' + concertID,
	             
           //url: 'http://kepacantero.esy.es/kulturaliveapi/v1/getConcertDetails/' + concertID,
	        dataType: "json",
	        ajaxStart: spinner("on"),
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
	            slider.slidePage(new concertDetailsView(concertDetailsTpl,data.concert[0]).render().el);
	            spinner("off");
			}
		});	
	   
	};

	
    this.LoadSalasList = function() {
		slider.slidePage(new salasListView(salasListTpl, salaDetailsTpl).render().el);
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/salasList',	        
	        dataType: "json",
	        ajaxStart: spinner("on"),
	        success: function(data){
	            $('.lista-salas').html(salaDetailsTpl(data));	            
	            spinner("off");
	        }
	    });
	};
	
	this.LoadSalaDetails = function(salaID) {
		$.ajax({
	        type: 'GET',
	        url: 'http://kometa.esy.es/api/v1/salaDetails/' + salaID,
	        dataType: "json",
	        ajaxStart: spinner("on"),
	        success: function(data){
	            slider.slidePage(new salaDetailsView(salaDetailsTpl, data).render().el);
	            //alert(JSON.stringify(sala));
	            spinner("off");
            }
	    });	
	};
	
    this.LoadAdsDetails = function() {
		slider.slidePage(new DummyView(dummyAnuncioTpl).render().el);
	};

    this.LoadDummy = function() {
		slider.slidePage(new DummyView(dummyTpl).render().el);
	};

	
	var LoadAds = function() {
		//$(".rslides").responsiveSlides({
		$("#fotorama").responsiveSlides({
		  auto: true,             // Boolean: Animate automatically, true or false
		  speed: 500,            // Integer: Speed of the transition, in milliseconds
		  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
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
	        //url: 'http://kepacantero.esy.es/kulturaliveapi/v1/searchConcert/' + query,
	        dataType: "json",
	        ajaxStart: spinner("on"),
	        success: function(data){
	        
	        	var len = data.concerts.length;
                var fecha = "";
                                
                for (var i = 0; i < len; i++) {
                    var mes = data.concerts[i].month;
                    var dia = data.concerts[i].day;
                    var diaSemana = data.concerts[i].weekday;
                    var diaMes = "" + diasSemana[diaSemana] + ", " + dia + " de " + meses[mes];  
                    
                	var comprob = "" + dia + " " + mes;
                	//Esto permite poner headers con la fecha a la lista de conciertos.
                    //Para ello a�ade al array una variable "nuevaFecha" solo cuando la fecha sea distinta a la anterior.
                    if (comprob != fecha) {
                    	fecha = comprob;                    	
                    	data.concerts[i].nuevaFecha = diaMes;
                	}                	
                	data.concerts[i].diaMes = diaMes;
                	var hora = data.concerts[i].hour;
                	var minutos =  data.concerts[i].minutes;
                	if (minutos == "0") {
                		minutos = "00";
            		}
                	data.concerts[i].hora = "" + hora + ":" + minutos;
                    
                }
	        
	        	//alert(JSON.stringify(data));
	            //$('.lista-conciertos').html("");
	            $('.lista-conciertos').html(concertsListLiTpl(data));
	            spinner("off");
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert(errorThrown);
	            spinner("off");
	        }
	    });
	};
	
	var spinner = function (action) {
		if (action == "on") {
			//target.appendChild(spinObj.el);
			spinObj.spin(target);
			//console.log("SPINNER START");
		} else {
			if (spinObj) {
				//target.removeChild(spinObj.el);
				spinObj.stop();
				//console.log("SPINNER STOP");
			}
		}
	};
};

