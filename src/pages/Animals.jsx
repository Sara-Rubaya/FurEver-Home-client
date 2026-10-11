import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
// TEMPORARY stub - Sazid "Search & Filter" PR e eita replace korbe
export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchAnimals = async () => {
      const res = await fetch("/api/animals?status=available");
      const data = await res.json();
      setAnimals(data);
      setLoading(false);
    };
    fetchAnimals();
  }, []);
 
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-dark">Browse Animals</h1>
      {loading ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {animals.map((a) => (
            <Link key={a._id} to={`/animals/${a._id}`} className="overflow-hidden rounded-xl border shadow-sm">
              <img src={a.photoUrl} alt={a.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-dark">{a.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{a.breed} · {a.age} yrs</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}