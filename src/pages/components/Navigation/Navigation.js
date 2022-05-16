import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './navigation.css';

export default function Navigation() {


    const isBrowser = typeof window !== "undefined"

    let windowVariable = false;
    if (isBrowser) {
        windowVariable = window.location.pathname;
    }



    function showActivePath(currentPath, linkPath) {
        if (currentPath) {
            return currentPath == linkPath
        } else {
            return false
        } 
    }
  return (
        <div className="container" style={{height: '46px'}}>
            <Navbar style={{height: '100%', padding: '0px', margin: '0px'}}>
                <Navbar.Brand className={showActivePath(windowVariable, '/') ? 'activeCustomHeaderMenu' : 'notActiveCustomHeaderMenu'} style={{ fontWeight: '600', paddingTop: '8px'}} href="/">Sveriges riksdag</Navbar.Brand>
                <Nav.Link className={showActivePath(windowVariable, '/politiker/') ? 'activeCustomHeaderMenu' : 'notActiveCustomHeaderMenu'} style={{fontWeight: '500', paddingTop: '12px'}} href="/politiker">Politiker</Nav.Link>
            </Navbar>
        </div>
  );
}
