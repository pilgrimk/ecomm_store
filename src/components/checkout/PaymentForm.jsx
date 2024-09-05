import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PaymentForm = ({ formData, onPrev, onNext, checkoutToken, onCaptureCheckout, onSetAlert, onClearAlert }) => {

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    onClearAlert();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log(error);
      onSetAlert('error', 'Something went wrong');
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: formData.fname,
          lastname: formData.lname,
          email: formData.email
        },
        shipping: {
          name: 'Primary',
          street: formData.street,
          street2: formData.street2,
          town_city: formData.city,
          county_state: formData.state,
          postal_zip_code: formData.zip,
          country: formData.shippingCountry
        },
        fulfillment: {
          shipping_method: formData.shippingOption
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      // finally move to next step, the confirmation page
      onNext();
    }
  }

  const Review = () => {
    return (
      <div className="w-full">
        <h2 className="w-full text-xl font-semibold mb-4 text-left">Order Summary</h2>
        <div className="border border-accent-light-400" />
        <ul className="divide-y divide-gray-200">
          {checkoutToken.line_items.map((product) => (
            <li key={product.name} className="py-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.line_total.formatted_with_symbol}
                </p>
              </div>
            </li>
          ))}
          <li className="py-4">
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-sm font-bold text-gray-900">
                {checkoutToken.subtotal.formatted_with_symbol}
              </p>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  const StripePayment = () => {
    return (
      <div className="w-full mt-4">
        <h2 className='w-full text-xl font-semibold mb-4 text-left'>Payment Method</h2>
        <div className="border border-accent-light-400 mb-6" />
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)} className="space-y-4">
                <CardElement className="p-2 border border-gray-300 rounded-md" />
                <div className='flex flex-row justify-between gap-8 mb-8'>
                  <button
                    className="bg-accent-dark-500 hover:bg-accent-dark-300
                        text-white font-bold py-2 px-4 mb-4
                        border accent-dark-900 rounded
                        flex items-center"
                    disabled={!stripe}
                    onClick={() => onPrev()}
                  >
                    Previous
                  </button>
                  <button
                    className="py-2 px-4 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                    disabled={!stripe}
                    type="submit"
                  >
                    Pay {checkoutToken.subtotal.formatted_with_symbol}
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <div className="w-4/5 bg-white shadow-md rounded p-4 mb-4">
        <Review />
        <StripePayment />
      </div>
    </div>
  )
}

export default PaymentForm