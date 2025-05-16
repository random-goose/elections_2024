import React, { useState } from "react";

export default function Results() {
    const [stateList, setStateList] = useState([]);
    const [urlResults, setUrlResults] = useState("");
   

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

    const handleGenerateResults = async () => {
        const requestData = {
            state: stateList.join(","),
        };

        try {
            const queryParamsResults = new URLSearchParams(requestData).toString();
            setUrlResults(`http://localhost:5100/results?${queryParamsResults}`);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="container col-10">
                <div className="card shadow-sm">
                    <div className="card-body p-2 pb-0">
                        <div className="mb-2 text-center">
                            <h5 className="text-center">Election Results Analysis: Difference in Vote Share of all Parties in a State</h5>
                            <div className="row g-2 mb-2 justify-content-center">
                                <div className="col-md-3">
                                    <div className="form-group justify-content-center">
                                        <label htmlFor="state-select-results" className="form-label p-0 m-0">
                                            Select State:
                                        </label>
                                        <select
                                            multiple
                                            className="form-select"
                                            id="state-select-results"
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
                                            <option value="Delhi">Delhi</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
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
