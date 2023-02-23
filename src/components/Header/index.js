import React from 'react'

const Header = ({ children }) => {
    return (
        <div className='bg-slate-800 opacity-50 px-5 border-b-[1] border-black text-center text-[40px] font-extralight text-white'>{children}</div>
    )
}

export default Header;