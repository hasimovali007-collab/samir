import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  // Считаем общую сумму заказа
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Если корзина пустая, показываем это
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center mt-10">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Ваша корзина пуста</h1>
        <p className="text-gray-500 mb-6">Добавьте товары из каталога, чтобы оформить заказ.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
          Вернуться к покупкам
        </Link>
      </div>
    );
  }

  // Если в корзине есть товары
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Оформление заказа</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Список товаров */}
        <div className="flex-grow bg-white p-6 rounded-lg shadow-sm border">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 p-2 bg-gray-50 rounded flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg line-clamp-1">{item.title}</h2>
                  <p className="text-gray-500">Количество: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-bold text-xl text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold px-3 py-1 bg-red-50 rounded hover:bg-red-100 transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Панель Итого */}
        <div className="bg-gray-50 border p-6 rounded-lg h-fit min-w-[300px]">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Итого</h2>
          <div className="flex justify-between mb-6">
            <span className="text-gray-600">Сумма заказа:</span>
            <span className="font-bold text-2xl text-blue-600">${totalAmount.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => {
              alert('Ура! Ваш заказ успешно оформлен!');
              clearCart(); // Очищаем корзину после оформления
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg shadow-md"
          >
            Оплатить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;