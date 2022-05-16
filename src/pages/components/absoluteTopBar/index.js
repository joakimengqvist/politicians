import React from 'react';

export default function AbsoluteTopBar() {
    const defaultStyle = {
        cursor: 'pointer',
        textDecoration: 'none'
    }
    const defaulClassName = "p-2 pb-1 link-dark pointer";
    return (
        <div className="container" style={{display: 'flex', justifyContent: 'space-between'}}>
             <div className="p-2">
            <h1>Logga</h1>
            </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div>
                <a style={defaultStyle} className={defaulClassName}>Link tre</a>
            </div>
            <div>
                <a style={defaultStyle} className={defaulClassName}>Link två</a>
            </div>
            <div>
                <a style={defaultStyle} className={defaulClassName}>Link tre</a>
            </div>
            <div>
                <a style={defaultStyle} className={defaulClassName} href="/politiker">Politiker</a>
            </div>
            <div>
                <a style={defaultStyle} className={defaulClassName} href="/">Start</a>
            </div>
        </div>
        </div>
    )
}