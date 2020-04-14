<?php

namespace App\Http\Controllers\Data;

use App\Http\Resources\Adverts\CarCollection;
use App\Http\Resources\Adverts\CarResource;
use App\Http\Resources\Contacts\ContactCollection;
use App\Http\Resources\Messages\PublicMessageCollection;
use App\Http\Resources\RouteList\RouteListCollection;
use App\Http\Resources\RouteList\RouteListResource;
use App\Http\Resources\Users\UserCollection;
use App\Model\Adverts\Car;
use App\Model\Routes\RouteList;
use App\Repositories\Adverts\CarsRepository;
use App\Repositories\Contacts\ContactsRepository;
use App\Repositories\Messages\MessagesRepository;
use App\Repositories\Routes\RoutesRepository;
use App\Repositories\Users\UsersRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DataController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function route()
    {
        return response(new RouteListResource(RouteList::find(1)));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function routes()
    {
        return response(new RouteListCollection(RouteList::all()));
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function car()
    {
        return response(new CarResource(Car::find(1)));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function cars()
    {
        return response(new CarCollection(Car::all()));
    }

    public function search(Request $request, UsersRepository $users, MessagesRepository $public_messages, RoutesRepository $routes, ContactsRepository $contacts, CarsRepository $cars)
    {
        $array = array(
            'users' => new UserCollection($users->search($request['search'])),
            'cars' => new CarCollection($cars->search($request['search'])),
            'public_message' => new PublicMessageCollection($public_messages->search($request['search'])),
            'routes' => new RouteListCollection($routes->search($request['search'])),
            'contacts' => new ContactCollection($contacts->search($request['search'])),
        );

        return response()->json($array);
    }
}
