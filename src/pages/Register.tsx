import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  // TODO: Hantera formulärdata
  // TODO: Kontrollera att lösenorden matchar
  // TODO: Registrera användaren med Firebase
  // TODO: Spara användarens namn
  // TODO: Hantera fel och laddningsstatus

  const createUser = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setErrorMessage("Lösenorden matchar inte.");
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: name });
      // Redirect or show success message
      navigate("/listings");
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Det gick inte att skapa kontot. Försök igen.");
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
              Skapa konto
            </h1>

            <p className="text-gray-500">
              Registrera dig för att börja sälja bostäder
            </p>
          </div>

          <form className="space-y-5" onSubmit={createUser}>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Namn
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ditt namn"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>

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
                placeholder="Minst 6 tecken"
                autoComplete="new-password"
                minLength={6}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Bekräfta lösenord
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Upprepa lösenord"
                autoComplete="new-password"
                minLength={6}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              {isLoading ? "Skapar konto..." : "Registrera"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Har du redan ett konto?{" "}
            <Link
              to="/login"
              className="font-semibold text-gray-900 hover:underline"
            >
              Logga in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
