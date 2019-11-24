import React from 'react'
import logo from './assets/logo.png'
import './VisualAcuity.css'

class VisualAcuity extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            letter : `E`,
            level : 0,
            accuracy : 0,
            total : 0
        }


    }

    handleStartTest = (e) => {
        this.setState({level:1});
    }

    handleKeyCheck = (e) => {
        if (e.key == 'Enter') {
            var userIn = document.getElementById('userCharIn');
            if (userIn.value == this.state.letter) {
                this.setState({accuracy:this.state.accuracy+1});
            }
            else {
            }
            this.setState({amount:this.state.total+1, letter:this.getRandomLetter()});
            userIn.value = ''
        }
        console.log(this.state);
    }

    getRandomLetter = () => {
        return String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 65);
    }

    setStyle = () => {
        switch (this.state.level) {
            case 1: {
                var level = document.getElementById('level'); 
                level.style = 'levelOne'; 
            }
        }
    }

    handleEndVA = (e) => {
        var level = this.state.level; 
        return this.props.handleEnd;
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
                            <div className='separator'/>
                            <button type='button' onClick={this.handleStartTest}>Begin Visual Acuity Exam</button>
                        </div>
                    )

                case 1:
                    return (
                        <div className='flex'>
                            <h2>{this.state.letter}</h2>
                            <input type="text" id="userCharIn" autoFocus="autoFocus" onKeyPress={this.handleKeyCheck}/>
                            <button type='button' onClick={this.handleEndVA()}>End Test</button>
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