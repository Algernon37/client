import { BrowserRouter, Routes, Route } from 'react-router-dom';
import style from "./style/AppRouter.module.sass";
import Navigation from '../Navigation/Navigation';
import JobWithWebsoket from '../../pages/JobWithWebsoket/JobWithWebsoket';
import EndlessTape from '../../pages/EndlessTape/EndlessTape';
import Weather from '../../pages/Weather/Weather';

function AppRouter() {
    return (
        <BrowserRouter>
            <div className={style.wrapper}>
                <Routes>
                    <Route path="/" element={<JobWithWebsoket />} />
                    <Route path="/Weather" element={<Weather />} />
                    <Route path="/EndlessTape" element={<EndlessTape />} />
                </Routes>
                <Navigation />
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;