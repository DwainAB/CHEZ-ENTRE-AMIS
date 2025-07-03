import { useEffect, useState, useMemo } from 'react';
import './Menu.css';
import { fetchRestaurantData } from '../Components/utils/api'; 
import textJson from "../Components/TextJson/TextJson.json";

const MenuPage = () => {
  const [rawProducts, setRawProducts] = useState([]);
  const [rawCategories, setRawCategories] = useState([]);

  const restaurantId = textJson.refRestaurant;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchRestaurantData(restaurantId);
      if (result.success !== false) {
        setRawProducts(
          result.products.filter(
            (p) => p.is_available === true && p.is_deleted === false
          )
        );
        setRawCategories(result.categories);
      } else {
        console.error('Erreur API :', result.error);
      }
    };

    fetchData();
  }, [restaurantId]);

  const groupedProducts = useMemo(() => {
    const map = {};

    rawProducts.forEach((product) => {
      const category = rawCategories.find((c) => c.id === product.category_id);
      const categoryName = category ? category.name.trim().toLowerCase() : 'autre';

      if (!map[categoryName]) {
        map[categoryName] = [];
      }

      map[categoryName].push({
        id: product.id,
        title: product.name,
        description: product.description,
        price: product.price,
        image: product.image_url,
      });
    });

    return map;
  }, [rawProducts, rawCategories]);

  const allCategories = useMemo(() => Object.keys(groupedProducts), [groupedProducts]);

  const half = Math.ceil(allCategories.length / 2);
  const leftCategories = allCategories.slice(0, half);
  const rightCategories = allCategories.slice(half);

  const renderCategoryColumn = (categories) => (
    <>
      {categories.map((category) => (
        <div className="category-wrapper" key={category}>
          <div className="category-card">
            <h2 className="category-title">{category}</h2>
            {groupedProducts[category].map((item) => (
              <div className="product-card" key={item.id}>
                {item.image && (
                  <img src={item.image} alt={item.title} className="product-img" />
                )}
                <div className="product-content">
                  <h5>{item.title}</h5>
                  <p className="description">{item.description}</p>
                  <p className="price">{item.price.toFixed(2)} €</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div>
      <div
        className="menu-banner"
      >
        <h1>Carte</h1>
      </div>

      <div className="container">
        <div className="columns">
          <div className="column">{renderCategoryColumn(leftCategories)}</div>
          <div className="column">{renderCategoryColumn(rightCategories)}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
