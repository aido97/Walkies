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
    const REDIRECT_URI = 'http://currandesign.net/group';
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

	
	

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-top">

    <!-- Navbar -->
    <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
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
                        <a class="page-scroll" href="#about">About</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#services">Services</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
    
    <!-- Header -->
    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1 id="homeHeading">Walkies - Our Walkers Walk The Wildest</h1>
                <hr>
                <a href="#services" class="btn btn-primary btn-xl page-scroll">Find Out More</a>
            </div>
			<br><br>
			<p style = "color:white; font-size: 5vmin; font-weight: bold;">50 DAYS WITHOUT A MAULING :)</p>
        </div>
    </header>

    <section class="bg-primary" id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="section-heading">We've got what you need</h2>
                    <hr class="light">
                    <p>Dogs, Walking - We Have It All</p>

                        <!-- Google Sign In Functionality -->
                        <div>
                            <?php
                            /*
                            * If login url is there then display login button
                            * else print the retieved data
                            */
                            if (isset($authUrl)) {
                                echo "<a class='login' href='" . $authUrl . "'><img src='gplus-lib/signin_button.png' height='50px'/></a>";
                            } else {
                                print "ID: {$id} <br>";
                                print "Name: {$name} <br>";
                                print "Email: {$email } <br>";
                                print "Image : {$profile_image_url} <br>";
                                print "Cover  :{$cover_image_url} <br>";
                                print "Url: {$profile_url} <br><br>";
                                echo "<a class='logout' href='?logout'><button>Logout</button></a>";
                            }
                            ?>
                        </div>

                  
                </div>
            </div>
        </div>
    </section>
	
	<!-- Footer -->
	<footer>
            <div class="row">
                <div class="col-lg-12" id = "footID">
                  RecApp Team
                </div>
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
