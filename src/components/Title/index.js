import React from 'react';

import './title.css'

const Title = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className='list-title'>
            {children}
        </div>
    )
}

export default Title;   