import { useState } from "react";

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12; // Convert annual % to decimal and per month
  const totalPayments = years * 12; // Total months

  if (monthlyRate === 0) return principal / totalPayments; // If 0% interest

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)
  );
}

function calculateTotalInterest(principal, annualRate, years) {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const totalPayments = years * 12;
  return monthlyPayment * totalPayments - principal;
}

function App() {
  const [form, setForm] = useState({});
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [years, setYears] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    const years = parseFloat(form.years);
    const interest = parseFloat(form.interest);
    if (isNaN(amount) || isNaN(years) || isNaN(interest)) {
      alert("Enter valid numbers");
    }
    if (amount <= 0 || years <= 0 || interest <= 0) {
      alert("Numbers must be greater than 0");
    }
    const mp = calculateMonthlyPayment(amount, interest, years).toFixed(2);
    setMonthlyPayment(mp);
    setYears(years);
    const ti = calculateTotalInterest(amount, interest, years).toFixed(2);
    setTotalInterest(ti);
  };
  return (
    <div>
      <form
        className="flex flex-col items-center gap-4 m-6"
        onSubmit={handleSubmit}
      >
        <label htmlFor="" className="">
          Amount:
          <input
            className="border border-black"
            type="number"
            name="amount"
            id=""
            onChange={handleChange}
          />
        </label>
        <label htmlFor="" className="">
          Interest:{" "}
          <input
            className="border border-black"
            type="float"
            name="interest"
            id=""
            onChange={handleChange}
          />
        </label>
        <label htmlFor="" className=" ">
          {" "}
          Years:
          <input
            className="border border-black"
            type="number"
            name="years"
            id=""
            onChange={handleChange}
          />
        </label>

        <button className="bg-black text-white">Calculate</button>
      </form>

      <div className="flex flex-col items-start gap-4 m-6">
        <p>Monthly mortgage payment : {monthlyPayment}</p>
        <p>total payment amount {(monthlyPayment * 12 * years).toFixed(2)}</p>
        <p>Total interest paid {totalInterest - monthlyPayment * 12}</p>
      </div>
    </div>
  );
}

export default App;
