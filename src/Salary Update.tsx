import { Fragment } from "react";
import React, { useState } from "react";

function SalaryUpdate() {

  //Declaring constants for the popup box
  const [isPopupEarningOpen, setIsPopupEarningOpen] = useState(false);
  const [isPopupDeductionOpen, setIsPopupDeductionOpen] = useState(false);

  //Declaring constants needed for the Calculation of Salary
  const [basicSalary, setBasicSalary] = useState("");
  const [resultBasicSalary, setResultBasicSalary] = useState("");
  const [grossEarning, setGrossEarning] = useState("");
  const [grossDeduction, setGrossDeduction] = useState("");
  const [epf8, setEPF8] = useState("");
  const [apit, setAPIT] = useState("");
  const [netSalary, setNetSalary] = useState("");
  const [epf12, setEPF12] = useState("");
  const [epf3, setEPF3] = useState("");
  const [ctc, setCTC] = useState("");

  const [totalEarnings, setTotalEarnings] = useState("");
  const [travel, setTravel] = useState("");
  const [health, setHealth] = useState("");
  const [totalErningsEPF, setTotalEarningsEPF] = useState("");
  const [nopay, setNoPay] = useState("");
  const [other, setOtherDeduction] = useState("");
  const [grossSalaryEPF, setGrossSalaryEPF] = useState("");

  //State to store the list of earnings and deductions with values amount and name 
  const [earnings, setEarnings] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [newEarnings, setNewEarnings] = useState({ name: "", amount: "" });
  const [newDeductions, setNewDeductions] = useState({ name: "", amount: "" });

  const handleBasicSalary = (basicSalary, travel, health, nopay, other) => {
    
    //Store the basic salary value in value
    const value = basicSalary.target.value;

    //Set the state for basic salary and other inputs
    setBasicSalary(value);
    setHealth(health);
    setTravel(travel);
    setNoPay(nopay);
    setOtherDeduction(other);

    //Calculate and set the results
    setResultBasicSalary(`${value}`);
    setGrossEarning(`${value} + ${travel} + ${health} - ${nopay} - ${other}`);
    setGrossDeduction(`${nopay} + ${other}`);
    setEPF8(`(${value}*0.08 + ${health}*0.08 - ${nopay}*0.08 - ${other}*0.08`);
    setAPIT(`${value}`);
    setNetSalary(`${value}`);
    setEPF12(`(${value}*0.12 + ${health}*0.12 - ${nopay}*0.12 - ${other}*0.12`);
    setEPF3(`(${value}*0.03 + ${health}*0.03 - ${nopay}*0.03 - ${other}*0.03`);
    setCTC(`${value}`);
    setTotalEarnings(`${value} + ${travel} + ${health}`);
    setTotalEarningsEPF(`${value} + ${health}`);
    setGrossSalaryEPF(`${value} + ${health} - ${nopay} - ${other}`);
  };


  //Handling the opening and closing the popup
  const closePopup = () => {
    setIsPopupEarningOpen(false);
  };

  const openPopup = () => {
    setIsPopupEarningOpen(true);
  };

  const closePopupDeduction = () => {
    setIsPopupDeductionOpen(false);
  };

  const openPopupDeduction = () => {
    setIsPopupDeductionOpen(true);
  };

  //Handline new earnings
  const handleEarnings = () => {
    setEarnings([...earnings, newEarnings]);
    setNewEarnings({ name: "", amount: "" });

    closePopup();
  };

  //Handling new deductions
  const handleDeductions = () => {
    setDeductions([...deductions, newDeductions]);
    setNewDeductions({ name: "", amount: "" });
    closePopupDeduction();
  };

  //Handle new earnings when checkbox is checked
  const handleNewEarningChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEarnings((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //Handle new deductions when checkbox is checked
  const handleNewDeductionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDeductions((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //Set the state for edit mode and the index of the entry being edited
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Function to populate the form fields when editing an entry
  const setEditEntry = (index, entry, type) => {
    if (type === "earning") {
      setNewEarnings({ ...entry, isEPFChecked: entry.isEPFChecked || false });
      setEditMode(true);
      setEditIndex(index);
      openPopup();
    } else if (type === "deduction") {
      setNewDeductions({ ...entry, isEPFChecked: entry.isEPFChecked || false });
      setEditMode(true);
      setEditIndex(index);
      openPopupDeduction();
    }
  };

  // Function to handle editing an existing entry
  const handleEdit = (type) => {
    if (type === "earning") {
      setEarnings((prevState) => {
        const updatedEarnings = [...prevState];
        updatedEarnings[editIndex] = newEarnings;
        return updatedEarnings;
      });
      closePopup();
    } else if (type === "deduction") {
      setDeductions((prevState) => {
        const updatedDeductions = [...prevState];
        updatedDeductions[editIndex] = newDeductions;
        return updatedDeductions;
      });
      closePopupDeduction();
    }
    
    setNewEarnings({ name: "", amount: "", isEPFChecked: false });
    setNewDeductions({ name: "", amount: "", isEPFChecked: false });
    setEditMode(false);
    setEditIndex(null);
  };

  //Handling to remove an entry
  const handleRemove = (index, type) => {
    if (type === "earning") {
      setEarnings((prevState) => prevState.filter((_, i) => i !== index));
    } else if (type === "deduction") {
      setDeductions((prevState) => prevState.filter((_, i) => i !== index));
    }
  };

  //Handling to reset all the entries
  const handleReset = () => {
    setBasicSalary("");
    setResultBasicSalary("");
    setGrossEarning("");
    setGrossDeduction("");
    setEPF8("");
    setAPIT("");
    setNetSalary("");
    setEPF12("");
    setEPF3("");
    setCTC("");
    setTotalEarnings("");
    setTravel("");
    setHealth("");
    setTotalEarningsEPF("");
    setNoPay("");
    setOtherDeduction("");
    setGrossSalaryEPF("");
    setEarnings([]);
    setDeductions([]);
    setNewEarnings({ name: "", amount: "" });
    setNewDeductions({ name: "", amount: "" });
  };

  //HTML structure for the Salary Calculation Webpage
  return (
    <Fragment>
      <body>

        {/* Structure for the entering of salary values for calculation */}
        <div className="calculate-salary-box">
          <div className="wrapper">
            <h4>Calculate Your Salary</h4>
            <div className="reset-wrapper">

             {/* Setting the reset icon and calling the function */}
              <img
                className="reset"
                src="Images/Icon color.png"
                onClick={handleReset}
              />
              <label
                style={{ color: "#0052EA", cursor: "pointer" }}
                onClick={handleReset}
              >
                Reset
              </label>
            </div>

            <label className="sub-heading">Basic Salary</label>
            <br />

            {/* Inserting the basic salary and calling the function  */}
            <input
              type="text"
              value={basicSalary}
              onChange={handleBasicSalary}
            />

            <br />
            <br />

            <label className="sub-heading">Earnings</label>
            <br />
            <label className="label-tooltip">
              Allowance, Fixed Allowance, Bonus etc.
            </label>

            <br />
            <br />

            {/* Map through the earning array */}
            {earnings.map((earning, index) => (
              <div key={index}>
                <label>{earning.name}: </label>
                <label>
                  {earning.amount}{" "}
                  {earning.isEPFChecked ? (
                    <img src="Images/checked.png" />
                  ) : null}{" "}
                  EPF/ETF

                  {/* Calling the edit entry function for earning */}
                  <img
                    src="Images/edit.png"
                    onClick={() => setEditEntry(index, earning, "earning")}
                  />

                  {/* Calling the removing entry function earning */}
                  <img
                    src="Images/cut.png"
                    onClick={() => handleRemove(index, "earning")}
                    style={{ cursor: "pointer" }}
                  />
                </label>

                <br />
                <br />
              </div>
            ))}

            {/* //Calling the popup box */}
            <label className="add-button" onClick={openPopup}>
              + Add New Allowance
            </label>
            <br />
            <hr />
            <br />

            <label className="sub-heading">Deductions</label>
            <br />

            <label className="label-tooltip">
              Salary Advances, Local Deductions and all
            </label>
            <br />
            <br />
            
            {/* Map through the deduction array */}
            {deductions.map((deduction, index) => (
              <div key={index}>
                <label>{deduction.name}: </label>
                <label>
                  {deduction.amount}{" "}
                  {deduction.isEPFChecked ? (
                    <img src="Images/checked.png" />
                  ) : null}{" "}
                  EPF/ETF

                  {/* Calling the edit entry function for deduction */}
                  <img
                    src="Images/edit.png"
                    onClick={() => setEditEntry(index, deduction, "deduction")}
                  />

                  {/* Calling the remove entry function for deduction */}
                  <img
                    src="Images/cut.png"
                    onClick={() => handleRemove(index, "deduction")}
                    style={{ cursor: "pointer" }}
                  />
                </label>

                <br />
                <br />
              </div>
            ))}

            {/* Calling the popup box */}
            <label
              className="add-button"
              onClick={openPopupDeduction}
              style={{ marginTop: "526px" }}
            >
              + Add New Deduction
            </label>
          </div>
        </div>

        {/* Structure for the result salary */}
        <div className="result-salary-box">
          <div className="wrapper">
            <h4>Your Salary</h4>
            <div className="result-headings">
              <label className="label-tooltip">Items</label>
              <label style={{ float: "right" }} className="label-tooltip">
                Amount
              </label>
              <br />
              <br />

              {/* Display the calculated values */}
              <label>Basic Salary</label>
              <label style={{ float: "right" }}>{resultBasicSalary}</label>
              <br />
              <br />

              <label>Gross Earnings</label>
              <label style={{ float: "right" }}>{grossEarning}</label>
              <br />
              <br />

              <label>Gross Deduction</label>
              <label style={{ float: "right" }}>{grossDeduction}</label>
              <br />
              <br />

              <label>Employee EPF(8%)</label>
              <label style={{ float: "right" }}>{epf8}</label>
              <br />
              <br />

              <label>APIT</label>
              <label style={{ float: "right" }}>{apit}</label>
              <br />
              <br />
            </div>

            <br />

            <div className="net-salary-border">
              <div className="net-salary-label">
                <label className="sub-heading">Net Salary(Take Home)</label>
                <label style={{ float: "right" }}>{netSalary}</label>

                <br />
                <br />
                <br />

                <div className="result-headings">
                  <label className="label-tooltip">
                    Contribution from the Employer
                  </label>

                  <br />
                  <br />
                  <label>Employeer EPF (12%)</label>
                  <label style={{ float: "right" }}>{epf12}</label>
                  <br />
                  <br />
                  <label>Employeer ETF (3%)</label>
                  <label style={{ float: "right" }}>{epf3}</label>
                  <br />
                  <br />
                  <br />
                  <br />
                  <label>CTC Cost to Company</label>
                  <label style={{ float: "right" }}>{ctc}</label>
                </div>
              </div>
            </div>
          </div>

          {/* Structure for the add earning popup box */}
          {isPopupEarningOpen && (
            <div className="popup-content-earning">
              <span
                className="close"
                onClick={closePopup}
                style={{
                  cursor: "pointer",
                  float: "right",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                &times;
              </span>
              <h2>Add New Earnings</h2>
              <hr />
              <p>Earnings Name</p>
              
              {/* Entering new earning */}
              <input
                type="text"
                placeholder="Eg: Travel"
                value={newEarnings.name}
                onChange={(e) =>
                  setNewEarnings({ ...newEarnings, name: e.target.value })
                }
              />
              <br />
              <p>Amount</p>

              <input
                type="text"
                placeholder="Eg: 10,000"
                value={newEarnings.amount}
                onChange={(e) =>
                  setNewEarnings({ ...newEarnings, amount: e.target.value })
                }
              />

              <br />
              <br />
              <label className="checkbox-container">

                {/* Checkbox for indicating the EPF/ETF is checked or not */}
                <input
                  type="checkbox"
                  name="isEPFChecked"
                  checked={newEarnings.isEPFChecked}
                  onChange={handleNewEarningChange}
                />
                EPF/ETF
              </label>
              <br />
              <br />
              <hr />
              <div className="button-container">

                {/* Closing the popup */}
                <button className="cancelEarning" onClick={closePopup}>
                  Cancel
                </button>

                {/* Handling editing the inputs for earning */}
                {editMode ? (
                  <button
                    className="addEarning"
                    onClick={() => handleEdit("earning")}
                  >
                    Add
                  </button>
                ) : (
                  <button className="addEarning" onClick={handleEarnings}>
                    Add
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Structure for the add deduction popup box */}
          {isPopupDeductionOpen && (
            <div className="popup-content-deduction">
              <span
                className="close"
                onClick={closePopupDeduction}
                style={{
                  cursor: "pointer",
                  float: "right",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                &times;
              </span>
              <h2>Add New Deductions</h2>
              <hr />
              <p>Deductions Name</p>

              {/* Entering new deduction */}
              <input
                type="text"
                placeholder="Eg: No Pay"
                value={newDeductions.name}
                onChange={(e) =>
                  setNewDeductions({ ...newDeductions, name: e.target.value })
                }
              />
              <br />
              <p>Amount</p>
              <input
                type="text"
                placeholder="Eg: 10,000"
                value={newDeductions.amount}
                onChange={(e) =>
                  setNewDeductions({ ...newDeductions, amount: e.target.value })
                }
              />

              <br />
              <br />

              <label className="checkbox-container">

                {/* Checkbox for indicating the EPF/ETF is checked or not */}
                <input
                  type="checkbox"
                  name="isEPFChecked"
                  checked={newDeductions.isEPFChecked}
                  onChange={handleNewDeductionChange}
                />
                EPF/ETF
              </label>
              <br />
              <br />
              <hr />
              <div className="button-container">

                {/* Closing the popup */}
                <button
                  className="cancelDeduction"
                  onClick={closePopupDeduction}
                >
                  Cancel
                </button>

                {/* Handling editing the inputs for deduction */}
                {editMode ? (
                  <button
                    className="addDeduction"
                    onClick={() => handleEdit("deduction")}
                  >
                    Add
                  </button>
                ) : (
                  <button className="addDeduction" onClick={handleDeductions}>
                    Add
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </body>
    </Fragment>
  );
}

// Export the SalaryUpdate component as the default export
export default SalaryUpdate;
