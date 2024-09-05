import React from 'react'

const Stepper = ({ currentStep }) => {
    const steps = ['Shipping Address', 'Payment Details'];
  
    return (
      <div className="flex justify-center items-center mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-row align-middle">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep ? 'bg-green-500 text-white' : 
                index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}>
                {index + 1}
              </div>
              <span className="mt-2 text-sm pl-1 pr-2 pb-2 hidden md:inline">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 w-12 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    )
  }

export default Stepper