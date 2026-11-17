<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/svg+xml" sizes="any" href="{{ asset('favicon.svg') }}?v=2">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <html lang="{{ app()->getLocale() === 'pt' ? 'pt-PT' : 'en' }}">

    @fonts

    @viteReactRefresh
    <script>
        (() => {
            let savedTheme = null;

            try {
                savedTheme = localStorage.getItem('portfolio-theme');
            } catch {}

            const theme =
                savedTheme === 'light' || savedTheme === 'dark' ?
                savedTheme :
                window.matchMedia('(prefers-color-scheme: dark)').matches ?
                'dark' :
                'light';

            document.documentElement.setAttribute('data-bs-theme', theme);
        })();
    </script>

    <style>
        html {
            background: #faf9f6;
        }

        html[data-bs-theme="dark"] {
            background: #14221c;
        }
    </style>
    @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    <x-inertia::head>
        <title>{{ config('app.name', 'Laravel') }}</title>
    </x-inertia::head>
</head>

<body class="font-sans antialiased">
    <x-inertia::app />
</body>

</html>
