import React, { useState, useCallback } from 'react';
import './DraggableContainer.scss';

function DraggableContainer() {
    const [containerDimensions, setContainerDimensions] = useState({ width: 300, height: 200 });
    const [dragging, setDragging] = useState(null);
    const [positions, setPositions] = useState({ component1: { top: 50, left: 50 }, component2: { top: 150, left: 150 } });

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setContainerDimensions(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDragStart = (e, component) => {
        setDragging(component);
    };

    const handleDragEnd = (e) => {
        if (dragging) {
            const container = e.currentTarget.getBoundingClientRect();
            const newTop = e.clientY - container.top;
            const newLeft = e.clientX - container.left;

            setPositions(prev => ({
                ...prev,
                [dragging]: {
                    top: Math.max(0, Math.min(container.height - 50, newTop)),
                    left: Math.max(0, Math.min(container.width - 50, newLeft))
                }
            }));
        }
        setDragging(null);
    };

    return (
        <div className="main-container">
            <div className="controls">
                <label>
                    Width:
                    <input
                        type="number"
                        name="width"
                        value={containerDimensions.width}
                        onChange={handleDimensionChange}
                    />
                </label>
                <label>
                    Height:
                    <input
                        type="number"
                        name="height"
                        value={containerDimensions.height}
                        onChange={handleDimensionChange}
                    />
                </label>
            </div>

            <div
                className="brown-container"
                style={{ width: `${containerDimensions.width}px`, height: `${containerDimensions.height}px` }}
                onMouseUp={handleDragEnd}
            >
                {/* Draggable Components */}
                <div
                    className="draggable-component"
                    style={{ top: `${positions.component1.top}px`, left: `${positions.component1.left}px` }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'component1')}
                >
                    Component 1
                </div>
                <div
                    className="draggable-component"
                    style={{ top: `${positions.component2.top}px`, left: `${positions.component2.left}px` }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'component2')}
                >
                    Component 2
                </div>
            </div>
        </div>
    );
}

export default DraggableContainer;
