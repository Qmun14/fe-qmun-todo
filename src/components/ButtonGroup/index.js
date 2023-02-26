import React from 'react';
import IconClose from '@heroicons/react/24/outline/XMarkIcon';
import IconDelete from '@heroicons/react/24/outline/TrashIcon';

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
                    <IconDelete className='w-5 h-5 mx-1' title='delete' />
                </div>
            )}
            <div className='edit-button-cancel' onClick={handleCancel}>
                {/* <ion-icon name='close-outline'></ion-icon> */}
                <IconClose className='w-5 h-5' title='close' />
            </div>


        </div>
    );
};

export default ButtonGroup;