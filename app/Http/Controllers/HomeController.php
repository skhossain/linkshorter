<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\ShortUrl;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home(){
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }

    public function redirect_short_url(Request $request,$short_url){
        $shortUrlObj = ShortUrl::where([['status',1],['short_url',$short_url]])->first();
        if($shortUrlObj){
            $shortUrlObj->visit_count += 1; 
            $shortUrlObj->save();
            return redirect()->away($shortUrlObj->original_url);
        }else{
            abort(404);
        }
    }
}
