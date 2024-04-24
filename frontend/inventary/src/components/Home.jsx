import React from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {

    const navigation = useNavigate();

  return (
    <div>
        <h1>MCA Admission Portal</h1>
        <div className='buttons'>
        <button onClick={()=>navigation('/studentRegistration')} >Login as Student</button>
        <button onClick={()=>navigation('/display')}>Login as Staff</button>
        </div>
   

    </div>
  )
}

export default Home