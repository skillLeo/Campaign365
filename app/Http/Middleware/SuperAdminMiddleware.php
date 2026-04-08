<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next): mixed
    {
        $user = $request->user('super_admin');

        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Super Admin access required'], 403);
        }

        return $next($request);
    }
}
