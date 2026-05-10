import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow p-4 bg-white flex flex-col">
      <div className="h-48 flex justify-center mb-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full object-contain"
        />
      </div>
      <h2 className="text-lg font-semibold line-clamp-2 mb-2">{product.title}</h2>
      <p className="text-gray-500 mb-4 flex-grow line-clamp-3">{product.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold text-blue-600">${product.price}</span>
        <Link 
          to={`/product/${product.id}`} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;