
			var geocoder;
			var map;
		
			var coordinates;
			// Create a custom marker
		var markerIcon = {
				url: "../img/dogmarker.png", // url
			scaledSize: new google.maps.Size(50, 50) // scaled size
			};
            // When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);
            
             function getLatitudeLongitude(callback, address) {
        		geocoder = new google.maps.Geocoder();
        		if (geocoder) {
            		geocoder.geocode({
                		'address': address
            		}, function (results, status) {
                		if (status == google.maps.GeocoderStatus.OK) {
                    		callback(results[0]);
            		 }
            		});
        		}
    		}
    
    		function showResult(result) {
    			alert(coordinates);
        		var lat = result.geometry.location.lat();
        		var lng = result.geometry.location.lng();
        		console.log("lattitude: " + lat);
        		console.log("longitude: " + lng);
    		}
        
            function init() {
			
                // Basic options for a simple Google Map
                var mapOptions = {
				
                    // How zoomed in you want the map to start at 
                    

                    // The latitude and longitude to center the map 
                    center: new google.maps.LatLng(53.349363, -6.244872), // IFSC
                    zoom: 12
                    


                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
               /* var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);*/
                

                    //  style the map. 																																																																																																																																																																																																																							                                 		// Main color															
                      // styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#1ee7e4"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#595fdc"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#fbf6f6"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#084a69"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
                


                var marker1 = new google.maps.Marker({
                    position: new google.maps.LatLng(53.349552, -6.248309),  // First marker 
                    map: map,
					title: "start",
					draggable: true,
					animation: google.maps.Animation.BOUNCE,
					icon: markerIcon
                });
				
				 var marker2 = new google.maps.Marker({
                    position: new google.maps.LatLng(53.346626, -6.275063),  // Second Marker
                    map: map,
					title: "end",
					draggable: true,
					animation: google.maps.Animation.BOUNCE,
					icon: markerIcon
                });
				
			    var marker3 = new google.maps.Marker({
                    position: new google.maps.LatLng(53.347803, -6.243706),  // Third Marker
                    map: map,
					title: "third",
					draggable: true,
					animation: google.maps.Animation.BOUNCE,
					icon: markerIcon
                });

                
				

				
			 var contentString = '<div id="content">'+             // Content in InfoWindow
					'<div id="siteNotice">'+
					'</div>'+
					'<h1 id="firstHeading" class="firstHeading">Nic Cage</h1>'+
					'<img  id="nic" src="nicolas-cage.png" alt="Smiley face" height="100" width="100"> '+					
					'<div id="bodyContent">'+
					'<p><b>Rating</b>   5 star ' +
					'<p><b>Located</b>   IFSC ' +
					'<p><b>Going Rate p/h</b>   €10 ' +
					'<p><b><a href="https://www.walkies.com/html/">Read My Reviews</a></b> ' +
					'</div>'+
					'</div>';

			var infowindow = new google.maps.InfoWindow({      // Create Info Window
			  content: contentString,
			  maxWidth: 200
			});


				marker1.addListener('click', function() {
				  infowindow.open(map, marker1);
				});
				
        
}	  
	
	  


