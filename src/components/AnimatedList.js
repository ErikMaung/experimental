import React, { useState, useEffect } from 'react';
import './AnimatedList.css';

function AnimatedList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component is mounted
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="list-container">
      <ul className="animated-list">
        {items.map((item, index) => (
          <li key={index} className={`list-item ${animate ? 'animate' : ''}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimatedList;
