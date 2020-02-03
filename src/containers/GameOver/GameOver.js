import React, { Component } from 'react';
import PlayAgain from './PlayAgain/PlayAgain';
import { Link } from 'react-router-dom';


class gameOver extends Component {

    render () {

        return (
            <div>
                <h1>Game Over</h1>
                <h2>Score</h2>
                <h2>{this.props.location.state.gameScore}/5</h2>
                <Link to="/">
                    <PlayAgain />
                </Link>

            </div>
        )
    }
}

export default gameOver;