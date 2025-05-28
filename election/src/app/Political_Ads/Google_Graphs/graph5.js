import React, { useState } from "react";

export default function Graph5() {
    const [startDate, setStartDate] = useState("2010-01-01");
    const [endDate, setEndDate] = useState("2024-12-31");
    const [selectedColumn, setSelectedColumn] = useState("upper_bound_impressions");
    const [stateList, setStateList] = useState([]);
    const [urlGraph2, setUrlGraph2] = useState("");
    const [genderList, setGenderList] = useState([]);
    const [ageList, setAgeList] = useState([]);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
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

    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
    };

    const handleStateChange = (event) => {
		const selectedOptions = Array.from(event.target.selectedOptions).map(
			(opt) => opt.value
		);
	
		if (selectedOptions.includes("all states")) {
			const allOptions = Array.from(event.target.options)
				.map((opt) => opt.value)
				.filter((value) => value !== "all states");
			setStateList(allOptions);
		} else {
			setStateList(selectedOptions);
		}
	};
    

    const handleGenerateGraph5 = async () => {
        const requestData = {
            start_date: startDate,
            end_date: endDate,
            render_column: selectedColumn,
            state: stateList.join(","),
            age: ageList.join(","),
            gender: genderList.join(",")
        };

        try {
            const queryParamsGraph5 = new URLSearchParams(requestData).toString();
            setUrlGraph2(`http://localhost:5050/graph5?${queryParamsGraph5}`);
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
										<label htmlFor="state-select-graph4" className="form-label fw-bold">
											Select States:
										</label>
										<select
											multiple
											className="form-select"
											id="state-select-graph4"
											value={stateList}
											onChange={handleStateChange}
										>
											<option value="all states">All States</option>
											<option value="Andhra Pradesh">Andhra Pradesh</option>
											<option value="Arunachal Pradesh">Arunachal Pradesh</option>
											<option value="Assam">Assam</option>
											<option value="Bihar">Bihar</option>
											<option value="Chhattisgarh">Chhattisgarh</option>
											<option value="Goa">Goa</option>
											<option value="Gujarat">Gujarat</option>
											<option value="Haryana">Haryana</option>
											<option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="India">India</option>
											<option value="Jharkhand">Jharkhand</option>
											<option value="Karnataka">Karnataka</option>
											<option value="Kerala">Kerala</option>
											<option value="Madhya Pradesh">Madhya Pradesh</option>
											<option value="Maharashtra">Maharashtra</option>
											<option value="Manipur">Manipur</option>
											<option value="Meghalaya">Meghalaya</option>
											<option value="Mizoram">Mizoram</option>
											<option value="Nagaland">Nagaland</option>
											<option value="Odisha">Odisha</option>
											<option value="Punjab">Punjab</option>
											<option value="Rajasthan">Rajasthan</option>
											<option value="Sikkim">Sikkim</option>
											<option value="Tamil Nadu">Tamil Nadu</option>
											<option value="Telangana">Telangana</option>
											<option value="Tripura">Tripura</option>
											<option value="Uttar Pradesh">Uttar Pradesh</option>
											<option value="Uttarakhand">Uttarakhand</option>
											<option value="West Bengal">West Bengal</option>
											<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
											<option value="Chandigarh">Chandigarh</option>
											<option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
											<option value="Delhi">Delhi</option>
											<option value="Jammu and Kashmir">Jammu and Kashmir</option>
											<option value="Ladakh">Ladakh</option>
											<option value="Lakshadweep">Lakshadweep</option>
											<option value="Puducherry">Puducherry</option>
										</select>
									</div>
								</div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="age-select-graph6" className="form-label fw-bold">
                                            Select Age:
                                        </label>
                                        <select
                                            multiple
                                            className="form-select"
                                            id="age-select-graph6"
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
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="gender-select-graph3" className="form-label fw-bold">
                                            Select Gender:
                                        </label>
                                        <select
                                            multiple
                                            className="form-select"
                                            id="gender-select-graph3"
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
                            </div>
                            <div className="text-center mb-4">
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    onClick={handleGenerateGraph5}
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
