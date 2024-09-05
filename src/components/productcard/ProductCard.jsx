import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`, { state: { product } });
    }

    const removeHtmlTags = (html) => {
        return html.replace(/<[^>]*>/g, '');
    };

    const cleanProdDescription = (description) => {
        return description ? removeHtmlTags(description) : '';
    };;

    useEffect(() => {
        // console.log(product);
    }, []);

    return (
        <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-[275px]"
                src={product.image.url}
                alt={product.image.filename} />
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">{product.name}</h2>
                <p className="line-clamp-4 text-gradient-overlay text-gray-700 text-base">
                    {cleanProdDescription(product.description)}
                </p>
                <br />
                <span className="text-gray-600 font-semibold">Price: $</span>
                <span>{product.price.formatted}</span>
            </div>
            <div className="flex flex-col w-full mt-auto">
                <div className="w-80 h-[2px] bg-accent-dark-100 self-center" />
                <div className="px-6 py-4">
                    <button
                        className="bg-accent-dark-500 hover:bg-accent-dark-300
                        text-white font-bold py-2 px-4 
                        border accent-dark-900 rounded"
                        //   aria-label={title}
                        onClick={() => handleClick()}
                    >
                        Item Details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard