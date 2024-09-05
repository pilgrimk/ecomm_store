import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineShoppingCart } from 'react-icons/md'

const ShoppingCart = ({ totalItems }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (totalItems > 0) { navigate('/shopping-cart'); }
    }

    return (
        <button
            onClick={() => handleClick()}
            className="relative p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-300"
        >
            <MdOutlineShoppingCart className="text-2xl" />
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </button>
    )
}

export default ShoppingCart