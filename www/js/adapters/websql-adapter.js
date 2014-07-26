var WebSqlAdapter = function () {
    
    /*emptyTable: "undefined";
    this.isEmpty = function(){
        console.log ("estoy en isEmpty");
        return WebSqlAdapter.emptyTable;
    };*/
   
    
    this.initialize = function () {
        var deferred = $.Deferred();
        this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        this.db.transaction(
            function (tx) {
                createConcertsTable(tx);
                CreateUserTable(tx);
                SaveUser();
                //WebSqlAdapter.emptyTable="vacia";
                addSampleData(tx);
            },
            function (error) {
                console.log('Transaction error: ' + error);
                deferred.reject('Transaction error: ' + error);
            },
            function () {
                console.log('Transaction success');
                deferred.resolve();
            }
        );
            
        return deferred.promise();
   
    };
    
    /* USER DATA FUNCTION */
    var SaveUser = function (user) {
      	this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        this.db.transaction(
            function (tx) {
                console.log("DB.populateTable ha sido llamada");
				var sql = "INSERT OR REPLACE INTO user " +
		            "(name, email) " +
		            "VALUES ( ?, ?) ";
		     
                tx.executeSql(sql, ["kepa Cantero", "kepacantero@gmail.com"],
                      function () {
                          console.log('INSERT success');
                      },
                      function (tx, error) {
                          alert('INSERT error: ' + error.message);
                      });
		                  
            },
            function (error) {
                console.log('transaction error: ' + error);
                return;
            },
            function () {
                console.log('transaction success');
                return;
            }
    );
     };

    
    var CreateUserTable = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS user');
        var sql = "CREATE TABLE IF NOT EXISTS user ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name VARCHAR(50), " +
            "email VARCHAR(50) ) " ;
            tx.executeSql(sql, null,
            function () {
                console.log('Create table success');
            },
            function (tx, error) {
                alert('Create table error: ' + error.message);
            });
    };
    
    this.LoadUser = function (searchKey) {
        var deferred = $.Deferred();
        this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        console.log("loadUser 1");
        this.db.transaction(
            function (tx) {
                var sql = "SELECT user.name,user.email " +
                    "FROM user " ;
                tx.executeSql(sql, null, function (tx, results)
                {
                                
                    deferred.resolve(results.rows.item(0));
                    console.log("loadUser 2");
        
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
                alert("Error en la transacciï¿½n dentro de LoadUser de websql-adapter.js");
            }
        );
            
        return deferred.promise();
        
    };

    
    
    
    
    /*CONCERTS DATA FUNCTIONS*/
    
    var createConcertsTable = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS concerts');
        var sql = "CREATE TABLE IF NOT EXISTS concerts ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "bandName VARCHAR(50), " +
            "sala VARCHAR(50), " +
            "date VARCHAR(20), " +
            "precio VARCHAR(20), " +
            "pic VARCHAR(50) )";
        tx.executeSql(sql, null,
            function () {
                console.log('Create table success');
            },
            function (tx, error) {
                alert('Create table error: ' + error.message);
            });
    };

    this.findById = function (id) {
        var deferred = $.Deferred();
        console.log("WebsqlAdapater:findbyID:" + id);
        this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        this.db.transaction(
            function (tx) {
                var sql = "SELECT c.id, c.bandName, c.sala, c.date, c.precio, c.pic " +
                    "FROM concerts c " +
                    "WHERE c.id=:id";
                tx.executeSql(sql, [id], function (tx, results) {
                    deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function (error) {
                console.log ("Transaction Error: " + error.message);
                deferred.reject("Transaction Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    
    //ESTE ES EL ANTIGUO FINDBYNAME
    /*this.findByName = function (searchKey) {
        var deferred = $.Deferred();
        console.log("findByName 0");
        this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        console.log("findByName 1");
        this.db.transaction(
            function (tx) {
                var sql = "SELECT concerts.id, concerts.bandName, concerts.date, concerts.pic " +
                    "FROM concerts " +
                    "WHERE concerts.bandName || ' ' || concerts.bandName LIKE ? " +
                    "ORDER BY concerts.bandName";
                tx.executeSql(sql, ['%' + searchKey + '%'], function (tx, results)
                {
                    var len = results.rows.length;
                    console.log("findByName 2");
                    var concerts = [];
                    for (i = 0; i < len; i = i + 1) {
                        concerts[i] = results.rows.item(i);
                    }
                    deferred.resolve(concerts);
                
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
                alert("Error en la transacciï¿½n dentro del findByName de websql-adapter.js");
            }
        );
        return deferred.promise();
    };*/
   
   //A ESTE FINDBYNAME SE LE PASA UNA CATEGORï¿½A 
   /*this.findByName = function (searchKey, category) {
        var deferred = $.Deferred();
        console.log("findByName 0");
        this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        console.log("findByName 1");
        this.db.transaction(
            function (tx) {
                var sql = "SELECT concerts.id, concerts.bandName, concerts.date, concerts.pic " +
                    "FROM concerts " +
                    "WHERE AND " + category + " || ' ' || " + category + " LIKE ? " +
                    "AND concerts.id = '2'" +
                    "ORDER BY concerts.bandName";
                tx.executeSql(sql, ['%' + searchKey + '%'], function (tx, results)
                {
                    var len = results.rows.length;
                    console.log("findByName 2");
                    var concerts = [];
                    for (i = 0; i < len; i = i + 1) {
                        concerts[i] = results.rows.item(i);
                    }
                    deferred.resolve(concerts);                
                });
            },
            function (error) {
                deferred.reject("findByName Error: " + error.message);
                console.log("Error de findByName");
                //alert("Error en la transacciï¿½n dentro del findByName de websql-adapter.js");
            }
        );
        return deferred.promise();
	};*/

	
    
    this.findByName = function (pelicula, sala, fecha,from,count) {
        var deferred = $.Deferred();
        var category = "concerts.bandName";
        this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        console.log("from "+ from );
        console.log("from "+ count  );
        this.db.transaction(
            function (tx) {
                var sql = "SELECT concerts.id, concerts.bandName, concerts.sala, concerts.date, concerts.precio, concerts.pic " +
                    "FROM concerts " +
                    "WHERE concerts.bandName LIKE ? " +
                    "AND concerts.sala LIKE ? " +
                    "AND concerts.date LIKE ? " +
                    "ORDER BY concerts.date, concerts.bandName " + 
                    "LIMIT " + from + "," + count            
                ;
                console.log(sql);
                tx.executeSql(sql, ['%' + pelicula + '%', '%' + sala + '%', '%' + fecha + '%'], function (tx, results)
                {
                    var len = results.rows.length;
                    var concerts = [];
                    var fecha = "";
                    for (i = 0; i < len; i++) {
                        concerts[i] = results.rows.item(i);
                        //Esto permite poner headers con la fecha a la lista de conciertos.
                        //Para ello añade al array una variable "nuevaFecha" solo cuando la fecha sea distinta a la anterior. 
                        if (results.rows.item(i).date != fecha) {
                        	fecha = results.rows.item(i).date;
                        	concerts[i].nuevaFecha = "nueva";
                    	}
                    }           
                                          
                    deferred.resolve(concerts);                
                });
            },
            function (error) {
                deferred.reject("findByName Error: " + error.message);
                console.log("Error de findByName");
            }
        );
        console.log("findByName correcto");
        return deferred.promise();
	};

    /*this.populateTable = function (concerts) {
      	this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        this.db.transaction(
            function (tx) {
                console.log("DB.populateTable ha sido llamada");
				var l = concerts.length;
		        var sql = "INSERT OR REPLACE INTO concerts " +
		            "(id, bandName, date, pic) " +
		            "VALUES (?, ?, ?, ?)";
		        var c;
		        for (var i = 0; i < l; i++) {
		            c = concerts[i];
		            tx.executeSql(sql, [c.id, c.bandName, c.date, c.pic],
		                function () {
		                    console.log('INSERT success');
		                },
		                function (tx, error) {
		                    alert('INSERT error: ' + error.message);
		                });
		        }            
            },
            function (error) {
                console.log('populateTable error: ' + error);
            },
            function () {
                console.log('populateTable success');
                return;
            }
        );
     };*/

    var addSampleData = function (tx, concerts) {

		var concerts = [
            {"id": 1, "bandName": "Metal Bulls", "sala" : "Le Bukowski", "date": "2014/08/18", "precio": "10 euros", "pic": "concierto_01.jpg"},
            {"id": 2, "bandName": "Guardian Legends", "sala" : "Atabal", "date": "2014/08/18", "precio": "9 euros", "pic": "concierto_02.jpg"},
            {"id": 3, "bandName": "Contra Warriors", "sala" : "Atabal", "date": "2014/08/19", "precio": "5 euros", "pic": "concierto_03.jpg"},
            {"id": 4, "bandName": "Sound Lords", "sala" : "Le Bukowski", "date": "2014/08/19", "precio": "8 euros", "pic": "concierto_04.jpg"},
            {"id": 5, "bandName": "DJ Chamaleon", "sala" : "Jimmy Jazz", "date": "2014/08/18", "precio": "10 euros", "pic": "concierto_05.jpg"},
            {"id": 6, "bandName": "Flying Noises", "sala" : "Rock Star", "date": "2014/08/18", "precio": "9 euros", "pic": "concierto_06.jpg"},
            {"id": 7, "bandName": "Laser Meat Boys", "sala" : "Jimmy Jazz", "date": "2014/08/19", "precio": "8 euros", "pic": "concierto_07.jpg"},
            {"id": 8, "bandName": "Krazy Gurls", "sala" : "Rock Star", "date": "2014/08/19", "precio": "7,5 euros", "pic": ""},
            {"id": 9, "bandName": "Power to da People", "sala" : "Le Bukowski", "date": "2014/08/20", "precio": "9 euros", "pic": "concierto_09.jpg"},
            {"id": 10, "bandName": "C. G. Fatty", "sala" : "Rock Star", "date": "2014/08/20", "precio": "10 euros", "pic": "concierto_10.jpg"},
        ];
        
        var l = concerts.length;
        var sql = "INSERT OR REPLACE INTO concerts " +
            "(id, bandName, sala, date, precio, pic) " +
            "VALUES (?, ?, ?, ?, ?, ?)";
        var c;
        for (var i = 0; i < l; i++) {
            c = concerts[i];
            tx.executeSql(sql, [c.id, c.bandName, c.sala, c.date, c.precio, c.pic],
                function () {
                    console.log('INSERT success');
                },
                function (tx, error) {
                    alert('INSERT error: ' + error.message);
                });
        }
    };

};