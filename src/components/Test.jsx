import React from 'react'
import logo from './assets/logo.png'
import './Test.css'
import VisualAcuity from './VisualAcuity'
import { conditionalExpression } from '@babel/types';

//to check cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

//clear cookies by setting expiry date in the past
function deleteAllCookies() {
    var d = new Date();
    d.setTime(d.getTime() - (100*24*60*60*1000)); //1 day in the past
    var expires = "expires="+ d.toUTCString();

    document.cookie="started=;"+ expires + ";path=/;";
    document.cookie="ended=;"+ expires + ";path=/;";
    document.cookie="AEdone=;"+ expires + ";path=/;";
    document.cookie="MEdone=;"+ expires + ";path=/;";
    document.cookie="name=;"+ expires + ";path=/;";
    document.cookie="parent=;"+ expires + ";path=/;";
    document.cookie="phoneNum=;"+ expires + ";path=/;";
    document.cookie="aeData=;"+ expires + ";path=/;";
    document.cookie="meData=;"+ expires + ";path=/;";
    
}

class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            started: false,
            AEdone:false,
            MEdone:false,
            ended: false,
            saved: false,
            userData: {
                id:0,
                name: ``,
                parent: ``,
                phoneNum: 0,
                aeData: 0,
                meData: ``
            }
        }
        this.url = "http://localhost:5000"
        this.insertPatient = "/insertpatient?"
        this.patientName ="patientName="
        this.parentName = "&parentName="
        this.phoneNumber = "&phoneNumber="
        this.aeData = "&aeData="
        this.meData = "&meData="
    }

    //check cookies for completed ME data (eyemovement test)
    componentDidMount(){
        var c_started = getCookie("started") == 'true';
        var c_ended = getCookie("ended") == 'true';
        var c_AEdone = getCookie("AEdone") == 'true';
        var c_MEdone = getCookie("MEdone") == 'true';
        var c_name = getCookie("name");
        var c_parent = getCookie("parent");
        var c_phoneNum = getCookie("phoneNum");
        var c_aeData = getCookie("aeData");
        var c_meData = sessionStorage.getItem("meData");

        //used sessionStorage because data was too large. 
        //var c_meData = getCookie("meData");

        var userData = {...this.state.userData};
        userData.meData = c_meData;
        userData.aeData = c_aeData;
        userData.name = c_name;
        userData.parent = c_parent;
        userData.phoneNum = c_phoneNum;

        this.setState({
            started: c_started,
            ended: c_ended,
            AEdone: c_AEdone,
            MEdone: c_MEdone,
            userData
        });
    }
    
    componentDidUpdate () {
        console.log(JSON.stringify(this.state));
    }

    handleSaveData = (e) => {
        var userData = {...this.state.userData};
        var link;
        link = this.url.concat(this.insertPatient ,this.patientName, userData.name, this.parentName, userData.parent,this.phoneNumber, userData.phoneNum.toString(10),this.aeData, userData.aeData.toString(10),this.meData, userData.meData);
        var xhr = new XMLHttpRequest();
        //var data = null; 
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                userData.id = xhr.response;
            }
        };

        xhr.open("GET", link, false);
        xhr.send(null);
        this.setState({saved:true, userData});
        
    }

    handleNameChange = (e) => {
        var userData = {...this.state.userData};
        userData.name = e.target.value;
        this.setState({userData});
    }

    handleParentChange = (e) => {
        var userData = {...this.state.userData};
        userData.parent = e.target.value;
        this.setState({userData});
    }

    handlePhoneChange = (e) => {
        var userData = {...this.state.userData};
        userData.phoneNum = e.target.value;
        this.setState({userData});
    }

    handleAEDataChange = (value) => {
        var userData = {...this.state.userData};
        userData.aeData = value; /* THIS IS WHERE RAJ NEEDS TO DUMP HIS THINGS */
        this.setState({userData, AEdone: true});
    }

    handleMEDataChange = () => {
        var state = {...this.state};

        //life of cookie
        var d = new Date();
        d.setTime(d.getTime() + (1*60*1000)); //1 minute lifetime
        var expires = "expires="+ d.toUTCString();
    
        //store state and data into cookies
        document.cookie="started=" + state.started + ";"+ expires + ";path=/;";
        document.cookie="ended=" + state.ended + ";"+ expires + ";path=/;";
        document.cookie="AEdone=" + state.AEdone + ";"+ expires + ";path=/;";
        document.cookie="MEdone=" + state.MEdone + ";"+ expires + ";path=/;";
        document.cookie="name=" + state.userData.name + ";"+ expires + ";path=/;";
        document.cookie="parent=" + state.userData.parent + ";"+ expires + ";path=/;";
        document.cookie="phoneNum=" + state.userData.phoneNum + ";"+ expires + ";path=/;";
        document.cookie="aeData=" + state.userData.aeData + ";"+ expires + ";path=/;";
        
        //redirect to eye movement test
        window.location.href = ("/calibration.html");


    }

    handleBegin = (e) => {

        var name = document.getElementById('nameIn');
        var parent = document.getElementById('parentIn');
        var phone = document.getElementById('phoneIn');

        if (name.value != '' &&  parent.value != '' && phone.value != '') {
            var userData = {...this.state.userData};
            userData.name = name.value.toString(10);
            userData.parent = parent.value.toString(10); 
            userData.phone = phone.value.toString(10);
            this.setState({userData}); 
            this.setState({started:true}); 
        } else {
            alert('Please enter Name, Parent Name, or Phone Number!');
        }

    }

    handleEnd = (e) => {
        this.setState({ended:true});
    }

    handleRestart = (e) => {
        this.setState({started:false, ended:false, AEdone:false, MEdone:false})
    }

    handleReturn = (e) => {
        this.props.handleReturn();
    }

    viewSelect() {
        if (this.state.ended) {
            if (!this.state.saved) {
                return (
                    <div className='flex'>
                        <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                        <h1>You have finished your exam</h1>
                        <p className='info'>
                        If you believe the test results are correct, you may save your results.<br/><br/> 
                        If you believe errors were made due to factors not related to visual prowess, you may want to retake take the examination.
                        </p>
                        <button type='button' onClick={this.handleSaveData}>Save Results</button>
                        <button type='button' onClick={this.handleRestart}>Retake Eye Exam</button>
                    </div>
                )
            } else {
                return (
                    <div className='flex'>
                        <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                        <h1>You submited your results to the Doctor</h1>
                        <p className='info'>
                        Thank you for using Valley Children's Hospital online visual exam.<br/><br/>
                        Please save your Patient ID: {this.state.userData.id}
                        </p>
                        <button type='button' onClick={this.handleReturn}>Return to Home Page</button>
                    </div>
                )
            }
        }
        else if (this.state.started && !this.state.AEdone) {
            return <VisualAcuity handleRestart={this.handleRestart} handleEnd={this.handleEnd} handleAEDataChange={this.handleAEDataChange}/>
        }
        else if (this.state.started && !this.state.MEdone && this.state.AEdone) {
            return this.handleMEDataChange();
        }
        else {
            return (
                <div className='flex'>
                    <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                    <h1>Ready to start your exam?</h1>
                    <p className='info'>
                    This exam will require the use of your camera. Please allow camera permissions when prompted by your web browser.<br/><br/>
                    This visual exam is not a conclusive medical examination as the information gathered here will be sent to a doctor for evaluation. 
                    </p>
                    <form>
                        <p>
                            <label htmlFor="child">Child's Name:</label>
                            <input required type="text" name="child" id="nameIn" onChange={this.handleNameChange}></input>
                        </p>
                        <p>
                            <label htmlFor="parent">Parent's Name:</label>
                            <input required type="text" name="parent" id="parentIn" onChange={this.handleParentChange}></input>
                        </p>
                        <p>
                            <label htmlFor="phone">Phone Number:</label>
                            <input required type="tel" name="phone" pattern="[0-9]{10}" id="phoneIn" onChange={this.handlePhoneChange}></input>
                        </p>
                    </form>
                    <br/>
                    <button type='button' onClick={this.handleBegin}>Begin Exam</button>
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

export default Test