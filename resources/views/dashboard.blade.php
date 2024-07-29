<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Samvaarta</title>
    <link rel="shortcut icon" type="image/x-icon" href="/public/images/favicon.ico">
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->

    <link rel="stylesheet" type="text/css" href="{{ asset('css/base.css') }}">
    <script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous">
    </script>
</head>

<body>
    <section class="dashboard">
        <header class="dashboard__header ">
            <div class="container">
                <div class="dashboard__header--auth-detail">
                    <div class="dashboard__header--welcome">
                        Welcome <span>Admin</span> !
                    </div>
                    <div class="dashboard__header--loggedin-user"></div>
                </div>
            </div>
        </header>
        <div class="dashboard__elements">
            <div class="container dashboard__elements--inner">
                <ul>
                    <li>
                        <a href="">
                            <span class="coversation sprite-icon"></span>
                            Conversational details
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span class="objectives sprite-icon"></span>
                            Learning Objective
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span class="outcomes sprite-icon"></span>
                            Learning Outcomes
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span class="comments sprite-icon"></span>
                            Managers Comment
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span class="upload sprite-icon"></span>
                            Uploading Documents
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span class="ethics sprite-icon"></span>
                            Code of ethics
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    @include('footer')
</body>

</html>