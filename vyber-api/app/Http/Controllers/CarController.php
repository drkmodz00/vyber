<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Http\Resources\CarResource;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::orderBy('sort_order')->get();
        return CarResource::collection($cars);
    }

    public function show(Car $car)
    {
        return new CarResource($car);
    }
}