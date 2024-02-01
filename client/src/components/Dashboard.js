import React from 'react';
import { useState, useEffect} from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Dashboard = () => {

    const [budget, setBudget] = useState([])
    const navigate = useNavigate()

    useEffect (() => {
        axios.get("http://localhost:8000/api/budget") // GET ALL
        .then(res => {
            console.log(res.data)
            setBudget(res.data)
        })
        .catch(err => console.log(err))
    },[])

const removeFromDom = budgetId => {
        setBudget(budget.filter(budget => budget._id != budgetId))
    }
    


    return (    
        <div>
            <br></br><br></br>
            <h1>Welcome to iBudget!</h1> 
            <br></br>
            <table class="table table-sm">
                <thead>
                    <tr class="table-success">
                        <th>&nbsp;&nbsp;Month & Year</th>
                        <th>Income</th>
                        <th>Total Expenses</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    budget.map((budget, index) => {
                    return <tr class="table-success" key={budget._id}>
                        <td>
                        <td>&nbsp;&nbsp;{budget._id.month} {budget._id.year}  </td>
                        </td>
                        <td></td> 
                        <td>
                            <p>${budget.totalExpenses}</p>
                        </td>
                        <td>
                            <p>
                                <Link to={"/details/" + budget._id.year+ "/" + budget._id.month + "/" + budget.totalExpenses}>Details</Link>&nbsp;&nbsp;&nbsp;
                                <Link to={"/income/" + budget._id.year+ "/" + budget._id.month}>Edit Income</Link>&nbsp;&nbsp;&nbsp;                                 
                            </p>
                        </td>
                    </tr>
                    })
                }
            </tbody>
        </table>
        <br></br>&nbsp; &nbsp;
        <Link className="dash"  to={"/addExpense"}>Add an Expense</Link>
        </div>
    )
}   
export default Dashboard

// <button onClick = {e => {deleteHandler(budget._id)}} className="btn btn-danger btn-sm">Delete</button>
