var WebSqlAdapter = function () {

    this.initialize = function () {
        var deferred = $.Deferred();
        this.db = window.openDatabase("ConcertDB", "1.0", "Concert DB", 200000);
        this.db.transaction(
            function (tx) {
                createTable(tx);
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

    this.findByName = function (searchKey) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                var sql = "SELECT concerts.id, concerts.bandName, concerts.date, concerts.pic " +
                    "FROM concerts " +
                    "WHERE concerts.bandName || ' ' || concerts.bandName LIKE ? " +
                    "ORDER BY concerts.bandName";
                tx.executeSql(sql, ['%' + searchKey + '%'], function (tx, results) {
                    var len = results.rows.length;
                    var concerts = [];
                    for (i = 0; i < len; i = i + 1) {
                        concerts[i] = results.rows.item(i);
                    }
                    deferred.resolve(concerts);
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
                alert("Error en la transacción dentro del findByName de websql-adapter.js");
            }
        );
        return deferred.promise();
    };

    this.findById = function (id) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                var sql = "SELECT c.id, c.bandName, c.date, c.pic " +
                    "FROM concerts c " +
                    "WHERE c.id=:id";
                tx.executeSql(sql, [id], function (tx, results) {
                    deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function (error) {
                deferred.reject("Transaction Error: " + error.message);
            }
        );
        return deferred.promise();
    };

    var createTable = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS concerts');
        var sql = "CREATE TABLE IF NOT EXISTS concerts ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "bandName VARCHAR(50), " +
            "date VARCHAR(50), " +
            "pic VARCHAR(50) )";
        tx.executeSql(sql, null,
            function () {
                console.log('Create table success');
            },
            function (tx, error) {
                alert('Create table error: ' + error.message);
            });
    };

    var addSampleData = function (tx, concerts) {

		var concerts = [
            {"id": 1, "bandName": "Metal Bulls", "date": "2014-05-01 22:00:00", "pic": "concierto_01.jpg"},
            {"id": 2, "bandName": "Guardian Legends", "date": "2014-05-25 21:00:00", "pic": "concierto_02.jpg"},
            {"id": 3, "bandName": "Contra Warriors", "date": "2014-05-12 21:30:00", "pic": "concierto_03.jpg"},
            {"id": 4, "bandName": "Sound Lords", "date": "2014-06-01 23:00:00", "pic": ""},
            {"id": 5, "bandName": "DJ Chamaleon", "date": "2014-07-09 22:45:00", "pic": "concierto_05.jpg"},
            {"id": 6, "bandName": "Flying Noises", "date": "2014-05-16 23:30:00", "pic": ""},
            {"id": 7, "bandName": "Laser Meat Boys", "date": "2014-08-07 21:30:00", "pic": "concierto_07.jpg"},
            {"id": 8, "bandName": "Krazy Gurls", "date": "2014-09-22 20:00:00", "pic": ""},
            {"id": 9, "bandName": "Power to da People", "date": "2014-07-26 18:00:00", "pic": "concierto_09.jpg"},
            {"id": 10, "bandName": "C. G. Fatty", "date": "2014-06-12 21:30:00", "pic": "concierto_10.jpg"},
        ];
        
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
    };

};