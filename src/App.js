import React, { useState } from 'react';
import './App.css';
import Income from './components/Income';
import Expense from './components/Expense';
import TransactionList from './components/TransactionList';
import Balance from './components/Balance';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const addTransaction = (transaction) => {
    const newBalance = calculateBalance([...transactions, transaction]);
    if (newBalance < 0 && transaction.type === 'expense') {
      alert('Cannot add expense. Balance will go below 0.');
      return;
    }
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const calculateBalance = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
  };

  return (
    <div className="App">
      <h1>Income & Expense Tracker</h1>
      <div className="card-container">
        <div className="card" onClick={() => setShowBalance(!showBalance)}>
          <h2>Balance</h2>
        </div>
        <div className="card" onClick={() => setShowIncome(!showIncome)}>
          <h2>Income</h2>
        </div>
        <div className="card" onClick={() => setShowExpense(!showExpense)}>
          <h2>Expense</h2>
        </div>
        <div className="card" onClick={() => setShowTransactions(!showTransactions)}>
          <h2>Transactions</h2>
        </div>
      </div>
      {showBalance && <Balance transactions={transactions} />}
      {showIncome && <Income addTransaction={addTransaction} />}
      {showExpense && <Expense addTransaction={addTransaction} />}
      {showTransactions && <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />}
    </div>
  );
}

export default App;
