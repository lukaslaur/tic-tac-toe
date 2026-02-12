import { useEffect, useRef, useState } from 'react';
import './App.css';
import Board from './Board';
import {io} from 'socket.io-client'

function App() {
  const [roomCode, setRoomCode] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef();
  const [roomCodeInput, setRoomCodeInput] = useState('');

  useEffect(()=>{
  socketRef.current = io('http://localhost:3001');
  socketRef.current.on('connect', () => {
    console.log('Connected');
    setIsConnected(true);
  });

  socketRef.current.on('room-created', (code) => {
    setRoomCode(code);
    console.log('Room created:', code);
  });

  socketRef.current.on('room-joined', (code) => {
    setRoomCode(code);
    console.log('Joined room:', code);
  });

  return () => socketRef.current.close();
}, []);

return (
  <div className="App">
    {!roomCode ? (
      <div>
        <h1>Tic Tac Toe</h1>
        <button onClick={() => socketRef.current.emit('create-room')}>
          Create Room
        </button>
        <div>
          <input 
            placeholder="Enter room code"
            value={roomCodeInput}
            onChange={(e) => setRoomCodeInput(e.target.value)}
          />
          <button onClick={() => socketRef.current.emit('join-room', roomCodeInput)}>
            Join Room
          </button>
        </div>
      </div>
    ) : (
      <div>
        <h2>Room: {roomCode}</h2>
        <Board />
      </div>
    )}
  </div>
);
}

export default App;
