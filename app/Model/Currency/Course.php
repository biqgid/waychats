<?php

namespace App\Model\Currency;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $guarded = [];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function course() {
        return $this->belongsTo(Currency::class);
    }
}
