<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'name',
        'subtitle',
        'category',
        'price',
        'horsepower',
        'zero_sixty',
        'top_speed',
        'image_file',
        'color_accent',
        'sort_order',
        'engine',
        'transmission',
        'drivetrain',
        'torque',
        'seats',
        'year',
        'color',
        'features',
    ];
    protected $casts = [
        'features' => 'array',
    ];
}