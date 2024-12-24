"use client"

import Navbar from "@/app/_components/Navbar";
import { IAuthResponse } from "@/app/_types/IAuthResponse";
import { IUser } from "@/app/_types/IUser";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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

    const timeout: number = 10_000;
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);

        setLoading(false);

        if (response.ok) {
          console.log("Login successful");
          return response.json();
        } else {
          return response.json().then((errorData) => {
            setError("Invalid username or password.");
            throw new Error(errorData.message);
          });
        }
      })
      .then((data: IAuthResponse) => {
        const token = data.token;
        const role = data.role;

        if (!token) {
          setError("No token exist");
          return;
        }
        sessionStorage.setItem("jwtToken", token);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("isLoggedIn", "true");

        if (role.match("USER")) router.push("/user");

        if (role.match("ADMIN")) router.push("/admin");
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          setError("Request timed out, please try again");
        } else {
          setError(error.message || "An error occured please try again");
        }
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />
      <main className="flex-1 flex justify-center items-center p-8 pb-20 sm:p-20">
        <section className="text-center sm:text-left max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-100">
            Logga in
          </h2>
          <form
            className="flex flex-col gap-6 mt-8 w-full max-w-md"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={handleUserChange}
                className="px-4 py-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none"
                placeholder="Användarnamn"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleUserChange}
                className="px-4 py-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none"
                placeholder="Lösenord"
                required
              />
            </div>

            {error && <p className="text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-lg shadow-md transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Loggar in..." : "Logga in"}
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
