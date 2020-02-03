import React, { Component } from 'react';
import classes from './Next.module.css';

class Next extends Component {

    state= {
        show:false
    }

    componentDidMount() {
        setTimeout (() => {
            this.setState({show:true});
        })
    }

    componentWillUnmount () {
        this.setState({show:false});
    }

    render () {
       
        let nextShow = this.state.show ? classes.Show: '';

    
        

        return (
                <div className={classes.Next + ' ' + nextShow} onClick={this.props.nextBtn}>
                    Next
                </div>
        )
    }

}


export default Next;