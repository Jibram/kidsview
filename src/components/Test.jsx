import React from 'react'
import logo from './assets/logo.png'
import './Test.css'
import VisualAcuity from './VisualAcuity'

class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            started: false,
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

<<<<<<< HEAD
    componentDidUpdate () {
        console.log(JSON.stringify(this.state.userData));
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

    handleAEDataChange = (e) => {
        var userData = {...this.state.userData};
        userData.aeData = 0; /* THIS IS WHERE RAJ NEEDS TO DUMP HIS THINGS */
        this.setState({userData});
    }

    handleMEDataChange = (e) => {
        var userData = {...this.state.userData};
        userData.meData = ""; /* THIS IS WHERE HOA NEEDS TO DUMP HIS THINGS*/
        this.setState({userData});
    }

    handleBegin = (e) => {
        this.setState({started:true}); 
    }

=======
    handleBegin = (e) => {
        this.setState({started:true});
    }

>>>>>>> VisualAcuity
    handleEnd = (e) => {
        this.setState({ended:true});
    }

    handleRestart = (e) => {
        this.setState({started:false, ended:false})
    }

    viewSelect() {
        if (this.state.ended) {
            return (
                <div className='flex'>
                    <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                    <h1>You have finished your exam</h1>
                    <p className='info'>
                    The recorded video will be sent to your doctor for evaluation. <br/>
                    Thank you for using Valley Children's Hospital online visual exam. 
                    </p>
                    <button type='button' onClick={this.handleRestart}>Back to Beginning</button>
                </div>
            )
        }
        else if (this.state.started) {
            return <VisualAcuity handleRestart={this.handleRestart} handleEnd={this.handleEnd}/>
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