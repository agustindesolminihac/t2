import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const Highscore = () => {
    const history = useHistory();
    const location = useLocation();
    const { parsedMessage } = location.state;
    console.log('highscore', parsedMessage)
    const trivia_id = parsedMessage.trivia_id
    let username_1;
    let username_2;
    let username_3;
    let score_1;
    let score_2;
    let score_3;

    if (parsedMessage.winners.length === 1){
        username_1 = parsedMessage.winners[0].username
        username_2 = ''
        username_3 = ''
        score_1 = parsedMessage.winners[0].score
        score_2 = ''
        score_3 = ''

    }
    if (parsedMessage.winners.length === 2){
        username_1 = parsedMessage.winners[0].username
        username_2 = parsedMessage.winners[1].username
        username_3 = ''
        score_1 = parsedMessage.winners[0].score
        score_2 = parsedMessage.winners[1].score
        score_3 = ''

    }
    if (parsedMessage.winners.length === 3){
        username_1 = parsedMessage.winners[0].username
        username_2 = parsedMessage.winners[1].username
        username_3 = parsedMessage.winners[2].username
        score_1 = parsedMessage.winners[0].score
        score_2 = parsedMessage.winners[1].score
        score_3 = parsedMessage.winners[2].score

    }

    const volverInicio = () => {
        history.push('/')
    };
    

    return ( 
        <div>
            <h1>Trivia {trivia_id} winners: </h1>
            <h2>First place: {username_1} with {score_1} points</h2>
            <h2>Second place: {username_2} with {score_2} points</h2>
            <h2>Third place: {username_3} with {score_3} points</h2>
            <button onClick={volverInicio}>Start again</button>

        </div>
        
        
           
     );
}
 
export default Highscore;