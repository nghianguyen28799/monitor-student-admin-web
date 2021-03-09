import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import host from '../host'
import axios from 'axios'

let socket;

const Test = (props) => {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    

    useEffect(() => {
        const { name, room } = props.match.params
        socket = io(host);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
          
        });

        axios.post(`${host}/chat/checkroom`, { room: room })

        axios.get(`${host}/chat/showMessages/${room}`)
        .then(res => {
            setMessages(res.data[0].messages);
        })

        console.log('123');
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages]);

    const sendMessage = (event) => {
        // event.preventDefault()

        if(message) {
            socket.emit('sendMessage', message);
            setMessage('');
        }
    }

    // console.log(message, messages);
    return (
        <div>
            <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
            />
            <ul>
                {messages.map(data => (
                    <li>user: {data.user}, text: {data.text} </li>
                ))}
            </ul>
        </div>
    );
};

export default Test;