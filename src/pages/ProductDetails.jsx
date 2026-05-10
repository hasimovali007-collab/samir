import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams(); // Достаем ID товара из адресной строки
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Делаем запрос к API для получения только одного товара по его ID
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке товара:", err);
        setError("Не удалось найти информацию о товаре.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-gray-500 border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return <div className="text-center text-red-500 p-8 text-xl">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block font-semibold">
        &larr; Вернуться в каталог
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg border p-8 flex flex-col md:flex-row gap-12">
        {/* Блок с картинкой */}
        <div className="md:w-1/2 flex justify-center bg-gray-50 p-8 rounded-lg">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[400px] object-contain mix-blend-multiply"
          />
        </div>

        {/* Блок с информацией */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <span className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>
          <div className="text-4xl font-extrabold text-blue-600 mb-8">
            ${product.price}
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg shadow-md"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;