export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-900 text-gray-200">
      <header className="w-full flex justify-between items-center py-4 px-8 sm:px-16 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-white">Dine & Flush</h1>
        <nav className="flex gap-6">
          <a href="#features" className="text-gray-300 hover:text-blue-400">Logga in</a>
          <a href="#about" className="text-gray-300 hover:text-blue-400">Om oss</a>
          <a href="#contact" className="text-gray-300 hover:text-blue-400">Kontakt</a>
        </nav>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className="text-center sm:text-left max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-100">
            Hitta restauranger med komfort
          </h2>
          <p className="text-lg text-gray-400 mt-4">
          Upptäck restauranger nära dig, se antal toaletter, allt i en app. För komfort ska alltid vara en del av menyn.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
             Kom igång
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-900">
              Lär dig mer
            </button>
          </div>
        </section>

        <section id="features" className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mt-16">
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
      </main>
      <footer className="w-full text-center py-4 text-gray-500 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} Dine & Flush. Alla rättigheter förbehållna.</p>
      </footer>
    </div>
  );
}
