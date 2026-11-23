import { Link } from "react-router";
import type { Listing } from "../data/listings";

type Props = {
  listing: Listing;
};

const ListingCard = ({ listing }: Props) => {
  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group overflow-hidden rounded-xl border border-gray-200"
    >
      <img
        src={listing.image}
        alt={listing.title}
        className="h-52 w-full object-cover transition-transform group-hover:scale-105"
      />

      <div className="p-4">
        <h2 className="font-semibold">{listing.title}</h2>

        <p className="mt-1 text-lg font-bold">
          {listing.price.toLocaleString("sv-SE")} kr
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {listing.rooms} rum · {listing.area} m²
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
