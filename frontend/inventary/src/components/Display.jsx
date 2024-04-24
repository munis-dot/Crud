import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Display = () => {
    const [state, setState] = useState([]);
    const [type, setType] = useState("eligible");

    const navigation = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/getAllStudents?type=${type}`)
            .then(res => {
                setState(() => res.data)
            })
            .catch(err => console.log(err))
    }, [type])
  return (
    <>
    <h1>{type === 'eligible' ? 'Selected':'Applied'} Student Details</h1>
            <table>
                <thead>
                    <tr>
                        <td><th>Name</th></td>
                        <td><th>Phone Number</th></td>
                        <td><th>Gender</th></td>
                        <td><th>Date of birth</th></td>
                        <td><th>SSLC School Name</th></td>
                        <td><th>Date of birth</th></td>
                        <td><th>Date of birth</th></td>
                        <td><th>Date of birth</th></td>
                        <td><th>Date of birth</th></td>
                        <td><th>Date of birth</th></td>

                    </tr>
                </thead>
                <tbody>
                    {state.map(item => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.gender}</td>
                                <td>{item.dob}</td>
                                <td>{item.tenthSchoolName}</td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>
            <button onClick={e=>setType(type==='eligible'?'selected':'eligible')}>{type!=='eligible'?"Selected Students":"Applied Students"}</button>
            <input type="submit" value="Home"  onClick={()=>navigation('/home')}></input>
    </>
  )
}

export default Display