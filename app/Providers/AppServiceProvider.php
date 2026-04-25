<?php

namespace App\Providers;

use App\Auth\WhenIWorkUserProvider;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->registerAuthProviders();
        RateLimiter::for('checkout', function (Request $request) {
            $key = ($request->user()?->id ?? 'guest').':'.$request->session()->getId();

            return Limit::perMinute(30)->by($key);
        });

    }

    protected function registerAuthProviders(): void
    {
        Auth::provider('wheniwork', function ($app, array $config) {
            return new WhenIWorkUserProvider;
        });
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn (): ?Password => app()->isProduction()
                ? Password::min(12)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised()
                : null
        );
    }
}
