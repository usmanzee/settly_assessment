<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Auth;

class ClientController extends Controller
{
    public function index() {
        $admin = Auth::user();
        $adminClients = Client::where('admin_id', $admin->id)->get();
        return response()->json(['data' => $adminClients], 200);
    }

    public function detail($id) {
        $admin = Auth::user();
        $client = Client::where('admin_id', $admin->id)->where('id', $id)->first();
        if(!$client)
            return response()->json(['message' => 'Client not found'], 404);  
        return response()->json(['data' => $client], 200);
    }

    public function store(Request $request) {
        $admin = Auth::user();

        $validator = \Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 422);  

        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images/clients'), $imageName);
        $client = Client::create([
            'admin_id' => $admin->id,
            'name' => $request->name,
            'email' => $request->email,
            'image' => $imageName
        ]);
        return response()->json(['message' => 'Client added successfully', "data" => $client], 201);

    }

    public function remove(Request $request, $id) {
        $admin = Auth::user();
        $client = Client::where('id', $id)->where('admin_id', $admin->id)->first();

        if (!$client)
            return response()->json(['message' => 'Client not found'], 404);  

        Client::where('id', $id)->delete();
        return response()->json(['message' => 'Client deleted successfully'], 201);

    }

    public function update(Request $request, $id) {
        $validator = \Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'image' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 422);

        $admin = Auth::user();
        $client = Client::where('id', $id)->where('admin_id', $admin->id)->first();
        if (!$client)
            return response()->json(['message' => 'Client not found'], 404);  
        
        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];
        if($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images/clients'), $imageName);
            $data['image'] = $imageName;
        }
        $client->update($data);
        return response()->json(['message' => 'Client added successfully', "data" => $client], 201);

    }
}
