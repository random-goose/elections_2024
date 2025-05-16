import React, { useState } from "react";

export default function Graph4() {
    const [startDate, setStartDate] = useState("2010-01-01");
    const [endDate, setEndDate] = useState("2024-12-31");
    const [urlGraph4, setUrlGraph4] = useState("");
    const [selectedColumn, setSelectedColumn] = useState("upper_bound_impressions");

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
    };

    const handleGenerateGraph4 = async () => {
        const requestData = {
            start_date: startDate,
            end_date: endDate,
            render_column: selectedColumn,
        };

        try {
            const queryParamsGraph4 = new URLSearchParams(requestData).toString();
            setUrlGraph4(`http://localhost:5050/graph4?${queryParamsGraph4}`);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="mb-4">
                            <h5>Daily Sum for Data Column</h5>
                            <div className="row g-3 mb-4">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="start-date-Graph4" className="form-label fw-bold">
                                            Start Date:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="start-date-Graph4"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            min="2010-01-01"
                                            max="2024-12-31"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="end-date-Graph4" className="form-label fw-bold">
                                            End Date:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="end-date-Graph4"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            min="2010-01-01"
                                            max="2024-12-31"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="column-select-graph8" className="form-label fw-bold">
                                            Select Data Column:
                                        </label>
                                        <select
                                            className="form-select"
                                            id="column-select-graph8"
                                            value={selectedColumn}
                                            onChange={handleColumnChange}
                                        >
                                            <option value="lower_bound_spend">Lower Bound Spend</option>
                                            <option value="upper_bound_spend">Upper Bound Spend</option>
                                            <option value="lower_bound_impressions">Lower Bound Impressions</option>
                                            <option value="upper_bound_impressions">Upper Bound Impressions</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-4">
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    onClick={handleGenerateGraph4}
                                >
                                    Generate Graph
                                </button>
                            </div>
                            {urlGraph4 && (
                                <div className="border-top pt-4">
                                    <iframe
                                        src={urlGraph4}
                                        className="w-100"
                                        style={{ height: "500px", border: "none" }}
                                        title="Graph 3"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
