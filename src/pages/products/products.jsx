import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Product() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(resolve => resolve.json())
      .then(products => setData(products))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mx-auto p-4 bg-orange-100 transition-300">
      <h1 className='text-6xl m-auto text-center mb-12'>All products 50% OFF</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {data.map(item => (
          <div
            key={item.id}
            className="border p-4 rounded shadow-md cursor-pointer hover:bg-black hover:text-white hover:bg-opacity-50"
            onClick={() => handleProductClick(item.id)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-gray-700">${item.price}</p>
            <p className="text-gray-700">Rating: {item.rating.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;