import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Quiz.module.css';
import Progress from '../../components/Progress/Progress';
import Question from '../../components/Question/Question';
import Answers from '../../components/Answers/Answers';
import Next from '../Next/Next';
import AnswerCorrect from '../../components/AnswerCorrect/AnswerCorrect';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMesage';



class Quiz extends Component {
  
    state = {
        questions: {
            0: {
                question: '',
                answers: [],
                correctAnswer:'',
                id:0
            },
            1: {
                question: '',
                answers: [],
                correctAnswer:'',
                id:1
            },
            2: {
                question: '',
                answers: [],
                correctAnswer:'',
                id:2
            },
            3: {
                question: '',
                answers: [],
                correctAnswer:'',
                id:3
            },
            4: {
                question: '',
                answers: [],
                correctAnswer:'',
                id:4
            }
        },

        dataResponse:false,
        error:false,
        questionNum: 0,
        userAnswer: '',
        correctAnswer:null,
        showNextBtn:false,
        activeIndex: null,
        progress: 20,
        gameScore:0  
        
    }
   
    // fetch quiz api data

    componentDidMount () {
        axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
        .then(response => {
            let results = response.data.results;
            let quiz = {...this.state.questions}

            for(let key in quiz) {
                //make new array with all 4 answers from API
                const randomNum = Math.floor(Math.random() * 4); 
                let answers = results[key].incorrect_answers;

                //randomise answers 
                answers.splice(randomNum, 0, results[key].correct_answer);

                quiz[key].question = results[key].question;
                quiz[key].answers = answers;
                quiz[key].correctAnswer = results[key].correct_answer;
            }

            this.setState({
                questions: quiz,
                dataResponse:true
            });
        
        }) 
        .catch((error) => {
            this.setState({error:true});
        });

         
    }

  nextQuestionHandler = () => {

      let questionNum = this.state.questionNum;
      let progressState = this.state.progress;
      let number = this.state.id;

      number++;

      if (questionNum < 4) {
        questionNum++;
      } 

      if (progressState < 100) {
          progressState+=20;
      }
      //reset after each question
      this.setState({
          questionNum:questionNum,
          correctAnswer:null,
          userAnswer: '',
          showNextBtn:false,
          AnswerSelected:false,
          activeIndex:null,
          progress: progressState,
        });
      
  }

  userAnswerHandler = (userAnswer, key) => {
    const userAnswerP = userAnswer.querySelector('p').innerText; 
    let gameScore = this.state.gameScore;
    let questions = {...this.state};

    if (this.isAnswerCorrect(userAnswerP)) {
        questions.correctAnswer = true;
        gameScore++;
    } else {
        questions.correctAnswer = false;
    }

    this.setState({
        userAnswer:userAnswerP, 
        correctAnswer:questions.correctAnswer,
        showNextBtn:true,
        activeIndex:key,
        gameScore: gameScore
        
    });
  }

  isAnswerCorrect = (userAnswer) => {
      if (userAnswer === this.state.questions[this.state.questionNum].correctAnswer) {
          return true;
      } else {
          return false;
      }
  }

  toggleUserSelectHandler = () => {
      const currentState = this.AnswerSelected;
      this.setState({AnswerSelected: !currentState});
  }

  FinishGameOverHandler = () => {

        this.props.history.push('/gameover', {gameScore:this.state.gameScore});
  }


    
    render() { 

        let btn = null;

         //only show next button if user selects answer
    
        if(this.state.showNextBtn) {
            

            if (this.state.questionNum < 4) {
                btn = <Next 
                nextBtn={this.nextQuestionHandler} 
                show={this.state.showNextBtn}
                id={this.state.id} />
            } else {
                 // if last question then show next button with link route to gameover page
                btn =
                    <Next 
                    nextBtn={this.FinishGameOverHandler} 
                    show={this.state.showNextBtn}
                    id={this.state.id} />
               
            }
        } else {
            btn = null;
        }

        // show spinner if dataResponse is false once data fetch is true show quiz

        const quiz = this.state.dataResponse ?  <div> <Progress 
        questionNum={this.state.questionNum}
        progBar={this.state.progress}/>
        <AnswerCorrect answer={this.state.correctAnswer} />
        <Question
         question={this.state.questions[this.state.questionNum].question}
         id={this.state.id} />
        <Answers 
        answers={this.state.questions[this.state.questionNum].answers} 
        userClick={this.userAnswerHandler}
        activeIndex = {this.state.activeIndex}/>{btn}</div> : <Spinner />

   

        return (
            <div>
              {this.state.error ? <ErrorMessage /> : quiz}    
            </div>
        )
    }
}

export default Quiz;