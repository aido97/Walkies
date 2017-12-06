/* global google */
/* global address */
/* global testDistances */
			var geocoder;
			var map;
			var lat, lng;
			var coordinates;
			var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
			
			$.ajaxSetup({
        	async: false
        	});
        

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
    		var distances = [];
			var bestOrder = [];
			var checkboxArray = [];
			
			var userLat, userLng;
			
		    
			
    		
    		function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        		var waypts = [];
        		for (var i = 0; i < address.length; i++){
        			
        			checkboxArray[i] = address[i].address[0] + ", " + address[i].address[2];
        			//checkboxArray[i] = address[i].address[0] + ", " +  address[i].address[1] + ", " + address[i].address[2];
        			
        		}
				console.log(checkboxArray);
        		for (var i = 0; i < address.length; i++) {
            		var index = bestOrder[i];
            			waypts.push({
                		location: checkboxArray[i],
                		stopover: true
            			});
          
        		
        		var start =  new google.maps.LatLng(testDistances[0], testDistances[1]);
        		var end = new google.maps.LatLng(dynamicMarker[dynamicMarker.length - 1].getPosition().lat(), dynamicMarker[dynamicMarker.length - 1].getPosition().lng());
        		
        		var request = {
            		origin: start,
            		destination: end,
            		waypoints: waypts,
            		optimizeWaypoints: true,
            		travelMode: google.maps.DirectionsTravelMode.WALKING
        		};
        		directionsService.route(request, function(response, status) {
            		if (status == google.maps.DirectionsStatus.OK) {
                		directionsDisplay.setDirections(response);
                		var route = response.routes[0];

            		}
        		});
			}
		}
    		var dynamicMarker = [];
        
            function init() {
           
			
				function showResult(result) {
	        		lat = result.geometry.location.lat();
	        		lng = result.geometry.location.lng();
	        		console.log(lat);
	        		console.log(lng);
	        		
	        		var long_Origin;
	        		var lat_Origin;
        			var long_Dest;
        			var lat_Dest;
        			var queryString;
        
        			for(var i=0; i < address.length;i++){
          
        				
        				queryString = "http://cors-proxy.htmldriven.com/?url=https://maps.googleapis.com/maps/api/distancematrix/json?origins=53.343706,-6.255499&destinations="+lat+","+lng+"&mode=walking&language=en-FR&key=AIzaSyDAriR3Q9YW866bSWTMkqXNlxOzPGsBiHU";
          
        				//invoke the test and store the result.....
    				}
    				
    			
    				
    				$.getJSON(queryString, function(json){
    					for (var i = 0; i < json.rows.length; i++){
            			console.log(json.rows[i].elements[i].distance.text);
						distances[i] =json.rows[i].elements[i].distance.text;
						
						for (var i = 0; i < address.length; i++){
            				distances[i] = [];
            				for (var j = 0; j < address.length; j++){
            				distances[i][j] = json.rows[i].elements[j].distance.text;
            				if(distances[i][j] == "1 m"){
            					 distances[i][j] = 0;
                				}
            					else{
                					distances[i][j] = parseInt(distances[i][j].substring(0, (distances[i][j].length - 3)) * 1000);
            					}
                
            					}
            					}
						bestOrder = getShortestRoute(distances[i]);
                     }
    				});
    				
    				
	        		
	        		var myLatlng = new google.maps.LatLng(testDistances[0], testDistances[1]);
	        		
	        		var marker = new google.maps.Marker({
					    position: myLatlng,
					    title:"You are here !!!!!!!",
					    animation: google.maps.Animation.DROP,
					    icon: centerIcon
					});
					
					// To add the marker to the map, call setMap();
					marker.setMap(map);
					
                
                for (var i=0; i<address.length; i++) {
                	
                	dynamicMarker.push(new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),  // Third Marker
                    map: map,
					title: address,
					draggable: false,
					animation: google.maps.Animation.BOUNCE,
					icon: markerIcon
                })); 
                }
                
                directionsDisplay.setMap(map);
    			calculateAndDisplayRoute(directionsService, directionsDisplay);
                
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
                                //console.log(line1);
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
	
	  


