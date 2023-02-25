import React, { useState, useEffect, useCallback } from "react";
import { createItem, getOneItem, updateItem } from "../../api/items";
import ButtonGroup from "../ButtonGroup";
import TextField from "../TextField";

const AddCard = ({ getTodosAPI, todoID, itemID, adding, cancel }) => {
    const [name, setName] = useState("");

    const getOneItemAPI = useCallback(async () => {
        try {
            const response = await getOneItem(itemID)
            if (response.data.message === 'success') {
                setName(response.data.data.name);
            }
        } catch (err) {

        }
    },
        [itemID],
    )

    useEffect(() => {
        getOneItemAPI();
    }, [getOneItemAPI])


    const onchange = (e) => {
        setName(e.target.value);
    };

    const clear = () => {
        setName('');
    }

    const saveItem = async () => {
        try {
            const payload = { name: name, TodoId: todoID }
            const response = await createItem(payload);
            if (response.data.message === 'success') {
                getTodosAPI();
                clear();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateItemAPI = async () => {
        try {
            const payload = { name: name }
            const response = await updateItem(itemID, payload);
            if (response.data.message === 'updating succeeded') {
                getTodosAPI();
                clear();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="card">
                <TextField
                    name="name"
                    className="edit-card-textarea"
                    value={name}
                    placeholder="Enter title for this card"
                    onChange={onchange}
                />
            </div>
            <ButtonGroup
                handleSave={() => { (adding ? saveItem() : updateItemAPI()) }}
                saveLabel={adding ? "Add Card" : "Edit Card"}
                handleCancel={cancel}
            />
        </div>
    );
};

export default AddCard;
