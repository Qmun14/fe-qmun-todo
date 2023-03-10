import React, { useState } from 'react';
import TextField from '../TextField';
import Title from '../Title';

import { PlusIcon } from '@heroicons/react/24/outline';

import './card.css'

const Card = () => {
    const [editList, setEditList] = useState({
        status: false,
        id: "",
        name: "",
    });

    return (
        <>
            <div className="list">
                <div className="list-cards">
                    {editList.status ? (
                        <TextField
                            name="name"
                            value={editList.name}
                            className="list-title-textarea"
                            deleteList={() => null}
                            handleCancel={() =>
                                setEditList({
                                    ...editList,
                                    status: false,
                                })
                            }
                        />
                    ) : (
                        <Title
                            onClick={() =>
                                setEditList({
                                    ...editList,
                                    status: true,
                                })
                            }
                        >
                            Doing
                        </Title>
                    )}
                    <div className="card">
                        Maen Game
                    </div>

                    <div className="toggle-add-card">
                        <PlusIcon className='w-5 h-5' />
                        Add a Card
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;