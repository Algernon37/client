import style from './style/Weather.module.sass'
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function Weather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = 'cba9e72f10d7705230daf0690069d92d';
        const city = 'Moscow';
        const language = 'ru'
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${language}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                return response.json();
            })
            .then(data => {
                setWeather(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    return loading ? (
        <h2>Загрузка данных о погоде...</h2>
    ) : error ? (
        <h2>Ошибка: {error.message}</h2>
    ) : weather ? (
        <Alert variant="info">
            <div className={style.wrapper}>
                <h2>Погода в Москве</h2>
                <p>Температура: {weather.main.temp}°C</p>
                <p>Погодные условия: {weather.weather[0].description}</p>
                <p>Влажность: {weather.main.humidity}%</p>
                <p>Скорость ветра: {weather.wind.speed} м/с</p>
            </div>
        </Alert>
    ) : null;
}

export default Weather;