import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import validator from "validator"
import { commerce } from '../../helpers/Commerce'

const AddressForm = ({ formData, onNext, checkoutToken, onSetAlert, onClearAlert }) => {
  const errorMessage = 'Missing form data: ';
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const streetRef = useRef(null);
  const street2Ref = useRef(null);
  const cityRef = useRef(null);
  const zipRef = useRef(null);
  const emailRef = useRef(null);

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  }

  const loadFormData = () => {
    // update our local fields using formData variables
    fnameRef.current.value = formData.fname;
    lnameRef.current.value = formData.lname;
    streetRef.current.value = formData.street;
    street2Ref.current.value = formData.street2;
    cityRef.current.value = formData.city;
    zipRef.current.value = formData.zip;
    emailRef.current.value = formData.email;

    // these values have to wait for API results
    // setShippingSubdivision(formData.state);
    // setShippingOption(formData.shippingOption);
    // setShippingCountry(formData.shippingCountry);
  }

  const validateFields = () => {
    if (validator.isEmpty(fnameRef.current.value)) {
      onSetAlert('error', errorMessage + 'first name');
      scrollToTop();
      return false;
    }

    if (validator.isEmpty(lnameRef.current.value)) {
      onSetAlert('error', errorMessage + 'last name');
      scrollToTop();
      return false;
    }

    if (validator.isEmpty(streetRef.current.value)) {
      onSetAlert('error', errorMessage + 'street address');
      scrollToTop();
      return false;
    }

    if (validator.isEmpty(cityRef.current.value)) {
      onSetAlert('error', errorMessage + 'city');
      scrollToTop();
      return false;
    }

    if (validator.isEmpty(shippingSubdivision)) {
      onSetAlert('error', errorMessage + 'state');
      scrollToTop();
      return false;
    }

    if (validator.isEmpty(zipRef.current.value)) {
      onSetAlert('error', errorMessage + 'zip code');
      scrollToTop();
      return false;
    }

    if (validator.isEmpty(shippingOption)) {
      onSetAlert('error', errorMessage + 'shipping option');
      scrollToTop();
      return false;
    }

    return true;
  }

  const submitFormData = (e) => {
    e.preventDefault();
    onClearAlert();

    // do validation
    if (!validateFields()) { return; }

    // update our formData variables
    formData.fname = fnameRef.current.value;
    formData.lname = lnameRef.current.value;
    formData.street = streetRef.current.value;
    formData.street2 = street2Ref.current.value;
    formData.city = cityRef.current.value;
    formData.state = shippingSubdivision;
    formData.zip = zipRef.current.value;
    formData.email = emailRef.current.value;
    formData.shippingOption = shippingOption;
    formData.shippingCountry = shippingCountry;

    // finally, move to the next screen
    onNext();
  }

  useEffect(() => {
    if (checkoutToken) {
      fetchShippingCountries(checkoutToken.id);
    }
  }, [checkoutToken.id])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry])

  useEffect(() => {
    if (checkoutToken) {
      if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }
  }, [checkoutToken.id, shippingCountry, shippingSubdivision])

  useEffect(() => {
    loadFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full flex flex-col items-center'>
      <form className="w-4/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitFormData}>
        <h2 className='w-full text-xl font-semibold mb-4 text-left'>
          Shipping Address
        </h2>
        <div className="border border-accent-light-400 mb-4" />
        <div className="flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-1/2 md:pr-2 pt-2 md:pt-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fname"
              type="text"
              placeholder="John"
              ref={fnameRef}
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-2 pt-2 md:pt-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lname"
              type="text"
              placeholder="Doe"
              ref={lnameRef}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Street Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="123 Main St"
            ref={streetRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Street Address 2
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address2"
            type="text"
            placeholder="Unit 101"
            ref={street2Ref}
          />
        </div>        
        <div className="flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-1/2 md:pr-2 pt-2 md:pt-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              City
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder="Salt Lake City"
              ref={cityRef}
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-2 pt-2 md:pt-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              State
            </label>
            <select
              value={shippingSubdivision}
              onChange={(e) => setShippingSubdivision(e.target.value)}
              className="w-full py-2 px-3 border rounded text-gray-700 shadow 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.entries(shippingSubdivisions).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-1/2 md:pr-2 pt-2 md:pt-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              Zip Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="zip"
              type="text"
              placeholder="84000"
              ref={zipRef}
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-2 pt-2 md:pt-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shippingOptions">
              Shipping Options
            </label>
            <select
              id="shippingOption"
              value={shippingOption}
              onChange={(e) => setShippingOption(e.target.value)}
              className="w-full py-2 px-3 border rounded text-gray-700 shadow 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {shippingOptions.map((sO) => (
                <option key={sO.id} value={sO.id}>
                  {`${sO.description} - (${sO.price.formatted_with_symbol})`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-4">
          <div className="w-full md:w-1/2 md:pr-2 pt-2 md:pt-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="johndoe@gmail.com"
              ref={emailRef}
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-2 pt-2 md:pt-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              Shipping Country
            </label>
            <select
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              className="w-full py-2 px-3 border rounded text-gray-700 shadow 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.entries(shippingCountries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex flex-row justify-between gap-8 mt-8'>
          <button
            className="bg-accent-dark-500 hover:bg-accent-dark-300
                        text-white font-bold py-2 px-4
                        border accent-dark-900 rounded
                        flex items-center"
            onClick={() => navigate('/products')}
          >
            Cancel
          </button>
          <button
            className="bg-accent-dark-500 hover:bg-accent-dark-300
                        text-white font-bold py-2 px-4
                        border accent-dark-900 rounded
                        flex items-center"
            type='submit'
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddressForm