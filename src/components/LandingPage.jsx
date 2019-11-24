import React from 'react'
import logo from './assets/logo.png'
import './LandingPage.css'

class LandingPage extends React.Component {


    render() {
        return(
            <div className='flex'>
                <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                <h1>Telemedicine Eye Exam</h1>
                <button type='button' onClick={this.props.handlePatient}>Patient</button>
                <div className='separator'>OR</div>
                <button type='button' onClick={this.props.handleDoctor}>Doctor</button>
            </div>
        )
    }
}

export default LandingPage