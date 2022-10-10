import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
     getAllEmployees();
  }, [])

  const getAllEmployees = () => {
    EmployeeService.getEmployees()
    .then(res => {
        setEmployees(res.data);
        console.log(res.data);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  const deleteEmployee = (employeeId) =>{
    EmployeeService.deleteEmployeeById(employeeId)
    .then((res) => {
      getAllEmployees();
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='container'>
      <h2 className='text-center'>Employee List</h2>
      <Link to="/add-employee" className="btn btn-primary mb-2">Add Employee</Link>
      <div className='row'>
          <table className='table table-striped table-bordered'>
              <thead>
                  <tr>
                      <th scope='col'> First Name </th>
                      <th scope='col'> Last Name </th>
                      <th scope='col'> Email </th>
                      <th scope='col'> Actions </th>
                  </tr>
              </thead>
              <tbody>
                  {
                      employees.map(
                          employee => 
                          <tr key={employee.id}>
                              <td>{employee.firstName}</td>
                              <td>{employee.lastName}</td>
                              <td>{employee.email}</td>
                              <td>
                                <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}>Update</Link>
                                <button className='btn btn-danger' onClick={() => deleteEmployee(employee.id)} style={{marginLeft:"10px"}}>Delete</button>
                              </td>                          
                          </tr>
                      )
                  }
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default ListEmployeeComponent;