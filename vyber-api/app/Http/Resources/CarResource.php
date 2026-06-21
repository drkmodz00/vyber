<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'subtitle'     => $this->subtitle,
            'category'     => $this->category,
            'price'        => $this->price,
            'horsepower'   => $this->horsepower . 'HP',
            'zero_sixty'   => $this->zero_sixty,
            'top_speed'    => $this->top_speed,
            'image_url'    => asset('storage/images/' . $this->image_file),
            'color_accent' => $this->color_accent,
            'sort_order'   => $this->sort_order,
            'engine'       => $this->engine,
            'transmission' => $this->transmission,
            'drivetrain'   => $this->drivetrain,
            'torque'       => $this->torque,
            'seats'        => $this->seats,
            'year'         => $this->year,
            'color'        => $this->color,
            'features'     => $this->features,
        ];
    }
}