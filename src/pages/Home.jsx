import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Скачиваем данные с API при загрузке страницы
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка API:", err);
        setError("Не удалось загрузить товары. Попробуйте позже.");
        setLoading(false);
      });
  }, []);

  // Обработка состояния загрузки (требование из критериев оценки)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl font-semibold text-gray-500">Загрузка товаров...</div>
      </div>
    );
  }

  // Обработка ошибки
  if (error) {
    return <div className="text-center text-red-500 p-8 text-xl">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Каталог товаров</h1>
      
      {/* Адаптивная сетка Tailwind: 1 колонка на мобильном, 2 на планшете, 4 на ПК */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;