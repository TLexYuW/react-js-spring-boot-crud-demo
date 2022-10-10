import React, { Component } from 'react'

export default class HeaderComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees:[]
        }
    }

    render() {
        return (
        <div>
            <header className='header'>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div><a href="https://github.com/RameshMF/ReactJS-Spring-Boot-CRUD-Full-Stack-App" className="navbar-brand">Employee Management App</a></div>
                </nav>
            </header>
        </div>
        )
    }
}
