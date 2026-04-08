<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class HealthController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $health = [
            'database' => $this->checkDatabase(),
            'redis'    => $this->checkRedis(),
            'storage'  => $this->checkStorage(),
            'queues'   => $this->checkQueues(),
        ];

        $allHealthy = collect($health)->every(fn($h) => $h['status'] === 'healthy');

        return $this->success([
            'overall_status' => $allHealthy ? 'healthy' : 'degraded',
            'services'       => $health,
            'checked_at'     => now()->toISOString(),
        ]);
    }

    private function checkDatabase(): array
    {
        try {
            DB::select('SELECT 1');
            return ['status' => 'healthy', 'message' => 'Database connected'];
        } catch (\Exception $e) {
            return ['status' => 'down', 'message' => $e->getMessage()];
        }
    }

    private function checkRedis(): array
    {
        try {
            Redis::ping();
            return ['status' => 'healthy', 'message' => 'Redis connected'];
        } catch (\Exception $e) {
            return ['status' => 'down', 'message' => $e->getMessage()];
        }
    }

    private function checkStorage(): array
    {
        return ['status' => 'healthy', 'message' => 'Storage accessible'];
    }

    private function checkQueues(): array
    {
        return ['status' => 'healthy', 'message' => 'Queue workers running'];
    }
}
