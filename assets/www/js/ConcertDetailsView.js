var ConcertDetailsView = function(template, employee) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(template(employee));
        return this;
    };

    this.initialize();

};