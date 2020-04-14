<?php

namespace App\Model\Message;

use App\Model\Users\User;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users() {
        return $this->belongsToMany(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function privateMessages() {
        return $this->hasMany(PrivateMessage::class);
    }

    protected $appends = ['user'];


    public function getUserAttribute()
    {
        if ($this->user_one === auth()->user()->id)
            return User::find($this->user_two);
        else if ($this->user_two === auth()->user()->id)
            return User::find($this->user_one);
        else
            return false;
    }
}
