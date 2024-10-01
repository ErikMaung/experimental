import React, { useState, useEffect } from 'react';
import './AnimatedList.css';
import CustomButton from '../components/CustomButton';

function AnimatedList({ scaleValue }) {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1 (click to edit text)' },
  ]);
  const [idCounter, setIdCounter] = useState(2);
  const [animate, setAnimate] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    // Trigger the animation after the component is mounted
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const addItem = () => {
    setItems([...items, { id: idCounter, text: `Item ${idCounter}` }]);
    setIdCounter(idCounter + 1);
  };

  const handleItemClick = (id) => {
    setEditingItemId(id);
  };

  const handleItemChange = (id, newText) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  };

  const handleItemBlur = () => {
    setEditingItemId(null);
  };

  return (
    <div className="list-container">
      <CustomButton label="Add Item" scaleValue={scaleValue} onClick={addItem}>Add Item</CustomButton>
      <ul className="animated-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`list-item ${animate ? 'animate' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            {editingItemId === item.id ? (
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleItemChange(item.id, e.target.value)}
                onBlur={handleItemBlur}
                autoFocus
              />
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimatedList;
