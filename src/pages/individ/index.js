import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import axios from 'axios';
import {xml2js} from 'xml-js';
import { Card, Tab, Tabs } from 'react-bootstrap';

export default function Individ(props) {
    const { pageContext } = props;
    const [detailedPersonalDataUnformated, setDetailedIndividualDataUnformated] = useState(null);
    const [detailedPersonalData, setDetailedIndividualData] = useState(null);
    const [nuvarandeUppdrag, setNuvarandeUppdrag] = useState(null);
    const [gamlaUppdrag, setGamlaUppdrag] = useState(null);


    function getPersonalData(apiLink) {
      axios(apiLink)
      .then(res => { 
            setDetailedIndividualDataUnformated(xml2js(res.data));
          }
        )
      .catch(err => { 
        return err 
      });
    }

useEffect(() => {
  // if API request is not done or not successful, do API call
  if (!detailedPersonalDataUnformated) {
    getPersonalData(pageContext.person_url_xml);
  }

  // only need to format this once.
  if (detailedPersonalDataUnformated) {
    let personligaUppdrag = [];
    // have to go deep into the xml file, not pretty, but does the job.
    try { 
      const personalElements = detailedPersonalDataUnformated.elements[0].elements[0].elements;
      personalElements.filter(elementCategory => elementCategory.name === 'personuppgift').map((personuppgift) => (
        personuppgift.elements.map((uppgift) => (
          uppgift.elements.map((nestedUppgift) => {
            if (nestedUppgift.name === 'kod') {
              personligaUppdrag.push(nestedUppgift.elements[0].text)
            }
            if (nestedUppgift.name === 'uppgift') {
              personligaUppdrag.push(nestedUppgift.elements[0].text)
            }
          })
        ))
      ));
    } catch (err) {
      return
    }
    if (!detailedPersonalData) {
      setDetailedIndividualData(personligaUppdrag);
    }
  }

  if (pageContext) {
    let nuvarandeUppdragArray = [];
    let gamlaUppdragArray = [];
    pageContext.personuppdrag.uppdrag.map(enskiltUppdrag => {
      const uppdragTill = Date.parse(enskiltUppdrag.tom);
      if (uppdragTill > Date.parse(Date()) || enskiltUppdrag.tom === '') {
        nuvarandeUppdragArray.push(enskiltUppdrag)
      } else {
        gamlaUppdragArray.push(enskiltUppdrag)
      }
    }); 
    if (nuvarandeUppdrag === null) {
      setNuvarandeUppdrag(nuvarandeUppdragArray);
    }
    if (gamlaUppdrag === null) {
      setGamlaUppdrag(gamlaUppdragArray);
    }
  }
})

    return (
      <MainLayout>
      <div className="container">
      <Card style={{ width: '60%' }} className="mb-4">
  <Card.Body className="pb-0 mb-0">
  <img src={pageContext.bild_url_192} width="200px" style={{float: 'right'}} />
    <Card.Title className="mb-0">{pageContext.tilltalsnamn} {pageContext.efternamn}</Card.Title>
    <p style={{color: 'gray', fontSize: '16px'}} className="pt-0 mt-0 pb-0 mb-0">Födelseår {pageContext.fodd_ar}</p>
    <h6 className="mb-0 mt-3">
      Verksam i parti
    </h6>
    <p>
    {renderPartyName(pageContext.parti)}
    </p>
    <h6 className="mb-0 mt-3">
      Status
    </h6>
    <p>
    {pageContext.status}
    </p>
    <h6 className="mb-0 mt-3">
      Valkrets
    </h6>
    <p>
    {pageContext.valkrets}
    </p>
  </Card.Body>
  <Card.Body className="pt-0 mt-0">
  <Tabs className="pt-0 mt-0" defaultActiveKey="personuppgifter" className="mb-3">
  {detailedPersonalData ? (
    <Tab eventKey="personuppgifter" title="Personuppgifter">
      <div className="p-2">
    {detailedPersonalData.map((personalDataText, i) => (
      <div>
      {personalDataText === 'KandiderarINastaVal' ? (
        <h5>Kandiderar nästa år:</h5>
      ) : personalDataText === 'true' ? (
        <p>Ja</p>
      ) : personalDataText === 'false' ? (
        <p>Nej</p> 
      ) : i % 2 === 0 ? (
        <h5>{personalDataText}</h5>
      ) : (
      <p>{personalDataText}</p>
      )}
      </div>
    ))}
    </div>
    </Tab>
  ) : (
      <Tab eventKey="personuppgifter" title="Personuppgifter">
        <div className="p-2">
  
          <h6 className="m-0 p-0">Ytterligare info saknas</h6>
       
      </div>
  </Tab>
  )}
  {nuvarandeUppdrag && nuvarandeUppdrag.length > 0 && (
    <Tab eventKey="nuvarandeuppdrag" title="Nuvarande uppdrag">
        {nuvarandeUppdrag.map((uppdrag) => (
          <div className="p-2">
          {uppdrag.roll_kod && (
            <h5 className="m-0 p-0">{uppdrag.roll_kod}</h5>
          )}
          {uppdrag.status && (
            <p className="m-0 p-0">{uppdrag.status}</p>
          )}
          {uppdrag.typ && (
            <p className="m-0 p-0">{uppdrag.typ}</p>
          )}
          <div className="mb-2" style={{color: 'gray'}}>
          {uppdrag.from} - {uppdrag.tom}
          </div>
        </div>
        ))}
    </Tab>
  )}
  {gamlaUppdrag && gamlaUppdrag.length > 0 && (
    <Tab eventKey="gamlauppdrag" title="Gamla uppdrag">
        {gamlaUppdrag.map((uppdrag) => (
          <div className="p-2">
            {uppdrag.roll_kod && (
              <h5 className="m-0 p-0">{uppdrag.roll_kod}</h5>
            )}
            {uppdrag.status && (
              <p className="m-0 p-0">{uppdrag.status}</p>
            )}
            {uppdrag.typ && (
              <p className="m-0 p-0">{uppdrag.typ}</p>
            )}
            <div className="mb-2" style={{color: 'gray'}}>
            {uppdrag.from} - {uppdrag.tom}
            </div>
          </div>
        ))}
    </Tab>
  )}
</Tabs>
  </Card.Body>
</Card>
      </div>
      </MainLayout>
    ) 
}

function renderPartyName(shortCode) {
  switch(shortCode) {
    case 'KD': 
      return 'Kristdemokraterna';
    case 'S': 
      return 'Socialdemokraterna';
    case 'SD': 
      return 'Sverigedemokraterna';
    case 'M': 
      return 'Moderaterna';
    case 'MP': 
      return 'Miljöpartiet';
    case 'L': 
      return 'Liberalerna';
    case 'V': 
      return 'Vänsterpartiet';
    case 'C': 
      return 'Centerpartiet';
    default:
      return shortCode
  }
}