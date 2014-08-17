// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
( function(window,document,$) {

		/* ---------------------------------- Local Variables ---------------------------------- */

		var detailsURL = /^#concerts\/(\d{1,})/;
		var mainConcertsList = /^#mainConcertsList\//;
		var controller = new Controller();
		var mainMenuURL = "#mainMenu";
        
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

            //document.addEventListener('backbutton', backButtonCallback, true);
        };
		        
		$(window).on('hashchange', route);   
        
		/*$(window).scroll(function() {
			if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
				console.log("Scrolling");*/
                
				//controller.InsertFromAjax();
                /*controller.from = controller.from + controller.count;
				controller.InsertFromDB(controller.from,controller.count);*/
				/*controller.InsertFromDB(0,10);
                
			}
		});*/

		

		/* ---------------------------------- Local Functions ---------------------------------- */

		
		
        function route() {

			var hash = window.location.hash;
	        var dummyURL = /^#mainMenu\/dummy/;
			var dummySalaURL = /^#sala\/dummy/;
			var detailsURL = /^#mainMenu\/concertsList\/(\d{1,})/;
			var concertsList = /^#mainMenu\/concertsList/;
			var mainMenuURL = /^#mainMenu/;
			var userForm = /^#mainMenu\/userForm/;
			var ticketDetails = /^#mainMenu\/ticketDetails\/(\d{1,})/;
            var listadoSalas = /^#mainMenu\/salas/;
            var detalleSalas = /^#mainMenu\/salas\/(\d{1,})/;
            
			var dummyDetallesAnuncio = /^#mainMenu\/detallesAnuncio/;
			
			//Esto sirve para que siempre se cierre el men� lateral aunque se d� a back estando abierto
			$('.side-nav').css("display", "none");
			$('#home2').removeClass('left-nav');
			
			//Esto hace que al cambiar de p�gina se vaya a la parte de arriba.
			window.scrollTo(0, 0);
			//$('html,body').scrollTop(0);
			
            console.log("hash: " + hash);
			// Ojo que entra en la primera que encuentra un match.
 
			var match = hash.match(dummyDetallesAnuncio);
            if (match) {
				console.log("toDummySala");
			    controller.LoadDetalleAnuncio();
				return;
			}
            var match = hash.match(ticketDetails);
			if (match) {
				console.log("toTicketDetails");
				var band = $("#myDivId").val();
				controller.LoadTicketDetails(match[1]);
				return;
			}
            var match = hash.match(detalleSalas);
			if (match) {
				console.log("todetalleSalas");
			    controller.LoadDetalleSala(match[1]);
				return;
			}
            
            var match = hash.match(listadoSalas);
			if (match) {
				console.log("tolistadoSalas");
			    controller.LoadAllSalas();
				return;
			}
			
            

			var match = hash.match(dummyURL);
			if (match) {
				console.log("toDummyUrl");
				controller.LoadDummy();
				return;
			}

			var match = hash.match(detailsURL);
			if (match) {
				console.log("todetailsURL");
				controller.LoadConcert(match[1]);
				return;
			}

			var match = hash.match(concertsList);
			if (match) {
				console.log("toLoadAllConcert");
				controller.LoadAllConcerts();
				return;
			}

			var match = hash.match(userForm);
			if (match) {
				console.log("touserForm");
				controller.LoadUserForm();
				return;
			}

			var match = hash.match(mainMenuURL);
			if (match) {
				console.log("tomainMenuURL");
				controller.LoadMainMenu();
				return;
			}
		}
  
	})(window,document,window.jQuery); 