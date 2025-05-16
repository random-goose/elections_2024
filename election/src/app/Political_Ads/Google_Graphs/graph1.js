import React, { useState } from "react";

export default function Graph1() {
  const [startDate, setStartDate] = useState("2010-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  const [selectedColumn, setSelectedColumn] = useState("upper_bound_impressions");
  const [urlGraph1, setUrlGraph1] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleGenerateGraph1 = async () => {
    const requestData = {
      start_date: startDate,
      end_date: endDate,
      render_column: selectedColumn
    };

    try {
      const queryParamsGraph1 = new URLSearchParams(requestData).toString();
      setUrlGraph1(`http://127.0.0.1:5050/graph1?${queryParamsGraph1}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h4 className="mb-0 text-center">Google Ads Data</h4>
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="mb-4">
              <h5>Total Advertising Data</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="start-date-Graph1" className="form-label fw-bold">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="start-date-Graph1"
                      value={startDate}
                      onChange={handleStartDateChange}
                      min="2010-01-01"
                      max="2024-12-31"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="end-date-Graph1" className="form-label fw-bold">
                      End Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="end-date-Graph1"
                      value={endDate}
                      onChange={handleEndDateChange}
                      min="2010-01-01"
                      max="2024-12-31"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="column-select-Graph1" className="form-label fw-bold">
                      Select Data Column:
                    </label>
                    <select
                      className="form-select"
                      id="column-select-Graph1"
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
                  onClick={handleGenerateGraph1}
                >
                  Generate Graph
                </button>
              </div>
              {urlGraph1 && (
                <div className="border-top pt-4">
                  <iframe
                    src={urlGraph1}
                    className="w-100"
                    style={{ height: "500px", border: "none" }}
                    title="Graph 1"
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
