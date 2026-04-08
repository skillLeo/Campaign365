<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = AuditLog::with('causer')->orderBy('created_at', 'desc');

        if ($request->has('action')) {
            $query->where('action', 'like', "%{$request->action}%");
        }
        if ($request->has('tenant_id')) {
            $query->where('tenant_id', $request->tenant_id);
        }

        return $this->paginate($query->paginate(50));
    }
}
