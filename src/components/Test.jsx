import React from 'react'

class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            started: false,
            ended: false
        }
    }

    render() {
        return(
            <div>
                {this.state.started}
            </div>
        )
    }

}

export default Test