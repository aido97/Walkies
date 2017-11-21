<?php

    /* DEGBUG PURPOSES ONLY REMOVE BEFORE DEPLOY!!! */
    ini_set('display_errors', 1);

    /*
    * DEFINITIONS
    *
    * load the autoload file
    * define the constants client id,secret and redirect url
    * start the session
    */
    require_once __DIR__.'/gplus-lib/vendor/autoload.php';
    const CLIENT_ID = '816147898187-gkupsk1p28hk8346tkglf3d5qqohkp0o.apps.googleusercontent.com';
    const CLIENT_SECRET = 'adMd4PX4D6NMMLeZlGTmK-x-';
    const REDIRECT_URI = 'http://walkies-shaner125.c9users.io/';
    session_start();
    /* 
    * INITIALIZATION
    *
    * Create a google client object
    * set the id,secret and redirect uri
    * set the scope variables if required
    * create google plus object
    */
    $client = new Google_Client();
    $client->setClientId(CLIENT_ID);
    $client->setClientSecret(CLIENT_SECRET);
    $client->setRedirectUri(REDIRECT_URI);
    $client->setScopes('email');
    $plus = new Google_Service_Plus($client);
    /*
    * PROCESS 
    *
    * A. Pre-check for logout
    * B. Authentication and Access token
    * C. Retrive Data
    */
    /* 
    * A. PRE-CHECK FOR LOGOUT
    * 
    * Unset the session variable in order to logout if already logged in    
    */
    if (isset($_REQUEST['logout'])) {
        session_unset();
    }
    /* 
    * B. AUTHORIZATION AND ACCESS TOKEN
    *
    * If the request is a return url from the google server then
    *  1. authenticate code
    *  2. get the access token and store in session
    *  3. redirect to same url to eleminate the url varaibles sent by google
    */
    if (isset($_GET['code'])) {
        $client->authenticate($_GET['code']);
        $_SESSION['access_token'] = $client->getAccessToken();
        $redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
        header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
    }
    /* 
    * C. RETRIVE DATA
    * 
    * If access token if available in session 
    * load it to the client object and access the required profile data
    */
    if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
        $client->setAccessToken($_SESSION['access_token']);
        $me = $plus->people->get('me');
        // Get User data
        $id = $me['id'];
        $name =  $me['displayName'];
        $email =  $me['emails'][0]['value'];
        $profile_image_url = $me['image']['url'];
        $cover_image_url = $me['cover']['coverPhoto']['url'];
        $profile_url = $me['url'];
    } else {
        // get the login url   
        $authUrl = $client->createAuthUrl();
    }
?>
                        <!-- Connect To Database  -->
<?php
        $dbhost = 'localhost:3036';
        $dbuser = 'root';
        $dbpass = '';
   
        $conn = mysql_connect($dbhost, $dbuser, $dbpass);
   
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
echo "Connected successfully";

$walkerName = mysql_query('SELECT first_name FROM walkies_web.users WHERE first_name = "Shane"');
$walkerAge = mysql_query("SELECT age FROM walkies_web.users");
$location = mysql_query("SELECT location FROM walkies_web.users");
$test_variable = "Billy The Kid";
?>



<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Walkies - Map</title>
  
    <!-- Bootstrap Core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>
      <script type="text/javascript" src="js/map.js"></script>
    <!-- Custom Fonts -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-ZP4p890L8n7KAYavEwylBzyQIBVDLzw&callback=initMap">
    </script>
    <!-- Plugin CSS -->
    <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">

    <!-- Theme CSS -->
  <link href="css/creative.min.css" rel="stylesheet">
	<link rel="icon" href="../img/dogmarker.png" type="image/x-icon" />

	  <!-- Custom CSS -->
  <link href="css/style.css" rel="stylesheet">
      
      <!-- Map Shit Below-->
      
  <meta name="viewport" content="width=device-width, initial-scale=1">
 <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
  
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
       
        

      
      <!-- Map Shit Above-->

	

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    

<!-- More Styling -->
<style>
* {
    box-sizing: border-box;
}
body {
    margin: 0;	
}
#logo{
	padding: 20px;
	border: none;
}
#content{
	overflow: auto;	
	height:500px;
	background-color: white;
	display: inline;
}
#profile{
	align:center;
	margin:10%;	
	padding-top:5%;	
	border: 1px solid black;
}
#credentials{
	overflow: hidden;
	border: 1px solid white;
}
@media (max-width: 40em) {
#content , #nav{
display: none;
}
}
@media (max-width: 40em) {
#map{
width:100%;
height: 100%;
margin: 0;
padding-top: 150%;
}
}
#mainrow{
	border-top: solid 1px grey;
}
#add-btn{
	margin-top: 50px;
}
#lastElement{
	border-bottom: solid 1px grey;
}
h6{
	display:block;	
	font-weight: bold;
}
map{
	display: inline;
}
</style>


</head>

<body id="page-top">

    <!-- Navbar -->
    <nav id="mainNav" class="navbar navbar-default navbar-fixed-top navbar-notMain">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.php" style = "padding-top: 1px;"><img src="img/logo.png" height = "49px" width = "150px"/></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                <li>
                <!-- If the user is logged in, display welcome message. If not, display login/register button link -->
                <?php
                            if (isset($authUrl)) {
                                echo "<a class='login' href='".$authUrl."'>Login/Register</a>";
                            } else {
                                print "<a class='page-scroll' href='index.php'>Welcome: {$name}</a>";
                                
                            }
                            ?>
                </li>
                    <li>
                        <a class="page-scroll" href="#about">About</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#services">Services</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                    <li>
                        <!-- If the user is logged in, display logout link -->
                         <?php
                            if (!isset($authUrl)) {
                                print "<a class='page-scroll' href='?logout'>Logout</a>";
                                
                            } 
                            ?>
                </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>



   <section>
       
       <!--  Insert map here      Insert map here      Insert map here      Insert map here -->
       
       <div class="container-fluid" style="text-align: center" id="main">
     <div class="row" style="text-align: center" id="nav">
        <div class="col-md-2" ></div>
        <div class="col-md-10">	<button id="add-btn">TEST BUTTON FOR TESTING</button></div>
      </div>
	  
	  
	 <div class="row" style="text-align: center" id="mainrow">
        <div class="col-md-6" id="content" >
			<div class="container-fluid">
			
					  <div class="row" id="lastElement">
							<div class="col-sm-4" ><img src="../img/generic.png" alt="Walkies" style="width:150px;height:150px;" id="profile" ></div>  <!-- Profile Image-->
							<div class="col-sm-4" >  <!--Column TWO -->
							    <hr><h6><em>Name:<em></h6><hr>
								        <h6>Age:</h6><hr>
								        <h6>Location:</h6><hr>
							</div>
							<div class="col-sm-4">   <!-- Column Three -->
							    <hr><h6 name="walkerName"><?php echo $test_variable; ?></h6><hr>	
										<h6 name="walkerAge"><?php echo $walkerName ?></h6><hr>
										<h6 name="walkerLocation">Insert Location</h6><hr>
							</div>
					  </div>		
				</div>		
		</div>
		
        <div class="col-md-6" id="map" style="height:500px;"></div>    <!-- The Map Div -->
      </div>                                                                                                 <!-- End Of Main Row -->
</div>  
       
         <script>
		function addTable(){          <!-- Function to create virtual DOM objects as required -->
			var table = '';

			table +=  '<div class="row" id="credentials">' +
							'<div class="col-sm-4" ><img src="../img/generic.png" alt="Walkies" style="width:150px;height:150px;" id="profile" ></div>' +
							'<div class="col-sm-4" >  ' +
							'<hr><h6><em>Name:</h6><hr>' +
								    '<h6>Age:</h6><hr>' +
								    '<h6>Location:</h6><hr>' +
							'</div>' +
							'<div class="col-sm-4"> ' + 
							'<hr><h6>     #   #   # </h6><hr>' +	
								    '<h6>   #   #   #   </h6><hr>' +
								    '<h6>    #    #    #   </h6><hr>' +
							'</div>' +
					  '</div>';

			$('#lastElement').append(table);
		}
		$('#add-btn').on('click', function(e){
			addTable();
		})
	</script>
 
    <!--   //  Insert map here      Insert map here      Insert map here      Insert map here -->
       
   </section>
   
	
	<!-- Footer -->
    <footer class="footer">
    <div class="container">
      <span class="text-muted">RecApp Team 2017</span>
    </div>
  </footer>
  
    <!-- jQuery -->
    <script src="vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="vendor/scrollreveal/scrollreveal.min.js"></script>
    <script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>

    <!-- Theme JavaScript -->
    <script src="js/creative.min.js"></script>
    
</body>

</html>
