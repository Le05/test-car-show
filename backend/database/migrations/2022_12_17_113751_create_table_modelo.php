<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modelos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->integer('ano');
            $table->integer('quantidade_portas')->default(0);
            $table->integer('quantidade_lugares')->default(0);
            $table->integer('hodometro')->default(0);
            $table->text('imagem_url')->nullable();

            $table->softDeletes();
            $table->timestamps();

            $table->foreignId('marca_id')->constrained('marcas');
            $table->foreignId('tipo_transmissao_veiculo_id')->constrained('tipos_transmissoes_veiculos');
            $table->foreignId('combustivel_id')->constrained('combustiveis');
            $table->foreignId('tipo_veiculo_id')->constrained('tipos_veiculos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modelos');
    }
};
