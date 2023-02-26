import React, { useEffect, useState } from 'react';
import TextField from '../TextField';
import Title from '../Title';
import { PencilIcon, PlusIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import './card.css'
import { deleteTodo, getOneTodo, updateTodo } from '../../api/todos';
import AddCard from '../AddCard';
import { moveItem } from '../../api/items';
// import { useDrag } from 'react-dnd/dist/hooks';
// import { useDrop } from 'react-dnd/dist/hooks/useDrop';


const Card = ({ todos, getTodosAPI }) => {
    const [editList, setEditList] = useState({
        status: false,
        id: "",
        name: "",
    });
    const [card, setCard] = useState([]);
    const [todoID, setTodoID] = useState(null);
    const [itemID, setItemID] = useState(null)
    const [hover, setHover] = useState(null);

    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: 'div',
    //     // item: { itemID: itemID, todoID: todoID },
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));

    // const [{ isOver }, drop] = useDrop(() => ({
    //     accept: 'div',
    //     drop: (item) => (null),
    //     collect: (monitor) => ({
    //         isOver: !!monitor.isOver(),
    //     }),
    // }));

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

    const deleteTodoAPI = async (id) => {
        try {
            if (window.confirm('Yakin Ingin Menghapus ?')) {
                const response = await deleteTodo(id);
                if (response.data.message === 'deleting succeeded') {
                    getTodosAPI();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const toogleAddCard = (id) => {
        const _temp = [...card]

        _temp.forEach(card => {
            if (card.id === id) {
                card.status = !card.status;
            }
        });

        setCard(_temp);
        setTodoID(id);
    }

    const toogleEditCard = (todoID, itemID) => {
        const _temp = [...card];

        _temp.forEach((card) => {
            if (card.id === todoID) {
                card.Items.forEach((item) => {
                    if (item.id === itemID) {
                        item.isEdit = !item.isEdit;
                    }
                })
            }
        });

        setCard(_temp);
        setTodoID(todoID);
        setItemID(itemID);
    }

    const moveItemAPI = async (todoID, itemID) => {
        try {
            const payload = {
                targetTodoId: todoID
            }
            const response = await moveItem(itemID, payload);
            if (response.data.message === 'success') {
                getTodosAPI();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {card.map((todo, i) => (
                <div className="list" key={todo.id} >
                    <div className="list-cards">
                        {editList.status && editList.id === todo.id ? (
                            <TextField
                                name="name"
                                value={editList.name}
                                className="list-title-textarea"
                                onChange={onChange}
                                deleteList={() =>
                                    deleteTodoAPI(editList.id)
                                }
                                handleCancel={() =>
                                    setEditList({
                                        ...editList,
                                        status: false,
                                        id: "",
                                        name: "",
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

                        {todo.Items.map((item, t) => (
                            <div key={item.id}>
                                {!item.isEdit ? (
                                    <div
                                        className="card"
                                        key={item.id}
                                        onMouseEnter={() =>
                                            setHover(item.id)
                                        }
                                        onMouseLeave={() =>
                                            setHover(null)
                                        }
                                    >
                                        {hover === item.id && (
                                            <div className="card-icons">
                                                <div
                                                    className="card-icon"
                                                    onClick={() =>
                                                        toogleEditCard(
                                                            todo.id,
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <PencilIcon title='Edit ?' />
                                                </div>
                                                {i !== 0 &&
                                                    (
                                                        <div className="card-icon"
                                                            onClick={() => moveItemAPI(
                                                                card[i - 1].id,
                                                                item.id
                                                            )}>
                                                            <ArrowLeftIcon title='move to left?' className='h-5 w-5' />
                                                        </div>
                                                    )
                                                }
                                                {i !== card.length - 1 &&
                                                    (
                                                        <div className="card-icon"
                                                            onClick={() => moveItemAPI(
                                                                card[i + 1].id,
                                                                item.id
                                                            )}>
                                                            <ArrowRightIcon title='move to right?' className='h-5 w-5' />
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                        {item.name}
                                    </div>
                                ) : (
                                    <AddCard
                                        getTodosAPI={getTodosAPI}
                                        todoID={todoID}
                                        itemID={itemID}
                                        cancel={() =>
                                            toogleEditCard(
                                                todo.id,
                                                item.id
                                            )
                                        }
                                    />
                                )}
                            </div>
                        ))}

                        {todo.status ? (
                            <AddCard
                                getTodosAPI={getTodosAPI}
                                todoID={todoID}
                                adding
                                cancel={() => toogleAddCard(todo.id)}
                            />
                        ) : (
                            <div
                                className="toggle-add-card"
                                onClick={() => toogleAddCard(todo.id)}
                            >
                                <PlusIcon className="w-5 h-5" />
                                Add a Card
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;