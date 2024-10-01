import React, { useState } from 'react';
import { Container, Title, MantineProvider } from '@mantine/core';
import './App.css';
import CustomButton from './components/CustomButton';
import AnimatedList from './components/AnimatedList';
import Timer from './components/Timer';
import MouseTrail from './components/MouseTrail';

function App() {
  const [isFun, setIsFun] = useState(false);
  const [scaleValue, setScaleValue] = useState(1.1);
  const [showMouseTrail, setShowMouseTrail] = useState(true); // State to manage mouse trail visibility

  const toggleFun = () => {
    setScaleValue(scaleValue === 1.1 ? 1.9 : 1.1);
    setIsFun(!isFun);
  };

  return (
    <MantineProvider>
      <MouseTrail className={showMouseTrail ? '' : 'mouse-trail-hidden'} />

      <Container className="app-container">
        <CustomButton
          label={showMouseTrail ? 'Deactivate Trail' : 'Activate Trail'}
          type={isFun ? 'secondary' : 'secondary'}
          scaleValue={scaleValue}
          onClick={() => setShowMouseTrail(!showMouseTrail)}
        />

        <Title className="app-title" order={1}>
          Erik Maung's Experimental Webpage
        </Title>
        <div className="button-group">
          <CustomButton
            label="Home Page"
            type={isFun ? 'danger' : 'secondary'}
            href={'https://erikmaung.github.io/'}
            scaleValue={scaleValue}
          />
          <CustomButton
            label="Portfolio"
            type={isFun ? 'primary' : 'secondary'}
            href={'https://erikmaung.github.io/portfolio'}
            scaleValue={scaleValue}
          />
          <CustomButton
            label={isFun ? 'Deactivate Fun' : 'Activate Fun'}
            type={isFun ? 'success' : 'secondary'}
            scaleValue={scaleValue}
            onClick={toggleFun}
          />
        </div>
        <AnimatedList scaleValue={scaleValue} />
        <Timer />
      </Container>
      <Container className="footer">&copy; Erik Maung 2024</Container>
    </MantineProvider>
  );
}

export default App;
