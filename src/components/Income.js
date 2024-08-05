import React, { useState } from 'react';

function Income({ addTransaction }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ type: 'income', amount: parseFloat(amount), date, description });
    setAmount('');
    setDate('');
    setDescription('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="transaction-container">
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={today}
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
}

export default Income;
