import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const Read = () => {
    const [state, setState] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/getAllItems`)
            .then(res => {
                setState(() => res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <h2>Item Details</h2>
            <table>
                <thead>
                    <tr>
                        <td><th>Id</th></td>
                        <td><th>Name</th></td>
                        <td><th>Quantity</th></td>
                        <td><th>Cost</th></td>
                    </tr>
                </thead>
                <tbody>
                    {state.map(item => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.cost}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            <input type="submit" value="Home"  onClick={()=>navigation('/home')}></input>
        </>
    )
}

export default Read