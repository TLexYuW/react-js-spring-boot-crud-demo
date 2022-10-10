package com.lex.springboot.restapi.controller;

import com.lex.springboot.restapi.dao.EmployeeRepository;
import com.lex.springboot.restapi.exception.ResourceNotFoundException;
import com.lex.springboot.restapi.model.Employee;
import com.lex.springboot.restapi.service.EmployeeService;
import com.lex.springboot.restapi.service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private EmployeeService employeeService;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeService.findAll();
    }

//    @GetMapping("/employees/{employeeId}")
//    public Employee getEmployee(@PathVariable Integer employeeId) {
//        Employee theEmployee = employeeService.findById(employeeId);
//        if (theEmployee == null) {
//            throw new RuntimeException("Employee id not found - " + employeeId);
//        }
//        return theEmployee;
//    }

    // build get employee by id REST API
    @GetMapping("{theId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer theId){
        Employee employee = employeeRepository.findById(theId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not exist with id: " + theId));

        return ResponseEntity.ok(employee);
    }

    // build create employee REST API
    @PostMapping
    public Employee createEmployee(@RequestBody Employee theEmployee) {

        employeeService.save(theEmployee);

        return theEmployee;
    }

    // build update employee by id REST API
    @PutMapping("{theId}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Integer theId,@RequestBody Employee theEmployee) {
        Employee updateEmployee = employeeRepository.findById(theId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not exist with id: " + theId));

        updateEmployee.setFirstName(theEmployee.getFirstName());
        updateEmployee.setLastName(theEmployee.getLastName());
        updateEmployee.setEmail(theEmployee.getEmail());

        employeeRepository.save(updateEmployee);

        return ResponseEntity.ok(updateEmployee);
    }

//    @PutMapping("/employees")
//    public Employee updateEmployee(@RequestBody Employee theEmployee) {
//
//        employeeService.save(theEmployee);
//
//        return theEmployee;
//    }

    @DeleteMapping("{theId}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Integer theId) {
        Employee employee = employeeRepository.findById(theId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + theId));

        employeeRepository.delete(employee);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @DeleteMapping("/employees/{employeeId}")
//    public String deleteEmployee(@PathVariable Integer employeeId) {
//        Employee tempEmployee = employeeService.findById(employeeId);
//        // throw Exception if null
//        if (tempEmployee == null) {
//            throw new RuntimeException("Employee id not found - " + employeeId);
//        }
//        employeeService.deleteById(employeeId);
//        return "Delete employee id -" + employeeId;
//    }

}
