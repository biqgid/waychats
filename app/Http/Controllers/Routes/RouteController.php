<?php

namespace App\Http\Controllers\Routes;

use App\Http\Resources\RouteList\RouteListCollection;
use App\Http\Resources\RouteList\RouteListResource;
use App\Model\Adverts\Car;
use App\Model\Routes\RouteList;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RouteController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function storeTransport(Request $request) {
        $data = $request->all();

        $route = $request->user()->route_lists()->create([
            'location' => $data['routes']['location'],
            'intermediate' => $data['routes']['intermediate'],
            'destination' => $data['routes']['destination'],
            'distance' => $data['routes']['distance'],
            'price' => $data['price'],
            'description' => $data['description'],
            'currency' => $data['currency'],
            'payment_method' => $data['payment_method'],
            'loading_data' => stristr($data['created_at'], 'T', true),
            'unloading_data' => stristr($data['deleted_at'], 'T', true),
        ]);

        $request->user()->cars()->create([
            'model' => $data['transport']['model'],
            'carcass' => $data['transport']['carcass'],
            'tonnage' => $data['transport']['tonnage']. '' .$data['transport']['measure'],
            'route_list_id' => $route->id,
        ]);

        return response(new RouteListResource(RouteList::find($route->id)));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function storeShipment(Request $request) {
        $data = $request->all();

        $route = $request->user()->route_lists()->create([
            'location' => $data['routes']['location'],
            'intermediate' => $data['routes']['intermediate'],
            'destination' => $data['routes']['destination'],
            'distance' => $data['routes']['distance'],
            'price' => $data['price'],
            'description' => $data['description'],
            'currency' => $data['currency'],
            'payment_method' => $data['payment_method'],
            'loading_data' => stristr($data['created_at'], 'T', true),
            'unloading_data' => stristr($data['deleted_at'], 'T', true),
        ]);

        $request->user()->shipments()->create([
            'model' => $data['shipment']['model'],
            'carcass' => $data['shipment']['carcass'],
            'width' => $data['shipment']['width'],
            'height' => $data['shipment']['height'],
            'weight' => $data['shipment']['weight'],
            'length' => $data['shipment']['length'],
            'route_list_id' => $route->id,
        ]);

        return response(new RouteListResource(RouteList::find($route->id)));
    }

    public function getCarsSearch(Request $request) {
        $data = null;

        if ($request['route']['location'] && $request['route']['destination']) {
            $data = RouteList::where('location', $request['route']['location'])
                ->where('destination', $request['route']['destination'])
                ->with('cars')
                ->get();
        }else {
            $data = RouteList::where('location', $request['route']['location'])
                ->with('cars')
                ->get();
        }
        return response()->json(new RouteListCollection($data));
    }
}
