import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState({});

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!formData.email.includes('@')) newErrors.email = 'Неверный формат email';
    if (formData.address.length < 10) newErrors.address = 'Адрес слишком короткий';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Заказ успешно оформлен! Спасибо за покупку.');
      clearCart();
      navigate('/'); // Возвращаем на главную
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-10"><h2 className="text-2xl font-bold">Корзина пуста</h2><Link to="/" className="text-blue-500">В каталог</Link></div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">ФИО</label>
          <input 
            type="text" 
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Адрес доставки</label>
          <textarea 
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div className="text-xl font-bold mb-4">К оплате: ${totalAmount.toFixed(2)}</div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700">
          Подтвердить заказ
        </button>
      </form>
    </div>
  );
};
export default Checkout;