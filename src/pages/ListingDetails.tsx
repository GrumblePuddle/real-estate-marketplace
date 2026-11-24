import Navbar from "../components/Navbar";
import { listings } from "../data/listings";
import { Link, useParams } from "react-router";

const ListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  // TODO: Hämta bostadens ID från URL:en
  // TODO: Hitta rätt bostad i listings-arrayen

  const data = listings.find((listing) => listing.id === id);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {data ? (
        <main className="mx-auto max-w-6xl px-6 py-10">
          {/* Tillbaka till annonser */}
          <a
            href="/listings"
            className="mb-8 inline-block text-sm text-gray-500 transition hover:text-gray-900"
          >
            ← Tillbaka till annonser
          </a>

          {/* Bild */}
          <div className="mb-10 overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={data?.image || "https://placehold.co/1200x650"}
              alt="Bostad"
              className="h-64 w-full object-cover sm:h-96 lg:h-[480px]"
            />
          </div>

          {/* Bostadsinformation */}
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <section>
              <p className="mb-2 text-sm font-medium text-gray-500">
                {data?.city}
              </p>

              <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                {data?.title}
              </h1>

              {/* Fakta */}
              <div className="mb-10 flex flex-wrap gap-8 border-y border-gray-200 py-6">
                <div>
                  <p className="mb-1 text-sm text-gray-500">Boarea</p>
                  <p className="text-lg font-semibold">{data?.area} m²</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-gray-500">Rum</p>
                  <p className="text-lg font-semibold">{data?.rooms} rum</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-gray-500">Pris</p>
                  <p className="text-lg font-semibold">
                    {data?.price?.toLocaleString()} kr
                  </p>
                </div>
              </div>

              {/* Beskrivning */}
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Om bostaden</h2>

                <p className="leading-8 text-gray-600">
                  Välkommen till denna fantastiska bostad med genomtänkt
                  planlösning och generösa sociala ytor. Här bor du bekvämt med
                  närhet till både natur och stadens bekvämligheter.
                </p>
              </div>
            </section>

            {/* Sidopanel */}
            <aside>
              <div className="rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-8">
                <p className="mb-1 text-sm text-gray-500">Utgångspris</p>

                <p className="mb-6 text-3xl font-bold">
                  {data?.price?.toLocaleString()} kr
                </p>

                <button
                  type="button"
                  className="w-full cursor-pointer rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
                >
                  Kontakta säljaren
                </button>

                <p className="mt-4 text-center text-xs text-gray-400">
                  Kontakta säljaren för mer information om bostaden.
                </p>
              </div>
            </aside>
          </div>
        </main>
      ) : (
        <main className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <span className="text-4xl">🏠</span>
          </div>

          <p className="mb-3 text-sm font-semibold tracking-widest text-gray-400">
            404
          </p>

          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Bostaden kunde inte hittas
          </h1>

          <p className="mb-8 max-w-md leading-7 text-gray-500">
            Bostaden du letar efter finns inte eller har tagits bort. Utforska
            våra andra annonser för att hitta ditt nästa hem.
          </p>

          <Link
            to="/listings"
            className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            Tillbaka till annonser
          </Link>
        </main>
      )}
    </div>
  );
};

export default ListingDetails;
