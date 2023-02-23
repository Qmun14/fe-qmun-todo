import React from 'react'

const Board = ({ children }) => {
    return (
        <div className='relative h-[90%] flex overflow-x-auto'>
            {children}
        </div>
    )
}

export default Board;