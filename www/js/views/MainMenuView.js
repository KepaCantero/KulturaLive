var MainMenuView = function ( template) {

    this.initialize = function () {
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(template);
        return this;
    };

    this.initialize();

};