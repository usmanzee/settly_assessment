<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {

    public function validationErrorsToString($errArray) {
        $valArr = array();
        foreach ($errArray->toArray() as $key => $value) { 
            $errStr = $value[0];
            array_push($valArr, $errStr);
        }
        if(!empty($valArr)){
            $errStrFinal = implode(', ', $valArr);
        }
        return $errStrFinal;
    }
      
    public function login(Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails())
            return response()->json(['message' => 'Invalid Inputs: '.$validator->errors()->first()], 422);  

        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials))
            return response()->json(['message' => 'Invalid Username/Password'], 401);

        $user = Auth::user();
        $token = $user->createToken("API TOKEN")->plainTextToken;

        return response()->json([
            'message' => 'Login Successful.',
            'token' => $token
        ], 200);
    }

    public function register(Request $request) {  
        $validateUser = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required'
        ]);

        if($validateUser->fails())
            return response()->json([
                'message' => $this->validationErrorsToString($validateUser->errors())
            ], 422);

        $user = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Registeration Successful.',
            'token' => $user->createToken("API TOKEN")->plainTextToken
        ], 201);

    }
}
