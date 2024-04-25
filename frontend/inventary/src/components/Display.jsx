import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Display = () => {
    const [state, setState] = useState([]);
    const [user, setUser] = useState('');
    const [phone, setPhone] = useState();

    const navigation = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/getAllCandidate`)
            .then(res => {
                setState(() => res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const vote = (symbol) => {
        axios.put(`http://localhost:5000/vote`, { symbol:symbol, email:user.email })
            .then(res => {
                alert("voted Successfully")
            })
            .catch(err => console.log(err))
    }

    const login = ()=>{
        axios.get(`http://localhost:5000/getUser?phone=${phone}`)
        .then(res => {
            setUser(() => res.data);
        })
        .catch(err => console.log(err))
    }
    return (
        <>
            {
                user ?
                    <>
                        <h1> Candidate Details</h1>
                        <table>
                            <thead>
                                <tr>
                                    <td><th>Name</th></td>
                                    <td><th>symbol</th></td>
                                    <td><th>Action</th></td>

                                </tr>
                            </thead>
                            <tbody>
                                {state.map(item => {
                                    return (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.symbol}</td>
                                            <td><button onClick={() => vote(item.symbol)}>Vote</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </>
                    :
                    <>
                        <label>Phone number</label>
                        <input name='phone' type='number' value={phone} onChange={e => setPhone(e.target.value)} required />
                        <button onClick={login}>login</button>
                    </>

            }


            <input type="submit" value="Home" onClick={() => navigation('/home')}></input>
        </>
    )
}

export default Display