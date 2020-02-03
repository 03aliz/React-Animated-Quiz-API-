import React from 'react';
import classes from './Question.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Question = (props) => (
    
    <div>
        <ReactCSSTransitionGroup
        transitionName="message"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={0.1}
        >
            <p key={props.id} className={classes.Question}>{props.question}</p>
        </ReactCSSTransitionGroup>
    </div>
)

export default Question; 