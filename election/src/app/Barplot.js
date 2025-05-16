import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const ClassificationReportBarPlot = () => {
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

    // Function to calculate counts for each date
    const calculateCountsByDate = () => {
        const countsByDate = {};
        filteredData.forEach(row => {
            const date = row.Date; // Assuming 'Date' is the column name for the date
            const label = row.gold_labels; // Assuming 'gold_labels' is the column name for labels
            if (!countsByDate[date]) {
                countsByDate[date] = { '0': 0, '1': 0 }; // Initialize counts for each label
            }
            countsByDate[date][label]++;
        });
        return countsByDate;
    };

    // Function to format data for Plotly bar plot
    const formatDataForPlot = () => {
        const countsByDate = calculateCountsByDate();
        const dates = Object.keys(countsByDate);
        const counts = Object.values(countsByDate).map(counts => [counts['0'], counts['1']]);
        return { dates, counts };
    };

    const { dates, counts } = formatDataForPlot();

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
                        x: dates,
                        y: counts,
                        type: 'bar',
                        name: ['0', '1'], // Legend labels for each category
                        marker: {
                            color: ['#1f77b4', '#ff7f0e'] // Colors for each category
                        }
                    }
                ]}
                layout={{
                    title: 'Bar Plot of Gold Labels by Date',
                    xaxis: { title: 'Date' },
                    yaxis: { title: 'Count' },
                    barmode: 'stack' // Stack bars for different labels
                }}
            />
        </div>
    );
};

export default ClassificationReportBarPlot;
