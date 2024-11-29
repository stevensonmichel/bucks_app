import React, { useState, useEffect, useRef } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'expense' | 'bucket' | 'account' | 'other';
  read: boolean; // Track read/unread status
  date: Date;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationListRef = useRef<HTMLUListElement | null>(null);

  // Fetch notifications when the component loads
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://127.0.0.1:8000/api/notifications/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data); // Update notifications with backend data
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  // Mark a notification as read
  const markAsRead = async (id: number) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notifications/mark-as-read/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        );
      } else {
        console.error('Failed to mark notification as read.');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Delete a notification
  const deleteNotification = async (id: number) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notifications/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
      } else {
        console.error('Failed to delete notification.');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Handle notification click
  const handleClickNotification = (id: number) => {
    markAsRead(id);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-400 shadow-md rounded-lg">
      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications available.</p>
      ) : (
        <ul className="space-y-4" ref={notificationListRef}>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 rounded-lg shadow-md transition-colors relative cursor-pointer ${
                notification.read ? 'bg-gray-100' : 'bg-blue-100 border-2 border-blue-500'
              }`}
              onClick={() => handleClickNotification(notification.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-lg px-2 py-1 rounded-full ${
                      notification.type === 'expense'
                        ? 'bg-blue-500 text-white'
                        : notification.type === 'bucket'
                        ? 'bg-green-500 text-white'
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    {notification.type}
                  </span>
                  <div>
                    <p className="text-lg font-semibold">{notification.message}</p>
                    <p className="text-sm text-gray-500">
                      {notification.date ? new Date(notification.date).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the notification click
                    deleteNotification(notification.id);
                  }}
                  className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
