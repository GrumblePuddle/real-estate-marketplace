import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useState } from "react";
import type { SubmitEvent } from "react";

const Start = () => {
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = city.trim();

    if (!search) return;

    navigate(`/listings?ort=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-4xl font-bold text-center">
          Hitta ditt nästa hem.
        </h1>

        <p className="text-gray-500 text-center">
          Sök bland bostäder till salu i hela Sverige.
        </p>

        <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
          <input
            type="search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Sök ort, t.ex. Göteborg"
            className="flex-1 min-w-0 rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
          />

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-700 cursor-pointer"
          >
            Sök
          </button>
        </form>
      </main>
    </div>
  );
};

export default Start;
