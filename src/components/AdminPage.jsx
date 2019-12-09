import React from 'react'
import logo from './assets/logo.png'
import './AdminPage.css'
import { callbackify } from 'util'

class AdminPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            viewData: false,
            userName: 'Javier Fonseca',
            patientInfo: {
                id: 0,
                name: '',
                parentName: '',
                phoneNumber: '',
                aeData: 0,
                meData: ''
            }
        }
        this.url = "http://localhost:5000"
        this.getPatientById = "/getpatientbyid?patientID="
        this.getPatientByName = "/getpatientbyname?patientName="
        this.authorizeLogin = "/authorizelogin?userID="
        this.handleLogin = this.handleLogin.bind(this)
        this.handleViewData = this.handleViewData.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleGetRequests = (p, i) => {
        var link;
        if (i == 1) {
            link = this.url.concat(this.getPatientById, p.toString(10));
        } else if (i == 2) {
            link = this.url.concat(this.getPatientByName, p);
        } else if (i == 3) {
            link = this.url.concat(this.authorizeLogin, p);
        }
        var xhr = new XMLHttpRequest();
        var data = null; 
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (i > 2) {
                    data = xhr.response;
                } else {
                    data = JSON.parse(xhr.response);
                }
                
            }
        };
        xhr.open("GET", link, false);
        xhr.send(null);
        return data; 
    }

    handleLogin(e) {

        var userName = document.getElementById('userNameIn');
        var pw = document.getElementById('pwIn');
        var data;
        if (userName.value != '' || pw.value != '') {
            data = this.handleGetRequests(userName.value,3);

            if (data == pw.value) {
                this.setState({loggedIn:true});
            } else {
                alert('Invalide Username or Password. Try again!')
            }
            userName.value = '';
            pw.value = '';
            
        } else {
            alert('Enter a Username or Password.');
        }


        
    }

    handleViewData(e) {

        var id = document.getElementById('idIn');
        var name = document.getElementById('nameIn');
        var data; 

        if (id.value != '') {
            data = this.handleGetRequests(id.value, 1);
            id.value = '';
        } else if (name.value != '') {
            data = this.handleGetRequests(name.value, 2);
            name.value = '';
        }

        if (data != null) {
            var patientInfo = {...this.state.patientInfo};
            patientInfo.id = data[0];
            patientInfo.name = data[1];
            patientInfo.parentName = data[2];
            patientInfo.phoneNumber = data[3]
            patientInfo.aeData = data[4];
            patientInfo.meData = data[5];
            this.setState({patientInfo});
            this.setState({viewData:true});
        } else {
            alert('Invalid ID or Name. Try again!');
        }
            
    }

    handleSearch(e) {
        this.setState({viewData:false});
    }

    handleReturn = (e) => {
        this.props.handleReturn();
    }

    viewSelect() {
        if (this.state.viewData) {
            return (
                <div className='flex'>
                    <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                    <h1>Patient Data</h1>
                    <p className='info'>
                        Patient ID: {this.state.patientInfo.id}<br/><br/>
                        Patient Name: {this.state.patientInfo.name}<br/><br/>
                        Parent Name: {this.state.patientInfo.parentName}<br/><br/>
                        Phone Number: {this.state.patientInfo.phoneNumber}<br/><br/>
                        AE Data: {this.state.patientInfo.aeData}<br/><br/>
                        ME Data: {this.state.patientInfo.meData}<br/><br/>
                    </p>
                    <button type='button' onClick={this.handleSearch}>View other patient</button>
                    <button type='button' onClick={this.handleReturn}>Return to Home Page</button>
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
                        <label type='text'>Patient's ID: <input id="idIn"></input></label><br/>
                        <p>OR</p>
                        <label type='text'>Patient's Name: <input id= "nameIn"></input></label>
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
                        <label type='text'>Username <input id="userNameIn"></input></label><br/>
                        <label type='password'>Password <input id="pwIn"></input></label>
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