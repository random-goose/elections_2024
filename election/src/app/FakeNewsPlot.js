import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const ClassificationReportBarplot = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch and parse CSV data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3500/static/datewise_results.csv');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const csvString = await response.text();

                // Parse CSV string to array of objects
                const { data: parsedData, errors } = Papa.parse(csvString, {
                    header: true,
                    skipEmptyLines: true,
                    dynamicTyping: true,
                    transformHeader: (header) => header.trim() // Clean headers
                });

                if (errors.length > 0) {
                    console.warn('CSV parsing errors:', errors);
                }

                // Filter out rows with missing essential data
                const validData = parsedData.filter(row =>
                    row.created_utc && row.subreddit && (row.count !== undefined && row.count !== null)
                );

                // Sort data by date
                validData.sort((a, b) => new Date(a.created_utc) - new Date(b.created_utc));

                console.log('Parsed data sample:', validData.slice(0, 3)); // Debug log

                setData(validData);
                setFilteredData(validData);
                setError(null);
            } catch (error) {
                console.error('Error fetching CSV data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter data based on selected date range
    useEffect(() => {
        const filterData = () => {
            if (!startDate || !endDate) {
                setFilteredData(data);
                return;
            }

            const filtered = data.filter(row => {
                const date = new Date(row.created_utc); // Using created_utc field
                return date >= startDate && date <= endDate;
            });

            console.log('Filtered data length:', filtered.length); // Debug log
            setFilteredData(filtered);
        };

        filterData();
    }, [startDate, endDate, data]);

    // Calculate aggregated counts per subreddit
    const calculateSubredditCounts = (data) => {
        const subredditCounts = {};

        data.forEach(row => {
            const subreddit = row.subreddit;
            const count = parseInt(row.count) || 0;

            if (subredditCounts[subreddit]) {
                subredditCounts[subreddit] += count;
            } else {
                subredditCounts[subreddit] = count;
            }
        });

        // Sort subreddits by total count (descending)
        const sortedSubreddits = Object.entries(subredditCounts)
            .sort(([, a], [, b]) => b - a);

        return {
            subreddits: sortedSubreddits.map(([subreddit]) => `r/${subreddit}`),
            counts: sortedSubreddits.map(([, count]) => count)
        };
    };

    const { subreddits, counts } = calculateSubredditCounts(filteredData);

    // Show loading state
    if (loading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="text-center">Loading data...</div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="text-center text-red-600">
                    Error loading data: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
  <h4 className="text-center mb-4">Fake news spread on Reddit</h4>

  <div className="mb-6 flex justify-center items-center gap-6  sm:flex-nowrap m-6">
    <div className="flex items-center gap-2">
      <label htmlFor="start-date" className="font-medium">Start Date:</label>
      <input
        type="date"
        id="start-date"
        className="border rounded px-2 py-1 mx-2"
        onChange={e => setStartDate(e.target.value ? new Date(e.target.value) : null)}
      />
      <label htmlFor="end-date" className="font-medium mx-2">End Date:</label>
      <input
        type="date"
        id="end-date"
        className="border rounded px-2 py-1"
        onChange={e => setEndDate(e.target.value ? new Date(e.target.value) : null)}
      />
      <button
      className="px-4 py-2 bg-blue-500 mx-4 text-white rounded hover:bg-blue-600"
      onClick={() => {
        setStartDate(null);
        setEndDate(null);
        document.getElementById('start-date').value = '';
        document.getElementById('end-date').value = '';
      }}
    >
      Clear Filters
    </button>
    </div>

    
  </div>


            <div className="bg-white rounded-lg shadow-lg p-4 m-4">
                {subreddits.length > 0 ? (
                    <Plot
                        data={[
                            {
                                x: subreddits,
                                y: counts,
                                type: 'bar',
                                marker: {
                                    color: 'rgba(55, 128, 191, 0.7)',
                                    line: {
                                        color: 'rgba(55, 128, 191, 1.0)',
                                        width: 1
                                    }
                                },
                                hovertemplate: '<b>%{x}</b><br>Count: %{y}<extra></extra>'
                            }
                        ]}
                        layout={{
                            autosize: true,
                            title: {
                                text: 'Subreddit Activity Count',
                                font: { size: 20 }
                            },
                            xaxis: {
                                tickangle: -45
                            },
                            yaxis: {
                                title: 'Fake News Count'
                            },
                            margin: { b: 120 },
                            height: 600,
                            showlegend: false
                        }}
                        config={{
                            displayModeBar: true,
                            displaylogo: false
                        }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%' }}
                    />

                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No data to display for the selected date range
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-gray-600 text-center">
                Showing data for {filteredData.length} records out of {data.length} total
                {startDate && endDate && (
                    <span> from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}</span>
                )}
            </div>

            {/* Debug information */}
            <div className="mt-4 text-xs text-gray-400 text-center">
                {subreddits.length} subreddits found, Total counts: {counts.reduce((a, b) => a + b, 0)}
            </div>
        </div>
    );
};

export default ClassificationReportBarplot;