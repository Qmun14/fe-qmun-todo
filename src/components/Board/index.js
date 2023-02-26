import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const Board = ({ children }) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='relative h-[90%] flex overflow-x-auto'>
                {children}
            </div>
        </DndProvider>
    )
}

export default Board;