import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const ClassificationReportHeatmap = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Fetch CSV data
        fetch('http://localhost:3500/static/fake_news_dummy.csv')
            .then(response => response.text())
            .then(csvString => {
                // Parse CSV string to array of objects
                const { data } = Papa.parse(csvString, { header: true });
                // Sort data by date
                data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
                setData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching CSV data:', error));
    }, []);

    // Function to filter data based on selected date range
    useEffect(() => {
        const filterData = () => {
            if (!startDate || !endDate) {
                setFilteredData(data);
                return;
            }
            const filtered = data.filter(row => {
                const date = new Date(row.Dates);
                return date >= startDate && date <= endDate;
            });
            setFilteredData(filtered);
        };
        filterData();
    }, [startDate, endDate, data]);

    return (
        <div>
            {/* Date Pickers */}
            <label htmlFor="start-date">Start Date:</label>
            <input type="date" id="start-date" onChange={e => setStartDate(new Date(e.target.value))} />
            <label htmlFor="end-date">End Date:</label>
            <input type="date" id="end-date" onChange={e => setEndDate(new Date(e.target.value))} />

            {/* Plot */}
            <Plot
                data={[
                    {
                        z: calculateMetrics(filteredData),
                        type: 'heatmap',
                        colorscale: 'Viridis',
                    }
                ]}
                layout={{
                    title: 'Confusion Matrix',
                    xaxis: { title: '' },
                    yaxis: { title: '' }
                }}
            />
        </div>
    );
};

const calculateMetrics = (data) => {
    let TP = 0, FP = 0, TN = 0, FN = 0;
    data.forEach(row => {
        const modelOutput = parseInt(row['outputs']);
        const actualOutput = parseInt(row['gold_labels']);
        if (modelOutput === 1 && actualOutput === 1) TP++;
        else if (modelOutput === 1 && actualOutput === 0) FP++;
        else if (modelOutput === 0 && actualOutput === 0) TN++;
        else if (modelOutput === 0 && actualOutput === 1) FN++;
    });
    return [[TP, FP], [FN, TN]];
};

export default ClassificationReportHeatmap;