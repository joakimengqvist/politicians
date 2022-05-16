import React from 'react'
import { Row, Col } from 'react-bootstrap';

export default function Footer() {
    return (
        <div className="container pt-4">
            <Row>
                <Col>
                    <p style={{fontWeight: '500', fontSize: '18px', color: 'white'}}>This is a small project not intented for publication</p>
                    <p style={{fontWeight: '500', fontSize: '18px', color: 'white'}}>Joakim Engqvist</p>
                    <p style={{fontWeight: '500', fontSize: '18px', color: 'white'}}>joakimengqvist@hotmail.com</p>
                    <p style={{fontWeight: '500', fontSize: '18px', color: 'white'}}>073 052 24 73</p> 
                </Col>
            </Row>
        </div>
    )
  }