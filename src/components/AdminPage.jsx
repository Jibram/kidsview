import React from 'react'
import logo from './assets/logo.png'
import './AdminPage.css'

class AdminPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            viewData: false,
            userName: 'Javier Fonseca'
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleViewData = this.handleViewData.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleLogin(e) {
        this.setState({loggedIn:true});
    }

    handleViewData(e) {
        this.setState({viewData:true});
    }

    handleSearch(e) {
        this.setState({viewData:false});
    }

    viewSelect() {
        if (this.state.viewData) {
            return (
                <div className='flex'>
                    <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                    <h1>Patient Data</h1>
                    
                    <button type='button' onClick={this.handleSearch}>View other patient</button>
                </div>
            )
        }
        else if (this.state.loggedIn) {
            return (
                <div className='flex'>
                    <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                    <h1>Hello, {this.state.userName}</h1>
                    <h2>Who's exam results would you like to view?</h2>
                    <div>
                        <label type='text'>Patient's Name: <input></input></label><br/>
                        <p>OR</p>
                        <label type='text'>Patient's ID: <input></input></label>
                    </div>
                    <button type='button' onClick={this.handleViewData}>View Data</button>
                </div>
            )
        }
        else {
            return (
                <div className='flex'>
                    <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                    <h1>Administrator Sign In</h1>
                    <div>
                        <label type='text'>Username <input></input></label><br/>
                        <label type='password'>Password <input></input></label>
                    </div>
                    <button type='button' onClick={this.handleLogin}>Log In</button>
                </div>
            )
        }
    }
    
    
    render() {
        return(
            this.viewSelect()
        )
    }

}

export default AdminPage