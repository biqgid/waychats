<?php

namespace App\Http\Controllers\Currencies;

use App\Model\Currency\Currency;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CurrencyController extends Controller
{
    public function getCurrency()
    {
        $data = Currency::with('course')->get();
        return response()->json($data);
    }

    public function getCourse()
    {

    }
}
