import React, { useState, useEffect, useCallback } from 'react'
import { Pagination, ProductCard } from '../../components'
import shortid from 'shortid'

const Products = ({ productList, onSetAlert }) => {
  const pageSize = 6;
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: 0
  });

  const handlePageChange = useCallback((page) => {
    // console.log(`handlePageChange called with page: ${page}`);
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    setPagination(prevPagination => ({
      ...prevPagination,
      from,
      to,
      count: products.length
    }));
    setCurrentProducts(products.slice(from, to));

    window.scrollTo(0, 0);
  }, [pageSize, products]);

  useEffect(() => {
    if (products.length > 0) {
      handlePageChange(1);  // Set up the first page
    }
  }, [products, handlePageChange]);

  useEffect(() => {
    setProducts(productList);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <div key={shortid.generate()} className="flex justify-center">
              <ProductCard
                product={product}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            postsPerPage={pageSize}
            totalPosts={products.length}
            paginate={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Products