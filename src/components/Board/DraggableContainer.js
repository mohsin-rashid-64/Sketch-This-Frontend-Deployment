import React, { useState, useRef, useEffect } from 'react';
import './RoomDesigner.scss'; // Import the SCSS file

const RoomDesigner = () => {
  const [roomWidth, setRoomWidth] = useState(100);
  const [roomLength, setRoomLength] = useState(100);
  const [furniture, setFurniture] = useState([
    { name: 'sofa', width: 20, length: 30, position: { x: 0, y: 0 }, rotation: 0 },
    { name: 'bed', width: 30, length: 40, position: { x: 0, y: 0 }, rotation: 0 },
    { name: 'table', width: 20, length: 20, position: { x: 0, y: 0 }, rotation: 0 },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(1); // Step control for showing input or room design

  const roomAreaRef = useRef(null);
  const [baseDimension, setBaseDimension] = useState(350); // Store base dimension for different media screens
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to store window width

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update base dimension based on screen size
  useEffect(() => {
    if (windowWidth < 768) {
      setBaseDimension(300);
    } else {
      setBaseDimension(500);
    }
  }, [windowWidth]);

  const ratioWidth = baseDimension / roomWidth;
  const ratioLength = baseDimension / roomLength;
  const ratio = Math.min(ratioWidth, ratioLength);
  const rotationIntervalRef = useRef(null); // Ref to store the interval for continuous rotation

  const handleMouseDown = (event, index) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setActiveElement(index);
    setOffset({ x, y });
    setIsDragging(true);
  };

  const handleTouchStart = (event, index) => {
    event.preventDefault(); // Prevent default touch behavior (like scrolling)
    const rect = event.target.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setActiveElement(index);
    setOffset({ x, y });
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (isDragging && roomAreaRef.current) {
      const rect = roomAreaRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left - offset.x;
      const y = event.clientY - rect.top - offset.y;

      updateFurniturePosition(x, y);
    }
  };

  const handleTouchMove = (event) => {
    if (isDragging && roomAreaRef.current) {
      event.preventDefault(); // Prevent default touch behavior (like scrolling)
      const rect = roomAreaRef.current.getBoundingClientRect();
      const touch = event.touches[0];
      const x = touch.clientX - rect.left - offset.x;
      const y = touch.clientY - rect.top - offset.y;

      updateFurniturePosition(x, y);
    }
  };

  const updateFurniturePosition = (x, y) => {
    const updatedFurniture = [...furniture];
    const element = updatedFurniture[activeElement];

    updatedFurniture[activeElement] = {
      ...element,
      position: {
        x: Math.max(0, Math.min(x, roomWidth * ratio - element.width * ratio)),
        y: Math.max(0, Math.min(y, roomLength * ratio - element.length * ratio)),
      },
    };

    setFurniture(updatedFurniture);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveElement(null);
    clearInterval(rotationIntervalRef.current); // Stop rotation on mouse up
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setActiveElement(null);
    clearInterval(rotationIntervalRef.current); // Stop rotation on touch end
  };

  // Helper function to find the largest furniture dimensions
  const getMaxFurnitureDimensions = () => {
    const maxWidth = Math.max(...furniture.map(item => item.width));
    const maxLength = Math.max(...furniture.map(item => item.length));
    return { maxWidth, maxLength };
  };

  const handleInputChange = (event, setter) => {
    const value = Number(event.target.value);
    setter(value); // Convert string input to number
  };

  const handleNextClick = () => {
    const { maxWidth, maxLength } = getMaxFurnitureDimensions();

    if (roomWidth < maxWidth || roomLength < maxLength) {
      alert(`Room dimensions must be at least ${maxWidth}x${maxLength} to fit the furniture.`);
    } else {
      setStep(2); // Move to the next step to show room and furniture
    }
  };

  const handleBackClick = () => {
    setStep(1); // Go back to input step
  };

  // Function to rotate furniture
  const rotateFurniture = (index, direction) => {
    const updatedFurniture = [...furniture];
    updatedFurniture[index].rotation = (updatedFurniture[index].rotation + (direction === 'left' ? -5 : 5)) % 360; // Rotate 5 degrees
    setFurniture(updatedFurniture);
  };

  // Start rotating left continuously
  const startRotateLeft = (index) => {
    rotateFurniture(index, 'left');
    rotationIntervalRef.current = setInterval(() => rotateFurniture(index, 'left'), 100);
  };

  // Start rotating right continuously
  const startRotateRight = (index) => {
    rotateFurniture(index, 'right');
    rotationIntervalRef.current = setInterval(() => rotateFurniture(index, 'right'), 100);
  };

  return (
    <div className="room-designer">
      <div className="top-bar">
        <h2 className="title">Room Designer</h2>

        {step === 1 && (
          <div className="input-group">
            <div className="input-field">
              <label>Room Width:</label>
              <input
                type="text"
                value={roomWidth}
                onChange={(event) => handleInputChange(event, setRoomWidth)}
                style={{ width: '60px' }}
              />
            </div>
            <div className="input-field">
              <label>Room Length:</label>
              <input
                type="text"
                value={roomLength}
                onChange={(event) => handleInputChange(event, setRoomLength)}
                style={{ width: '60px' }}
              />
            </div>
            <button className="next-button" onClick={handleNextClick}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="dimension-display">
            <p>Room dimension: {roomWidth} x {roomLength}</p>

            <button className="back-button" onClick={handleBackClick}>
              Back
            </button>
          </div>
        )}
      </div>

      {step === 2 && (
        <div className="room-layout">
          <div className="furniture-list">
            <h3>Items list</h3>
            {furniture.map((item, index) => (
              <div
                key={item.name}
                className={`furniture-item ${item.name} ${activeElement === index ? 'active' : ''}`}
                onMouseDown={(event) => handleMouseDown(event, index)}
                onTouchStart={(event) => handleTouchStart(event, index)} // Add touch event handler
                style={{
                  backgroundColor: activeElement === index ? '#d3d3d3' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer', // Highlight if selected
                }}
              >
                <div>
                  {`${item.name.charAt(0).toUpperCase() + item.name.slice(1)}: ${item.width} x ${item.length}`}
                </div>
                <div>
                  <span 
                    className="rotate-icon" 
                    onMouseDown={(event) => {
                      event.stopPropagation(); // Prevent triggering the mouse down event
                      startRotateLeft(index);
                    }}
                    onTouchStart={(event) => {
                      event.stopPropagation(); // Prevent triggering the mouse down event
                      startRotateLeft(index);
                    }} // Add touch event handler
                    onMouseUp={handleMouseUp} // Stop rotating on mouse up
                    onTouchEnd={handleMouseUp} // Stop rotating on touch end
                    style={{ marginLeft: '8px', cursor: 'pointer', userSelect: 'none',  }}
                  >
                    ⟲
                  </span>
                  <span  
                    className="rotate-icon" 
                    onMouseDown={(event) => {
                      event.stopPropagation(); // Prevent triggering the mouse down event
                      startRotateRight(index);
                    }}
                    onTouchStart={(event) => {
                      event.stopPropagation(); // Prevent triggering the mouse down event
                      startRotateRight(index);
                    }} // Add touch event handler
                    onMouseUp={handleMouseUp} // Stop rotating on mouse up
                    onTouchEnd={handleMouseUp} // Stop rotating on touch end
                    style={{ marginLeft: '20px', cursor: 'pointer', userSelect: 'none',  }}
                  >
                    ⟳
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="room-area"
            ref={roomAreaRef}
            style={{
              width: `${roomWidth * ratio}px`,
              height: `${roomLength * ratio}px`,
              border: '12px solid #b2bebf',
              position: 'relative',
              backgroundColor: '#d1a36b',
              marginRight: '30px',
              overflow: 'auto', // Allow scrolling in the room area
            }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove} // Add touch move handler
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd} // Add touch end handler
          >
            {furniture.map((item, index) => (
              <div>
                <div
                key={item.name}
                className={item.name}
                style={{
                  touchAction: 'none',
                  width: item.width * ratio,
                  height: item.length * ratio,
                  top: item.position.y,
                  left: item.position.x,
                  position: 'absolute',
                  transform: `rotate(${item.rotation}deg)`,
                  transformOrigin: 'center center',
                  backgroundColor: '#5e3b3b',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'move',
                  color: 'white',
               
                
                }}
                onMouseDown={(event) => handleMouseDown(event, index)}
                onTouchStart={(event) => handleTouchStart(event, index)} // Add touch event handler
              >
                {`${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`}
              </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDesigner;
