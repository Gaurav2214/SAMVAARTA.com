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
    
    <link rel="stylesheet" type="text/css" href="{{ asset('css/base.css') }}" >
    <script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8="
        crossorigin="anonymous">
    </script>
</head>

<body>
    <!-- @include('header') -->
    @include('login')
    @include('footer')
</body>

</html>