"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";

export default function User() {

    const router = useRouter()

    useEffect(() => {
        const token = sessionStorage.getItem("jwtToken");
    
        if (!token) {
          router.push("/sign-in");
          return;
        }
    
      }, [router]);

      const handleNavigate = (endpoint: string) => {
        router.push(endpoint); 
      };

      const navLinks = [
        { label: "Hem", href: "/" },
        { label: "Om oss", href: "/about" },
        { label: "Kontakt", href: "/contact" },
      ];

    return(
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar links={navLinks} />

      <main className="flex-1 flex flex-col justify-center items-center p-8 sm:p-20 gap-8 text-center">
        <section>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-100">
            Välkommen!
          </h2>
          <p className="text-lg text-gray-400 mt-4">
          Sätt ditt avtryck. Skapa nya favoriter eller förbättra befintliga – tillsammans bygger vi en bättre upplevelse.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <button
            onClick={() => handleNavigate("/restaurants")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Alla restauranger
          </button>

          <button
            onClick={() => handleNavigate("/restaurants/create")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Skapa en restaurang
          </button>

          <button
            onClick={() => handleNavigate("/restaurants/update")}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700"
          >
            Uppdatera en restaurang
          </button>
        </section>
      </main>
      <Footer />
    </div>
    );
};
