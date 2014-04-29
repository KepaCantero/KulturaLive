
var Controller = function ()
{
    var ajax = new Ajax();
    var DB = new WebSqlAdapter();    
    var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html()); 
    var employeeTpl = Handlebars.compile($("#employee-tpl").html());
    
    this.initialize = function () {
        return DB.initialize();
       
    };    
    
    this.LoadConcert= function (concertID){
        
        DB.findById(Number(concertID)).done(function(concert) {
	            return concert;
	       });
       
    };
    
    this.LoadAllConcerts = function () {                                              
        
        var dbState =  DB.isEmpty();
        var concerts;
        if (dbState=="vacia" )
           InsertFromAjax();
        else
           LoadDataFromDB();
    
        return;
    }; 
    var LoadDataFromDB = function(data)
    {
       console.log("estoy en LoadDataFromDB ");
        DB.findByName($('.search-key').val())
        .done(function(concerts) {
	        $('.employee-list').html(employeeLiTpl(concerts));
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
                concerts= LoadDataFromDB(data);
       
            });    
        });    
        return concerts;
    };
    
   
   
};

