import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

import './text-field.css'

const TextField = ({
    name,
    value,
    onChange,
    placeholder,
    className,
    deleteList,
    handleCancel,
    onEnter,
}) => {
    return (
        <div className="list-title-edit">
            <TextareaAutosize
                autoFocus
                name={name}
                className={className}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ width: deleteList ? 220 : 1000 }}
                onKeyDown={onEnter}
            />
            {deleteList && (
                <>
                    <TrashIcon className='w-6 h-6 ml-1 mr-1 cursor-pointer' onClick={deleteList} title='delete' />
                    <XMarkIcon className='w-6 h-6 ml-1 mr-1 cursor-pointer' onClick={handleCancel} title='cancel' />
                </>
            )}
        </div>
    );
};

export default TextField;   