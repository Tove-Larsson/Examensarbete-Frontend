"use client";

import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { IRestaurant } from "@/app/_types/IRestaurant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateRestaurant() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant | null>(null);
  const [originalName, setOriginalName] = useState<string | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const router = useRouter();

  const navLinks = [
    { label: "Hem", href: "/" },
    { label: "Om oss", href: "/about" },
    { label: "Kontakt", href: "/contact" },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      setError("You are not authorized to access this page.");
      setTimeout(() => {
        router.push("/sign-in"); 
      }, 3000);
    } else {
      fetchRestaurants(token); 
    }
  }, [router]);

  const fetchRestaurants = (token: string) => {
    fetch("http://localhost:8080/restaurant/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
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
  };

  const handleUpdateRestaurant = () => {
    if (!selectedRestaurant || !originalName) {
      return;
    }

    console.log("Updating restaurant:", selectedRestaurant); 

    const token = sessionStorage.getItem("jwtToken"); 
    if (!token) {
      setError("You are not authorized to update this restaurant.");
      setTimeout(() => {
        router.push("/sign-in"); 
      }, 3000);
      return;
    }

    fetch(
      `http://localhost:8080/restaurant/update/${encodeURIComponent(originalName)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({
          ...selectedRestaurant,
          name: selectedRestaurant.name, 
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update restaurant");
        }
        return response.text();
      })
      .then((message) => {
        console.log(message);
        setUpdateStatus(`Restaurang "${selectedRestaurant.name}" uppdaterad!`);
        setTimeout(() => setUpdateStatus(null), 3000);
      })
      .catch((err) => {
        console.error("Error updating restaurant:", err);
        setError(err.message);
      });
  };

  const handleSelectRestaurant = (name: string) => {
    const selected = restaurants.find((r) => r.name === name) || null;
    if (selected) {
      setSelectedRestaurant(selected);
      setOriginalName(name); 
    } else {
      setOriginalName(null); 
    }
  };

  if (loading) return <div>Laddar...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar links={navLinks} />

      <main className="flex-1 p-8 sm:p-16">
        <div className="text-center max-w-4xl mx-auto">
          <section>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 mb-8">
              Välj restaurang att uppdatera
            </h1>
          </section>

          <div className="mb-8">
            <select
              onChange={(e) => handleSelectRestaurant(e.target.value)}
              value={selectedRestaurant?.name || ""}
              className="w-full max-w-xs bg-gray-800 text-gray-200 border border-gray-700 rounded-lg p-3 mx-auto"
            >
              <option value="">-- Välj restaurang att uppdatera --</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.name} value={restaurant.name}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          {selectedRestaurant && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateRestaurant();
                }}
              >
                <div>
                  <label className="block text-lg font-medium mb-2">Namn:</label>
                  <input
                    type="text"
                    value={selectedRestaurant.name}
                    onChange={(e) =>
                      setSelectedRestaurant({
                        ...selectedRestaurant,
                        name: e.target.value,
                      })
                    }
                    className="w-full max-w-sm bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Adress:</label>
                  <input
                    type="text"
                    value={selectedRestaurant.address}
                    onChange={(e) =>
                      setSelectedRestaurant({
                        ...selectedRestaurant,
                        address: e.target.value,
                      })
                    }
                    className="w-full max-w-sm bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Stad:</label>
                  <input
                    type="text"
                    value={selectedRestaurant.city}
                    onChange={(e) =>
                      setSelectedRestaurant({
                        ...selectedRestaurant,
                        city: e.target.value,
                      })
                    }
                    className="w-full max-w-sm bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Toaletter:</label>
                  <select
                    value={selectedRestaurant.toilet}
                    onChange={(e) =>
                      setSelectedRestaurant({
                        ...selectedRestaurant,
                        toilet: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full max-w-sm bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-3"
                  >
                    <option value="">-- Välj antal toaletter --</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 mx-auto"
                >
                  Uppdatera Restaurang
                </button>
              </form>
            </div>
          )}

          {updateStatus && (
            <div className="text-center text-green-500 mt-8">{updateStatus}</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
