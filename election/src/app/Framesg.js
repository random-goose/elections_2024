import React, { useState, useEffect } from 'react';
import './style.module.css';
import Select from './Select.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Frameg = () => {
  // Data states
  const [selectedOptions1, setSelectedOptions1] = useState([]);
  const [selectedFrames1, setSelectedFrames1] = useState([]);
  const [selectedParties1, setSelectedParties1] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedParties2, setSelectedParties2] = useState([]);
  const [selectedFrames3, setSelectedFrames3] = useState([]);
  const [selectedParties3, setSelectedParties3] = useState([]);
  const [selectedOptions4, setSelectedOptions4] = useState([]);
  const [selectedFrames4, setSelectedFrames4] = useState([]);

  const [newsSource1, setNewsSource1] = useState([]);
  const [newsSource2, setNewsSource2] = useState([]);
  const [newsSource3, setNewsSource3] = useState([]);
  const [newsSource4, setNewsSource4] = useState([]);

  // Date states with proper initialization
  const defaultStartDate = new Date('2014-01-01');
  const defaultEndDate = new Date('2019-05-22');
  
  const [startDate1, setStartDate1] = useState(defaultStartDate);
  const [endDate1, setEndDate1] = useState(defaultEndDate);
  const [startDate2, setStartDate2] = useState(defaultStartDate);
  const [endDate2, setEndDate2] = useState(defaultEndDate);
  const [startDate3, setStartDate3] = useState(defaultStartDate);
  const [endDate3, setEndDate3] = useState(defaultEndDate);
  const [startDate4, setStartDate4] = useState(defaultStartDate);
  const [endDate4, setEndDate4] = useState(defaultEndDate);

  // Loading states for the charts
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  // Default chart data structure
  const defaultChartData = {
    labels: [],
    datasets: [
      {
        label: 'Data',
        data: [],
        backgroundColor: 'rgba(78, 102, 156, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart data states
  const [chartData1, setChartData1] = useState(defaultChartData);
  const [chartData2, setChartData2] = useState(defaultChartData);
  const [chartData3, setChartData3] = useState(defaultChartData);
  const [chartData4, setChartData4] = useState(defaultChartData);

  // Options for dropdowns
  const allStates = [
    { value: 'himachal pradesh', label: 'Himachal Pradesh' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'orissa', label: 'Orissa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tamil nadu', label: 'Tamil Nadu' },
    { value: 'uttar pradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'andhra pradesh', label: 'Andhra Pradesh' },
    { value: 'goa', label: 'Goa' },
    { value: 'madhya pradesh', label: 'Madhya Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west bengal', label: 'West Bengal' },
    { value: 'jammu & kashmir', label: 'Jammu & Kashmir' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'assam', label: 'Assam' },
    { value: 'arunachal pradesh', label: 'Arunachal Pradesh' },
    { value: 'pondicherry', label: 'Pondicherry' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'lakshadweep', label: 'Lakshadweep' },
    { value: 'dadra & nagar haveli', label: 'Dadra & Nagar Haveli' },
    { value: 'andaman & nicobar islands', label: 'Andaman & Nicobar Islands' },
    { value: 'daman & diu', label: 'Daman & Diu' },
  ];

  const allFrames = [
    { value: 'Miscellaneous', label: 'Miscellaneous' },
    { value: 'Attack', label: 'Attack' },
  ];

  const allParties = [
    { value: 'BJP', label: 'BJP' },
    { value: 'INC', label: 'INC' },
    { value: 'AA.P', label: 'AAP' },
    { value: 'TMC', label: 'TMC' },
    { value: 'NCP', label: 'NCP' },
    { value: 'S.P', label: 'SP' },
    { value: 'SHIVSENA', label: 'Shiv Sena' },
    { value: 'JD(U)', label: 'JDU' },
    { value: 'TDP', label: 'TDP' },
    { value: 'YSRCP', label: 'YSRCP' },
    { value: 'DM.K', label: 'DMK' },
    { value: 'BS..P', label: 'BSP' },
    { value: 'RJD', label: 'RJD' },
    { value: 'BJD', label: 'BJD' },
    { value: 'CPI(M)', label: 'CPI(M)' }
  ];

  const allSources = [
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Ndtv', label: 'Ndtv' },
    { value: 'Toi', label: 'Toi' },
    { value: 'India_Today', label: 'India Today' },
    { value: 'Indian_Express', label: 'Indian Express' },
    { value: 'India_Zee', label: 'India Zee' },
    { value: 'Republic', label: 'Republic' },
  ];

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  // Fetch data function
  const fetchData = async (endpoint, setChartData, setLoading, config) => {
    if (!config) return;
    
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if data is empty
      if (Object.keys(data).length === 0) {
        setChartData({
          ...defaultChartData,
          labels: ['No Data'],
          datasets: [{
            ...defaultChartData.datasets[0],
            data: [0]
          }]
        });
      } else {
        setChartData({
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Data',
              data: Object.values(data),
              backgroundColor: 'rgba(78, 102, 156, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setChartData({
        ...defaultChartData,
        labels: ['Error'],
        datasets: [{
          ...defaultChartData.datasets[0],
          data: [0]
        }]
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if configuration has required fields
  const hasValidConfig = (config) => {
    // Check if the object has at least one non-empty array
    if (!config) return false;
    
    // For endpoint-specific validations you could expand this
    const hasNonEmptyArrays = Object.values(config).some(
      value => Array.isArray(value) && value.length > 0
    );
    
    return hasNonEmptyArrays;
  };

  // Effect for chart 1
  useEffect(() => {
    const config = {
      start_date: formatDate(startDate1),
      end_date: formatDate(endDate1),
      parties: selectedParties1.map(party => party.value),
      states: selectedOptions1.map(state => state.value),
      predictions: selectedFrames1.map(frame => frame.value),
      src: newsSource1.map(source => source.value),
    };
    
    // Only fetch if we have at least one selection
    if (hasValidConfig(config)) {
      fetchData('http://127.0.0.1:5001/source', setChartData1, setLoading1, config);
    }
  }, [startDate1, endDate1, selectedParties1, selectedOptions1, selectedFrames1, newsSource1]);

  // Effect for chart 2
  useEffect(() => {
    const config = {
      start_date: formatDate(startDate2),
      end_date: formatDate(endDate2),
      parties: selectedParties2.map(party => party.value),
      states: selectedOptions2.map(state => state.value),
      src: newsSource2.map(source => source.value),
    };
    
    if (hasValidConfig(config)) {
      fetchData('http://127.0.0.1:5001/prediction', setChartData2, setLoading2, config);
    }
  }, [startDate2, endDate2, selectedParties2, selectedOptions2, newsSource2]);

  // Effect for chart 3
  useEffect(() => {
    const config = {
      start_date: formatDate(startDate3),
      end_date: formatDate(endDate3),
      parties: selectedParties3.map(party => party.value),
      predictions: selectedFrames3.map(frame => frame.value),
      src: newsSource3.map(source => source.value),
    };
    
    if (hasValidConfig(config)) {
      fetchData('http://127.0.0.1:5001/statess', setChartData3, setLoading3, config);
    }
  }, [startDate3, endDate3, selectedParties3, selectedFrames3, newsSource3]);

  // Effect for chart 4
  useEffect(() => {
    const config = {
      start_date: formatDate(startDate4),
      end_date: formatDate(endDate4),
      states: selectedOptions4.map(state => state.value),
      predictions: selectedFrames4.map(frame => frame.value),
      src: newsSource4.map(source => source.value),
    };
    
    if (hasValidConfig(config)) {
      fetchData('http://127.0.0.1:5001/partiess', setChartData4, setLoading4, config);
    }
  }, [startDate4, endDate4, selectedOptions4, selectedFrames4, newsSource4]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="dashboard">
      {/* First row */}
      <div className="row-container">
        <div className="container">
          <h2>News Source Analysis</h2>
          <div className="dropdown-container">
            <Select
              options={allStates}
              title="Select States"
              setSelected={setSelectedOptions1}
              selected={selectedOptions1}
              hide={false}
            />
            <Select
              options={allFrames}
              title="Select Frames"
              setSelected={setSelectedFrames1}
              selected={selectedFrames1}
              hide={false}
            />
            <Select
              options={allParties}
              title="Select Parties"
              setSelected={setSelectedParties1}
              selected={selectedParties1}
              hide={false}
            />
          </div>
          <div className="date-picker-container">
            <div className="date-picker-label">Starting Date:</div>
            <DatePicker
              selectsStart
              selected={startDate1}
              onChange={date => setStartDate1(date)}
              startDate={startDate1}
              dateFormat="dd/MM/yyyy"
            />
            <div className="date-picker-label">Ending Date:</div>
            <DatePicker
              selectsEnd
              selected={endDate1}
              onChange={date => setEndDate1(date)}
              endDate={endDate1}
              startDate={startDate1}
              minDate={startDate1}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="chart-container">
            {loading1 ? (
              <div className="loading">Loading...</div>
            ) : (
              <Bar data={chartData1} options={chartOptions} height={300} />
            )}
          </div>
        </div>
      </div>

      {/* Second row - two charts side by side */}
      <div className="row-container">
        <div className="container">
          <h2>Prediction Analysis</h2>
          <div className="dropdown-container">
            <Select
              options={allStates}
              title="Select States"
              setSelected={setSelectedOptions2}
              selected={selectedOptions2}
              hide={false}
            />
            <Select
              options={allParties}
              title="Select Parties"
              setSelected={setSelectedParties2}
              selected={selectedParties2}
              hide={false}
            />
            <Select
              options={allSources}
              title="Select News Source"
              setSelected={setNewsSource2}
              selected={newsSource2}
              hide={false}
            />
          </div>
          <div className="date-picker-container">
            <div className="date-picker-label">Starting Date:</div>
            <DatePicker
              selectsStart
              selected={startDate2}
              onChange={date => setStartDate2(date)}
              startDate={startDate2}
              dateFormat="dd/MM/yyyy"
            />
            <div className="date-picker-label">Ending Date:</div>
            <DatePicker
              selectsEnd
              selected={endDate2}
              onChange={date => setEndDate2(date)}
              endDate={endDate2}
              startDate={startDate2}
              minDate={startDate2}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="chart-container">
            {loading2 ? (
              <div className="loading">Loading...</div>
            ) : (
              <Bar data={chartData2} options={chartOptions} height={300} />
            )}
          </div>
        </div>

        <div className="container">
          <h2>States Analysis</h2>
          <div className="dropdown-container">
            <Select
              options={allFrames}
              title="Select Frames"
              setSelected={setSelectedFrames3}
              selected={selectedFrames3}
              hide={false}
            />
            <Select
              options={allParties}
              title="Select Parties"
              setSelected={setSelectedParties3}
              selected={selectedParties3}
              hide={false}
            />
            <Select
              options={allSources}
              title="Select News Source"
              setSelected={setNewsSource3}
              selected={newsSource3}
              hide={false}
            />
          </div>
          <div className="date-picker-container">
            <div className="date-picker-label">Starting Date:</div>
            <DatePicker
              selectsStart
              selected={startDate3}
              onChange={date => setStartDate3(date)}
              startDate={startDate3}
              dateFormat="dd/MM/yyyy"
            />
            <div className="date-picker-label">Ending Date:</div>
            <DatePicker
              selectsEnd
              selected={endDate3}
              onChange={date => setEndDate3(date)}
              endDate={endDate3}
              startDate={startDate3}
              minDate={startDate3}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="chart-container">
            {loading3 ? (
              <div className="loading">Loading...</div>
            ) : (
              <Bar data={chartData3} options={chartOptions} height={300} />
            )}
          </div>
        </div>
      </div>

      {/* Third row */}
      <div className="row-container">
        <div className="container">
          <h2>Parties Analysis</h2>
          <div className="dropdown-container">
            <Select
              options={allStates}
              title="Select States"
              setSelected={setSelectedOptions4}
              selected={selectedOptions4}
              hide={false}
            />
            <Select
              options={allFrames}
              title="Select Frames"
              setSelected={setSelectedFrames4}
              selected={selectedFrames4}
              hide={false}
            />
            <Select
              options={allSources}
              title="Select News Source"
              setSelected={setNewsSource4}
              selected={newsSource4}
              hide={false}
            />
          </div>
          <div className="date-picker-container">
            <div className="date-picker-label">Starting Date:</div>
            <DatePicker
              selectsStart
              selected={startDate4}
              onChange={date => setStartDate4(date)}
              startDate={startDate4}
              dateFormat="dd/MM/yyyy"
            />
            <div className="date-picker-label">Ending Date:</div>
            <DatePicker
              selectsEnd
              selected={endDate4}
              onChange={date => setEndDate4(date)}
              endDate={endDate4}
              startDate={startDate4}
              minDate={startDate4}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="chart-container">
            {loading4 ? (
              <div className="loading">Loading...</div>
            ) : (
              <Bar data={chartData4} options={chartOptions} height={300} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frameg;