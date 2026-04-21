<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    use ApiResponse;

    /**
     * Get notifications for the authenticated user.
     * Includes both their personal notifications and broadcast notifications.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Notification::where(function ($q) use ($user) {
            $q->where('user_id', $user->id)
              ->orWhere('is_broadcast', true);
        });

        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->boolean('unread_only')) {
            $query->where('is_read', false);
        }

        $query->orderBy('created_at', 'desc');

        $perPage = min($request->get('per_page', 30), 100);
        $notifications = $query->paginate($perPage);

        $unreadCount = Notification::where(function ($q) use ($user) {
            $q->where('user_id', $user->id)
              ->orWhere('is_broadcast', true);
        })->where('is_read', false)->count();

        return response()->json([
            'success' => true,
            'message' => 'Notifications fetched',
            'data'    => $notifications->items(),
            'meta'    => [
                'total'        => $notifications->total(),
                'per_page'     => $notifications->perPage(),
                'current_page' => $notifications->currentPage(),
                'last_page'    => $notifications->lastPage(),
                'unread_count' => $unreadCount,
            ],
        ]);
    }

    /**
     * Mark a single notification as read.
     */
    public function markRead(int $id): JsonResponse
    {
        $notification = Notification::findOrFail($id);
        $notification->update(['is_read' => true, 'read_at' => now()]);

        return $this->success($notification, 'Marked as read');
    }

    /**
     * Mark all notifications as read for the current user.
     */
    public function markAllRead(Request $request): JsonResponse
    {
        $user = $request->user();

        Notification::where(function ($q) use ($user) {
            $q->where('user_id', $user->id)
              ->orWhere('is_broadcast', true);
        })
        ->where('is_read', false)
        ->update(['is_read' => true, 'read_at' => now()]);

        return $this->success(null, 'All notifications marked as read');
    }

    /**
     * Delete a notification.
     */
    public function destroy(int $id): JsonResponse
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return $this->success(null, 'Notification deleted');
    }

    /**
     * Create a broadcast notification (managers only).
     */
    public function broadcast(Request $request): JsonResponse
    {
        $data = $request->validate([
            'type'       => 'required|in:urgent,canvassing,runners,fundraising,system,general',
            'title'      => 'required|string|max:255',
            'body'       => 'required|string|max:1000',
            'action_url' => 'nullable|string|max:500',
            'data'       => 'nullable|array',
        ]);

        $notification = Notification::broadcast(
            $data['type'],
            $data['title'],
            $data['body'],
            $data['data'] ?? [],
            $data['action_url'] ?? null
        );

        return $this->success($notification, 'Notification broadcast to all team members', 201);
    }

    /**
     * Get unread count only (lightweight endpoint for polling).
     */
    public function unreadCount(Request $request): JsonResponse
    {
        $user = $request->user();

        $count = Notification::where(function ($q) use ($user) {
            $q->where('user_id', $user->id)
              ->orWhere('is_broadcast', true);
        })->where('is_read', false)->count();

        return $this->success(['unread_count' => $count]);
    }
}
