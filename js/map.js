/* global google */
			var geocoder;
			var map;
			var lat, lng;
			var coordinates;
			// Create a custom marker
		var markerIcon = {
				url: "../img/dogmarker.png", // url
			scaledSize: new google.maps.Size(50, 50) // scaled size
			};
			
		var centerIcon = {
				url: "../img/you-are-here-icon.png", // url
			scaledSize: new google.maps.Size(70, 70) // scaled size,
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
    		
    		
        
            function init() {
            	
				function showResult(result) {
	        		lat = result.geometry.location.lat();
	        		lng = result.geometry.location.lng();
	        		console.log(lat);
	        		console.log(lng);
	        		
	        		var myLatlng = new google.maps.LatLng(53.343706, -6.255499);
	        		
	        		var marker = new google.maps.Marker({
					    position: myLatlng,
					    title:"You are here !!!!!!!",
					    animation: google.maps.Animation.DROP,
					    icon: centerIcon
					});
					
					// To add the marker to the map, call setMap();
					marker.setMap(map);
                
                for (var i=0; i<address.length - 5; i++) {
                	var dynamicMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),  // Third Marker
                    map: map,
					title: " "/*global address*/,
					draggable: true,
					animation: google.maps.Animation.BOUNCE,
					icon: markerIcon
                });
                }
                
    		}
    		
    		     
                // Basic options for a simple Google Map
                var mapOptions = {
				
                    // How zoomed in you want the map to start at 
                    zoom: 14,

                    // The latitude and longitude to center the map 
                    center: new google.maps.LatLng(53.343706, -6.255499), // IFSC
      
                };

                
                            
                for (var i = 0; i < address.length; i++){
                                line1 = address[i].address;
                                console.log(line1);
                                getLatitudeLongitude(showResult, JSON.stringify(address[i].address));
                                
                                var contentString = '<div id="content">'+             // Content in InfoWindow
					'<div id="siteNotice">'+
					'</div>'+
					'<h1 id="firstHeading" class="firstHeading">Nic</h1>'+
					'<img  id="nic" src="nicolas-cage.png"  height="100" width="100"> '+					
					'<div id="bodyContent">'+
					'<p><b>Rating</b>   2 ' +
					'<p><b>Located</b>    ' +
					'<p><b>Going Rate p/h</b>    ' +
					'<p><b><a href="https://www.walkies.com/html/">Read My Reviews</a></b> ' +
					'</div>'+
					'</div>';

			var infowindow = new google.maps.InfoWindow({      // Create Info Window
			  content: contentString,
			  maxWidth: 200
			});
                            }
                
				
			   
                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');
                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
				

				
			 var contentString = '<div id="content">'+             // Content in InfoWindow
					'<div id="siteNotice">'+
					'</div>'+
					'<h1 id="firstHeading" class="firstHeading">Nic</h1>'+
					'<img  id="nic" src="nicolas-cage.png" height="100" width="100"> '+					
					'<div id="bodyContent">'+
					'<p><b>Rating</b>   2 ' +
					'<p><b>Located</b>    ' +
					'<p><b>Going Rate p/h</b>    ' +
					'<p><b><a href="https://www.walkies.com/html/">Read My Reviews</a></b> ' +
					'</div>'+
					'</div>';

			var infowindow = new google.maps.InfoWindow({      // Create Info Window
			  content: contentString,
			  maxWidth: 200
			});

				

             

				
        
}	  
	
	  


