<?php

namespace App\Http\Controllers;

use App\Mail\Users\Activate;
use App\Model\Site\Structure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ApplicationController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index() {
        return view('app');
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserStructure() {
        return response()->json(auth()->user()->structure);
    }

    /**
     * @param Request $request
     */
    public function updateUserStructure(Request $request) {
        $structure = $request->user()->structure;
        if ($structure) {
            $structure->update(['structure' => $request->structure]);
        }else {
            $userStructure = new Structure;
            $userStructure->structure = $request->structure;
            $request->user()->structure()->save($userStructure);
        }
    }

    public function closeComponent(Request $request) {
        $structure = $request->user()->structure;
        if ($structure) {
            $structure->update(['structure' => $request->structure]);
        }else {
            $userStructure = new Structure;
            $userStructure->structure = $request->structure;
            $request->user()->structure()->save($userStructure);
        }
    }
}
