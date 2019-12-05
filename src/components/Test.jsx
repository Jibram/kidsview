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
            userData: {
                name: ``,
                parent: ``,
                phoneNum: 0,
                aeData: 0,
                meData: ``
            }
        }
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
        var c_meData = getCookie("meData");

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
        document.cookie="meData=" + state.userData.meData + ";"+ expires + ";path=/;";
        
        //redirect to eye movement test
        window.location.href = ("/calibration.html");

    }

    handleBegin = (e) => {
        this.setState({started:true}); 
    }

    handleEnd = (e) => {
        this.setState({ended:true});
    }

    handleRestart = (e) => {
        this.setState({started:false, ended:false, AEdone:false, MEdone:false})
    }

    viewSelect() {
        if (this.state.ended) {
            return (
                <div className='flex'>
                    <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                    <h1>You have finished your exam</h1>
                    <p className='info'>
                    Thank you for using Valley Children's Hospital online visual exam. 
                    </p>
                    <button type='button' onClick={this.handleRestart}>Back to Beginning</button>
                </div>
            )
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
                            <input required type="text" name="child" onChange={this.handleNameChange}></input>
                        </p>
                        <p>
                            <label htmlFor="parent">Parent's Name:</label>
                            <input required type="text" name="parent" onChange={this.handleParentChange}></input>
                        </p>
                        <p>
                            <label htmlFor="phone">Phone Number:</label>
                            <input required type="tel" name="phone" pattern="[0-9]{10}" onChange={this.handlePhoneChange}></input>
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