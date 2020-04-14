<?php

namespace App\Mail\Users;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Activate extends Mailable
{
    use Queueable, SerializesModels;

    public $activate;

    /**
     * Create a new messages instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->activate = $data;
    }

    /**
     * Build the messages.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('auth.emails.email', ['url' => $this->activate]);
    }
}
