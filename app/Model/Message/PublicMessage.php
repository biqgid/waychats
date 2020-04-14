<?php

namespace App\Model\Message;

use App\Http\Resources\Users\UserResourse;
use App\Model\Users\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class PublicMessage extends Model
{
    protected $fillable = ['views', 'bookmarks', 'content', 'user_id'];

    protected $casts = [
        'content' => 'json',
    ];

    protected $appends = ['selfMessage', 'user'];

    /**
     * @param $date
     * @return string
     */
    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('d-m-y H:i');
    }

    /**
     * @param $date
     * @return string
     */
    public function getUpdatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('d-m-y H:i');
    }

    /**
     * @return bool
     */
    public function getSelfMessageAttribute()
    {
        return $this->user_id === auth()->user()->id;
    }

    /**
     * @return UserResourse
     */
    public function getUserAttribute()
    {
        return new UserResourse(User::find($this->user_id));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
