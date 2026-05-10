import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Достаем функцию из контекста

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow p-4 bg-white flex flex-col">
      <div className="h-48 flex justify-center mb-4 p-2 bg-gray-50 rounded">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full object-contain mix-blend-multiply"
        />
      </div>
      <h2 className="text-lg font-semibold line-clamp-2 mb-2">{product.title}</h2>
      <div className="flex justify-between items-center mt-auto mb-4">
        <span className="text-2xl font-bold text-gray-800">${product.price}</span>
      </div>
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors font-semibold"
        >
          В корзину
        </button>
        <Link 
          to={`/product/${product.id}`} 
          className="w-full text-center border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;