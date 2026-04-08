<?php

namespace App\Http\Controllers\Voter;

use App\Http\Controllers\Controller;
use App\Jobs\ImportVoterRoll;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImportController extends Controller
{
    use ApiResponse;

    public function import(Request $request): JsonResponse
    {
        $request->validate([
            'file'             => 'required|file|mimes:csv,txt,xlsx|max:51200',
            'column_mapping'   => 'nullable|array',
        ]);

        $tenant = app('current_tenant');
        $path = $request->file('file')->store("imports/{$tenant->id}", 'local');

        dispatch(new ImportVoterRoll($path, $tenant->id, $request->get('column_mapping', [])));

        return $this->success([
            'job_queued' => true,
            'file_path'  => $path,
        ], 'Voter import queued. You will be notified when complete.');
    }
}
