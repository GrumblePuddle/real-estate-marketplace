import { useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { listings } from "../data/listings";
import type { SubmitEvent } from "react";

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get("ort") || "";

  const price = searchParams.get("pris") || "";

  const filteredListings = listings
    .filter((listing) =>
      listing.city.toLowerCase().includes(city.toLowerCase()),
    )
    .filter((listing) => (price ? listing.price <= Number(price) : true));

  console.log("Filtered Listings:", filteredListings);

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = String(formData.get("ort") || "").trim();
    const maxPrice = String(formData.get("pris") || "").trim();
    console.log("Search:", search, "Max Price:", maxPrice);

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (search) {
        next.set("ort", search);
      } else {
        next.delete("ort");
      }

      if (maxPrice) {
        next.set("pris", maxPrice);
      } else {
        next.delete("pris");
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold">Bostäder till salu</h1>

        <form onSubmit={handleSearch} className="mb-10 flex gap-3">
          <input
            key={`ort-${city}`}
            name="ort"
            type="search"
            defaultValue={city}
            placeholder="Sök ort..."
            className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
          />

          <input
            key={`price-${price}`}
            name="pris"
            type="number"
            defaultValue={price}
            placeholder="Max pris"
            className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-700"
          >
            Sök
          </button>
        </form>

        <p className="mb-6 text-sm text-gray-500">
          {filteredListings.length} bostäder
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <p className="text-gray-500">Inga bostäder hittades i {city}.</p>
        )}
      </main>
    </div>
  );
};

export default Listings;
