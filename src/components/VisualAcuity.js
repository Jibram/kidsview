import React from 'react'
import logo from './assets/logo.png'
import './VisualAcuity.css'

class VisualAcuity extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            letter : 'e',
            accuracy : 0,
            level : 0,
            amount : 0,
        }
        this.handleStartTest = this.handleStartTest.bind(this)
        this.handleKeyCheck = this.handleKeyCheck.bind(this)
        this.getRandomLetter = this.getRandomLetter.bind(this)

    }

    handleStartTest(e) {
        this.setState({level:1});
    }

    handleKeyCheck(e){

        
        if (e.key == 1) {
            this.setState({accuracy:this.state.accuracy+1});
        }

        this.setState({amount:this.state.amount+1});
        this.setState({letter:this.getRandomLetter()});
        console.log(this.state.accuracy + ',' + this.state.amount);
    }

    getRandomLetter() {
        return String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
    }

    viewSelect() {
        switch(this.state.level) {
                case 0:
                    return (
                        <div className='flex'>
                            <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                            <h1>Visual Acuity Exam</h1>
                            <p className='info'>
                            This exam will test your visual accuracy by simulating a Snellen Eye Chart Exam.<br/><br/>
                            Please sit one foot away from the screen, and have the test proctor type 1 for correct letters.
                            </p>
                            <button type='button' onClick={this.handleStartTest}>Begin Visual Acuity Exam</button>
                        </div>
                    )

                case 1:
                    return (
                        <div className='flex'>
                            <h2>{JSON.stringify(this.state.letter)}</h2>
                            <input type="text" id="one" onKeyPress={this.handleKeyCheck}/>
                            <button type='button' onClick={this.props.handleRestart}>Back to Beginning</button>
                            <div className='separator'></div>
                            <button type='button' onClick={this.props.handleEnd}>End Test</button>
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

export default VisualAcuity