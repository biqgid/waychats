<?php

namespace App\Model\Routes;

use App\Model\Adverts\Car;
use App\Model\Adverts\Shipment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class RouteList extends Model
{
    protected $guarded = [];

    protected $casts = [
        'intermediate' => 'array',
        'payment_method' => 'array',
    ];

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
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function cars()
    {
        return $this->hasOne(Car::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function shipment()
    {
        return $this->hasOne(Shipment::class);
    }
}
