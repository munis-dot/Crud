import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Manage = () => {
    const navigation = useNavigate();

    let defaultData = {
        id:'',
        name:'',
        quantity:'',
        cost:''
    }

    const [state, setState] = useState({});
    const [error,setError] = useState(false);

    let type = window.location.pathname==='/update' ? "update" : "create"

    const handleChange = (e) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(()=>{

            axios.get(`http://localhost:5000/getItemByID?id=${state?.id}`)
            .then(res=>{
                console.log(res.data)
                if(type==='update'){
                    if(res.data.length>0){
                        setState(prev=>(res.data?.[0]))
                    }
                    else{
                        setState(prev=>defaultData)
                    }
                }
                else{
                    if(res.data.length>0){
                        setError(true)
                    }
                    else{
                        setError(false)
                    }
                }
               
            })
            .catch(err=>console.log(err))
        
    },[state?.id])

    const submit = ()=>{
        if(type==='update'){
            axios.put('http://localhost:5000/updateItem',state)
            .then(res=>{
                alert("Item Updated Successfully")
            })
        }
        else{
            axios.post('http://localhost:5000/createItem',state)
            .then(res=>{
                alert("Item Added Successfully");
                setState(defaultData)
            })
        }
    }

    console.log(state,error)

    return (
        <form onSubmit={e=>{e.preventDefault();submit()}} method='post'>
            <h1>{type==='update' ? "Update Item" : "Add New Item"}</h1>
            <label>Id</label>
            <input name='id' value={state?.id} onChange={e => handleChange(e)} required/>
            <p style={{fontSize:'10px',color:'red'}}>{error && "Id already exist"}</p>
            <label>Name</label>
            <input name='name' value={state?.name} onChange={e => handleChange(e)} required/>
            <label>Quantity</label>
            <input name='quantity' type='number' value={state?.quantity} onChange={e => handleChange(e)} required />
            <label>Cost</label>
            <input name='cost'  type='number' value={state?.cost} onChange={e => handleChange(e)} required/>
            <input type="submit" value="Submit" disabled={error}></input>
            <input type="submit" value="Home"  onClick={()=>navigation('/home')}></input>
        </form>
    )
}

export default Manage