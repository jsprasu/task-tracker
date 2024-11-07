<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config("app.name") }}</title>
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    @viteReactRefresh
    @vite('resources/react/app.tsx')
</head>
<body>
    <div class="full-page">
        <div class="container-fluid main_container">
            <div class="container mg-t-20">
                <div id="app"></div>
            </div>
        </div>
    </div>
</body>
</html>
