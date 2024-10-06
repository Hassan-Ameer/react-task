import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const fetchProductDetail = () => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((resolve) => resolve.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  };

  const handleAddToCart = () => {
    const prevItems = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify([...prevItems, product]));
    toast.success('Product added to cart');
    getCartCount();
  };

  const getCartCount = () => {
    const totalCount = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(totalCount.length);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  useEffect(() => {
    getCartCount();
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="font-sans">
        <ToastContainer />
        <h1 className="mt-20 text-3xl ms-20 mb-20">
          No of items in cart: {cartCount}
        </h1>
        <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
            <div className="w-full lg:sticky top-0 sm:flex gap-2">
              <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={product.image}
                    alt={`Product${index + 1}`}
                    className="w-full cursor-pointer rounded-md hover:scale-105 transition duration-300 ease-in-out"
                  />
                ))}
              </div>
              <img
                src={product.image}
                alt="Product"
                className="w-4/5 rounded-md object-cover hover:scale-105 transition duration-300 ease-in-out"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-bold">${product.price}</p>
                <p className="text-gray-400 text-xl">
                  <strike>${(product.price * 1.2).toFixed(2)}</strike>{" "}
                  <span className="text-sm ml-1.5">Tax included</span>
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                {[...Array(Math.floor(product.rating.rate))].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">Sizes</h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  {["SM", "MD", "LG", "XL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0 ${size === "MD" ? "border-blue-600" : "" }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">Colors</h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  {["#FF69B4", "#F7DC6F", "#8BC34A", "#03A9F4"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-10 h-10 border-2 hover:border-blue-600 rounded-full shrink-0 ${color === "#03A9F4" ? "border-blue-600" : ""}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className="w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className="w-full h-12 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
                  onClick={handleViewCart}
                >
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;