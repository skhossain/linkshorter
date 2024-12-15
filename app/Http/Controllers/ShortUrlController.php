<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ShortUrl;
use Exception;

class ShortUrlController extends Controller
{

    public function url_short()
    {
        $myurls = ShortUrl::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->paginate(10);
        $hostWithProtocol = request()->getSchemeAndHttpHost();
        return Inertia::render('Urlshort/Urlshort-form', [
            'myurls' => $myurls,
            'host_url' => $hostWithProtocol
        ]);
    }

    public function url_short_insert(Request $request)
    {
        try {
            $request->validate([
                'original_url' => 'required|url',
            ]);

            $hostWithProtocol = request()->getSchemeAndHttpHost();
            $user_id = Auth::user()->id;
            $check = ShortUrl::where([['original_url', $request->original_url], ['user_id', $user_id]])->exists();
            if ($check) {
                $exist_data = ShortUrl::where([['original_url', $request->original_url], ['user_id', $user_id]])->first();
                return response()->json([
                    'error' => 'Your input URL already exists.',
                    'short_url' => $hostWithProtocol . "/" . $exist_data->short_url,
                    'status' => $exist_data->status
                ], 500);
            }
            try {
                $short_url = get_short_url();
            } catch (Exception $e) {
                Log::error('Error generating short URL: ' . $e->getMessage());
                return response()->json(['error' => 'Error generating short URL: ' . $e->getMessage()], 500);
            }

            try {
                $obj = new ShortUrl();
                $obj->user_id = $user_id;
                $obj->short_url = $short_url;
                $obj->original_url = $request->original_url;
                $obj->save();
            } catch (Exception $e) {
                Log::error('Error insert short URL: ' . $e->getMessage());
                return response()->json(['error' => 'Unable to generate short URL'], 500);
            }

            $myurls = ShortUrl::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->paginate(10);
            return response()->json(['success' => 'Generate short URL', 'myurls' => $myurls], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return a JSON response with validation errors
            return response()->json([
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    public function url_short_status_update(Request $request)
    {
        $shortUrl = ShortUrl::findOrFail($request->id);
        // return $shortUrl;
        // return $request->status;
        if ($shortUrl) {
            $shortUrl->status = $request->status;
            $shortUrl->save();

            // $shortUrl->update([
            //     'status' => $request->status,
            // ]);
            return response()->json(['success' => 'Change short URL Status '], 200);
        } else {
            return response()->json(['error' => 'Unable to Change short URL Status'], 500);
        }
    }
}
