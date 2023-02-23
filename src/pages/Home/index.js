import React, { useState } from 'react'
import Board from '../../components/Board';
import Header from '../../components/Header';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddList from '../../components/AddList';
import Card from '../../components/Card';

const HomePage = () => {
    const [isToogleList, setIsToogleList] = useState(false)
    return (
        <div>
            <Header>
                MERN Todo Apps
            </Header>
            <Board>
                <Card />
                <div className='add-list w-[272px] m-2.5 flex-shrink-0'>
                    {isToogleList ? <AddList handleCancel={() => setIsToogleList(false)} /> :
                        <div className='add-list-button bg-slate-700 opacity-50 rounded-[5px] cursor-pointer text-white items-center min-h-[32px] px-[5px] py-[10px] flex hover:bg-black hover:bg-opacity-20' onClick={() => setIsToogleList(true)} >
                            <PlusIcon className='h-5 w-5 mx-3' />     Add a list
                        </div>
                    }
                </div>
            </Board>
        </div>
    )
}

export default HomePage;