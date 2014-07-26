var ConcertDetailsView = function(template, employee,concerDetails) {

    this.initialize = function() {
        this.el = $('<div/>');
          
      	this.el.on('click', '.back-button', function() {
			history.go(-1);
		});
    };

    this.render = function() {
        this.el.html(template(employee));
        return this;
    };

    this.initialize();

};