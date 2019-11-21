import React from 'react'
import logo from './assets/logo.png'
import './VisualAcuity.css'

class VisualAcuity extends React.Component {
    constructor(props){
        super(props)
        this.board = {
            letter : 'E',
            accuracy : 0
        }
        this.round = {
            level : 1,
            amount : 1,
            size : 300 
        }

    }

    viewSelect() {
        switch(this.round.level) {
                case 1:
                    return (
                        <div className='vatestflex'>
                            <img src={logo} alt="Children's valley hospital" height='50%' width='100%'/>
                            <h1 className="round1"><pre>{JSON.stringify(this.board.letter)}</pre></h1>
                            <button type='button' onClick={this.props.handleRestart}>Back to Beginning</button>
                            <div className='separator'></div>
                            <button type='button' onClick={this.props.handleEnd}>End Test</button>
                        </div>
                    )
                case 2:
                    
                    break;
                case 3:
                    
                    break;

        }
    }
    
    
    render() {
        return(
            this.viewSelect()
        )
    }
}

export default VisualAcuity