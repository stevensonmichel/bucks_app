import React, { useState, useEffect, useRef } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'expense' | 'bucket' | 'account' | 'other'; // Type of activity
  date: Date;
}

const Notifications: React.FC = () => {
  // State to manage notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null); // Track selected notification

  const notificationListRef = useRef<HTMLUListElement | null>(null); // Reference to the list container

  // Example data (this could come from an API or be dynamically added)
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://127.0.0.1:8000/api/notifications/', {
      method: "GET",
      headers: {
        "content-type": 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setNotifications(data);
    })
    .catch((error) => {
      console.error("Error fetching expenses", error);
    });
  }, []);


  // Handlers for Edit and Delete actions
  const handleEdit = (id: number) => {
    alert(`Edit notification with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this notification?');
    if (!confirmed) return;
  
    const token = localStorage.getItem('access_token');
  
    fetch(`http://127.0.0.1:8000/api/notifications/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete notification');
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
      })
      .catch((error) => console.error('Error deleting notification:', error));
  };

  // Handle item selection
  const handleSelect = (id: number) => {
    setSelectedNotificationId((prevId) => (prevId === id ? null : id)); // Toggle selection
  };

  // Effect to detect clicks outside of the notifications list
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationListRef.current && !notificationListRef.current.contains(event.target as Node)) {
        setSelectedNotificationId(null); // Unselect when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold mb-4">Notifications</h2>

      {/* If there are no notifications */}
      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications available.</p>
      ) : (
        <ul className="space-y-4" ref={notificationListRef}>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 rounded-lg shadow-md transition-colors relative cursor-pointer ${
                selectedNotificationId === notification.id ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleSelect(notification.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {/* Display type at the beginning */}
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
                      {notification.date ? new Date(notification.date).toLocaleDateString() : 'N/A'}{' '}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons (only visible on hover and when selected) */}
              {selectedNotificationId === notification.id && (
                <div
                  className="absolute top-4 right-4 flex space-x-2"
                  onClick={(e) => e.stopPropagation()} // Prevent parent click event
                >
                  <button
                    onClick={() => handleEdit(notification.id)}
                    className="text-sm text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
