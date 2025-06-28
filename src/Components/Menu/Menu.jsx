import React, { useState, useEffect } from 'react';
import './Menu.css';
import { fetchRestaurantData } from '../utils/api';
import textJson from "../TextJson/TextJson.json";

const Modal = ({ isOpen, onClose, message, nextOpening }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Restaurant fermé</h3>
        <p>{message}</p>
        {nextOpening && <p>Prochaine ouverture : {nextOpening}</p>}
        <button className="modal-close" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

function Menu({itemMin, itemMax}) {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameRestaurant = textJson.refRestaurant;
  const showImages = textJson.showMenuImages || false;

  useEffect(() => {
    const fetchFoodsAndCategories = async () => {
      try {
        const { success, products, categories, error } = await fetchRestaurantData(nameRestaurant);
        if (!success) throw new Error(error);
        const filteredProducts = products.filter(product => !product.is_deleted);
        setCategories(categories);
        setFoods(filteredProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchFoodsAndCategories();
  }, [nameRestaurant]);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getItemsPerPage() {
    return window.innerWidth <= 1062 ? itemMin : itemMax;
  }

// First, let's fix the checkIsOpen function
const checkIsOpen = () => {
  const now = new Date();
  const currentDay = now.getDay(); // Keep 0 for Sunday
  const currentHour = now.getHours() + now.getMinutes() / 60;

  // Check if the restaurant is open on this day and time
  return textJson.openingHours.some(({ day, start, end }) => {
    if (currentDay === 0) return false; // Sunday is always closed
    return day === currentDay && currentHour >= start && currentHour <= end;
  });
};

// Then, let's fix the getNextOpening function
const getNextOpening = () => {
  const now = new Date();
  const currentDay = now.getDay(); // Keep 0 for Sunday
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  // Handle Sunday separately
  if (currentDay === 0) {
    // Next opening is always Monday at 11:00
    return "Lundi à 11h00";
  }

  // Find next opening time
  let nextOpening = null;
  let daysToAdd = 0;

  while (!nextOpening && daysToAdd < 7) {
    const checkDay = currentDay + daysToAdd;
    const normalizedDay = checkDay > 6 ? checkDay - 7 : checkDay;
    
    // Skip Sunday
    if (normalizedDay === 0) {
      daysToAdd++;
      continue;
    }

    const todayHours = textJson.openingHours.filter(h => h.day === normalizedDay);
    
    if (todayHours.length > 0) {
      if (daysToAdd === 0) {
        // Check remaining slots for today
        for (const slot of todayHours) {
          if (currentHour < slot.start) {
            nextOpening = {
              day: daysOfWeek[normalizedDay],
              time: formatTime(slot.start)
            };
            break;
          }
        }
      } else {
        // For future days, take the first slot
        nextOpening = {
          day: daysOfWeek[normalizedDay],
          time: formatTime(todayHours[0].start)
        };
      }
    }
    
    if (!nextOpening) daysToAdd++;
  }

  return nextOpening 
    ? `${nextOpening.day === daysOfWeek[currentDay] ? "Aujourd'hui" : nextOpening.day} à ${nextOpening.time}` 
    : "Lundi à 11h00";
};

  const formatTime = (hour) => {
    const hours = Math.floor(hour);
    const minutes = Math.round((hour - hours) * 60);
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  };

  const handleOrder = () => {
    if (checkIsOpen()) {
      window.location.href = `https://platforms.yumco.fr/${nameRestaurant}`;
    } else {
      setIsModalOpen(true);
    }
  };

  const filterItems = (items) => {
    if (filter === 'all') return items;
    return items.filter(item => item.category_id === categories.find(cat => cat.name === filter)?.id);
  };

  const filteredItems = filterItems(foods);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, document.getElementById('menu').offsetTop);
  };

  return (
    <div className="containerGlobalMenu" id='menu'>
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="Désolé, le restaurant est actuellement fermé."
        nextOpening={getNextOpening()}
      />

      <div className='lineMenu'></div>
      <h2 className="titleMenu">MENU</h2>
      <div className="filter">
        <select 
          id="category-filter" 
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Tous</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <h2 className={`categoryTitle ${filter === 'all' ? 'allProducts' : ''}`}>
        {filter === 'all' ? 'Tous nos produits' : filter.charAt(0).toUpperCase() + filter.slice(1)}
      </h2>

      <div className={`menu ${showImages ? 'menu-with-images' : ''}`}>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className={`menu-item menu-item-card ${showImages ? 'with-image' : ''}`}>
              {showImages && item.image_url && (
                <div className="item-image-container">
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    className="item-image"
                    onError={(e) => {
                      e.target.src = '/placeholder-food.jpg';
                    }}
                  />
                </div>
              )}
              
              <div className={showImages ? 'item-content' : ''}>
                <div className='titlePriceProduct'>
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">{item.price.toFixed(2)} €</div>
                </div>
                <div 
                  className="item-description" 
                  data-full-description={item.description}
                >
                  {item.description}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun produit à afficher.</p>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => i + 1).map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>

      <div className='btnplateforme'>
        <button onClick={handleOrder} className="btnplateforme">
          Commander
        </button>
      </div>

    </div>
  );
}

export default Menu;