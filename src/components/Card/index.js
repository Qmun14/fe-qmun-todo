import React, { useEffect, useState } from 'react';
import TextField from '../TextField';
import Title from '../Title';
import { PlusIcon } from '@heroicons/react/24/outline';
import './card.css'
import { getOneTodo, updateTodo } from '../../api/todos';

const Card = ({ todos, getTodosAPI }) => {
    const [editList, setEditList] = useState({
        status: false,
        id: "",
        name: "",
    });
    const [card, setCard] = useState([]);

    useEffect(() => {
        setCard(todos);
    }, [todos])

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

    const onEnter = async (e, id) => {
        try {

            if (e.keyCode === 13) {
                const payload = { name: editList.name }
                const response = await updateTodo(id, payload);

                if (response.data.message === 'updating succeeded') {
                    setEditList({
                        ...editList,
                        status: false,
                        id: '',
                        name: '',
                    });
                    getTodosAPI();
                }
            }

        } catch (err) {
            console.log(err);
        }

    }

    const onChange = (e) => {
        setEditList({ ...editList, [e.target.name]: e.target.value });

    }

    return (
        <>
            {card.map((todo) => (

                <div className="list" key={todo.id}>
                    <div className="list-cards">
                        {editList.status && editList.id === todo.id ? (
                            <TextField
                                name="name"
                                value={editList.name}
                                className="list-title-textarea"
                                onChange={onChange}
                                deleteList={() => null}
                                handleCancel={() =>
                                    setEditList({
                                        ...editList,
                                        status: false,
                                        id: '',
                                        name: ''
                                    })
                                }
                                onEnter={(e) => onEnter(e, editList.id)}
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