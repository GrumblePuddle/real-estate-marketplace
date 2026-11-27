import { Link, useNavigate } from "react-router";
import { ImagePlus } from "lucide-react";
import Navbar from "../components/Navbar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const CreateListing = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Hantera formuläret
  // TODO: Kontrollera att användaren är inloggad
  // TODO: Spara annonsen i Firestore
  // TODO: Hantera bilduppladdning senare
  // TODO: Hantera loading och felmeddelanden
  const navigate = useNavigate();
  const { user } = useAuth();

  const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!user) {
      // Hantera att användaren inte är inloggad
      return;
    }

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const price = Number(formData.get("price") || 0);
    const rooms = Number(formData.get("rooms") || 0);
    const area = Number(formData.get("area") || 0);
    const description = String(formData.get("description") || "").trim();

    if (price <= 0 || rooms <= 0 || area <= 0) {
      setErrorMessage("Ange giltiga värden för bostaden.");
      return;
    }

    const newListing = {
      title,
      city,
      price,
      rooms,
      area,
      description,
      ownerId: user.uid,
      createdAt: serverTimestamp(),
    };

    setIsLoading(true);
    try {
      await addDoc(collection(db, "listings"), newListing);
      navigate("/listings");
      // TODO: Visa bekräftelsemeddelande
    } catch (error) {
      console.error("Error adding document: ", error);
      setErrorMessage("Ett fel uppstod när annonsen skulle sparas.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Skapa annons
          </h1>
          <p className="text-gray-500">
            Fyll i informationen om bostaden du vill sälja.
          </p>
        </div>

        <form
          className="space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          onSubmit={submitForm}
        >
          <section className="space-y-5">
            <h2 className="text-lg font-semibold">Bostadsinformation</h2>

            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                Titel
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Ex. Modern villa nära havet"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium"
                >
                  Ort
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ex. Västervik"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium"
                >
                  Pris (kr)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  placeholder="2500000"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="rooms"
                  className="mb-2 block text-sm font-medium"
                >
                  Antal rum
                </label>
                <input
                  id="rooms"
                  name="rooms"
                  type="number"
                  min="1"
                  step="0.5"
                  placeholder="4"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="mb-2 block text-sm font-medium"
                >
                  Boyta (m²)
                </label>
                <input
                  id="area"
                  name="area"
                  type="number"
                  min="1"
                  placeholder="120"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Beskrivning
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Beskriv bostaden, området och vad som gör den speciell..."
                required
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>
          </section>

          <section className="space-y-4 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold">Bostadsbild</h2>

            <label
              htmlFor="image"
              className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 text-center transition hover:border-gray-500 hover:bg-gray-50"
            >
              <ImagePlus size={32} className="text-gray-400" />
              <span className="text-sm font-medium">
                Klicka för att välja en bild
              </span>
              <span className="text-xs text-gray-400">JPG, PNG eller WebP</span>
            </label>

            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
            />

            {/* TODO: Visa förhandsvisning av vald bild */}
          </section>

          {errorMessage && (
            <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-200 pt-6 sm:flex-row">
            <Link
              to="/listings"
              className="rounded-lg border border-gray-300 px-6 py-3 text-center text-sm font-medium transition hover:bg-gray-50"
            >
              Avbryt
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Sparar annons..." : "Publicera annons"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
