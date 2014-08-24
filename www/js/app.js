// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
( function(window,document,$) {

		/* ---------------------------------- Local Variables ---------------------------------- */

	    var controller = new Controller();
	
        
		//var router= new Route();

		/* --------------------------------- Event Registration -------------------------------- */
        
        $(document).ready(function() {
                   
            document.addEventListener("deviceready", onDeviceReady(), false);
        
        });

        function onDeviceReady() {
            
            FastClick.attach(document.body);
            window.location.hash = "#mainMenu";
           
            //Con este if se cambian los alerts para que sean nativos
            if (navigator.notification) {// Override default HTML alert with native dialog
                window.alert = function(message) {
                     navigator.notification.alert(message, // message
                         null, // callback
                         "Kultura Live", // title
                         'OK' // buttonName
                     );
		        };
		    }
            
            /*$(document).on("click","img",function(){
                
                var string = $(this).attr('src').split("_");
                var string = string[1].split(".");
                var id = string[0];
                
                var match = $(this).attr('src').match(/concierto/g);
                if (match) {
				    window.location.hash ="#mainMenu/concertsList/"+id;
                    return;
			     }
                        
           });*/
            
            
            controller.initialize().done(function() {
			    window.location.hash = "#mainMenu";
		    	route();    
            });

        };
		        
		$(window).on('hashchange', route);          
	

		/* ---------------------------------- Local Functions ---------------------------------- */

		
		
        function route() {

			var hash = window.location.hash;
	        var dummyURL = /^#mainMenu\/dummy/;
			var dummySalaURL = /^#sala\/dummy/;
			
			var concertsList = /^#mainMenu\/concertsList/;
			var concertDetails = /^#mainMenu\/concertDetails\/(\d{1,})/;
            
            var mainMenuURL = /^#mainMenu/;
			
			
            var salasList = /^#mainMenu\/salas/;
            var salaDetails = /^#mainMenu\/salas\/(\d{1,})/;
            
			var adsDetails = /^#mainMenu\/detallesAnuncio/;
			
			//Esto sirve para que siempre se cierre el men� lateral aunque se d� a back estando abierto
			$('.side-nav').css("display", "none");
			$('#home').removeClass('left-nav');
			
			//Esto hace que al cambiar de p�gina se vaya a la parte de arriba.
			window.scrollTo(0, 0);
			//$('html,body').scrollTop(0);
			
            console.log("hash: " + hash);
			// Ojo que entra en la primera que encuentra un match.
 
			var match = hash.match(adsDetails);
            if (match) {
				//console.log("toDummySala");
			    controller.LoadAdsDetails();
				return;
			}
			
			var match = hash.match(concertDetails);
			if (match) {
				
				var band = $("#myDivId").val();
				controller.LoadConcertDetails(match[1]);
				return;
			}
            
            var match = hash.match(salaDetails);
			if (match) {
				//console.log("todetalleSalas");
			    controller.LoadSalaDetails(match[1]);
				return;
			}
            
            var match = hash.match(salasList);
			if (match) {
				//console.log("tolistadoSalas");
			    controller.LoadSalasList();
				return;
			}
			

			var match = hash.match(dummyURL);
			if (match) {
				//console.log("toDummyUrl");
				controller.LoadDummy();
				return;
			}

			
			var match = hash.match(concertsList);
			if (match) {
				//console.log("toLoadAllConcert");
				controller.LoadConcertsList();
				return;
			}


			var match = hash.match(mainMenuURL);
			if (match) {
				//console.log("tomainMenuURL");
				controller.LoadMainMenu();
				return;
			}
		}
  
	})(window,document,window.jQuery); 
	
