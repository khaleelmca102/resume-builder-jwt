import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Template from './Template';
import Basicinfo from './Basicinfo';
import Resume from './Resume';

import { apiToken } from '../App';

function Home() {
  const navigate = useNavigate();
  const [currentNav, setCurrentNav] = useState('template');
  const [appToken, setAppToken] = useContext(apiToken);  
  const [templateName, setTemplateName] = useState('f1');
  const [active, setActive] = useState('template');

  const checkLogin = () => {
    if(!appToken){
      navigate('/login');
    }  
  }

  useEffect(() => {
    checkLogin();
  });  
  useEffect(() => {
    selectMenu(currentNav);
  },[currentNav]);  

  const selectMenu = (currentNav) => {
    setCurrentNav(currentNav);
    setActive(currentNav);
  }  
  
  const setCurrentTemplate = (templateName) => {
    setTemplateName(templateName);
  }
  

  const renderNavigation = (param) => { 
    switch(param) {
      case 'basicinfo':
        return <Basicinfo setCurrentNav={setCurrentNav} checkLogin={checkLogin} templateName={templateName}/>
      case 'yourresume':
        return <Resume setCurrentNav={setCurrentNav} />
      default:
        return <Template setCurrentNav={setCurrentNav} setCurrentTemplate={setCurrentTemplate} />
    }
  }


  return (
    <div>      
      <Container>
      
        <Row>
          <Col md={3} sm={3} className="clsLeftContainer">
            <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                  <Accordion.Header>Make your Resume</Accordion.Header>
                  <Accordion.Body>
                    <Nav 
                      //defaultActiveKey="/" 
                      activeKey={active}
                      className="flex-column"  
                      onSelect={selectMenu}
                    >
                      <Nav.Link eventKey="template" title="Choose Templae">Choose Template</Nav.Link>
                      <Nav.Link eventKey="basicinfo" title="Basic Info">Basic Info</Nav.Link>
                      <Nav.Link eventKey="yourresume" title="Your Resume">Your Resume</Nav.Link>
                  </Nav>
                  </Accordion.Body>
              </Accordion.Item>
              </Accordion>
          </Col>
          <Col md={9} sm={9} >
            <div className="clsRightContainer">
            {
              renderNavigation(currentNav)
            }
            </div>
          </Col>
        </Row>   
      </Container>
    </div>
  )
  
}

export default Home