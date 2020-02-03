import React from 'react';
import classes from './Answers.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Answers = (props) => {
    

    const Answers = props.answers.map((answer,index) => {
        const activeClass = props.activeIndex ===  index ? classes.Active : '';
         
        return  (
           
                <div 
                className={classes.Answer +  ' ' + activeClass}
                key={answer + index}
                onClick={(event) => {props.userClick(event.target, index)}}>
                    <p>{answer}</p>
                </div>  
         )

    });   

    return (
        <div>
            <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={0.1}
                >
                
                        {Answers}
                
            </ReactCSSTransitionGroup>
        </div>
    )
}
    


export default Answers;