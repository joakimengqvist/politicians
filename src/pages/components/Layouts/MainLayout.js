import React, { Fragment } from "react"
import Footer from "../Footer/Footer"
import Navigation from "../Navigation/Navigation";
import AbsoluteTopBar from "../absoluteTopBar";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainLayout({ children }) {
  return (
        <Fragment>
          <div className="container-fluid">
            <AbsoluteTopBar />
          </div>
          <div style={{backgroundColor: '#1c5170', borderTop: '3px solid lightblue', borderBottom: '6px solid lightblue'}} className="container-fluid mb-4">
            <Navigation />
          </div>
          <div className="container-fluid">
            <div className="container">
              {children}
            </div>
          </div>
          <div style={{backgroundColor: '#1c5170', borderTop: '6px solid lightblue'}} className="container-fluid">
              <Footer />
          </div>
        </Fragment>

  )
}