ar userFormView = function(template, userData) {

    this.initialize = function() {
        this.el = $('<div/>');
        
        this.el.on('click', '.back-button', function() {
			history.go(-1);
		});
    };

    this.render = function() {
        this.el.html(template(userData));
        return this;
    };

    this.initialize();

};