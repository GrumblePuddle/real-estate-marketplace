import Navbar from "../components/Navbar";

const ListingDetails = () => {
  // TODO: Hämta bostadens ID från URL:en
  // TODO: Hitta rätt bostad i listings-arrayen

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

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
            src="https://placehold.co/1200x650"
            alt="Bostad"
            className="h-64 w-full object-cover sm:h-96 lg:h-[480px]"
          />
        </div>

        {/* Bostadsinformation */}
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <section>
            <p className="mb-2 text-sm font-medium text-gray-500">Göteborg</p>

            <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Modern villa i Göteborg
            </h1>

            {/* Fakta */}
            <div className="mb-10 flex flex-wrap gap-8 border-y border-gray-200 py-6">
              <div>
                <p className="mb-1 text-sm text-gray-500">Boarea</p>
                <p className="text-lg font-semibold">145 m²</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-gray-500">Rum</p>
                <p className="text-lg font-semibold">5 rum</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-gray-500">Pris</p>
                <p className="text-lg font-semibold">4 250 000 kr</p>
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

              <p className="mb-6 text-3xl font-bold">4 250 000 kr</p>

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
    </div>
  );
};

export default ListingDetails;
