import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Stepper,
  AddressForm,
  PaymentForm,
  ConfirmationForm
} from '../../components'

import { commerce } from '../../helpers/Commerce'

const Checkout = ({ cart, order, onCaptureCheckout, onSetAlert, onClearAlert }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    street: "",
    street2: "",
    city: "",
    state: "Owner State",
    zip: "",
    email: "",
    shippingOption: "",
    shippingCountry: "",

    card: "",
    ccMonth: "",
    ccYear: "",
    cvc: "",
  })

  const nextStep = () => { setCurrentStep(currentStep + 1); window.scrollTo(0, 0); }
  const prevStep = () => { setCurrentStep(currentStep - 1); window.scrollTo(0, 0); }

  const navigate = useNavigate();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AddressForm
          formData={formData}
          onNext={nextStep}
          checkoutToken={checkoutToken}
          onSetAlert={onSetAlert}
          onClearAlert={onClearAlert} />;
      case 1:
        return <PaymentForm
          formData={formData}
          onPrev={prevStep}
          onNext={nextStep}
          checkoutToken={checkoutToken}
          onCaptureCheckout={onCaptureCheckout}
          onSetAlert={onSetAlert}
          onClearAlert={onClearAlert} />;
      case 2:
        return <ConfirmationForm
          formData={formData}
          order={order} />;
      default:
        return <AddressForm
          formData={formData}
          onNext={nextStep}
          checkoutToken={checkoutToken}
          onSetAlert={onSetAlert}
          onClearAlert={onClearAlert} />;
    }
  }

  useEffect(() => {
    // console.log(`Checkout, useEffect triggered, cart.id: ${cart.id}`);

    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(
          cart.id,
          { type: 'cart' });

        setCheckoutToken(token);
        setIsLoading(false);

      } catch (error) {
        console.log(`Error message: ${error}`);
        onSetAlert('error', 'Something went wrong.');
        navigate('/products');
      }
    }

    generateToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full flex flex-col items-center'>
      <div className="flex justify-center">
        <h1 className='text-3xl font-bold underline decoration-1 underline-offset-4 m-8'>
          Checkout
        </h1>
      </div>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-72 gap-4">
          <p className="text-xl font-semibold">Checkout data is being loaded</p>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      ) : (
        <div className='w-full'>
          <Stepper currentStep={currentStep} />
          {renderStep()}
        </div>
      )}
    </div>

  );
};

export default Checkout;