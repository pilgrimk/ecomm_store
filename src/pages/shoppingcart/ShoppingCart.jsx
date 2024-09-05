import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import xtype from 'xtypejs'

const ShoppingCart = ({ cart, handleRemoveFromCart, handleEmptyCart }) => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const handleMyRemoveFromCart = (id) => {
    setIsUpdating(true);
    handleRemoveFromCart(id);
  }

  const handleMyEmptyCart = () => {
    setIsUpdating(true);
    handleEmptyCart();
  }

  const EmptyCart = () => {
    return (
      <div className='flex items-center justify-center'>
        <div className='w-full text-lx mb-8 min-h-96 mx-4 sm:mx-0 text-center'>
          You do not have any items in your cart,
          <Link to='/products' className='text-blue-500'> start adding some</Link>!
        </div>
      </div>
    )
  }

  const FilledCart = () => {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-8">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span className="sm:hidden">Price</span>
                  <span className="hidden sm:inline">Unit Price</span>
                </th>
                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span className="sm:hidden">Qty</span>
                  <span className="hidden sm:inline">Quantity</span>
                </th>
                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span className="sm:hidden">Total</span>
                  <span className="hidden sm:inline">Line Total</span>
                </th>
                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span className="sm:hidden">Remove</span>
                  <span className="hidden sm:inline">Remove Item</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.line_items.map((item, index) => (
                <tr key={index}>
                  <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full" src={item.image.url} alt={item.image.filename} />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{item.product_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.price.formatted_with_symbol}</p>
                  </td>
                  <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.quantity}</p>
                  </td>
                  <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative">{item.line_total.formatted_with_symbol}</span>
                    </span>
                  </td>
                  <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      className="bg-accent-dark-500 hover:bg-accent-dark-300
                            text-white font-bold py-2 px-4 mb-4
                            border accent-dark-900 rounded
                            flex items-center"
                      disabled={isUpdating}
                      onClick={() => handleMyRemoveFromCart(item.id)}
                    >
                      <span className="sm:hidden">-</span>
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="px-2 py-5 border-b border-gray-200 bg-gray-100 text-sm text-right font-semibold">
                  Subtotal:
                </td>
                <td className="px-2 py-5 border-b border-gray-200 bg-gray-100 text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">{cart.subtotal.formatted_with_symbol}</span>
                  </span>
                </td>
                <td className="px-2 py-5 border-b border-gray-200 bg-gray-100 text-sm"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className='flex flex-row items-center gap-8 mb-8'>
          <button
            className="bg-accent-dark-500 hover:bg-accent-dark-300
                        text-white font-bold py-2 px-4 mb-4
                        border accent-dark-900 rounded
                        flex items-center"
            disabled={isUpdating}
            onClick={() => handleMyEmptyCart()}
          >
            Empty Cart
          </button>
          <button
            className="bg-accent-dark-500 hover:bg-accent-dark-300
                        text-white font-bold py-2 px-4 mb-4
                        border accent-dark-900 rounded
                        flex items-center"
            disabled={isUpdating}
            onClick={() => navigate('/check-out')}
          >
            Checkout
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    // console.log('ShoppingCart, useEffect triggered');
    setIsUpdating(true);
    setIsCartEmpty(!(xtype.type(cart.line_items.length) === 'number' && cart.line_items.length > 0));

    setIsUpdating(false);
  }, [cart]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-center">
        <h1 className='text-3xl font-bold underline decoration-1 underline-offset-4 my-8'>
          Your Shopping Cart
        </h1>
      </div>
      {isCartEmpty ? <EmptyCart /> : <FilledCart />}
    </div>
  );
};

export default ShoppingCart;