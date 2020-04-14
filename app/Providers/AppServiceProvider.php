<?php

namespace App\Providers;

use App\Repositories\Adverts\CarsRepository;
use App\Repositories\Adverts\EloquentCarsRepository;
use App\Repositories\Contacts\ContactsRepository;
use App\Repositories\Contacts\EloquentContactsRepository;
use App\Repositories\Messages\EloquentMessagesRepository;
use App\Repositories\Messages\MessagesRepository;
use App\Repositories\Routes\EloquentRoutesRepository;
use App\Repositories\Routes\RoutesRepository;
use App\Repositories\Users\EloquentUsersRepository;
use App\Repositories\Users\UsersRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UsersRepository::class, function () {
            return new EloquentUsersRepository();
        });

        $this->app->bind(MessagesRepository::class, function () {
            return new EloquentMessagesRepository();
        });

        $this->app->bind(RoutesRepository::class, function () {
            return new EloquentRoutesRepository();
        });

        $this->app->bind(ContactsRepository::class, function () {
            return new EloquentContactsRepository();
        });

        $this->app->bind(CarsRepository::class, function () {
            return new EloquentCarsRepository();
        });
    }
}
