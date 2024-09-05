import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { commerce } from './helpers/Commerce'
import { Alert, Navbar, Footer } from './components'
import { Product, Products, ShoppingCart, Checkout, ContactUs } from './pages'

const App = () => {
  const [alertState, setAlertState] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const setAlert = (severity, message) => {
    setAlertState(true);
    setAlertSeverity(severity);
    setAlertMessage(message);
  }

  const clearAlert = () => {
    setAlertState(false);
    setAlertSeverity('');
    setAlertMessage('');
  }

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity, variant) => {
    // console.log(`handleAddToCart, productId: ${productId}, quantity: ${quantity}, variant: ${variant}`)
    setAlert('info', 'Adding items to your cart.');

    let cart = '';
    if (variant === '') {
      cart = await commerce.cart.add(productId, quantity);
    } else {
      cart = await commerce.cart.add(productId, quantity, variant);
    }

    setCart(cart);
    clearAlert();
  }

  // const handleUpdateCartQty = async (productId, quantity) => {
  //   const cart = await commerce.cart.update(productId, { quantity });
  //   setCart(cart)
  // }

  const handleRemoveFromCart = async (productId) => {
    // console.log(`handleRemoveFromCart, removing productId: ${productId}`);
    setAlert('info', 'Removing item from cart.');
    const cart = await commerce.cart.remove(productId);
    setCart(cart);
    clearAlert();
  }

  const handleEmptyCart = async () => {
    setAlert('info', 'Emptying your cart.');
    const cart = await commerce.cart.empty();
    setCart(cart);
    clearAlert();
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      setOrder({});
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log('Error: ' + error.data.error.message);
      setAlert('error', error.data.error.message);
    }
  }

  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      try {
        await fetchProducts();
        await fetchCart();
        navigate('/products');
      } catch (error) {
        console.error('Error initializing app:', error);
        setAlert('error', error.data.error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [])

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {alertState ? (
          <Alert
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
            onClose={clearAlert}
          />
        ) : (
          <React.Fragment />
        )}      
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-bold">Products are being loaded...</p>
        </div>
      ) : (
        <Routes>
          <Route path='/products' exact element={<Products productList={products} onSetAlert={setAlert} />} />
          <Route path='/product/:id' element={<Product onAddToCart={handleAddToCart} onSetAlert={setAlert} onClearAlert={clearAlert} />} />
          <Route path='/shopping-cart' element={<ShoppingCart cart={cart} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />} />
          <Route path='/check-out' element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} onSetAlert={setAlert} onClearAlert={clearAlert} />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='*' element={<Products />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
};

export default App;