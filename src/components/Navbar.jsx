import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  
  // Считаем общее количество всех вещей в корзине
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider hover:text-blue-100 transition">
          MyShop
        </Link>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-blue-200 transition font-medium">Главная</Link>
          <Link to="/cart" className="hover:text-blue-200 transition font-medium flex items-center gap-2">
            Корзина
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;