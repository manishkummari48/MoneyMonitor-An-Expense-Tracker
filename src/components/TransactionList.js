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
          {incomeTransactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} deleteTransaction={() => deleteTransaction(index)} />
          ))}
        </ul>
      </div>
      <div className="expense-history">
        <h2>Expense History</h2>
        <ul>
          {expenseTransactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} deleteTransaction={() => deleteTransaction(index)} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionList;
