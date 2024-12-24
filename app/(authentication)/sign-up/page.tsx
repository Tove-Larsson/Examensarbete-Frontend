"use client";

import Navbar from "@/app/_components/Navbar";
import { IUser } from "@/app/_types/IUser";
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
      setError("Both username and password are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setSuccessMessage("Kontot registrerat");
          console.log("Sign up successful");
        } else {
          setError("Invalid username or password.");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("An error occurred. Please try again.");
      });
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-900 text-gray-200">
      <header className="w-full flex justify-between items-center py-4 px-8 sm:px-16 bg-gray-800 shadow-md">
        <Navbar />
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className="text-center sm:text-left max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-100">
            Registrera ditt konto
          </h2>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 mt-8 w-full max-w-md"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-gray-300">
                Användarnamn
              </label>
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
              <label htmlFor="password" className="text-gray-300">
                Lösenord
              </label>
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
              {loading ? "Registrerar..." : "Registrera"}
            </button>
          </form>
        </section>
      </main>

      <footer className="w-full text-center py-4 text-gray-500 border-t border-gray-700">
        <p>
          &copy; {new Date().getFullYear()} Dine & Flush. Alla rättigheter
          förbehållna.
        </p>
      </footer>
    </div>
  );
}
