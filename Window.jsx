JavaScript
import React, { useState, useRef } from 'react';
import './Window.css';

export default function Window({ title, children, onClose, initialX = 100, initialY = 100 }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(1);

  // Handle dragging start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    // Bring window to front on click
    setZIndex(Date.now());
  };

  // Handle dragging movement
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  // Handle dragging end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="mac-window"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: zIndex
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => setZIndex(Date.now())}
    >
      {/* Title Bar with Mac OS Pinstripes */}
      <div className="mac-title-bar" onMouseDown={handleMouseDown}>
        <div className="mac-close-box" onClick={(e) => { e.stopPropagation(); onClose(); }} />
        <div className="mac-title-text">{title}</div>
        <div className="mac-zoom-box" />
      </div>

      {/* Window Content Body */}
      <div className="mac-window-content">
        {children}
      </div>
    </div>
  );
}