// src/lib/restaurantData.js
import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase'; 
import TextJson from "../Components/TextJson/TextJson.json";

// Création d'un contexte pour partager les données
const RestaurantContext = createContext(null);

// Hook personnalisé pour utiliser les données du restaurant
export function useRestaurantData() {
  return useContext(RestaurantContext);
}

// Provider qui va récupérer et fournir les données
export function RestaurantProvider({ children }) {
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRestaurantData() {
      try {
        // Récupération des données de la table restaurants
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', TextJson.refRestaurant)  
          .single();  

        if (error) throw error;

        // Récupération de l'adresse à partir de address_id
        const { data: addressData, error: addressError } = await supabase
          .from('addresses')
          .select('*')
          .eq('id', data.address_id)  // Utilisation de address_id
          .single();

        if (addressError) throw addressError;

        // Ajout de l'adresse aux données du restaurant
        data.address = addressData;

        // Récupération des heures d'ouverture du restaurant
        const { data: hoursData, error: hoursError } = await supabase
          .from('restaurant_hours')
          .select('*')
          .eq('restaurant_id', data.id);  // Utilisation de l'id du restaurant

        if (hoursError) throw hoursError;

        // Ajout des heures d'ouverture aux données du restaurant
        data.hours = hoursData;

        // Log des données récupérées
        console.log('Données récupérées du restaurant:', data);

        setRestaurantData(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du restaurant:', error);
        setError(error);
        setLoading(false);
      }
    }

    fetchRestaurantData();
  }, []);

  const value = {
    restaurantData,
    loading,
    error
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

// Fonction d'aide pour récupérer directement les données (alternative au contexte)
export async function getRestaurantData() {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .limit(1)
    .single();
    
  if (error) throw error;
  return data;
}