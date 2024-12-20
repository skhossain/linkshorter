<?php
use Illuminate\Support\Str;
use App\Models\ShortUrl;

// function generateSixCharacterString()
// {
//     static $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     $length = strlen($characters);
//     $result = '';

//     for ($i = 0; $i < 6; $i++) {
//         $result .= $characters[random_int(0, $length - 1)];
//     }

//     return $result;
// }


function get_short_url($counter = 0, $maxCalls = 1000,$length = 5)
{
    // Base case: Stop recursion after $maxCalls iterations
    if ($counter >= $maxCalls) {
        throw new Exception("Not Generated Unique short link. Reached maximum recursion limit of {$maxCalls} try again.");
    }
   
    if($counter%100 == 0){
        $length += 1;
    }
    // Generate a short URL
    $short_code = Str::random($length);
    
    // Check if the short URL exists in the database
    if (!ShortUrl::where('short_url', $short_code)->exists()) {
        return $short_code;
    } else {
        // Recursive call with incremented counter
        return get_short_url($counter + 1, $maxCalls, $length);
    }
}
