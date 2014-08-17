var MainMenuView = function ( template) {

    this.initialize = function () {
        this.el = $('<div/>');
        
        this.el.on('click', '#submitPago', function() {
			//$('#formCeca').submit();
			
			var url = 'http://tpv.ceca.es:8000/cgi-bin/tpv/?';
			url += 'MerchantID=012130696&';
			url += 'AcquirerBIN=0000554053&';
			url += 'TerminalID=00000003&';
			url += 'Num_operacion=2625_20140804212400_23400_Metallica&';
			url += 'Importe=1200&';
			url += 'TipoMoneda=978&';
			url += 'Exponente=2&';
			url += 'URL_OK=http://www.kulturalive.com/index.php?len=cas&';
			url += 'Cifrado=SHA1&';
			url += 'URL_NOK=http://www.kulturalive.com/index.php?len=cas&';
			url += 'Firma=59a452ac795aa6e60ad02e7189e676c5a5ca9bfb&';
			url += 'Idioma=1&';
			url += 'Pago_soportado=SSL';
			
			var ref = window.open(encodeURI(url), '_blank', 'location=yes,closebuttoncaption=Cerrar');

            //var ref = window.open(encodeURI('http://www.google.com'), '_blank', 'location=yes');
			
         	ref.addEventListener('loadstart', function(event) { 
         		console.log(event.url); 
     		});
			
		});
    };

    this.render = function() {
        this.el.html(template);
        return this;
    };

    this.initialize();

};