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
                    <li class="active">
                        <div class="dashboard__elements--item">
                            <h2>
                                <img alt="" src="/images/conversation.png" width="25" height="25" />
                                Conversational details
                            </h2>
                        </div>
                        <div class="details">
                            <h3>Conversational Details</h3>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <button class="btn">Submit</button>
                        </div>
                    </li>
                    <li>
                        <div class="dashboard__elements--item">
                            <h2>
                                <img alt="" src="/images/objective.png" width="25" height="25" />
                                Learning Objective
                            </h2>
                        </div>

                        <div class="details">
                            <h3>Learning Objective</h3>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <button class="btn">Submit</button>
                        </div>
                    </li>
                    <li>
                        <div class="dashboard__elements--item">
                            <h2>
                                <img alt="" src="/images/outcomes.png" width="25" height="25" />
                                Learning Outcomes
                            </h2>
                        </div>
                        <div class="details">
                            <h3>Learning Outcomes</h3>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <button class="btn">Submit</button>
                        </div>
                    </li>
                    <li>
                        <div class="dashboard__elements--item">
                            <h2>
                                <img alt="" src="/images/comments.png" width="25" height="25" />
                                Managers Comment
                            </h2>
                        </div>
                        <div class="details">
                            <h3>Managers Comment</h3>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <button class="btn">Submit</button>
                        </div>
                    </li>
                    <li>
                        <div class="dashboard__elements--item">
                            <h2>
                                <img alt="" src="/images/upload.png" width="25" height="25" />
                                Uploading Documents
                            </h2>
                        </div>
                        <div class="details">
                            <h3>Upload Documents</h3>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <button class="btn">Submit</button>
                        </div>
                    </li>
                    <li>
                        <div class="dashboard__elements--item">
                            <h2>
                                <img alt="" src="/images/ethics.png" width="25" height="25" />
                                Code of ethics
                            </h2>
                        </div>
                        <div class="details">
                            <h3>Code of ethics</h3>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <button class="btn">Submit</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    @include('footer')
</body>

</html>