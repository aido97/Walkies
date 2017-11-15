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
    $client->setScopes('profile');
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
        $firstname = $me['name']['givenName'];
        $lastname = $me['name']['familyName'];
        $birthday = $me['birthday'];
        $email =  $me['emails'][0]['value'];
        $profile_image_url = $me['image']['url'];
        $cover_image_url = $me['cover']['coverPhoto']['url'];
        $profile_url = $me['url'];
    } else {
        // get the login url   
        $authUrl = $client->createAuthUrl();
    }
?>


<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Walkies</title>

    <!-- Bootstrap Core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	
    <!-- Custom Fonts -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>

    <!-- Plugin CSS -->
    <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">

    <!-- Theme CSS -->
    <link href="css/creative.min.css" rel="stylesheet">
	<link rel="icon" href="favicon.ico" type="image/x-icon" />

	
     <!-- Custom CSS -->
     <link href="css/style.css" rel="stylesheet">

     
	

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <![endif]-->

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
                                echo "<a class='login' href='login.php'>Login/Register</a>";
                            } else {
                                print "<a class='page-scroll'>Welcome: {$firstname}</a>";
                                
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

     <!-- Header -->
    <?php
            if (isset($authUrl)) {
                print "<section>\n";                
                print "<header id = \"front\">\n";
                print "        <div class=\"header-content\">\n";
                print "            <div class=\"header-content-inner\">\n";
                print "                <h1 id=\"homeHeading\">Walkies - Our Walkers Walk The Wildest</h1>\n";
                print "                <hr>\n";
                print "                <a href=\"#services\" class=\"btn btn-primary btn-xl page-scroll\">Find Out More</a>\n";
                print "            </div>\n";
                print "			<br><br>\n";
                print "			<p style = \"color:white; font-size: 5vmin; font-weight: bold;\">50 DAYS WITHOUT A MAULING :)</p>\n";
                print "        </div>\n";
                print "    </header>";    
                print "        </section>";
                

            } else {
                
                print "<section>\n";
                print "<div class=\"container\">\n";
                print "    <div class=\"row\">\n";
                print "    <div class=\"col-xs-0 col-sm-1 col-md-1\">\n";
                print "        </div>\n";
                print "      <div class=\"col-xs-12 col-sm-10 col-md-10\">\n";
                print "            <div class=\"well well-sm\">\n";
                print "                <div class=\"row\">\n";
                print "                    <div class=\"col-sm-12 col-md-6\">\n";
                        print "                <div class=\"row\">\n";
                         print "                    <div class=\"col-xs-12\">\n";
                        echo                            '<img src="'.$profile_image_url.'" alt="Cover">';
                        print "                          <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\">\n";
                        print "                          <span class=\"caret\"></span><span class=\"sr-only\">Account Options</span>\n";
                        print "                         </button>\n";
                        print "                          <ul class=\"dropdown-menu\" role=\"menu\">\n";
                        print "                             <li><a href=\"#\">Upload Profile Picture</a></li>\n";
                        print "                             <li><a href=\"#\">Change Walk Schedule</a></li>\n";
                        print "                             <li class=\"divider\"></li>\n";                
                        print "                             <li><a href=\"#\">Account Settings</a></li>\n";
                        print "                          </ul>\n";
                        print "                      </div>\n";
                        print "                </div>\n";
                print "                <div class=\"row\">\n";
                print "                <div class=\"col-xs-12\">\n";
                // Collapsable become a walker form.
                print "<button type=\"button\" class=\"btn btn-primary becWalkerBtn\" data-toggle=\"collapse\" data-target=\"#demo\">Become a Walker</button>\n";
                print "             <div class=\"collapse\" id=\"demo\">\n";
                print "  <div class=\"form-group\"> \n";
                print" <label for=\"example-text-input\" class=\"col-2 col-form-label\">First name</label> \n";
                print" <div class=\"col-10\">\n";
                print" <input class=\"form-control\" type=\"text\" value=$firstname id=\"example-text-input\"> \n";
                print" </div> \n";
                print" </div> \n";
                print "  <div class=\"form-group\"> \n";
                print" <label for=\"example-text-input\" class=\"col-2 col-form-label\">Last name</label> \n";
                print" <div class=\"col-10\">\n";
                print" <input class=\"form-control\" type=\"text\" value=$lastname id=\"example-text-input\"> \n";
                print" </div> \n";
                print" </div> \n";
                print "  <div class=\"form-group\"> \n";
                print" <label for=\"example-email-input\" class=\"col-2 col-form-label\">Email</label> \n";
                print" <div class=\"col-10\">\n";
                print" <input class=\"form-control\" type=\"text\" value=$email id=\"example-text-input\"> \n";
                print" </div> \n";
                print" </div> \n";
                print "  <div class=\"form-group\"> \n";
                print" <label for=\"example-tel-input\" class=\"col-2 col-form-label\">Phone Number</label> \n";
                print" <div class=\"col-10\">\n";
                print" <input class=\"form-control\" type=\"text\" value=\"\" id=\"example-text-input\"> \n";
                print" </div> \n";
                print" </div> \n";
                print "  <div class=\"form-group\"> \n";
                print" <label for=\"example-text-input\" class=\"col-2 col-form-label\">Address Line 1</label> \n";
                print" <div class=\"col-10\">\n";
                print" <input class=\"form-control\" type=\"text\" value=\"\" id=\"example-text-input\"> \n";
                print" </div> \n";
                print" </div> \n";
                print "  <div class=\"form-group\"> \n";
                print" <label for=\"example-text-input\" class=\"col-2 col-form-label\">Address Line 2</label> \n";
                print" <div class=\"col-10\">\n";
                print" <input class=\"form-control\" type=\"text\" value=\"\" id=\"example-text-input\"> \n";
                print" </div> \n";
                print" </div> \n";
                print "  <div class=\"form-group\"> \n";
                print" <label for=\"example-text-input\" class=\"col-2 col-form-label\">Zip Code</label> \n";
                print" <div class=\"col-10\">\n";
                print" <input class=\"form-control\" type=\"text\" value=\"\" id=\"example-text-input\"> \n";
                print" </div> \n";
                print" </div> \n";
                print "     <div class=\"form-group\"> \n";
                print"      <label for=\"example-date-input\" class=\"col-2 col-form-label\">Date of Birth</label> \n";
                print"      <div class=\"col-10\">\n";
                print"      <input class=\"form-control\" type=\"date\" value=$birthday id=\"example-date-input\"> \n";
                print"      </div> \n";
                print"      </div> \n";
                print"    <div class=\"form-group\"> \n";
                print"     <label for=\"exampleSelect1\">Gender</label> \n";
                print"     <select class=\"form-control\" id=\"exampleSelect1\"> \n";
                print"      <option>M</option> \n";
                print"    <option>F</option> \n";
                print"      </select> \n";
                print"    </div> \n";
                print" <button type=\"submit\" class=\"btn btn-primary\">Submit</button> \n";
                print " </div>\n";

                print "                </div>\n";
                print "                </div>\n";
                print "         </div>\n";
                print "                    <div class=\"col-sm-12 col-md-6\">\n";
                print "                        <h4>\n";
                print "                           $firstname $lastname</h4>\n";
                print "                        <small><cite title=\"Location\">Dublin, Ireland <i class=\"glyphicon glyphicon-map-marker\">\n";
                print "                        </i></cite></small>\n";
                print "                        <p>\n";
                print "                            <i class=\"glyphicon glyphicon-envelope\"></i> $email\n";
                print "                           \n";
                print "                            <br />\n";
                print "                            <i class=\"glyphicon glyphicon-gift\"></i> $birthday</p>\n";
                print "                    </div>\n";
                print "                </div>\n";
                print "            </div>\n";
                print "        </div>\n";
                print "        <div class=\"col-xs-0 col-sm-1 col-md-1\">\n";
                print "        </div>\n";
                print "    </div>\n";
                print "</div>\n";
                print "        </section>";
                
               
            }

    ?>
    

                            
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
