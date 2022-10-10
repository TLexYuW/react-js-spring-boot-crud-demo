import React, { Component } from 'react'

export default class FooterComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees:[]
        }
    }

    render() {
        return (
        <div>
            <footer className='footer'>
                <span className='text-muted'>SpringBoot + React.js Practice Demo</span>
            </footer>
        </div>
        )
    }
}
