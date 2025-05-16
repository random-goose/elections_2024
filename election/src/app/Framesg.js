import React, { useState, useEffect } from 'react';
import './style.module.css';
import Select from './Select.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


  const Frameg = () => {
    const [selectedOptions1, setSelectedOptions1] = useState([]);
    const [selectedFrames1, setSelectedFrames1] = useState([]);
    const [selectedParties1, setSelectedParties1] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    // const [selectedFrames2, setSelectedFrames2] = useState([]);
    const [selectedParties2, setSelectedParties2] = useState([]);
    // const [selectedOptions3, setSelectedOptions3] = useState([]);
    const [selectedFrames3, setSelectedFrames3] = useState([]);
    const [selectedParties3, setSelectedParties3] = useState([]);
    const [selectedOptions4, setSelectedOptions4] = useState([]);
    const [selectedFrames4, setSelectedFrames4] = useState([]);
    // const [selectedParties4, setSelectedParties4] = useState([]);

    const [newsSource1, setnewsSource1] = useState([]);
    const [newsSource2, setnewsSource2] = useState([]);
    const [newsSource3, setnewsSource3] = useState([]);
    const [newsSource4, setnewsSource4] = useState([]);

    const [startDate1, setStartDate1] = useState(new Date('01-01-2014')); // mm-dd-yyy format
    const [endDate1, setEndDate1] = useState(new Date('05-22-2019')); // mm-dd-yyyy format
    const [startDate2, setStartDate2] = useState(new Date('01-01-2014')); // mm-dd-yyy format
    const [endDate2, setEndDate2] = useState(new Date('05-22-2019')); // mm-dd-yyyy format
    const [startDate3, setStartDate3] = useState(new Date('01-01-2014')); // mm-dd-yyy format
    const [endDate3, setEndDate3] = useState(new Date('05-22-2019')); // mm-dd-yyyy format
    const [startDate4, setStartDate4] = useState(new Date('01-01-2014')); // mm-dd-yyy format
    const [endDate4, setEndDate4] = useState(new Date('05-22-2019')); // mm-dd-yyyy format

    const [chartData1, setChartData1] = useState({
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
    });
    const [chartData2, setChartData2] = useState({
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
    });
    const [chartData3, setChartData3] = useState({
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
    });
    const [chartData4, setChartData4] = useState({
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
    });
    
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
    {value: 'Miscellaneous', label: 'Miscellaneous'},
    {value: 'Attack', label: 'Attack'},
  ];

  const allParties = [
    { value: 'BJP', label: 'BJP' },
    { value: 'INC', label: 'INC' },
    { value: 'AA.P', label: 'AAP' },
    { value: 'TMC', label: 'TMC' },
    { value: 'NCP', label: 'NCP' },
    { value: 'S.P', label: 'SP' }, // have to change from S.P to S..P in the dataset
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


  const allParties2 = [
    { value: 'BJP', label: 'BJP' },
    { value: 'INC', label: 'INC' },
    { value: 'AA.P', label: 'AAP' },
    { value: 'TMC', label: 'TMC' },
    { value: 'NCP', label: 'NCP' },
    { value: 'S.P', label: 'SP' }, // have to change from S.P to S..P in the dataset
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
  

  const fetchData = async (endpoint, payloadSetter) => {
    try {
      // Construct payload based on selected filters
      let payload = {
        start_date: startDate1.toISOString().split('T')[0], // format as yyyy-mm-dd
        end_date: endDate1.toISOString().split('T')[0], // format as yyyy-mm-dd
        parties: selectedParties1.map(party => party.value),
        states: selectedOptions1.map(state => state.value),
        predictions: selectedFrames1.map(frame => frame.value),
        src: newsSource1.map(source => source.value),
      };
  
      // Adjust payload for specific endpoints if needed
      if (endpoint === 'http://127.0.0.1:5001/prediction') {
        payload = {
          start_date: startDate2.toISOString().split('T')[0], // format as yyyy-mm-dd
          end_date: endDate2.toISOString().split('T')[0], // format as yyyy-mm-dd
          parties: selectedParties2.map(party => party.value),
          states: selectedOptions2.map(state => state.value),
          src: newsSource2.map(source => source.value),
        };
      }

      if (endpoint === 'http://127.0.0.1:5001/source') {
        payload = {
          start_date: startDate1.toISOString().split('T')[0], // format as yyyy-mm-dd
          end_date: endDate1.toISOString().split('T')[0], // format as yyyy-mm-dd
          parties: selectedParties1.map(party => party.value),
          states: selectedOptions1.map(state => state.value),
          predictions: selectedFrames1.map(frame => frame.value),
        };
      }

      if (endpoint === 'http://127.0.0.1:5001/statess') {
        payload = {
          start_date: startDate3.toISOString().split('T')[0], // format as yyyy-mm-dd
          end_date: endDate3.toISOString().split('T')[0], // format as yyyy-mm-dd
          parties: selectedParties3.map(party => party.value),
          src: newsSource3.map(source => source.value),
          predictions: selectedFrames3.map(frame => frame.value),
        };
      }

      if (endpoint === 'http://127.0.0.1:5001/partiess') {
        payload = {
          start_date: startDate4.toISOString().split('T')[0], // format as yyyy-mm-dd
          end_date: endDate4.toISOString().split('T')[0], // format as yyyy-mm-dd
          states: selectedOptions4.map(state => state.value),
          src: newsSource4.map(source => source.value),
          predictions: selectedFrames4.map(frame => frame.value),
        };
      }
    
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      payloadSetter({
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('http://127.0.0.1:5001/source', setChartData1);
  }, [startDate1, endDate1, selectedParties1, selectedOptions1, selectedFrames1]);

  useEffect(() => {
    fetchData('http://127.0.0.1:5001/prediction', setChartData2);
  }, [startDate2, endDate2, selectedParties2, selectedOptions2, newsSource2]);

  useEffect(() => {
    fetchData('http://127.0.0.1:5001/statess', setChartData3);
  }, [startDate3, endDate3, selectedParties3, selectedFrames3 , newsSource3]);

  useEffect(() => {
    fetchData('http://127.0.0.1:5001/partiess', setChartData4);
  }, [startDate4, endDate4, selectedOptions4, selectedFrames4, newsSource4]);

  return (
    <div>
      {/* First row */}
      <div className="row-container">
      <div className="container">
        {/* First set of dropdowns, date pickers, and iframe */}
        <div className="dropdown-container">
          <Select
            options={allStates}
            title="Select States"
            setSelected={setSelectedOptions1}
            selected={selectedOptions1}
            hide={true}
          />
          <Select
            options={allFrames}
            title="Select Frames"
            setSelected={setSelectedFrames1}
            selected={selectedFrames1}
            hide={true}
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
        <div className="dropdown-container">
          <Select
            options={allParties}
            title="Select Parties"
            setSelected={setSelectedParties1}
            selected={selectedParties1}
            hide={true}
          />
        </div>
        {/* <iframe src={constructLink(selectedOptions1, selectedFrames1, selectedParties1, startDate1, endDate1, 1)} title='filter_frames_bar' width="100%" height="500" frameBorder="0"></iframe> */}
        <Bar data={chartData1} />
      </div>
    </div>

    {/* Second row */}
    <div className="row-container">
    <div className="container">
        {/* Second set of dropdowns, date pickers, and iframe */}
        <div className="dropdown-container">
          <Select
            options={allStates}
            title="Select States"
            setSelected={setSelectedOptions2}
            selected={selectedOptions2}
            hide={true}
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
        <div className="dropdown-container">
          <Select
            options={allParties}
            title="Select Parties"
            setSelected={setSelectedParties2}
            selected={selectedParties2}
            hide={true}
          />
        </div>
        <div className="dropdown-container">
          <Select
            options={allSources}
            title="Select News Source"
            setSelected={setnewsSource2}
            selected={newsSource2}
            hide={true}
          />
        </div>
        {/* <iframe src={constructLink(selectedOptions2, selectedFrames2, selectedParties2, startDate2, endDate2, 2)} title='filter_parties' width="100%" height="500" frameBorder="0"></iframe> */}
        <Bar data={chartData2} />
      </div>

      <div className="container">
        {/* Second set of dropdowns, date pickers, and iframe */}
        <div className="dropdown-container">
          <Select
            options={allFrames}
            title="Select Frames"
            setSelected={setSelectedFrames3}
            selected={selectedFrames3}
            hide={true}
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
        <div className="dropdown-container">
          <Select
            options={allParties2}
            title="Select Parties"
            setSelected={setSelectedParties3}
            selected={selectedParties3}
            hide={true}
          />
        </div>
        <div className="dropdown-container">
          <Select
            options={allSources}
            title="Select News Source"
            setSelected={setnewsSource3}
            selected={newsSource3}
            hide={true}
          />
        </div>
        {/* <iframe src={constructLink(selectedOptions3, selectedFrames3, selectedParties3, startDate3, endDate3, 3)} title='filter' width="100%" height="500" frameBorder="0"></iframe> */}
        <Bar data={chartData3} />
      </div>

      <div className="container">
        {/* Third set of dropdowns, date pickers, and iframe */}
        <div className="dropdown-container">
          <Select
            options={allStates}
            title="Select States"
            setSelected={setSelectedOptions4}
            selected={selectedOptions4}
            hide={true}
          />
          <Select
            options={allFrames}
            title="Select Frames"
            setSelected={setSelectedFrames4}
            selected={selectedFrames4}
            hide={true}
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
        <div className="dropdown-container">
        </div>
        <div className="dropdown-container">
          <Select
            options={allSources}
            title="Select News Source"
            setSelected={setnewsSource4}
            selected={newsSource4}
            hide={true}
          />
        </div>
        {/* <iframe src={constructLink(selectedOptions4, selectedFrames4, selectedParties4, startDate4, endDate4, 4)} title='filter' width="100%" height="500" frameBorder="0"></iframe> */}
        <Bar data={chartData4} />
      </div>
    </div>
  </div>
  
  );
}

export default Frameg;