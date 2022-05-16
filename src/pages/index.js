import React from 'react';
import MainLayout from './components/Layouts/MainLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

    return (
        <MainLayout>
            <div className="container" style={{height: '400px'}}>
                <div style={{marginTop: '40px'}}>
                    <h1>Sveriges riksdag</h1>
                    <h3>En samling av politiker och tjänstemän i sveriges riksdag.</h3>
                    <div style={{marginTop: '60px'}}>
                    <h5>Informationen är aktuell och uppdateras kontinuerligt.</h5>
                    <h5>Senast uppdaterad [build date goes here].</h5>
                    </div>
                </div>
            </div>       
        </MainLayout>
    );
}