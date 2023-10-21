
import React, { useEffect, useState } from 'react';

const BadWordsInDb: React.FC = () => {
  const [bwcount, setbwcount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getbwcount');
        const data = await response.json();
        console.log(data.data)
        setbwcount(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-sm text-center mb-4 w-full text-gray-400">{bwcount} bad words in db</div>
  );
};

export default BadWordsInDb;
