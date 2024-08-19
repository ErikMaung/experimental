import React from 'react';
import { Button } from '@mantine/core';
import './CustomButton.css';

function CustomButton({ label, type, scaleValue, onClick, href }) {
  return href ? (
    <Button
      className={`custom-button ${type}`}
      radius="xl"
      size="xl"
      style={{
        '--scale-value': scaleValue,
      }}
      component="a" // Makes the button an anchor element
      href={href} // Adds the href for redirection
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Security measure to prevent tabnabbing
    >
      {label}
    </Button>
  ) : (
    <Button
      className={`custom-button ${type}`}
      radius="xl"
      size="xl"
      style={{
        '--scale-value': scaleValue,
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
