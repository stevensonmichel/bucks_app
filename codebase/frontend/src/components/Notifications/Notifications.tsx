import React, { useState, useEffect } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'expense' | 'bucket' | 'account' | 'other'; // Type of activity
  createdAt: Date;
}

const Notifications: React.FC = () => {
  // State to manage notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Example data (this could come from an API or be dynamically added)
  useEffect(() => {
    const fetchNotifications = async () => {
      // Simulating fetching data from an API
      const mockNotifications: Notification[] = [
        {
          id: 1,
          message: 'You added a new expense: $200 for groceries',
          type: 'expense',
          createdAt: new Date(),
        },
        {
          id: 2,
          message: 'You created a new bucket: "Vacation Savings"',
          type: 'bucket',
          createdAt: new Date(),
        },
        {
          id: 3,
          message: 'Your account balance was updated: $1500',
          type: 'account',
          createdAt: new Date(),
        },
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold mb-4">Notifications</h2>

      {/* If there are no notifications */}
      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{notification.message}</p>
                  <p className="text-sm text-gray-500">
                    {notification.createdAt.toLocaleDateString()}{' '}
                    {notification.createdAt.toLocaleTimeString()}
                  </p>
                </div>
                {/* Display icon or tag based on notification type */}
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
