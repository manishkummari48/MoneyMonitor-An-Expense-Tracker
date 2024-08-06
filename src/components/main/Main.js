import React, { useEffect, useState } from 'react'
import './Main.css'
import Income from '../Income';
import Expense from '../Expense';
import TransactionList from '../TransactionList';
import Balance from '../Balance';

function Main() {

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

        const newTransaction = {
            email: localStorage.getItem('userEmail'),
            type: transaction.type,
            amount: parseFloat(transaction.amount),
            date: transaction.date,
            description: transaction.description,
        };
        
        postTransaction(newTransaction)

    };

    const deleteTransaction = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/transactions/${id}`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
              setTransactions(transactions.filter(transaction => transaction.id !== id));
            } else {
              console.error('Failed to delete transaction');
            }
          } catch (error) {
            console.error('An error occurred while deleting the transaction:', error);
        }

        // fetchTransactions(localStorage.getItem('userEmail'))
    };

    const calculateBalance = (transactions) => {
        return transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
    };

    const postTransaction = async(newTransaction)=>{

        const response = await fetch('http://localhost:5000/transactions', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:newTransaction.email,
                type:newTransaction.type,
                amount:newTransaction.amount,
                date:newTransaction.date,
                description:newTransaction.description
            }),
        });
    
        if (response.ok) {
            alert('Transaction Updated');
        } else {
            alert('Failed to update Transaction');
        }
    } 

    const fetchTransactions = async(email)=>{
        const response  = await fetch('http://localhost:5000/transactions');
        const data = await response.json();
        const filteredTransactions = data.filter(transaction => transaction.email === email);
        setTransactions(filteredTransactions);
        console.log("All Transactions :", data)
    }


    useEffect(()=>{
       const email = localStorage.getItem('userEmail');
       fetchTransactions(email);
    },[])


  return (
    <div className='Main'>
        <h1>Income & Expense Tracker</h1>
        <div className="card-container">
            <div className="card" onClick={() =>{setShowBalance(!showBalance); setShowIncome(false); setShowExpense(false); setShowTransactions(false);
            } }>
            <h2>Balance</h2>
            </div>
            <div className="card" onClick={() => {setShowIncome(!showIncome); setShowBalance(false); setShowExpense(false) ;setShowTransactions(false)}}>
            <h2>Income</h2>
            </div>
            <div className="card" onClick={() => {setShowExpense(!showExpense); setShowBalance(false) ;setShowIncome(false); setShowTransactions(false)}}>
            <h2>Expense</h2>
            </div>
            <div className="card" onClick={() => {setShowTransactions(!showTransactions); setShowBalance(false); setShowExpense(false); setShowIncome(false)}}>
            <h2>Transactions</h2>
            </div>
        </div>
        {showBalance && <Balance transactions={transactions} />}
        {showIncome && <Income addTransaction={addTransaction} />}
        {showExpense && <Expense addTransaction={addTransaction} />}
        {showTransactions && <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />}
    </div>
  )
}

export default Main