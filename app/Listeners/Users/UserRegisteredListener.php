<?php

namespace App\Listeners\Users;

use App\Events\Users\UserRegisteredEvent;
use App\Mail\Users\Activate;
use App\Model\Users\EmailLogin;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class UserRegisteredListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserRegisteredEvent  $event
     * @return void
     */
    public function handle(UserRegisteredEvent $event)
    {
        $emailLogin = EmailLogin::createForEmail($event->user->email);

        $url = route('auth.email-authenticate', [
            'token' => $emailLogin->token
        ]);

        Mail::to($event->user->email)->send(new Activate($url));
    }
}
