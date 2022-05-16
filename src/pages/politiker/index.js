import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import { Row, Card, Form, FormControl, Button, Spinner } from 'react-bootstrap';

export default function Politiker(props) {
    const { pageContext, path } = props;
    const [politikerLista, setPolitikerLista] = useState(null);
    const [politikerDefault, setPolitikerListaDefault] = useState(null);
    const [showSortingOptions, setShowSortingOptions] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [initiated, setInitiated] = useState(false);

    setSearchString

    useEffect(() => {
        if (!initiated) {
            let politikerListaInitial = []
            Object.keys(pageContext).map(politiker => {
                politikerListaInitial.push(pageContext[politiker]);
            })
            setPolitikerLista(politikerListaInitial);
            setPolitikerListaDefault(politikerListaInitial)
            setInitiated(true);

        }
        console.log('politikerLista', politikerLista);

    });

function sortByVariableAsc(variable) {
    const sorted = [];
    [].concat(politikerLista)
        .sort((a, b) => a[variable] > b[variable] ? 1 : -1)
        .map((item, i) => {
            sorted.push(item);
        }    
    );
    setPolitikerLista(sorted);
}

function sortByVariableDesc(variable) {
    const sorted = [];
    [].concat(politikerLista)
        .sort((a, b) => a[variable] < b[variable] ? 1 : -1)
        .map((item, i) => {
            sorted.push(item);
        }    
    );
    setPolitikerLista(sorted);
}

function sortByVariableDesc(variable) {
    const sorted = [];
    [].concat(politikerLista)
        .sort((a, b) => a[variable] < b[variable] ? 1 : -1)
        .map((item, i) => {
            sorted.push(item);
        }    
    );
    setPolitikerLista(sorted);
}

function sortByParty(party) {
    const sorted = [];
    if (party === 'alla') {
        setPolitikerLista(politikerDefault);
    } else {
        [].concat(politikerDefault)
        .sort((a, b) => a.parti === party ? sorted.push(a) : null)
    setPolitikerLista(sorted);
    }
}

function sortBySearch(input) {
    console.log('input', input)
    const sorted = [];
        [].concat(politikerDefault)
        .sort((a, b) => a.sorteringsnamn.toLowerCase().includes(input.toLowerCase()) ? sorted.push(a) : null)
    setPolitikerLista(sorted);
    }




    return (
      <MainLayout>
          <Row>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>Politiker i sveriges riksdag</h2>
          <Form style={{float: 'right', display: 'flex'}}>
            <FormControl
                type="search"
                placeholder="Sök"
                className="mr-2 mt-1 shadow-sm"
                aria-label="Search"
                style={{maxHeight: '38px'}}
                onChange={event => setSearchString(event.target.value)}
            />
        <Button variant="outline-secondary" className="m-1 ml-2 shadow-sm" onClick={() => sortBySearch(searchString)}>Search</Button><br />
        <Button variant="outline-primary" className="m-1 shadow-sm" style={{float: 'right', maxWidth: '200px'}} onClick={() => setShowSortingOptions(!showSortingOptions)}>Sortera</Button>
    </Form>
          </div>
          {showSortingOptions && (
            <div className="p-1 mt-2">
            <Form.Select aria-label="parti" className="m-1 shadow-sm" style={{float: 'right', maxWidth: '300px'}} onChange={event => sortByParty(event.target.value)}>
                <option value="alla">Alla partier</option>
                {partier.map(parti => (
                    <option value={parti.value}>{parti.displayName}</option>
                ))}
            </Form.Select>
            <Button variant="outline-secondary" style={{float: 'right'}} className="m-1 shadow-sm" onClick={() => sortByVariableAsc('tilltalsnamn')}>Förnamn A-Ö</Button>
            <Button variant="outline-secondary" style={{float: 'right'}} className="m-1 shadow-sm" onClick={() => sortByVariableAsc('efternamn')}>Efternamn A-Ö</Button>
            <Button variant="outline-secondary" style={{float: 'right'}} className="m-1 shadow-sm" onClick={() => sortByVariableDesc('tilltalsnamn')}>Förnamn Ö-A</Button>
            <Button variant="outline-secondary" style={{float: 'right'}} className="m-1 shadow-sm" onClick={() => sortByVariableDesc('efternamn')}>Efternamn Ö-A</Button>
          </div>
          )}
          </Row>
          <Row style={{display: 'flex', justifyContent: 'flex-start'}}>
            {!politikerLista && (
                <div className="m-4 p-4" style={{textAlign: 'center'}}>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              </div>
            )}
            {politikerLista && politikerLista.map((politiker) => (
                <div style={{width: '20%', border: 'none', marginBottom: '20px', padding: '6px'}}>
                <Card className="shadow-sm">
                    <Card.Img variant="top" src={politiker.bild_url_192} />
                    <Card.Body>
                        <Card.Title><a style={{color: 'black'}} href={'/individ/' + politiker.intressent_id}>{politiker.tilltalsnamn} {politiker.efternamn}</a></Card.Title>
                        <Card.Text>
                        <span style={{fontWeight: '600'}}>{renderPartyName(politiker.parti)}</span><br />
                        <span style={{fontStyle: 'italic'}}>{politiker.valkrets}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </div>
            ))}
</Row>
      </MainLayout>
    ) 
}

const partier = [
    {
    value: 'KD',
    displayName: 'Kristdemokraterna',
    },
    {
    value: 'S',
    displayName: 'Socialdemokraterna',
    },
    {
    value: 'SD',
    displayName: 'Sverigedemokraterna',
    },
    {
    value: 'M',
    displayName: 'Moderaterna',
    },
    {
    value: 'MP',
    displayName: 'Miljöpartiet',
    },
    {
    value: 'L',
    displayName: 'Liberalerna',
    },
    {
    value: 'V',
    displayName: 'Vänsterpartiet',
    },
    {
    value: 'C',
    displayName: 'Centerpartiet',
    },
];

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