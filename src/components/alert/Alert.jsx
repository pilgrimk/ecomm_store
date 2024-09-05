import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Alert = ({ alertSeverity, alertMessage, onClose }) => {
  const [title, setTitle] = useState('');
  const [alertClass, setAlertClass] = useState('');
  
  const hideAlert = () => {
    onClose();
  };

  useEffect(() => {
    const flex_directives = "mb-4 px-6 py-3 shadow-md flex flex-row items-center justify-between";

    if (alertSeverity === 'error') {
      setTitle('Error Message');
      setAlertClass('bg-red-100 border-t border-b border-red-500 text-red-700 ' + flex_directives);
    } else if (alertSeverity === 'warning') {
      setTitle('Warning Message');
      setAlertClass('bg-orange-100 border-t border-b border-orange-500 text-orange-700 ' + flex_directives);
    } else {
      setTitle('Information Message');
      setAlertClass('bg-blue-100 border-t border-b border-blue-500 text-blue-700 ' + flex_directives);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertSeverity]);

  return (
    <div className={alertClass} role="alert">
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm">{alertMessage}</p>
      </div>
      <button
        type="button"
        onClick={() => hideAlert()}>
          <FaTimes size='1rem'/>
      </button>
    </div>
  )
}

export default Alert