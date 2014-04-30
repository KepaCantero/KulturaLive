
var Controller = function ()
{
    var ajax = new Ajax();
    var DB = new WebSqlAdapter();    
    var slider = new PageSlider($('body'));
    //templates
    	
    
    this.initialize = function () {
        return DB.initialize();
       
    };    
    
    this.LoadMainMenu = function ()
    {
        var homeApp = $( "initialPage" );
        slider.slidePage(homeApp);
    };
    
    this.LoadConcert= function (concertID){
        
        var concertDetailTpl = Handlebars.compile($("#employee-tpl").html());
        DB.findById(Number(concertID)).done(function(concert) {
            console.log("Controller/findbyid:done");
            slider.slidePage(new ConcertDetailsView(concertDetailTpl, concert).render().el);  
            return;
	       });
       
    
    };
    
    this.LoadAllConcerts = function () {                                              
        
        var dbState =  DB.isEmpty();
        var concerts;
        var homeTpl = Handlebars.compile($("#home-tpl").html());
        var concertsListLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        //prepare the template
        slider.slidePage(new ListConcertsView(homeTpl, concertsListLiTpl).render().el);
        //load the data
        if (dbState=="vacia" )
           InsertFromAjax();
        else
           LoadListFromDB();
    
        return;
    }; 
    var LoadListFromDB = function(data)
    {
        var concertsListLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        console.log("estoy en LoadDataFromDB ");
        DB.findByName($('.search-key').val())
        .done(function(concerts) {
	               
            $('.employee-list').html(concertsListLiTpl(concerts));
            
        });
       
    };
    
    var InsertFromAjax = function()
    {
        var concerts;
        ajax.getMovies().done(function(data)
        {
            console.log ("llamada a insertArray");
            DB.insertArray(data).done(function(data)
            {
                console.log ("llamada a LoadDataFromDB");
                LoadListFromDB(data);
       
            });    
        });    
        return concerts;
    };
    
   
   
};

