import style from './style/JobWithWebsoket.module.sass'
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

function JobWithWebsoket() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const connectWebSocket = () => {
            const socket = new WebSocket('wss://taskforjob.ru/websocket');
            socket.onopen = () => {
                console.log('WebSocket соединение установлено');
            };
            socket.onmessage = (event) => {
                setMessages(prevMessages => [...prevMessages, event.data]);
            };
            socket.onerror = (event) => {
                console.error('WebSocket ошибка:', {
                    message: event.message || 'Неизвестная ошибка',
                    url: socket.url,
                    readyState: socket.readyState,
                    error: event.error || 'Нет дополнительных данных'
                });
            };
            socket.onclose = () => {
                console.log('WebSocket соединение закрыто');
            };
            setWs(socket);
        };
        connectWebSocket();
        return () => {
            if (ws) {
                console.log('Очистка WebSocket соединения');
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            }
        };
    }, []);

    const handleSendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN && message) {
            ws.send(message);
            setMessage('');
        } else {
            console.warn('WebSocket не открыт или сообщение пустое');
        }
    };

    return (
        <Alert variant="info">
            <div className={style.wrapper}>
                <h1>Websoket chat</h1>
                <Form className={style.control}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Напишите сообщение"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleSendMessage}>Отправить</Button>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
            </div>
        </Alert>
    );
}

export default JobWithWebsoket;
