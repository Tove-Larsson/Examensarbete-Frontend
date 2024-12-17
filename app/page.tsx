"use client"

import { useRouter } from "next/navigation";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export default function Home() {

  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/restaurants')
  };

  const navLinks = [
    { label: "Logga in", href: "/sign-in" },
    { label: "Om oss", href: "/about" },
    { label: "Kontakt", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar links={navLinks} />
        <main className="flex-1 flex justify-center items-center p-8 pb-20 sm:p-20">
        <div className="text-center sm:text-left max-w-4xl">
          <section>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-100">
              Hitta restauranger med komfort
            </h2>
            <p className="text-lg text-gray-400 mt-4">
              Upptäck restauranger nära dig och se antal toaletter, allt i en
              app. Komfort ska alltid vara en del av menyn.
            </p>
          </section>
          <section
            id="features"
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mt-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-800 rounded-full flex justify-center items-center text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25a2.25 2.25 0 10-4.5 0V9m-3 0a6 6 0 0012 0m-12 0H6m12 0h1.5M9 21h6m-6-3h6"
                  />
                </svg>
              </div>
              <p className="text-gray-300">Restauranger nära dig</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-800 rounded-full flex justify-center items-center text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15.75l7.5-7.5m0 0h-6m6 0v6"
                  />
                </svg>
              </div>
              <p className="text-gray-300">Utforska bekväma matställen</p>
            </div>
          </section>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={handleButtonClick} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Kom igång
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};