import React from 'react';

function Transaction({ transaction, deleteTransaction }) {
  return (
    <li className={transaction.type}>
      {transaction.date} - {transaction.description} - {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
      <button onClick={deleteTransaction} className="delete-button">Delete</button>
    </li>
  );
}

export default Transaction;
