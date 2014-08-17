function pruebaPHP(){
	$.ajax({
        type: 'POST',
        //url: 'http://kepacantero.esy.es/kulturaliveapi/v1/comprarentrada',
        url: 'http://kometa.esy.es/api/v1/comprarentrada',
        dataType: "json",
        data: {"nombre" : "kepa", "dni" : "20223532T", "apellidos" : "cantero", "email" : "kcantero@gmail.com", "idGrupo" : "2195", "nentradas" : "2", "grupos" : "eskorbuto"},
        success: function(data){
            alert(JSON.stringify(data));
        }
    });
    
    /*$.post('http://kepacantero.esy.es/kulturaliveapi/v1/comprarentrada', {nombre : "kepa", dni : "20223532T", apellidos : "cantero", email : "kcantero@gmail.com", idGrupo : "2195", nentradas : "2", grupos : "eskorbuto"},{
        success: function(data){
            alert(data);
        }
    },"json");*/
    
    
}