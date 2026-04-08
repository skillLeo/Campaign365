<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    protected function success(mixed $data = null, string $message = 'Success', int $status = 200, array $meta = []): JsonResponse
    {
        $response = ['success' => true, 'message' => $message, 'data' => $data];
        if (!empty($meta)) {
            $response['meta'] = $meta;
        }
        return response()->json($response, $status);
    }

    protected function error(string $message = 'Error', int $status = 400, array $errors = []): JsonResponse
    {
        $response = ['success' => false, 'error' => $message];
        if (!empty($errors)) {
            $response['errors'] = $errors;
        }
        return response()->json($response, $status);
    }

    protected function paginate($paginator, string $message = 'Success'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $paginator->items(),
            'meta'    => [
                'total'        => $paginator->total(),
                'per_page'     => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
            ],
        ]);
    }
}
