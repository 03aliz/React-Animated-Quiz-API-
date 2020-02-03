import React from 'react';
import classes from './AnswerCorrect.module.css';


const answerCorrect = (props) => {

    let message = '';

   switch(props.answer) {

        case null:
            message = ''
            break;
        case true:
            message = 'Correct!'
            break;
        case false:
            message = 'Incorrect!'
            break;

   }

    return (
        <div>
            <p className={classes.Message}>{message}</p>
        </div>
    )
    
}

export default answerCorrect;