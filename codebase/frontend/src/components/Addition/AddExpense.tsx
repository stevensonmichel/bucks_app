import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



interface Expense {
    name: string;
    category: string;
    amount: number;
    date: string;
}

const AddExpense: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('')

    

    return (
        <div>
            <div className="mb-4">
                <label className="">Name</label>
                <input
                    type="text"
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=""
                    required
                />
            </div>

            <div className="mb-4">
                <label className="">Category</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className=""
                    required
                />
            </div>

            <div className="mb-4">
                <label className="">Amount</label>
                <input 
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className=""
                    required
                    />
            </div>

            <div className="mb-4">
                <label className="">Date</label>
                <input 
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className=""
                    required
                    />
            </div>

        </div>
    )
}



export default AddExpense;