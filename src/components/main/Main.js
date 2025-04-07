import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Main.css';
import Income from '../Income';
import Expense from '../Expense';
import TransactionList from '../TransactionList';
import Balance from '../Balance';
import { loginContext } from '../../contexts/loginContext';

function Main() {
    let [loggedInUser] = useContext(loginContext);
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
            username: loggedInUser.username,
            type: transaction.type,
            amount: parseFloat(transaction.amount),
            date: transaction.date,
            description: transaction.description,
        };

        postTransaction(newTransaction);
    };

   

    const deleteTransaction = async (transactionId) => {
        try {
            console.log(transactionId)
            const response = await axios.delete(`http://localhost:3500/transactions-api/delete-transaction/${transactionId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            fetchTransactions(loggedInUser.username);
            console.log(response.data.message);
            alert(response.data.message);
        } catch (error) {
            console.error("Error deleting transaction:", error);
            alert("Failed to delete transaction");
        }
    };
    const calculateBalance = (transactions) => {
        return transactions.reduce((acc, transaction) => {
            return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
    };



const postTransaction = async (newTransaction) => {
    try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // Make the POST request with Authorization header
        const response = await axios.post("http://localhost:3500/transactions-api/add-transaction",newTransaction,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Attach token here
                },
            }
        );

        if (response.status === 200) {
            fetchTransactions(loggedInUser.username);
            alert("Transaction Updated");
        } else {
            alert("Failed to update Transaction");
        }
    } catch (error) {
        console.error("Error updating transaction:", error);
        alert("An error occurred while updating the transaction");
    }
};


const fetchTransactions = async (username) => {
    
        if (!username) return; // ✅ Ensure username is available before making a request
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await axios.get(`http://localhost:3500/transactions-api/get-transactions/${username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

           // console.log("Fetched Transactions:", response.data.payload);
            setTransactions(response.data.payload || []);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
};

   
    
    useEffect(() => {
        if (loggedInUser.username) {
            fetchTransactions(loggedInUser.username);
        }
    }, [loggedInUser.username]);

    return (
        <div className='Main'>
            <h1 className="title"> MONEY MONITOR</h1>
            <div className="card-container">
                <div className="card" onClick={() => { setShowBalance(!showBalance); setShowIncome(false); setShowExpense(false); setShowTransactions(false); }}>
                    <h2>Balance</h2>
                </div>
                <div className="card" onClick={() => { setShowIncome(!showIncome); setShowBalance(false); setShowExpense(false); setShowTransactions(false); }}>
                    <h2>Income</h2>
                </div>
                <div className="card" onClick={() => { setShowExpense(!showExpense); setShowBalance(false); setShowIncome(false); setShowTransactions(false); }}>
                    <h2>Expense</h2>
                </div>
                <div className="card" onClick={() => { setShowTransactions(!showTransactions); setShowBalance(false); setShowExpense(false); setShowIncome(false); }}>
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

export default Main;
