import React from 'react'
import logo from './assets/logo.png'
import './Test.css'
import VisualAcuity from './VisualAcuity'

class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            started: false,
            ended: false
        }
        this.handleBegin = this.handleBegin.bind(this)
        this.handleEnd = this.handleEnd.bind(this)
        this.handleRestart = this.handleRestart.bind(this)
    }

    handleBegin(e) {
        this.setState({started:true});
    }

    handleEnd(e) {
        this.setState({ended:true});
    }

    handleRestart(e) {
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