import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { commerce } from '../../helpers/Commerce'
import { Counter, Variants } from '../../components'
import { MdOutlineShoppingCart } from 'react-icons/md'
import xtype from 'xtypejs'

const Product = ({ onAddToCart, onSetAlert, onClearAlert }) => {
    const [quantity, setQuantity] = useState(1);
    const [variants, setVariants] = useState({});
    const [selectedVariant, setSelectedVariant] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const product = location.state?.product;

    const fetchProductById = (id) => {

    }

    const removeHtmlTags = (html) => {
        return html.replace(/<[^>]*>/g, '');
    }

    const cleanProdDescription = (description) => {
        return description ? removeHtmlTags(description) : '';
    }

    const handleSetQuantity = (value) => {
        // console.log(`setting quantity to: ${value}`)
        setQuantity(value);
    }

    const getVariants = async (productId) => {
        const { data } = await commerce.products.getVariants(productId);
        if (xtype.type(data) === 'array') {
            // console.log('setting variants');
            // console.log(data);
            setVariants(data);
        }
    }

    const handleSelectedVariant = (variant) => {
        // console.log(variant);
        setSelectedVariant(variant);
    }

    const handleAddItemToCart = () => {
        onClearAlert();

        try {
            // check quantity
            if (quantity == 0) { throw new Error('Quantity is 0') }

            // check variants
            if ((xtype.type(variants) === 'array') &&
                (variants.length > 0) &&
                (xtype.type(selectedVariant['id']) === 'undefined')) { throw new Error('You must select an option for this item.') }

            if (xtype.type(selectedVariant['id']) === 'undefined') {
                onAddToCart(product.id, quantity, '');
            } else {
                onAddToCart(product.id, quantity, selectedVariant['id']);
            };

            // go to Products page
            navigate('/products');
        }
        catch (error) {
            onSetAlert('error', `Something went wrong- ${error.message}`);
            window.scrollTo(0, 0);
        }
    }

    useEffect(() => {
        if (!product) {
            // Fetch product data using the ID
            fetchProductById(id);
        }
    }, [id, product]);

    useEffect(() => {
        if (product) { getVariants(product.id); }
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center w-full p-4">
            <div className='flex flex-col max-w-5xl w-full md:w-3/4 lg:w-2/3 border-2 border-accent-light-50 shadow-md rounded-md'>
                <div className='w-full flex flex-col md:flex-row'>
                    <div className="w-full md:w-1/2">
                        <img className="w-full h-auto object-cover rounded-md"
                            src={product.image.url}
                            alt={product.image.filename} />
                    </div>
                    <div className='w-full md:w-1/2 p-4'>
                        <h1 className='text-2xl font-bold mb-4'>{product.name}</h1>
                        <p className='mb-4'>
                            {cleanProdDescription(product.description)}
                        </p>
                        <div className='flex flex-row gap-4 mb-4'>
                            <div className='text-xl font-bold '>
                                Price:
                            </div>
                            <div className='text-xl'>
                                {product.price.formatted_with_symbol}
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 mb-4'>
                            <div className='text-xl font-bold '>
                                Quantity:
                            </div>
                            <Counter
                                min={0}
                                initialCount={quantity}
                                setQuantity={handleSetQuantity}
                            />
                        </div>
                        <div className='flex flex-row gap-4 mb-4'>
                            {(xtype.type(variants) === 'array') ? (
                                <Variants
                                    variants={variants}
                                    handleSelectedVariant={(variant) => handleSelectedVariant(variant)} />
                            ) : (
                                <React.Fragment />
                            )}
                        </div>
                        <button
                            className="bg-accent-dark-500 hover:bg-accent-dark-300
                            text-white font-bold py-2 px-4 mb-4
                            border accent-dark-900 rounded
                            flex items-center"
                            onClick={() => handleAddItemToCart()}
                        >
                            <MdOutlineShoppingCart className="mr-2" size={20} />
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product