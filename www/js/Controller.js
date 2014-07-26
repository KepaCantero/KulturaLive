var Controller = function() {
	var ajax = new Ajax();
	var DB = new WebSqlAdapter();
	var slider = new PageSlider($('body'));
	var body = $('#home2');

	//TEMPLATES
	var homeApp = Handlebars.compile($("#initialPage-tpl").html());
	var concertDetailTpl = Handlebars.compile($("#employee-tpl").html());
	var homeTpl = Handlebars.compile($("#home-tpl").html());
	var concertsListLiTpl = Handlebars.compile($("#employee-li-tpl").html());
	//    var userFormTpl = Handlebars.compile($("#userForm-tpl").html());
	var dummyTpl = Handlebars.compile($("#dummy-tpl").html());
	var ticketDetailTpl = Handlebars.compile($("#ticketDetails-tpl").html());
    var listadoSalasTpl = Handlebars.compile($("#listadosalas-tpl").html());
    var dummySala =  Handlebars.compile($("#dummySala-tpl").html());
    var dummyAnuncioTpl=  Handlebars.compile($("#dummyAnuncio-tpl").html()); 
  
    this.from=0;
    this.count=10;
	this.initialize = function() {
		console.log("Estoy en Controller initialize");
		return DB.initialize();
	};

	this.LoadTicketDetails = function(concertdetails) {
		DB.LoadUser().done(function(userData) {
			console.log(userData.name);
			slider.slidePage(new ticketDetailsView(ticketDetailTpl, userData, concertdetails).render().el);
			return;
		});
	};

	this.LoadMainMenu = function() {
		slider.slidePage(new MainMenuView(homeApp).render().el);
	};

	this.LoadUserForm = function() {
	};

	this.LoadConcert = function(concertID) {
		console.log("Controller.LoadConcert");
		DB.findById(Number(concertID)).done(function(concert) {
			console.log("Controller/findbyid:done");
			slider.slidePage(new ConcertDetailsView(concertDetailTpl, concert).render().el);
			return;
		});
	};

	this.LoadAllConcerts = function() {
		//var dbState =  DB.isEmpty();
		//prepare the template
		slider.slidePage(new ListConcertsView(DB, homeTpl, concertsListLiTpl).render().el);

		//Con esta l�nea se carga el datepicker del men� lateral de b�squeda
		$('#inputFecha').datepick();
		
		//load the data
		//mostrar pantalla de carga
		//this.InsertFromAjax();
		this.from=0;
        this.count=10;
        
        this.InsertFromDB(this.from,this.count);
		LoadAds();
	};

	this.LoadDummy = function() {
		slider.slidePage(new DummyView(dummyTpl).render().el);
	};
    this.LoadDummySala = function() {
		slider.slidePage(new DummyView(dummySala).render().el);
	};
    this.LoadAllSalas = function() {
		slider.slidePage(new DummyView(listadoSalasTpl).render().el);
	};
    this.LoadDetalleAnuncio = function() {
		slider.slidePage(new DummyView(dummyAnuncioTpl).render().el);
	};
    
	this.InsertFromAjax = function() {
		ajax.getMovies().done(function(data) {
			console.log("llamada a insertFromAjax");
			$('.employee-list').append(concertsListLiTpl(data));
			DB.populateTable(data);
			console.log("Tabla poblada");
			//ocultar pantalla de carga
		});
	};

	this.InsertFromDB = function(from,count) {
		    
        DB.findByName($('#inputPelicula').val(), $('#inputId').val(), $('#inputFecha').val(),from,count).done(function(data) {
		
            //$('.employee-list').append(concertsListLiTpl(data));
            $('.employee-list').html(concertsListLiTpl(data));
           
		});
	};

	var LoadAds = function() {
		$('#fotorama').fotorama({
			autoplay : "4000",
			width : "100%",
			height : "20%",
			minheight : 64,
			nav : "false"
		});
	};

};

