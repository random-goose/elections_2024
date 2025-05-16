import React, { useState } from "react";

export default function Graph9() {
	const [startDate, setStartDate] = useState("2010-01-01");
	const [endDate, setEndDate] = useState("2024-12-31");
	const [urlGraph9, setUrlGraph9] = useState("");

	const handleStartDateChange = (event) => {
		setStartDate(event.target.value);
	};

	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
	};

	const handleGenerateGraph9 = async () => {
		const requestData = {
			start_date: startDate,
			end_date: endDate,
		};

		try {
			const queryParamsGraph9 = new URLSearchParams(requestData).toString();
			setUrlGraph9(`http://localhost:5100/graph9?${queryParamsGraph9}`);
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
							<h5>Ad Frequency</h5>
							<div className="row g-3 mb-4">
								<div className="col-md-3">
									<div className="form-group">
										<label htmlFor="start-date-graph9" className="form-label fw-bold">
											Start Date:
										</label>
										<input
											type="date"
											className="form-control"
											id="start-date-graph9"
											value={startDate}
											onChange={handleStartDateChange}
											min="2010-01-01"
											max="2024-12-31"
										/>
									</div>
								</div>
								<div className="col-md-3">
									<div className="form-group">
										<label htmlFor="end-date-graph9" className="form-label fw-bold">
											End Date:
										</label>
										<input
											type="date"
											className="form-control"
											id="end-date-graph9"
											value={endDate}
											onChange={handleEndDateChange}
											min="2010-01-01"
											max="2024-12-31"
										/>
									</div>
								</div>
							</div>
							<div className="text-center mb-4">
								<button
									className="btn btn-primary px-4 py-2"
									onClick={handleGenerateGraph9}
								>
									Generate Graph
								</button>
							</div>
							{urlGraph9 && (
								<div className="border-top pt-4">
									<iframe
										src={urlGraph9}
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
