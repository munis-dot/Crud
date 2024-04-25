import React from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {

    const navigation = useNavigate();

  return (
    <div>
        <h1>Voting System</h1>
        <div className='buttons'>
        <button onClick={()=>navigation('/voting')} >Login as Voter</button>
        <button onClick={()=>navigation('/admin')}>Login as Admin</button>
        </div>
   

    </div>
  )
}

export default Home