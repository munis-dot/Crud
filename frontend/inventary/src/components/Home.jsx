import React from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {

    const navigation = useNavigate();

  return (
    <div>
        <h1>Inventary Management System</h1>
        <div className='buttons'>
        <button onClick={()=>navigation('/create')} >Create</button>
        <button onClick={()=>navigation('/update')}>Update</button>
        <button onClick={()=>navigation('/read')}>Display</button>
        <button onClick={()=>navigation('/delete')}>Delete</button>
        </div>
   

    </div>
  )
}

export default Home