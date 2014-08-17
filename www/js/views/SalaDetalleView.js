var SalaDetalleView = function(template, sala) {

    this.initialize = function() {
        this.el = $('<div/>');
        
        this.el.on('click', '.back-button', function() {
			history.go(-1);
		});
    };

    this.render = function() {
        this.el.html(template(sala));
        return this;
    };

    this.initialize();

};