import React,{ useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Delete = () => {
const navigation = useNavigate();

    const [state, setState] = useState({id:''})

    const deleteIt = ()=>{
        axios.delete(`http://localhost:5000/deleteItem?id=${state.id}`)
        .then(res=>alert('Item deleted Successfully'))
        .catch(e=>console.log(e))
    }
    return (
        <>
            <h1>Delete Item</h1>
            <label>Id</label>
            <input name='id' value={state?.id} onChange={e => setState({id:e.target.value})} required />
            <input type="submit" value="Delete" disabled={!state.id} onClick={deleteIt}></input>
            <input type="submit" value="Home"  onClick={()=>navigation('/home')}></input>

        </>
    )
}

export default Delete