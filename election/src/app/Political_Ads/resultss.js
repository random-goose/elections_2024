import React, { useState } from "react";

export default function Resultss() {
    const [partyList, setPartyList] = useState([]);
    const [urlResults, setUrlResults] = useState("");
   


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

    const handleGenerateResults = async () => {
        const requestData = {
            party: partyList.join(","),
        };

        try {
            const queryParamsResults = new URLSearchParams(requestData).toString();
            setUrlResults(`http://localhost:5100/resultss?${queryParamsResults}`);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="container col-10 mt-3">
                <div className="card shadow-sm">
                    <div className="card-body p-2 pb-0">
                        <div className="mb-2 text-center">
                            <h5 className="text-center">Election Results Analysis: Difference in Vote Share of a Party in all States</h5>
                            <div className="row g-2 mb-2 justify-content-center">
                            <div className="col-md-3">
									<div className="form-group">
										<label htmlFor="party-select-graph3" className="form-label fw-bold">
											Select Parties:
										</label>
										<select
											multiple
											className="form-select"
											id="party-select-graph3"
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
                            <div className="text-center mb-2">
                                <button
                                    className="btn btn-primary px-3 py-1"
                                    onClick={handleGenerateResults}
                                >
                                    Generate Graph
                                </button>
                            </div>
                            {urlResults && (
                                <div className="border-top mt-4 mb-0">
                                    <iframe
                                        src={urlResults}
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
