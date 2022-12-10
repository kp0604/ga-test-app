import './App.css';
import { useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import Dash from './dash';

function App() {
    let location = useLocation();

    useEffect( () => {
        window.gtag( 'event', 'page_view', {
            page_title: 'home',
            page_path: location.pathname + location.search,
            page_location: window.location.href
        } )
    }, [location] );

    return (
        <div className="App">
            <h1>ga test app</h1>
            <Dash/>
        </div>
    );
}

export default App;
