// pages/index.js
'use client';

import { useState } from 'react';

export default function Home() {
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');

  const handleApplyFilters = () => {
    // Construct the URL with filters
    const baseUrl = 'http://localhost:3000/d-solo/a02d06e8-0eb7-4541-8201-431c2e154bec/precog?orgId=1&panelId=2';
    const urlWithFilters = `${baseUrl}&var-filter1=${filter1}&var-filter2=${filter2}`;

    // Redirect or update iframe source with the filtered URL
    // For simplicity, let's just log it here
    console.log('Filtered URL:', urlWithFilters);
  };

  return (
    <div>
      <h1>Filter Visualization</h1>
      <div>
        <label htmlFor="filter1">Filter 1:</label>
        <input 
          id="filter1" 
          type="text" 
          value={filter1} 
          onChange={(e) => setFilter1(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="filter2">Filter 2:</label>
        <input 
          id="filter2" 
          type="text" 
          value={filter2} 
          onChange={(e) => setFilter2(e.target.value)} 
        />
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
      <div>
        <iframe 
          src="" // Initially empty, will be filled dynamically
          width="450" 
          height="200" 
          frameBorder="1" 
        />
      </div>
    </div>
  );
}
