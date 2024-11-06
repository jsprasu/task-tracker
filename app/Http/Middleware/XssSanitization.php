<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * XssSanitization will sanitize the input data from the request.
 */
class XssSanitization
{
    /**
     * Sanitize the input data from an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $input = $request->all();
        array_walk_recursive($input, function(&$input) {
            $input = strip_tags($input);
            $input = trim($input);
        });
        $request->merge($input);

        return $next($request);
    }
}
