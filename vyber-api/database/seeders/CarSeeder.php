<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        Car::truncate();

        $cars = [
            [
                'name'         => 'Ford GT',
                'subtitle'     => 'Carbon Series Edition',
                'category'     => 'HYPERCAR',
                'price'        => '$500,000',
                'horsepower'   => 647,
                'zero_sixty'   => 3.0,
                'top_speed'    => '216mph',
                'image_file'   => 'ford-gt.png',
                'color_accent' => '#00d4ff',
                'sort_order'   => 1,
                'engine'       => '3.5L Twin-Turbo V6',
                'transmission' => '7-Speed DCT',
                'drivetrain'   => 'RWD',
                'torque'       => '550 lb-ft',
                'seats'        => 2,
                'year'         => 2024,
                'color'        => 'Liquid Blue',
                'features'     => [
                    'Carbon Fibre Monocell Chassis',
                    'Active Aerodynamics Package',
                    'Race-Derived Suspension',
                    'Gorilla Glass Windscreen',
                    'Track Telemetry System',
                    'Titanium Exhaust System',
                    'Carbon Ceramic Brakes',
                    'Launch Control System',
                ],
            ],
            [
                'name'         => 'Lamborghini Urus',
                'subtitle'     => 'Performante V8 Twin Turbo',
                'category'     => 'SUPERCAR',
                'price'        => '$260,000',
                'horsepower'   => 657,
                'zero_sixty'   => 3.3,
                'top_speed'    => '190mph',
                'image_file'   => 'urus.png',
                'color_accent' => '#ff6b00',
                'sort_order'   => 2,
                'engine'       => '4.0L Twin-Turbo V8',
                'transmission' => '8-Speed Automatic',
                'drivetrain'   => 'AWD',
                'torque'       => '627 lb-ft',
                'seats'        => 5,
                'year'         => 2024,
                'color'        => 'Arancio Borealis',
                'features'     => [
                    'Lamborghini Dinamica Veicolo Integrata',
                    'Active Torque Vectoring',
                    'Carbon Ceramic Brake System',
                    'Alcantara Sport Interior',
                    'Rear Wheel Steering',
                    'Sport Exhaust System',
                    'Night Vision Assist',
                    'Bang & Olufsen Audio',
                ],
            ],
            [
                'name'         => 'Rimac Nevera',
                'subtitle'     => 'All-Electric Hypercar',
                'category'     => 'ELECTRIC',
                'price'        => '$2,400,000',
                'horsepower'   => 1914,
                'zero_sixty'   => 1.85,
                'top_speed'    => '258mph',
                'image_file'   => 'nevera.png',
                'color_accent' => '#00ff88',
                'sort_order'   => 3,
                'engine'       => 'Quad Electric Motors',
                'transmission' => 'Single-Speed per Axle',
                'drivetrain'   => 'AWD',
                'torque'       => '1,740 lb-ft',
                'seats'        => 2,
                'year'         => 2024,
                'color'        => 'Concept One Silver',
                'features'     => [
                    '120 kWh Lithium-Manganese Battery',
                    'Torque Vectoring on All 4 Wheels',
                    'Carbon Fibre Monocoque',
                    'Active Aerodynamics',
                    'Rimac All-Wheel Torque Vectoring',
                    'DC Fast Charging 500kW',
                    'Advanced Driver Assistance',
                    'Over-the-Air Updates',
                ],
            ],
            [
                'name'         => 'McLaren 720S',
                'subtitle'     => 'Spider Convertible V8',
                'category'     => 'GRAND TOURER',
                'price'        => '$315,000',
                'horsepower'   => 710,
                'zero_sixty'   => 2.8,
                'top_speed'    => '212mph',
                'image_file'   => 'mclaren-720s.png',
                'color_accent' => '#ff4422',
                'sort_order'   => 4,
                'engine'       => '4.0L Twin-Turbo V8',
                'transmission' => '7-Speed SSG',
                'drivetrain'   => 'RWD',
                'torque'       => '568 lb-ft',
                'seats'        => 2,
                'year'         => 2024,
                'color'        => 'Memphis Red',
                'features'     => [
                    'Carbon Fibre MonoCell II-T',
                    'Proactive Chassis Control II',
                    'Variable Drift Control',
                    'Bespoke MSO Interior',
                    'McLaren Track Telemetry',
                    'Titanium SuperSports Exhaust',
                    'Carbon Ceramic Brakes',
                    'Retractable Hardtop in 11s',
                ],
            ],
        ];

        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}