import React from 'react'
import logo from './assets/logo.png'
import './VisualAcuity.css'

class VisualAcuity extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            letter : `E`,
            level : 1,
            accuracy : 0,
            total : 0,
            fontSize :'14.7mm',
            count : 0,
            render : 0
        }
        this.counter = 0;
    }


    handleStartTest = (e) => {
        this.setState({render:1});
    }

    handleKeyCheck = (e) => {
        if (e.key == 'Enter') {
            var userIn = document.getElementById('userCharIn');
            if (userIn.value == this.state.letter) {
                this.setState({accuracy:this.state.accuracy+1});
            } else {
                this.handleEndVA();
            }

            if (this.counter == 4) {

                if (this.state.level == 11) {
                    this.handleEndVA();
                }
                this.setState({level:this.state.level+1})
                this.counter = 0; 
            } else {
                this.counter++;
            }
            this.setState({total:this.state.total+1, letter:this.getRandomLetter(), fontSize:this.setFontSize()});
        
            userIn.value = ''
        }
        //console.log(this.state);
    }

    setFontSize = () => {
        switch (this.state.level) {
            case 2: 
                return '12mm'

            case 3: 
                return '9mm'
            
            case 4: 
                return '8mm'

            case 5: 
                return '7mm'

            case 6: 
                return '6mm'   

            case 7: 
                return '5mm'

            case 8: 
                return '4mm'

            case 9: 
                return '3mm'
                
            case 10: 
                return '2mm'

            case 11: 
                return '1mm'    

            default:
                return '14.7mm'
        }
    }

    getRandomLetter = () => {
        return String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 65);
    }

    handleEndVA = () => { 
        console.log(this.state.level)
        this.props.handleAEDataChange(this.state.level);
    }

    viewSelect() {

        const style = {
            containerStyle: {
                fontSize: this.state.fontSize,
            }
        };
        const { containerStyle } = style;
        
        switch(this.state.render) {
            case 0:
                return (
                    <div className='flex'>
                        <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                        <h1>Visual Acuity Exam</h1>
                        <p className='info'>
                        This exam will test your visual accuracy by simulating a Snellen Eye Chart Exam.<br/><br/>
                        Proctor Instructions: Please turn on the Captial Lock on the keyboard, and when the patient annouces a letter please type that letter in the text box and press 'Enter'.<br/><br/>
                        Patient Instructions: Please sit 1 metter (an arm's length) away from the screen, and cover one eye with your hand.
                        </p>
                        <div className='separator'/>
                        <button type='button' onClick={this.handleStartTest}>Begin Visual Acuity Exam</button>
                    </div>
                )

            case 1:
                return (
                    <div className='flex'>
                        <img src={logo} alt="Children's valley hospital" height='100%' width='100%'/>
                        <div className='VAbox'>
                            <h1 style={containerStyle}>{this.state.letter}</h1>
                        </div>
                        <input type="text" id="userCharIn" autoFocus="autoFocus" onKeyPress={this.handleKeyCheck}/>
                        <button type='button' onClick={this.handleEndVA}>End Test</button>
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