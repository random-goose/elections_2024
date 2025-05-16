import React, { useState } from "react";

export default function Graph2() {
  const [startDate, setStartDate] = useState("2010-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  const [selectedColumn, setSelectedColumn] = useState("upper_bound_impressions");
  const [partyList, setPartyList] = useState([]);
  const [urlGraph2, setUrlGraph2] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handlePartyChange = (event) => {
		const selectedOptions = Array.from(event.target.selectedOptions).map(
			(opt) => opt.value
		);
	
		if (selectedOptions.includes("all parties")) {
			const allOptions = Array.from(event.target.options)
				.map((opt) => opt.value)
				.filter((value) => value !== "all parties");
			setPartyList(allOptions);
		} else {
			setPartyList(selectedOptions);
		}
	};

  const handleGenerateGraph2 = async () => {
    const requestData = {
      start_date: startDate,
      end_date: endDate,
      render_column: selectedColumn,
      party: partyList.join(",")
    };

    try {
      const queryParamsGraph2 = new URLSearchParams(requestData).toString();
      setUrlGraph2(`http://localhost:5100/graph2?${queryParamsGraph2}`);
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
              <h5>Advertising Data per Party</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="start-date-Graph2" className="form-label fw-bold">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="start-date-Graph2"
                      value={startDate}
                      onChange={handleStartDateChange}
                      min="2010-01-01"
                      max="2024-12-31"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="end-date-Graph2" className="form-label fw-bold">
                      End Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="end-date-Graph2"
                      value={endDate}
                      onChange={handleEndDateChange}
                      min="2010-01-01"
                      max="2024-12-31"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="column-select-Graph2" className="form-label fw-bold">
                      Select Data Column:
                    </label>
                    <select
                      className="form-select"
                      id="column-select-Graph2"
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
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="party-select-Graph2" className="form-label fw-bold">
                      Select Parties:
                    </label>
                    <select
                      multiple
                      className="form-select"
                      id="party-select-Graph2"
                      value={partyList}
                      onChange={handlePartyChange}
                    >
                      <option value="all parties">All Parties</option>
                      <option value="BJP">BJP</option>
                      <option value="INC">INC</option>
                      <option value="AAP">AAP</option>
                      <option value="AIADMK">AIADMK</option>
                      <option value="TRS">TRS</option>
                      <option value="TDP">TDP</option>
                      <option value="AIMIM">AIMIM</option>
                      <option value="SP">SP</option>
                      <option value="Shivsena">Shivsena</option>
                      <option value="JJP">JJP</option>
                      <option value="YSRCP">YSRCP</option>
                      <option value="BSP">BSP</option>
                      <option value="TMC">TMC</option>
                      <option value="NCP">NCP</option>
                      <option value="RJD">RJD</option>
                      <option value="DMK">DMK</option>
                      <option value="SAD">SAD</option>
                      <option value="SDF">SDF</option>
                      <option value="INLD">INLD</option>
                      <option value="JD(S)">JD(S)</option>
                      <option value="MNM">MNM</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center mb-4">
                <button
                  className="btn btn-primary px-4 py-2"
                  onClick={handleGenerateGraph2}
                >
                  Generate Graph
                </button>
              </div>
              {urlGraph2 && (
                <div className="border-top pt-4">
                  <iframe
                    src={urlGraph2}
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
