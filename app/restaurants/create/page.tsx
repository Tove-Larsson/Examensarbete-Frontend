"use client";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { IRestaurant } from "@/app/_types/IRestaurant";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function CreateRestaurant() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<IRestaurant>({
    name: "",
    address: "",
    city: "",
    toilet: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");

    if (!token) {
      router.push("/sign-in");
      return;
    }
  }, [router]);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setRestaurant((prevData) => ({
      ...prevData,
      [name]: name === "toilet" ? parseInt(value, 10) : value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const token = sessionStorage.getItem("jwtToken");

    if (!token) {
      setError("Unauthorized access. Please sign in.");
      router.push("/sign-in");
      return;
    }

    fetch("http://localhost:8080/restaurant/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(restaurant),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Failed to fetch games.");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Restaurant created:", data);
        setError("");
        router.push("/restaurants");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center p-8 sm:p-20 gap-8 text-center">
        <section>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-100">
            Lägg till en restaurang
          </h2>
        </section>

        <section className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={restaurant.name}
                onChange={handleInputChange}
                placeholder="Restaurangens namn"
                required
                className="w-full mt-2 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <input
                type="text"
                id="address"
                name="address"
                value={restaurant.address}
                onChange={handleInputChange}
                placeholder="Adress"
                required
                className="w-full mt-2 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <input
                type="text"
                id="city"
                name="city"
                value={restaurant.city}
                onChange={handleInputChange}
                placeholder="Stad"
                required
                className="w-full mt-2 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label
                htmlFor="toilet"
                className="block text-sm font-medium text-gray-200"
              >
                Antal toaletter
              </label>
              <select
                id="toilet"
                name="toilet"
                value={restaurant.toilet}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Skapa restaurang
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
