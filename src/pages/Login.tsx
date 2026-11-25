import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Hantera formulärdata
  // TODO: Logga in med Firebase
  // TODO: Hantera eventuella fel
  const navigate = useNavigate();

  const onLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    // TODO: Implement login logic with Firebase

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/listings");
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Felaktig e-postadress eller lösenord.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight">
              Välkommen tillbaka
            </h1>

            <p className="text-gray-500">
              Logga in för att hantera dina annonser
            </p>
          </div>

          <form className="space-y-5" onSubmit={onLogin}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                E-postadress
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="namn@exempel.se"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Lösenord
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Ange ditt lösenord"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>

            {errorMessage && <div className="text-red-500">{errorMessage}</div>}

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              {isLoading ? "Loggar in..." : "Logga in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Har du inget konto?{" "}
            <Link
              to="/register"
              className="font-semibold text-gray-900 hover:underline"
            >
              Registrera dig
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
