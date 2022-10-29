<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Auth;

class AdminController extends Controller {

    public function profile() {
        $user = Auth::user();
        return response()->json(['data' => $user], 200);
    }
}
