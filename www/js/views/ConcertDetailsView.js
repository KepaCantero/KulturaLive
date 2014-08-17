var ConcertDetailsView = function(template, concert) {

    this.initialize = function() {
        this.el = $('<div/>');
          
      	this.el.on('click', '.back-button', function() {
			history.go(-1);
		});
		
		this.el.on('click', '.back-button', function() {
			history.go(-1);
		});
		
		this.el.on('click', '#butComprarEntrada', function() {
			
		});
    };

    this.render = function() {
        this.el.html(template(concert));
        return this;
    };

    this.initialize();

};