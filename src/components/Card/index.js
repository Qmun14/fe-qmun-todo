import React, { useState } from 'react';
import TextField from '../TextField';
import Title from '../Title';
import { PlusIcon } from '@heroicons/react/24/outline';
import './card.css'
import { getOneTodo } from '../../api/todos';

const Card = ({ todos }) => {
    const [editList, setEditList] = useState({
        status: false,
        id: "",
        name: "",
    });

    const toogleEditList = async (id, status) => {
        try {
            const response = await getOneTodo(id);
            if (response.data.message === 'success') {
                setEditList({
                    ...editList,
                    status: status,
                    id: response.data.data.id,
                    name: response.data.data.name,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {todos.map((todo) => (

                <div className="list" key={todo.id}>
                    <div className="list-cards">
                        {editList.status && editList.id === todo.id ? (
                            <TextField
                                name="name"
                                value={editList.name}
                                className="list-title-textarea"
                                deleteList={() => null}
                                handleCancel={() =>
                                    setEditList({
                                        ...editList,
                                        status: false,
                                        id: '',
                                        name: ''
                                    })
                                }
                            />
                        ) : (
                            <Title
                                onClick={() =>
                                    toogleEditList(todo.id, true)
                                }
                            >
                                {todo.name}
                            </Title>
                        )}
                        {todo.Items.map((item) => (

                            <div className="card" key={item.id}>
                                {item.name}
                            </div>
                        ))}

                        <div className="toggle-add-card">
                            <PlusIcon className='w-5 h-5' />
                            Add a Card
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;