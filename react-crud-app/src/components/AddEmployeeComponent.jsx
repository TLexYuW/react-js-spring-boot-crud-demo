import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const AddEmployeeComponent = () => {

    const [firstName, setFirstNamne] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        
        const employee = {firstName, lastName, email};

        if (id) {
            EmployeeService.updateEmployeeById(id, employee)
            .then(res => {
                navigate('/employees');
            })
            .catch(error => console.log(error))
        } else {
            EmployeeService
            .createEmployee(employee)
            .then(res => {
                console.log(res.data);
                navigate('/employees');
            })
            .catch(error => console.log(error));    
        }        
    };

    useEffect(() => {
        if(id){
            EmployeeService.getEmployeeById(id)
            .then(res => {
              setFirstNamne(res.data.firstName);
              setLastName(res.data.lastName);
              setEmail(res.data.email);
            })
            .catch(error => console.log(error))
        }
    }, [])
    
    const title = () =>{
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        {
                            title()
                        }
                        {/* <h2 className='text-center'>Add Employee</h2> */}
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>First Name :</label>
                                    <input type="text" placeholder='輸入姓名' name='firstName' className='form-control' value={firstName} onChange={e => setFirstNamne(e.target.value)} />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name :</label>
                                    <input type="text" placeholder='輸入姓氏' name='lastName' className='form-control' value={lastName} onChange={e => setLastName(e.target.value)} />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Email :</label>
                                    <input type="email" placeholder='輸入信箱' name='email' className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
                                </div>

                                <button className='btn btn-success' onClick={e => saveOrUpdateEmployee(e)}>送出</button>
                                <Link to="/employees" className='btn btn-danger'>取消</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default AddEmployeeComponent;