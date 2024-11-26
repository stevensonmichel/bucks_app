import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Bucket {
  id: number;
  name: string;
  max_amount: number;
  deadline: string;
}

const Buckets: React.FC = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [selectedBucketId, setSelectedBucketId] = useState<number | null>(null); 
  const navigate = useNavigate();

  const bucketListRef = useRef<HTMLUListElement | null>(null); 

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    fetch('http://127.0.0.1:8000/api/buckets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBuckets(data);
      })
      .catch((error) => console.error('Error fetching buckets:', error));
  }, []);

  const handleEdit = (id: number) => {
    const bucketToEdit = buckets.find((bucket) => bucket.id === id);
    if (bucketToEdit) {
      navigate(`/edit-bucket/${id}`, { state: { bucket: bucketToEdit } }); 
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this bucket?');
    if (!confirmed) return;

    const token = localStorage.getItem('access_token');

    fetch(`http://127.0.0.1:8000/api/buckets/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setBuckets((prevBuckets) => prevBuckets.filter((bucket) => bucket.id !== id));
          alert('Bucket deleted successfully!');
        } else {
          alert('Failed to delete bucket.');
        }
      })
      .catch((error) => console.error('Error deleting bucket:', error));
  };

  const handleSelect = (id: number) => {
    setSelectedBucketId((prevId) => (prevId === id ? null : id)); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bucketListRef.current && !bucketListRef.current.contains(event.target as Node)) {
        setSelectedBucketId(null); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-10 p-20">
      {buckets.map((bucket) => (
        <div
          key={bucket.id}
          className={`border-8 p-10 rounded-lg relative transition-colors cursor-pointer ${
            selectedBucketId === bucket.id
              ? 'bg-blue-200 border-cyan-600'
              : 'bg-white border-cyan-500 hover:bg-gray-200'
          }`}
          onClick={() => handleSelect(bucket.id)}
        >
          <h2 className="text-3xl font-bold flex justify-center items-center">{bucket.name}</h2>
          <div className="flex flex-col space-y-2 mt-4">
            <div className="flex">
            
              <div className="w-1/2 flex flex-col space-y-4">
                <span className="text-xl">Expenses</span>
                <span className="text-xl">Remaining</span>
                <span className="text-xl">Tracks</span>
                <span className="text-xl">Deadline</span>
              </div>

             
              <div className="border-l-2 border-gray-300 mx-4"></div>

          
              <div className="w-1/2 flex flex-col space-y-4 text-right">
                <span className="text-xl">{bucket.max_amount || 'None'}</span>
                <span className="text-xl">$ 450</span>
                <span className="text-xl">OK</span>
                <span className="text-xl block whitespace-nowrap overflow-hidden">{bucket.deadline}</span>
              </div>
            </div>
          </div>

         
          {selectedBucketId === bucket.id && (
            <div
              className="absolute top-4 right-4 flex space-x-2"
              onClick={(e) => e.stopPropagation()} 
            >
              <button
                onClick={() => handleEdit(bucket.id)}
                className="text-sm text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bucket.id)}
                className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Buckets;
