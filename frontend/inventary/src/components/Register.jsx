import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigation = useNavigate();
    const [state, setState] = useState({});
    const [type, setType] = useState('voter');

    let defaultState = {
        address: '',
        name: '',
        phone: '',
        email: '',
        Id: '',
        symbol: '',
    }

    const handleChange = (e) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const submit = () => {
        if (type === 'voter') {
            axios.post('http://localhost:5000/voterReg', state)
                .then(res => {
                    alert("Voter added Successfully")
                })
        } else {
            axios.post('http://localhost:5000/candidateReg', state)
                .then((res) => {
                    alert("Candidate Added Successfully");
                    setState(defaultState)
                })
        }
    }

    const find = () => {
        axios.get(`http://localhost:5000/getItemByPhone?phone=${state?.phone1}`)
            .then(res => {
                if (type === 'update') {
                    if (res.data.length > 0) {
                        setState(prev => ({ ...prev, ...res.data?.[0] }))
                    }
                }
            })
    }

    console.log(state, type)
    return (
        <div style={{ height: "100vh" }}>
            <div>
                <button onClick={()=>{setType('voter');setState(prev=>({...prev,symbol:''}))}}>Voter Registration</button>
                <button onClick={()=>{setType('candidate');setState(prev=>({...prev,id:''}))}}>Candidate Registration</button>
            </div>
            <form onSubmit={e => { e.preventDefault(); submit() }} method='post'>
                <h1>{type} Registration</h1>
                {
                    type === 'voter' ?
                        <>
                            <label>Voter ID</label>
                            <input name='id' value={state?.id} onChange={e => handleChange(e)} required />
                        </>
                        :
                        <>
                            <label>Symbol</label>
                            <input name='symbol' value={state?.symbol} onChange={e => handleChange(e)} required />
                        </>
                }
                <label>Name</label>
                <input name='name' value={state?.name} onChange={e => handleChange(e)} required />
                <label>Phone number</label>
                <input name='phone' type='number' value={state?.phone} onChange={e => handleChange(e)} required />
                <label>Email</label>
                <input name='email' type='email' value={state?.email} onChange={e => handleChange(e)} required />
                <label>Address</label>
                <input name='address' type='textArea' value={state?.address} onChange={e => handleChange(e)} required />

                <input type="submit" value="Submit"></input>
                <input type="submit" value="Home" onClick={() => navigation('/home')}></input>
            </form>
        </div>
    )
}

export default Register