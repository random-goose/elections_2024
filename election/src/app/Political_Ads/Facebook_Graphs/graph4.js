import React, { useState } from "react";

export default function Graph4() {
	const [startDate, setStartDate] = useState("2010-01-01");
	const [endDate, setEndDate] = useState("2024-12-31");
	const [selectedColumn, setSelectedColumn] = useState("upper_bound_impressions");
	const [languageList, setLanguageList] = useState([]);
	const [stateList, setStateList] = useState([]);
	const [urlGraph4, setUrlGraph4] = useState("");

	const handleStartDateChange = (event) => {
		setStartDate(event.target.value);
	};

	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
	};

	const handleColumnChange = (event) => {
		setSelectedColumn(event.target.value);
	};

	const handleLanguageChange = (event) => {
		const selectedOptions = Array.from(event.target.selectedOptions).map(
			(opt) => opt.value
		);

		if (selectedOptions.includes("all languages")) {
			const allOptions = Array.from(event.target.options)
				.map((opt) => opt.value)
				.filter((value) => value !== "all languages");
			setLanguageList(allOptions);
		} else {
			setLanguageList(selectedOptions);
		}
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

	const handleGenerateGraph4 = async () => {
		const requestData = {
			start_date: startDate,
			end_date: endDate,
			render_column: selectedColumn,
			language: languageList.join(","),
			state: stateList.join(","),
		};

		try {
			const queryParamsGraph4 = new URLSearchParams(requestData).toString();
			setUrlGraph4(`http://localhost:5100/graph4?${queryParamsGraph4}`);
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
							<h5>Partywise Spending by State and Language</h5>
							<div className="row g-3 mb-4">
								<div className="col-md-3">
									<div className="form-group">
										<label htmlFor="start-date-graph4" className="form-label fw-bold">
											Start Date:
										</label>
										<input
											type="date"
											className="form-control"
											id="start-date-graph4"
											value={startDate}
											onChange={handleStartDateChange}
											min="2010-01-01"
											max="2024-12-31"
										/>
									</div>
								</div>
								<div className="col-md-3">
									<div className="form-group">
										<label htmlFor="end-date-graph4" className="form-label fw-bold">
											End Date:
										</label>
										<input
											type="date"
											className="form-control"
											id="end-date-graph4"
											value={endDate}
											onChange={handleEndDateChange}
											min="2010-01-01"
											max="2024-12-31"
										/>
									</div>
								</div>
								<div className="col-md-3">
									<div className="form-group">
										<label htmlFor="column-select-graph4" className="form-label fw-bold">
											Select Data Column:
										</label>
										<select
											className="form-select"
											id="column-select-graph4"
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
										<label htmlFor="language-select-graph4" className="form-label fw-bold">
											Select Languages:
										</label>
										<select
											multiple
											className="form-select"
											id="language-select-graph4"
											value={languageList}
											onChange={handleLanguageChange}
										>
											<option value="all languages">All Languages</option>
											<option value="hi">Hindi</option>
											<option value="en">English</option>
											<option value="kn">Kananda</option>
											<option value="te">Telugu</option>
											<option value="mr">Marathi</option>
											<option value="ml">Malyalam</option>
											<option value="bn">Bengali</option>
											<option value="ta">Tamil</option>
											<option value="pa">Punjabi</option>
											<option value="gu">Gujarathi</option>
											<option value="or">Oria</option>
											<option value="pt">Portugeese</option>
											<option value="ar">Arabic</option>
											<option value="es">Spanish</option>
											<option value="de">German</option>
											<option value="ms">Malay</option>
											<option value="tr">Turkish</option>
											<option value="ur">Urdu</option>
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
										title="Graph 4"
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
