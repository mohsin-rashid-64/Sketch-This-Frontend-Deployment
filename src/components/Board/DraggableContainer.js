import React, { useState, useRef, useEffect } from "react";
import "./RoomDesigner.scss"; // Import the SCSS file
import Rect from "../../assets/images/rooms/rect.png";
import LS from "../../assets/images/rooms/l-shape.png";
import Cut from "../../assets/images/rooms/cut.png";
import TS from "../../assets/images/rooms/t-shape.png";
import US from "../../assets/images/rooms/u-shape.png";
import Bevel from "../../assets/images/rooms/bevel.png";

const RoomDesigner = ({ userBoard }) => {
  // Parse dimensions dynamically from userBoard
  const backgroundWidths = userBoard.width.split(",").map(Number);
  const backgroundHeights = userBoard.height.split(",").map(Number);
  const titles = userBoard.title.split(",").map((title) => title.trim());

  const [roomWidth, setRoomWidth] = useState(200);
  const [roomLength, setRoomLength] = useState(200);

  // Dynamically initialize furniture based on dimensions from userBoard
  const [furniture, setFurniture] = useState(
    backgroundWidths.map((width, index) => ({
      name: titles[index] || `Item ${index + 1}`, // Use titles if available, otherwise default to 'Item X'
      width,
      length: backgroundHeights[index] || 0, // Use 0 if no matching height is available
      position: { x: 0, y: 0 },
      rotation: 0,
    }))
  );

  const [isDragging, setIsDragging] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(1);

  const roomAreaRef = useRef(null);
  const [baseDimension, setBaseDimension] = useState(350);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
  const rooms = [
    {
      id: 1,
      name: "rectangular",
      image: Rect,
      shape: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
       outerShap:"polygon(0 0, 100% 0%, 100% 100%, 0% 100%)"
    },
    {
      id: 2,
      name: "l-shaped",
      image: LS,
      shape: "polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%)",
       outerShap:"polygon(0 47%, 47% 47%, 47% 0, 100% 0, 100% 100%, 0 99%)"
    },
    {
      id: 3,
      name: "cut",
      image: Cut,
      shape: "polygon(75% 0, 100% 25%, 100% 100%, 0 100%, 0 0)",
       outerShap:"polygon(75% 0, 100% 25%, 100% 100%, 0 100%, 0 0)"
    },
    {
      id: 4,
      name: "t-shaped",
      image: TS,
      shape:
        "polygon(0 0, 100% 0, 100% 75%, 70% 75%, 70% 100%, 30% 100%, 30% 75%, 0 75%)",
         outerShap:"polygon(0 0, 100% 0, 100% 76%, 72% 76%, 72% 100%, 28% 100%, 28% 76%, 0 76%)"
    },
    {
      id: 5,
      name: "u-shaped",
      image: US,
      shape:
        "polygon(33% 25%, 67% 25%, 67% 0, 100% 0, 100% 100%, 0 100%, 0 0, 33% 0)",
        outerShap:"polygon(37% 0, 37% 23%, 63% 23%, 63% 0, 100% 0, 100% 100%, 0 99%, 0 0)"
    },
    {
      id: 6,
      name: "beveled",
      image: Bevel,
      shape: "polygon(25% 0, 75% 0, 100% 25%, 100% 100%, 0 100%, 0 25%)",
       outerShap:"polygon(25% 0, 75% 0, 100% 25%, 100% 100%, 0 100%, 0 25%)"
    },
  ];

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
        y: Math.max(
          0,
          Math.min(y, roomLength * ratio - element.length * ratio)
        ),
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
    const maxWidth = Math.max(...furniture.map((item) => item.width));
    const maxLength = Math.max(...furniture.map((item) => item.length));
    return { maxWidth, maxLength };
  };

  const handleInputChange = (event, setter) => {
    const value = Number(event.target.value);
    setter(value); // Convert string input to number
  };

  const handleNextClick = () => {
    const { maxWidth, maxLength } = getMaxFurnitureDimensions();

    if (roomWidth < maxWidth || roomLength < maxLength) {
      alert(
        `Room dimensions must be at least ${maxWidth}x${maxLength} to fit the furniture.`
      );
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
    updatedFurniture[index].rotation =
      (updatedFurniture[index].rotation + (direction === "left" ? -5 : 5)) %
      360; // Rotate 5 degrees
    setFurniture(updatedFurniture);
  };

  // Start rotating left continuously
  const startRotateLeft = (index) => {
    rotateFurniture(index, "left");
    rotationIntervalRef.current = setInterval(
      () => rotateFurniture(index, "left"),
      100
    );
  };

  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  // Start rotating right continuously
  const startRotateRight = (index) => {
    rotateFurniture(index, "right");
    rotationIntervalRef.current = setInterval(
      () => rotateFurniture(index, "right"),
      100
    );
  };

  return (
    <div className="room-designer"
    >
      <div className="top-bar"
       style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}
      >
        <h2 className="title">Room Designer</h2>

        {step === 1 && (
          <div className="input-group"
          style={{width:"100%", display:"flex", justifyContent:"flex-end",alignItems:"center" }}>
        <div style={{display:"flex", alignItems:"center"}}>
          
        <div className="input-field">
              <label>Room Width:</label>
              <input
                type="text"
                value={roomWidth}
                onChange={(event) => handleInputChange(event, setRoomWidth)}
                style={{ width: "100px", marginLeft:"10px", marginRight:"20px" }}
              />
            </div>
            <div className="input-field">
              <label>Room Length:</label>
              <input
                type="text"
                value={roomLength}
                onChange={(event) => handleInputChange(event, setRoomLength)}
                style={{ width: "100px",marginLeft:"10px" }}
              />
            </div>
            <button className="next-button" onClick={handleNextClick}>
              Next
            </button>
        </div>
          </div>
        )}

        {step === 2 && (
          <div className="dimension-display">
            <p>
              Room dimension: {roomWidth} x {roomLength}
            </p>

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
                className={`furniture-item ${item.name} ${
                  activeElement === index ? "active" : ""
                }`}
                onMouseDown={(event) => handleMouseDown(event, index)}
                onTouchStart={(event) => handleTouchStart(event, index)} // Add touch event handler
                style={{
                  backgroundColor: activeElement === index ? "#d3d3d3" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer", // Highlight if selected
                }}
              >
                <div>
                  <div>
                    {`${
                      item.name.split(" ")[0].charAt(0).toUpperCase() +
                      item.name.split(" ")[0].slice(1)
                    }: ${item.width} x ${item.length}`}
                  </div>
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
                    style={{
                      marginLeft: "8px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
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
                    style={{
                      marginLeft: "20px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    ⟳
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="room-area"
            style={{
              width: `${roomWidth * ratio}px`,
              height: `${roomLength * ratio}px`,
              // border: "12px solid #b2bebf",
              position: "relative",
              backgroundColor: "#b2bebf",
              marginRight: "30px",
              // overflow: "auto", // Allow scrolling in the room area
              clipPath: selectedRoom.outerShap,
              padding: "15px",
            }}
          >
            <div
              // className="room-area"
              ref={roomAreaRef}
              style={{
                width: "100%",
                height: "100%",
                // border: "12px solid #b2bebf",
                position: "relative",
                backgroundColor: "rgb(219, 222, 223)",
                // marginRight: "70px",
                // overflow: "auto", // Allow scrolling in the room area
                clipPath: selectedRoom.shape,
              }}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove} // Add touch move handler
              onMouseUp={handleMouseUp}
              onTouchEnd={handleTouchEnd} // Add touch end handler
            >
              {furniture.map((item, index) => (
                <div
                  key={item.name}
                  className={item.name}
                  style={{
                    touchAction: "none",
                    width: item.width * ratio,
                    height: item.length * ratio,
                    top: item.position.y,
                    left: item.position.x,
                    position: "absolute",
                    transform: `rotate(${item.rotation}deg)`,
                    transformOrigin: "center center",
                    backgroundColor: "white",
                    color: "gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "move",
                    border: "solid 2px darkGray",
                  }}
                  onMouseDown={(event) => handleMouseDown(event, index)}
                  onTouchStart={(event) => handleTouchStart(event, index)} // Add touch event handler
                >
                  <div>{item.name.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
            }}
          >
            {rooms.map((room) => (
              <img
                onClick={() => setSelectedRoom(room)}
                key={room.id}
                src={room.image}
                alt="room"
                style={{
                  width: "50px",
                  height: "50px",
                  aspectRatio: "1/1",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDesigner;
