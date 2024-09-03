import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import style from './style/Navigation.module.sass';

function Navigation() {
    return (
        <div>
            <nav className={style.nav}>
                <NavLink to="/" className={({ isActive }) => isActive ? style.activeButton : ''}>
                    <Button variant="primary">Websoket</Button>
                </NavLink>
                <NavLink to="/EndlessTape" className={({ isActive }) => isActive ? style.activeButton : ''}>
                    <Button variant="primary">Endless tape</Button>
                </NavLink>
                <NavLink to="/Weather" className={({ isActive }) => isActive ? style.activeButton : ''}>
                    <Button variant="primary">Weather</Button>
                </NavLink>
            </nav>
        </div>
    );
}

export default Navigation;