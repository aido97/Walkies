			<script src="js/tsp.js"></script>
    		<script src="js/algorithm.js"></script>
    		    		<script src="js/geoLocate.js"></script>

    		<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false&v=3&libraries=geometry"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
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
    require_once('data_config.php');
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
        $user_id = $_SESSION['user_id'];
        
    } else {
        // get the login url   
        $authUrl = $client->createAuthUrl();
    }
?>
                      
<?php

$address = ("SELECT addr1, addr2, zip FROM walkies_web.walk_now where walker_id = '$user_id';");
$addResult = mysqli_query($conn, $address);


$persons = ("SELECT user_id, first_name, phone_number, addr1, profile_image_url, price, pickup, dropoff FROM walkies_web.walk_now WHERE search_status = 'Y';");
$result = mysqli_query($conn, $persons);

$user_id = $_SESSION['user_id'];


?>










<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edg">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Walkies - Today's Route</title>
    
   
    

  
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
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-ZP4p890L8n7KAYavEwylBzyQIBVDLzw&callback=initToday's Route">
    </script>
    <!-- Plugin CSS -->
    <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">

    <!-- Theme CSS -->
    <link href="css/creative.min.css" rel="stylesheet">
	<link rel="icon" href="../img/dogmarker.png" type="image/x-icon" />

	  <!-- Custom CSS -->
  <link href="css/style.css" rel="stylesheet">
      
      <!-- Today's Route Shit Below-->
      
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>



<script type="text/javascript" src="map.js">
    //var addResult = JSON.parse( '<?php echo json_encode($addResult) ?>' );
    //alert( addResult[0][1])
</script>
      
      <!-- Today's Route Shit Above-->

	

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




 </style>

           <?php
           ini_set('error_reporting', E_STRICT);
           
                
                        $data = array();
                         foreach($addResult as $add){
                             
                             $addData = array($addr->adr1 = $add[addr1], $addr->adr2 = $add[addr2], $addr->adr3 = $add[zip]);
                            
                            //$addr->adr1 = $add[addr1];
                            //$addr->adr2 = $add[addr2];
                            //$addr->adr3 = $add[zip];
                            $data[] = (array('address' => $addData));
                            
                         }
                         $myJSON =  json_encode($data);
                       ($myJSON);
                        ?>
                        
                        <script>var address = JSON.parse('<?php echo $myJSON; ?>');
                            
                            
                            </script>
               

</head>
<script src="js/tsp.js"></script>
    <script src="js/algorithm.js"></script>

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
                                echo "<a class='login' href='login.php'>Login/Register</a>";
                            } else {
                                print "<a class='page-scroll' href='index.php'>Welcome: {$firstname}</a>";
                                
                            }
                            ?>
                </li>
                <li>
                        <a class="page-scroll" href="completedwalks.php">Walk History</a>
                    </li>
                   <li>
                        <a class="page-scroll" href="map.php">Find Jobs</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="About.php">About</a>
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
       
  



<script>
var x = document.getElementById("locationErrorSpace");

getLocation();
showPosition();
var userDistances = getLocationArray();
</script>
       
       <!--  Insert map here      Insert map here      Insert map here      Insert map here -->
       
       <div class="container-fluid" style="text-align: center" id="main">
     <div class="row" style="text-align: center" id="nav">
        <div class="col-md-2" ></div>
        <div class="col-md-10"></div>
      </div>
	  
	  
	 <div class="row" style="text-align: center" id="mainrow">


		 <p id="locationErrorSpace"></p>

        <div class="col-md-12" id="map" style="height:100%;"></div>    <!-- The Today's Route Div -->
        
      </div><!-- End Of Main Row -->

   
       

 
    <!--   //  Insert map here      Insert map here      Insert map here      Insert map here -->
       
   </section>
   
	
	<!-- Footer -->
    <footer class="footer">
    <div class="container">
      <span class="text-muted">Team Melon 2017</span>
    </div>
    </footer>
  
    <!-- jQuery -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script>
        
    

    </script>

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