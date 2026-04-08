<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes — Campaign 365 SPA
|--------------------------------------------------------------------------
| The Next.js frontend is built as a static export and placed in public/.
| This catch-all route serves the correct HTML file for any URL, enabling
| client-side routing for the entire SPA (login, dashboard, voters, etc.)
|
| To deploy frontend:
|   cd frontend && npm run build:deploy
|
| Then visit: http://127.0.0.1:8000
*/

Route::get('/{path?}', function (string $path = '') {
    // Strip query string and trailing slashes for file lookup
    $clean = trim($path, '/');

    // --- 1. Try exact route HTML file ---
    // e.g. /login/ → public/login/index.html
    if ($clean !== '') {
        $exact = public_path($clean . '/index.html');
        if (file_exists($exact)) {
            return response()->file($exact, ['Content-Type' => 'text/html']);
        }
    }

    // --- 2. Walk up the path for dynamic routes ---
    // e.g. /voters/123 → public/voters/index.html (voter detail renders client-side)
    $segments = array_filter(explode('/', $clean));
    while (count($segments) > 0) {
        array_pop($segments);
        $parent = implode('/', $segments);
        $parentFile = public_path(($parent ? $parent . '/' : '') . 'index.html');
        if (file_exists($parentFile)) {
            return response()->file($parentFile, ['Content-Type' => 'text/html']);
        }
    }

    // --- 3. Root index.html (redirects to /login/) ---
    $root = public_path('index.html');
    if (file_exists($root)) {
        return response()->file($root, ['Content-Type' => 'text/html']);
    }

    // --- 4. Frontend not built yet ---
    $html = '<!DOCTYPE html><html><head><title>Campaign 365</title>'
        . '<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0F172A;color:#94A3B8}'
        . '.box{background:#1E293B;border-radius:12px;padding:40px;max-width:520px;text-align:center}'
        . 'h1{color:#14B7A6}pre{background:#0F172A;padding:16px;border-radius:8px;text-align:left;color:#34D399;font-size:13px}</style>'
        . '</head><body><div class="box">'
        . '<h1>Campaign 365</h1>'
        . '<p>Frontend not built yet. Run these commands once:</p>'
        . '<pre>cd /Applications/XAMPP/htdocs/campaign365/frontend' . "\n" . 'npm run build:deploy</pre>'
        . '<p style="font-size:13px;margin-top:20px">Then visit <b style="color:#14B7A6">http://127.0.0.1:8000</b></p>'
        . '</div></body></html>';

    return response($html, 200, ['Content-Type' => 'text/html']);

})->where('path', '.*');
