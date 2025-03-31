import React from 'react';
import Transaction from './Transaction';

function TransactionList({ transactions, deleteTransaction }) {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
    <div className="transaction-history">
      <div className="income-history">
        <h2>Income History</h2>
        <ul>
          {incomeTransactions.map((transaction) => (
            <Transaction 
              key={transaction._id} 
              transaction={transaction} 
              deleteTransaction={() => deleteTransaction(transaction._id)} // Use _id from MongoDB
            />
          ))}
        </ul>
      </div>
      <div className="expense-history">
        <h2>Expense History</h2>
        <ul>
          {expenseTransactions.map((transaction) => (
            <Transaction 
              key={transaction._id} 
              transaction={transaction} 
              deleteTransaction={() => deleteTransaction(transaction._id)} // Use _id from MongoDB
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionList;

