import React, { useState } from "react";

export default function Graph6() {
    const [startDate, setStartDate] = useState("2010-01-01");
    const [endDate, setEndDate] = useState("2024-12-31");
    const [selectedColumn, setSelectedColumn] = useState("upper_bound_impressions");
    const [genderList, setGenderList] = useState([]);
    const [ageList, setAgeList] = useState([]);
    const [urlGraph7, setUrlGraph7] = useState("");

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
    };

    const handleGenderChange = (event) => {
		const selectedOptions = Array.from(event.target.selectedOptions).map(
			(opt) => opt.value
		);
	
		if (selectedOptions.includes("all genders")) {
			const allOptions = Array.from(event.target.options)
				.map((opt) => opt.value)
				.filter((value) => value !== "all genders");
			setGenderList(allOptions);
		} else {
			setGenderList(selectedOptions);
		}
	};

    const handleAgeChange = (event) => {
		const selectedOptions = Array.from(event.target.selectedOptions).map(
			(opt) => opt.value
		);
	
		if (selectedOptions.includes("all ages")) {
			const allOptions = Array.from(event.target.options)
				.map((opt) => opt.value)
				.filter((value) => value !== "all ages");
			setAgeList(allOptions);
		} else {
			setAgeList(selectedOptions);
		}
	};

    const handleGenerateGraph7 = async () => {
        const requestData = {
            start_date: startDate,
            end_date: endDate,
            render_column: selectedColumn,
            gender: genderList.join(","),
            age: ageList.join(","),
        };

        try {
            const queryParamsGraph7 = new URLSearchParams(requestData).toString();
            setUrlGraph7(`http://localhost:5100/graph7?${queryParamsGraph7}`);
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
                            <h5>Advetising Data for Genders From Parties</h5>
                            <div className="row g-3 mb-4">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="start-date-graph7" className="form-label fw-bold">
                                            Start Date:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="start-date-graph7"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            min="2010-01-01"
                                            max="2024-12-31"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="end-date-graph7" className="form-label fw-bold">
                                            End Date:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="end-date-graph7"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            min="2010-01-01"
                                            max="2024-12-31"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="column-select-graph7" className="form-label fw-bold">
                                            Select Data Column:
                                        </label>
                                        <select
                                            className="form-select"
                                            id="column-select-graph7"
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
                                        <label htmlFor="gender-select-graph7" className="form-label fw-bold">
                                            Select Genders:
                                        </label>
                                        <select
                                            multiple
                                            className="form-select"
                                            id="gender-select-graph7"
                                            value={genderList}
                                            onChange={handleGenderChange}
                                        >
                                            <option value="all genders">All Genders</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="unknown">Unknown</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="age-select-graph7" className="form-label fw-bold">
                                            Select Age:
                                        </label>
                                        <select
                                            multiple
                                            className="form-select"
                                            id="age-select-graph7"
                                            value={ageList}
                                            onChange={handleAgeChange}
                                        >
                                            <option value="all ages">All Ages</option>
                                            <option value="13-17">13-17</option>
                                            <option value="18-24">18-24</option>
                                            <option value="25-34">25-34</option>
                                            <option value="35-44">35-44</option>
                                            <option value="45-54">45-54</option>
                                            <option value="55-64">55-64</option>
                                            <option value="65+">65+</option>
                                            
                                            {/* Add more ages if needed */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-4">
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    onClick={handleGenerateGraph7}
                                >
                                    Generate Graph
                                </button>
                            </div>
                            {urlGraph7 && (
                                <div className="border-top pt-4">
                                    <iframe
                                        src={urlGraph7}
                                        className="w-100"
                                        style={{ height: "500px", border: "none" }}
                                        title="Graph 7"
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
