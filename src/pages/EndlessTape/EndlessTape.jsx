import style from './style/EndlessTape.module.sass'
import { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';

function EndlessTape() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMoreData = () => {
        setLoading(true);

        fetch(`https://randomuser.me/api/?page=${page}&results=10`)
            .then(response => response.json())
            .then(data => {
                setUsers(prevUsers => [...prevUsers, ...data.results]);
                setPage(prevPage => prevPage + 1);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMoreData();
    }, []);

    return (
        <div className={style.wrapper}>
                {users.map((user) => (
                    <div className={style.card} key={user.login.uuid}>
                        <Alert variant="info">
                            <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
                            <p>{`${user.name.first} ${user.name.last}`}</p>
                            <p>{user.email}</p>
                        </Alert>
                    </div>
                ))}
            <Button onClick={fetchMoreData} disabled={loading}>
                {loading ? 'Загрузка...' : 'Загрузить больше'}
            </Button>
        </div>
    );
}

export default EndlessTape;