"use client";

import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { IUser } from "@/app/_types/IUser";
import { BASE_URL } from "@/variable.env";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignUp() {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!user.username || !user.password) {
      setError("Både användarnamn och lösenord krävs");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setSuccessMessage("Kontot registrerat");
        } else {
          setError("Ogiltigt användarnamn eller lösenord");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Ett fel uppstod, vänligen försök igen.");
      });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />
      <main className="flex-1 flex justify-center items-center p-8 pb-20 sm:p-20">
        <section className="text-center sm:text-left max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-100">
            Skapa konto
          </h2>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 mt-8 w-full max-w-md"
          >
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleUserChange}
                placeholder="Användarnamn"
                required
                className="px-4 py-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleUserChange}
                placeholder="Lösenord"
                required
                className="px-4 py-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

            {successMessage && (
              <p className="text-sm text-green-400 mt-2">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-lg shadow-md transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Skapar..." : "Skapa"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
