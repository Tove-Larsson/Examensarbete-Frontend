"use client"

import { useEffect, useState } from "react";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import { IRestaurant } from "../_types/IRestaurant";
import { BASE_URL } from "@/variable.env";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetch(`${BASE_URL}/restaurant/all`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        return response.json();
      })
      .then((data: IRestaurant[]) => { 
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />

      <main className="flex-1 p-8 sm:p-16">
        <div className="text-center max-w-4xl mx-auto">
          <section>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-100">
              Restauranger
            </h2>
          </section>

          {loading && (
            <p className="text-center text-gray-400 mt-8">Laddar restauranger...</p>
          )}

          {error && (
            <p className="text-center text-red-500 mt-8">
              Ett fel uppstod: {error}
            </p>
          )}

          {!loading && !error && (
            <section
              id="restaurants"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12"
            >
              {restaurants.map((restaurant, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-100">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-400 mt-2">
                    <strong>Adress:</strong> {restaurant.address}
                  </p>
                  <p className="text-gray-400">
                    <strong>Stad:</strong> {restaurant.city}
                  </p>
                  <p className="text-gray-400">
                    <strong>Toalett:</strong>{" "}
                    {restaurant.toilet}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
