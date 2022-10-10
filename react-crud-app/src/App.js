import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        {/* <div className='container'> */}
          <HeaderComponent/>
            <div className="container">
              <Routes> localhost/3000/employees
                <Route exact path='/'  element={<ListEmployeeComponent/>}></Route>
                <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
                <Route path='/add-employee' element={<AddEmployeeComponent/>}></Route>
                <Route path='/edit-employee/:id' element={<AddEmployeeComponent/>}></Route>

                {/* <ListEmployeeComponent/> */}
              </Routes>
            </div>
          <FooterComponent />
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
