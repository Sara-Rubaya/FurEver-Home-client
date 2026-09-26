
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

import { DotLottiePlayer } from "@dotlottie/react-player";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("adopter");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const passwordChecks = {
    length: password.length >= 6,
    number: /\d/.test(password),
    letter: /[a-zA-Z]/.test(password),
  };

  const validate = () => {
    const next = {};

    if (!name.trim()) {
      next.name = "Full name is required.";
    }

    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email)) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    } else if (
      !passwordChecks.length ||
      !passwordChecks.number ||
      !passwordChecks.letter
    ) {
      next.password = "Password doesn't meet the requirements below.";
    }

    if (!confirmPassword) {
      next.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      next.confirmPassword = "Passwords do not match.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-4 py-12">

      {/* Main Card */}
      <div className="w-full overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-xl shadow-orange-900/5">

        <div className="grid md:grid-cols-2">

          {/* ========================= */}
          {/* LEFT SIDE - LOTTIE */}
          {/* ========================= */}
          <div className="flex min-h-[600px] items-center justify-center  p-8 md:p-12">

            <div className="w-full max-w-md text-center">

              <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
                <DotLottiePlayer
                  src="/Login%20Leady.lottie"
                  loop
                  autoplay
                />
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                Welcome to FurEver Home
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Help rescued animals find loving and forever homes.
              </p>

            </div>

          </div>


          {/* ========================= */}
          {/* RIGHT SIDE - REGISTER FORM */}
          {/* ========================= */}
          <div className="p-6 sm:p-8 md:p-10">

            {/* Heading */}
            <div className="text-center">

              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Create Account
              </h2>

              <p className="mt-1.5 text-xs text-slate-500">
                Join FurEver Home to help rescued animals find loving families
              </p>

            </div>


            {/* Server Error */}
            {serverError && (
              <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">
                {serverError}
              </p>
            )}


            {/* Registration Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-6 space-y-4"
            >

              {/* ========================= */}
              {/* FULL NAME */}
              {/* ========================= */}
              <div>

                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-slate-600"
                >
                  Full Name
                </label>

                <div className="relative mt-1">

                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                      errors.name
                        ? "border-rose-300 focus:ring-rose-100"
                        : "border-slate-200 focus:border-primary focus:ring-orange-100"
                    }`}
                  />

                </div>

                {errors.name && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {errors.name}
                  </p>
                )}

              </div>


              {/* ========================= */}
              {/* EMAIL */}
              {/* ========================= */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-600"
                >
                  Email Address
                </label>

                <div className="relative mt-1">

                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                      errors.email
                        ? "border-rose-300 focus:ring-rose-100"
                        : "border-slate-200 focus:border-primary focus:ring-orange-100"
                    }`}
                  />

                </div>

                {errors.email && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {errors.email}
                  </p>
                )}

              </div>


              {/* ========================= */}
              {/* ROLE */}
              {/* ========================= */}
              <div>

                <label
                  htmlFor="role"
                  className="block text-xs font-medium text-slate-600"
                >
                  I want to join as
                </label>

                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-orange-100"
                >
                  <option value="adopter">
                    Adopter
                  </option>

                  <option value="shelter">
                    Shelter / Rescuer
                  </option>
                </select>

              </div>


              {/* ========================= */}
              {/* PASSWORD */}
              {/* ========================= */}
              <div>

                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-slate-600"
                >
                  Password
                </label>

                <div className="relative mt-1">

                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                      errors.password
                        ? "border-rose-300 focus:ring-rose-100"
                        : "border-slate-200 focus:border-primary focus:ring-orange-100"
                    }`}
                  />


                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((v) => !v)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}

                  </button>

                </div>


                {/* Password Requirements */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">

                    {[
                      {
                        ok: passwordChecks.length,
                        label: "At least 6 characters",
                      },
                      {
                        ok: passwordChecks.letter,
                        label: "Contains a letter",
                      },
                      {
                        ok: passwordChecks.number,
                        label: "Contains a number",
                      },
                    ].map((c) => (

                      <p
                        key={c.label}
                        className={`flex items-center gap-1.5 text-[11px] ${
                          c.ok
                            ? "text-primary"
                            : "text-slate-400"
                        }`}
                      >

                        <Check
                          className={`h-3 w-3 ${
                            c.ok
                              ? "opacity-100"
                              : "opacity-30"
                          }`}
                        />

                        {c.label}

                      </p>

                    ))}

                  </div>
                )}


                {errors.password && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {errors.password}
                  </p>
                )}

              </div>


              {/* ========================= */}
              {/* CONFIRM PASSWORD */}
              {/* ========================= */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-slate-600"
                >
                  Confirm Password
                </label>

                <div className="relative mt-1">

                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="confirmPassword"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Re-enter your password"
                    className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 ${
                      errors.confirmPassword
                        ? "border-rose-300 focus:ring-rose-100"
                        : "border-slate-200 focus:border-primary focus:ring-orange-100"
                    }`}
                  />

                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    {errors.confirmPassword}
                  </p>
                )}

              </div>


              {/* ========================= */}
              {/* SUBMIT BUTTON */}
              {/* ========================= */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <span>
                    Creating Account...
                  </span>
                ) : (
                  <>
                    <span>
                      Create Account
                    </span>

                    <ArrowRight className="h-4 w-4" />
                  </>
                )}

              </button>

            </form>


            {/* Login Link */}
            <div className="mt-6 text-center text-xs text-slate-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-primary hover:underline"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

