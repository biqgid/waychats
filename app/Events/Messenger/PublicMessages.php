<?php

namespace App\Events\Messenger;

use App\Http\Resources\Messages\PublicMessageResource;
use App\Model\Message\PublicMessage;
use App\Model\Users\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PublicMessages implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Message details
     *
     * @var \App\Model\Message\PublicMessage
     */
    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PublicMessage $message)
    {
        $this->message = $message;
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'public.messages';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('public-messages');
    }

    public function broadcastWith() {
        return [
            'message' => array_merge($this->message->toArray(), [
                'selfMessage' => false
            ]),
        ];
    }
}
