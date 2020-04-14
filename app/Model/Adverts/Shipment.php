<?php

namespace App\Model\Adverts;

use App\Model\Routes\RouteList;
use App\Model\Users\User;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    protected $casts = [
        'model' => 'array',
        'carcass' => 'array',
    ];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function route_lists()
    {
        return $this->belongsTo(RouteList::class, 'id');
    }
}
