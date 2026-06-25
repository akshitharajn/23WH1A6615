# Notification System Design

## Stage 1

### Problem Statement
Users lose track of important notifications due to high volume. Need a Priority Inbox that displays top-N most important unread notifications based on:
- **Weight**: Placement > Result > Event (3 > 2 > 1)
- **Recency**: More recent notifications prioritized

### Solution Approach

#### Priority Calculation
```
priority = weight × 10^15 + timestamp_ms
```
This formula ensures weight dominates (placement always beats result/event), while recency acts as tiebreaker within same type.

#### Algorithm: Min-Heap for Top-N
To efficiently maintain top-10 notifications as new ones arrive:

1. **Filter unread notifications** (O(n))
2. **Build min-heap of size 10** (O(n log k) where k=10):
   - For each notification:
     - If heap size < 10: insert
     - Else if priority > heap.min: remove min, insert new
3. **Extract and sort result** (O(k log k))

**Time Complexity**: O(n log k) where n = total notifications, k = 10
**Space Complexity**: O(k) = O(10) = constant

#### Why Min-Heap?
- Maintains top-k with O(log k) insertion
- Constant memory (only stores 10 items)
- Efficient for streaming/real-time: new notification checked in O(log 10) = O(1)
- Alternative (sorting entire list) would be O(n log n) every time

#### Handling New Notifications
When new notifications arrive:
1. Fetch all notifications from API
2. Re-compute top-10 using same algorithm
3. Heap ensures only relevant items kept in memory

For true real-time (WebSocket/SSE):
- Maintain persistent heap instance
- On new notification: compare with heap.min
- Replace if higher priority
- No need to re-fetch entire list

### Implementation Details

**Files Modified/Created**:
- `logging-middleware/logger.js` - Structured JSON logging (DEBUG/INFO/WARN/ERROR levels)
- `notification-app-fe/src/api/notifications.js` - API fetch + MinHeap + priority logic
- `notification-app-fe/src/hooks/useNotifications.js` - React hook integration
- `notification-app-fe/src/components/NotificationCard.jsx` - UI card component
- `notification-app-fe/src/pages/NotificationsPage.jsx` - Main page with filter

**Key Features**:
- Min-heap maintains top-10 efficiently
- Logger used throughout (no console.log)
- Type filter (All/Placement/Result/Event)
- Visual priority indicators (color-coded borders)
- Unread badge count

### API Integration
- Endpoint: `http://4.224.186.213/evaluation-service/notifications`
- Proxied through Vite dev server to handle CORS
- Logger tracks all API calls with status/errors

### Testing
Run frontend: `cd notification-app-fe && npm run dev`
View at: `http://localhost:5173`
