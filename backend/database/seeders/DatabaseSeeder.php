<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Combustivel;
use App\Models\Marca;
use App\Models\TipoTransmissaoVeiculo;
use App\Models\TipoVeiculo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::create([
           'name' => 'Leonardo',
           'email' => 'leosantospereira10@hotmail.com',
           'password' => Hash::make('123456')
        ]);

        Combustivel::create(['nome' => 'Flex']);
        Combustivel::create(['nome' => 'Alcool']);
        Combustivel::create(['nome' => 'Gasolina']);
        Combustivel::create(['nome' => 'Diesel']);
        Combustivel::create(['nome' => 'Eletrico']);


        TipoTransmissaoVeiculo::create(['nome' => 'Manual']);
        TipoTransmissaoVeiculo::create(['nome' => 'Automático']);
        TipoTransmissaoVeiculo::create(['nome' => 'Semi Automático']);
        TipoTransmissaoVeiculo::create(['nome' => 'Automático - CVT']);


        TipoVeiculo::create(['nome' => 'Conversivel']);
        TipoVeiculo::create(['nome' => 'Coupe']);
        TipoVeiculo::create(['nome' => 'Hatchback']);
        TipoVeiculo::create(['nome' => 'Minivan']);
        TipoVeiculo::create(['nome' => 'Pickup']);
        TipoVeiculo::create(['nome' => 'Sedan']);
        TipoVeiculo::create(['nome' => 'Suv']);
        TipoVeiculo::create(['nome' => 'Wagon']);


        Marca::create(['nome' => 'Audi']);
        Marca::create(['nome' => 'BMW']);
        Marca::create(['nome' => 'Chery']);
        Marca::create(['nome' => 'Chevrolet']);
        Marca::create(['nome' => 'Citroën']);
        Marca::create(['nome' => 'Fiat']);
        Marca::create(['nome' => 'Ford']);
        Marca::create(['nome' => 'Honda']);
        Marca::create(['nome' => 'Hyundai']);
        Marca::create(['nome' => 'Jeep']);
        Marca::create(['nome' => 'Mercedes Benz']);
        Marca::create(['nome' => 'Nissan']);
        Marca::create(['nome' => 'Peugeot']);
        Marca::create(['nome' => 'Porsche']);
        Marca::create(['nome' => 'Toyota']);
        Marca::create(['nome' => 'Volkswagen']);

    }
}
