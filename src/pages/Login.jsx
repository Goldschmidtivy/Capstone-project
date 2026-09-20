import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://water-quality-backend-5br2.onrender.com";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (!data.user || !data.user.role) {
        throw new Error("Login response did not contain user information.");
      }

      if (data.user.role !== role) {
        alert(
          `This account is registered as ${data.user.role}. Please select ${data.user.role} to continue.`
        );
        return;
      }

      // Save authentication token
      localStorage.setItem("authToken", data.token);

      // Save logged-in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
      );

      // Redirect according to role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.message ||
        "Unable to sign in. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* LEFT SIDE */}

      <div className="relative hidden w-1/2 overflow-hidden bg-slate-900 lg:flex">

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-700 via-cyan-900 to-slate-950" />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">

          <div className="flex items-center gap-3 mb-8">

            <div className="flex items-center justify-center w-14 h-14 text-2xl rounded-2xl bg-white/10">
              💧
            </div>

            <div>

              <h1 className="text-2xl font-bold">
                AquaCheck
              </h1>

              <p className="text-sm text-cyan-100">
                Water Quality Management System
              </p>

            </div>

          </div>

          <h2 className="max-w-lg text-4xl font-bold leading-tight">
            Monitor water quality.
            <br />
            Protect our water resources.
          </h2>

          <p className="max-w-lg mt-6 text-lg leading-relaxed text-cyan-100">
            Access water quality information,
            manage samples, and make informed
            decisions about our water resources.
          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="flex items-center justify-center w-full px-6 py-12 lg:w-1/2">

        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}

          <div className="mb-8 text-center lg:hidden">

            <div className="flex items-center justify-center gap-3">

              <div className="flex items-center justify-center w-12 h-12 text-xl text-white rounded-xl bg-cyan-600">
                💧
              </div>

              <h1 className="text-2xl font-bold text-slate-800">
                AquaCheck
              </h1>

            </div>

          </div>


          {/* TITLE */}

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to your AquaCheck account.
            </p>

          </div>


          {/* LOGIN FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 bg-white border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-white border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />

            </div>


            {/* ROLE */}

            <div>

              <label className="block mb-3 text-sm font-semibold text-slate-700">
                Sign in as
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* USER */}

                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`p-4 border rounded-xl text-left transition ${
                    role === "user"
                      ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-100"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >

                  <div className="mb-2 text-xl">
                    👤
                  </div>

                  <p className="font-semibold text-slate-800">
                    User
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    View water data
                  </p>

                </button>


                {/* ADMIN */}

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`p-4 border rounded-xl text-left transition ${
                    role === "admin"
                      ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-100"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >

                  <div className="mb-2 text-xl">
                    🛡️
                  </div>

                  <p className="font-semibold text-slate-800">
                    Admin
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Manage water data
                  </p>

                </button>

              </div>

            </div>


            {/* SIGN IN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-semibold text-white transition rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>


          {/* SIGN UP */}

          <p className="mt-8 text-sm text-center text-slate-500">

            Don't have an account?

            <Link
              to="/signup"
              className="ml-1 font-semibold text-cyan-600 hover:text-cyan-700"
            >
              Create one
            </Link>

          </p>


          {/* HOME */}

          <div className="mt-6 text-center">

            <Link
              to="/"
              className="text-sm text-slate-400 hover:text-slate-600"
            >
              ← Back to website
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}
