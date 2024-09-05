import React from 'react'
import { Link } from 'react-router-dom'
import xtype from 'xtypejs'

const ConfirmationForm = ({ order }) => {
    return (
        <div className='w-full flex flex-col items-center'>
            <div className="w-4/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className='w-full text-xl font-semibold mb-4 text-left'>
                    Confirmation Form
                </h2>
                <div className="border border-accent-light-400 mb-4" />
                {(xtype.type(order) !== 'undefined' && xtype.type(order.id) !== 'undefined') ? (
                    <div>
                        <p>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}! </p>
                        <p>Order ref: {order.customer_reference} </p>
                        <Link to='/products' className='text-blue-500'> Back to our Products page</Link>!
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConfirmationForm