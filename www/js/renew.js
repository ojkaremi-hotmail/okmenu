	
	var nameApp = "OKMenu";
	var urlSuccess = 'http://okmenu.es/okmenu.php?inicio';//Página que carga una vez obtenido el gcmcode con éxito
  	function checkConnection(){
        if(navigator.connection.type === "none" || navigator.network.connection.type === null || navigator.connection.type === "unknown"){
            $(location).attr('href', 'error_cnx.html?e=2&' + Date.now() );
            return false;
        }
		$.ajax({
			type: "HEAD",
			url: urlSuccess,
			//cache: false,
			timeout: 3000, // sets timeout to 3 seconds
			success: function(result){
				$(location).attr('href', 'index.html?' + Date.now() );
			},
			error: function (result) {
				$(location).attr('href', 'error_cnx.html?e=1&' + Date.now() );
	            return false;
			}
		});
    }

	function onDeviceReady() {
        checkConnection();
 		//document.addEventListener("online", renuevaGCM, false);
        document.addEventListener("resume", renuevaGCM, false);
    }

  	function renuevaGCM(){
 		checkConnection();
    }

  document.addEventListener('deviceready', onDeviceReady, false);