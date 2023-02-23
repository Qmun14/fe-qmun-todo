import React from 'react';
import IconClose from '@heroicons/react/24/outline/XMarkIcon';

import './button-group.css';

const ButtonGroup = ({ handleSave, saveLabel, handleDelete, handleCancel }) => {
    return (
        <div className='edit-buttons'>
            <div
                className='edit-button'
                style={{ backgroundColor: '#1414bb' }}
                onClick={handleSave}
            >
                {saveLabel}
            </div>
            {handleDelete && (
                <div className='edit-button-cancel' onClick={handleDelete}>
                    <ion-icon name='trash-outline'></ion-icon>
                </div>
            )}
            <div className='edit-button-cancel' onClick={handleCancel}>
                {/* <ion-icon name='close-outline'></ion-icon> */}
                <IconClose className='w-5 h-5' />
            </div>


        </div>
    );
};

export default ButtonGroup;