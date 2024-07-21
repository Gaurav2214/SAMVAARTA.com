<?php

namespace App\Http\Middleware;

use League\OAuth2\Server\ResourceServer;
use Symfony\Bridge\PsrHttpMessage\Factory\PsrHttpFactory;
use Nyholm\Psr7\Factory\Psr17Factory;
use Illuminate\Support\Facades\DB;
use Config;
use Closure;
use Exception;

class PassportCustomGuardAccessToken
{
    private $server;

    public function __construct(ResourceServer $server)
    {
        $this->server = $server;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
       // $psr = (new PsrHttpFactory)->createRequest($request);

       if (class_exists(PsrHttpFactory::class)) {
        $psr17Factory = new Psr17Factory;

        $psr = (new PsrHttpFactory($psr17Factory, $psr17Factory, $psr17Factory, $psr17Factory))
            ->createRequest($request);
    }


        try {
            $psr = $this->server->validateAuthenticatedRequest($psr);
            $token_id = $psr->getAttribute('oauth_access_token_id');
            if ($token_id) {
                $access_token = DB::table('oauth_access_token_providers')->where('oauth_access_token_id',
                    $token_id)->first();

                if ($access_token) {
					$oauth_guest_user = DB::table('oauth_guest_users')->where('oauth_access_token_id',
                    $token_id)->first();
					if($oauth_guest_user){
						 Config::set('auth.guards.api.guest_user_id', $oauth_guest_user->id);
					}else{
						$id =DB::table('oauth_guest_users')->insertGetId(
							['token_id' => $token_id, 'created_at' => date("Y-m-d H:i:s")]
						);
						Config::set('auth.guards.api.guest_user_id', $id);
					}
                    Config::set('auth.guards.api.provider', $access_token->provider);
                }
            }
        } catch (Exception $e) {

        }

        return $next($request);
    }}
