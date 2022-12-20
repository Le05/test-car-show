<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function autenticar(Request $request)
    {
        // valida se está preenchido o email e senha
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // buscar na base de dados o email do usuario
        $user = User::where('email', $request->email)->first();

        // verifica e retornou algum dado
        if(!$user){
            throw ValidationException::withMessages([
                'user' => ['Credenciais inválidas'],
            ]);
        }

        // checa se a senha é valida
        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Credenciais inválidas'],
                'password' => ['Credenciais inválidas'],
            ]);
        }

        $user->token = $user->createToken($user->id)->plainTextToken;

        return response()->json($user);
    }
}
