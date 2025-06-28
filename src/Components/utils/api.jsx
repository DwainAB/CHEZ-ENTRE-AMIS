export const fetchRestaurantData = async (restaurantId) => {
    try {
      const response = await fetch("https://hfbyctqhvfgudujgdgqp.supabase.co/functions/v1/getCategoryProductByRestaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmYnljdHFodmZndWR1amdkZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NTc0MDIsImV4cCI6MjA1MTQzMzQwMn0.9g3N_aV4M5UWGYCuCLXgFnVjdDxIEm7TJqFzIk0r2Ho"
        },
        body: JSON.stringify({ restaurant_id: restaurantId }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'appel à l'Edge Function :", error);
      return { success: false, error: error.message };
    }
  };
  