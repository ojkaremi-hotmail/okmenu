    //<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);
                if (results[1]) {
                    var direccion = results[0].formatted_address;
                    for (var i=0; i<results[0].address_components.length; i++) {
                        for (var b=0;b<results[0].address_components[i].types.length;b++) {
                            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                city= results[0].address_components[i];
                                break;
                            }
                        }
                    }
                    $.ajax({
                            data: { tag:"locationsave", gcmcode: id_gcm, latitude:latitude,longitude:longitude,dt_ultipos:timestamp,city:city.short_name,address:direccion},
                            type: "POST",
                            dataType: "json",
                            url: "http://www.ccoo.es/app/app.php",
                     })
                     .done(function( data, textStatus, jqXHR ) {
                        //alert('OK');
                     })
                     .fail(function( jqXHR, textStatus, errorThrown ) {
                          console.warn( "La solicitud a fallado: " +  textStatus);
                     });
                } else {
                  console.warn("No results found");
                }
            } else {
               console.warn("Geocoder failed due to: " + status);
            }
        });
    }
