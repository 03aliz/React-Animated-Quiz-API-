import React from 'react';
import classes from './Progress.module.css';


const Progress = (props) => {

    //convert progressBar number into string for styles
    const progressBar = [props.progBar, '%'].join('');

    const styles = {
        width : progressBar,
        height: '40px',
        backgroundColor: 'purple',
        borderRadius: '20px',
        transition: '500ms ease-in'
    }

    return (

        <div className={classes.Progress}>
            <span className={classes.BarText}>{props.questionNum + 1}/5</span>
            <div style={styles}></div>
        </div>
   )
}

export default Progress;