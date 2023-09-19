import useWebSocket, { ReadyState  } from 'react-use-websocket';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const Game = () => {
    const serverUrl = 'wss://trivia.tallerdeintegracion.cl/connect';
    const history = useHistory();
    const location = useLocation();
    const datos = location.state && location.state.datos;
/*     const location = useLocation();
    const { mensaje } = location.state; */

    const [seconds, setSeconds] = useState('');
    const [trivia_id, setTrivia_id] = useState('');

    const [question_id, setQuestion_id] = useState('');
    const [question_title, setQuestion_title] = useState('');

    const [score, setScore] = useState('');

    const [streak, setStreak] = useState('');
    const [username, setUsername] = useState('');

    const [tipo_pregunta, setTipo_pregunta] = useState('');

    const [textMessage, setTextMessage] = useState('');

    const [buttonOption1, setButtonOption1] = useState(null);
    const [buttonOption2, setButtonOption2] = useState(null);
    const [buttonOption3, setButtonOption3] = useState(null);
    const [buttonOption4, setButtonOption4] = useState(null);


    const [chatMessages, setChatMessages] = useState([]);


     // Configura el gancho useWebSocket
    const { sendJsonMessage, lastMessage } = useWebSocket(serverUrl);
     // Función para enviar un mensaje JSON al servidor
  
    const mensaje = { type: 'join', id: datos.dato1, username: datos.dato2 };
    
    useEffect(() => {
        // Enviar el mensaje cuando el componente se monta
        sendJsonMessage(mensaje);
      }, [sendJsonMessage, mensaje]);
    
    
    React.useEffect(() => {

        if (lastMessage !== null) {
          const parsedMessage = JSON.parse(lastMessage.data);
          console.log("tipo game", parsedMessage.type)

          if (parsedMessage.type === 'highscore') {
            console.log("tipo: game", parsedMessage)
            history.push('/highscore', { parsedMessage });
          }
          if (parsedMessage.type === 'chat') {

            console.log("siu", parsedMessage)
            const fecha = new Date(parsedMessage.timestamp);
            const hora = fecha.toLocaleTimeString('en-US', { hour12: false });
            const newChatMessage = {
              time: hora,
              username: parsedMessage.username,
              content: parsedMessage.message,
          };
          setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
          
          }
          if (parsedMessage.type === 'question') {
            setChatMessages([])
            console.log(parsedMessage)
            setQuestion_id(parsedMessage.question_id)
            setQuestion_title(parsedMessage.question_title)
            if (parsedMessage.question_type === "button"){
              setTipo_pregunta("button")
              console.log(tipo_pregunta)
              setButtonOption1(parsedMessage.question_options[1])
              setButtonOption2(parsedMessage.question_options[2])
              setButtonOption3(parsedMessage.question_options[3])
              setButtonOption4(parsedMessage.question_options[4])

            }
            if (parsedMessage.question_type === "chat"){
              setTipo_pregunta("chat")
              console.log(tipo_pregunta)

            }
            if (parsedMessage.question_type === "text"){
              setTipo_pregunta("text")
              console.log(tipo_pregunta)

            }
          }
          if (parsedMessage.type === 'timer') {
            console.log(parsedMessage)
            setTrivia_id(parsedMessage.trivia_id)
            setSeconds(parsedMessage.seconds_remaining)
          }
          if (parsedMessage.type === 'score') {
            console.log(JSON.stringify(parsedMessage.scores))
            setScore(JSON.stringify(parsedMessage.scores))
          }
          if (parsedMessage.type === 'streak') {
            console.log(parsedMessage)
            setStreak(parsedMessage.streak)
            setUsername(parsedMessage.username)
          }
          
          if (parsedMessage.type === 'result') {
            console.log(parsedMessage)
          }
        }
    }, [lastMessage, history]);


    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
      e.preventDefault(); 
      console.log(textMessage)
     
      // Aquí puedes enviar el contenido del formulario al servidor, por ejemplo, utilizando la función sendJsonMessage del gancho useWebSocket
      const message = { type: 'answer', question_id: question_id, value: textMessage };
      sendJsonMessage(message);

      // Limpia el campo del formulario después de enviar el mensaje
      setTextMessage('');
};

    const handleButtonOptionClick = (buttonContent) => {
        const message = { type: 'answer', question_id: question_id, value: buttonContent };
        console.log(message)
        sendJsonMessage(message);
    };
    

    


    return ( 
        <div>
            <h1>Trivia {trivia_id}</h1>
            <h2>Question {question_id}</h2>
            <h2>{question_title}</h2>
            <h2>Time left: {seconds}</h2>

            {(tipo_pregunta === "text") && (
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    placeholder="Type your answer"
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            )}

            {(tipo_pregunta === "chat") && (
              <div>
                <h4>Chat:</h4>
                <div>
                  {chatMessages.map((message, index) => (
                    <div key={index}>
                      <span>{message.time} - {message.username}:</span>
                      <span> {message.content}</span>
                    </div>
                  ))}
                </div>
  
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    placeholder="Type your answer"
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            )}

            

            
            
            

            {tipo_pregunta === "button" && (
                <div>
                    <button
                        onClick={() => handleButtonOptionClick('1')}
                    >
                        {buttonOption1}
                    </button>
                    <button
                        onClick={() => handleButtonOptionClick('2')}
                    >
                        {buttonOption2}
                    </button>
                    <button
                        onClick={() => handleButtonOptionClick('3')}
                    >
                        {buttonOption3}
                    </button>
                    <button
                        onClick={() => handleButtonOptionClick('4')}
                    >
                        {buttonOption4}
                    </button>
                    
                </div>
                
                
            )}
            <h2>Scoreboard: {score}</h2>
            

            {username ? (
              <h2>{username} is on a {streak} question streak!</h2>
            ) : null}
            


        </div>
        
        
           
     );
}
 
export default Game;