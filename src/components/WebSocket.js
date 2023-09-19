import React, { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useHistory } from 'react-router-dom';

function WebSocketComponent() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [mensaje, setMensaje] = useState('');
  // Define la URL del servidor WebSocket
  const serverUrl = 'wss://trivia.tallerdeintegracion.cl/connect';

  // Configura el gancho useWebSocket
  const { sendJsonMessage, lastMessage } = useWebSocket(serverUrl);

  // Función para enviar un mensaje JSON al servidor
  const enviarMensaje = () => {
    if (!username){
      setUsername(userNumber)
    } 
    const mensaje = { type: 'join', id: userNumber, username: username };
      sendJsonMessage(mensaje);
    
  };

  const datos = {
    dato1: userNumber,
    dato2: username
  }
  

  React.useEffect(() => {

    if (lastMessage !== null) {
      const parsedMessage = JSON.parse(lastMessage.data);
      console.log(parsedMessage)
      if (parsedMessage.type === 'lobby') {
        history.push('/sala', { datos });
      }
      if (parsedMessage.type === 'question' || parsedMessage.type === 'timer' || parsedMessage.type === 'score') {
        history.push('/game', { datos });
      }
      if (parsedMessage.type === 'disconnected') {
        setMensaje(parsedMessage.message);
      }
      if (parsedMessage.type === 'denied') {
        setMensaje(parsedMessage.reason);
      }

    }
  }, [lastMessage, history]);

  
  return (
    <div>
      <h1>Trivia</h1>
      <h3>Sign in</h3>
      <form>
        <label>Student Number:
                    <input 
                    type="text" 
                    required
                    value={userNumber}
                    onChange={(e) => setUserNumber(e.target.value)} 
                    />
        </label>
        <label>Username (optional):
                    <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    />
        </label>
        <button type="button" onClick={enviarMensaje}>Sign in</button>
      </form>
      
{/*       {lastMessage && (
        <div>
          <strong>Mensaje recibido del servidor:</strong> {lastMessage.data}
        </div>
      )} */}
      {mensaje && (
        <div>
          <strong>Mensaje recibido del servidor:</strong> {mensaje}
        </div>
      )}
    </div>
  );
}

export default WebSocketComponent;
