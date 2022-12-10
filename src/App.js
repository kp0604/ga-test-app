import './App.css';
import { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';

function App() {
    const location = useLocation();

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
        </div>
    );
}

export default App;
