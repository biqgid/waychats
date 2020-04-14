<?php

namespace App\Model\Message;

use App\Model\Users\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class PrivateMessage extends Model
{
    protected $table = 'private_messages';

    protected $fillable = ['room_id', 'message', 'status'];

    protected $appends = ['selfMessage'];

    /**
     * @param $date
     * @return string
     */
    /*public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('d-m-y H:i');
    }*/

    /**
     * @param $date
     * @return string
     */
    /*public function getUpdatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('d-m-y H:i');
    }*/

    /**
     * @return bool
     */
    public function getSelfMessageAttribute()
    {
        return $this->user_id === auth()->user()->id;
    }


    /**
     * @param $query
     * @return mixed
     */
    public function scopeUnread($query)
    {
        return $query->where('status', 1);
    }

    /**
     * @param $query
     * @return mixed
     */
    public function scopeRead($query)
    {
        return $query->where('status', 0);
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
