import React from 'react'; // Import React

function Balance({ transactions }) { // Define Balance component, receiving transactions as a prop
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0); // Calculate total income

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0); // Calculate total expense

  const balance = totalIncome - totalExpense; // Calculate balance

  return (
    <div>
      <h2>Balance</h2>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expense: ${totalExpense}</p>
      <p>Balance: ${balance}</p>
    </div>
  );
}

export default Balance; // Export Balance component