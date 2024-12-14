<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShortUrl;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function Dashboard(Request $request){

        $result = ShortUrl::selectRaw('COUNT(*) as total_rows, SUM(visit_count) as total_visits')->first();
        $totalRows = $result->total_rows;
        $totalVisits = $result->total_visits;
        return Inertia::render('Dashboard',[
            'totalRows' => $totalRows,
            'totalVisits' => $totalVisits,
        ]);
    }
}
