import { useLocation } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const Sala = () => {
    const serverUrl = 'wss://trivia.tallerdeintegracion.cl/connect';
    const history = useHistory();
    const location = useLocation();
    const datos = location.state && location.state.datos;
    

    const [tiempo, setTiempo] = useState('');
    const [players, setPlayers] = useState('');
    


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
          console.log(parsedMessage)
          console.log("tipo sala", parsedMessage.type)

          if (parsedMessage.type === 'question' || parsedMessage.type === 'timer' || parsedMessage.type === 'score') {
            history.push('/game', { datos } );
          }
          if (parsedMessage.type === 'lobby') {
            console.log("siu")
            setTiempo(parsedMessage.seconds_remaining);
            setPlayers(parsedMessage.players)
            console.log("tiempo sala", tiempo)
          }
        }
    }, [lastMessage, history]);

    

    return ( 
        <div>
            <h1>Lobby</h1>
            <h2>Waiting {tiempo} seconds for other players to join</h2>
            <h2>Current players: {players}</h2>

        </div>
        
        
           
     );
}
 
export default Sala;