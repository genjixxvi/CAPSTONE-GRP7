<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MonthController extends Controller
{
    public function getUsersByMonth()
    {
        $usersByMonth = User::select(DB::raw('MONTH(created_at) as month'), DB::raw('count(*) as total'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();

        $result = $usersByMonth->map(function ($item) {
            return [
                'month' => now()->month($item->month)->format('M'),
                'count' => $item->total
            ];
        });

        return response()->json($result);
    }
}
