import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");


  const handleSubmit = (e) => {

    e.preventDefault();


    /*
      Validation
    */

    if (!name || !email || !password || !confirmPassword) {

      alert("Please complete all fields.");

      return;
    }


    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;
    }


    /*
      Get existing users
    */

    const savedUsers = localStorage.getItem("users");

    const users = savedUsers
      ? JSON.parse(savedUsers)
      : [];


    /*
      Check if email already exists
    */

    const existingUser = users.find(
      (user) => user.email === email
    );


    if (existingUser) {

      alert(
        "An account with this email already exists."
      );

      return;
    }


    /*
      Create account
    */

    const newUser = {

      id: Date.now(),

      name,

      email,

      password,

      role,

    };


    /*
      Save account
    */

    const updatedUsers = [
      ...users,
      newUser,
    ];


    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );


    /*
      Automatically log the user in
    */

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      })
    );


    /*
      Redirect
    */

    if (role === "admin") {

      navigate("/admin");

    } else {

      navigate("/user");

    }

  };


  return (

    <div className="flex min-h-screen bg-slate-50">


      {/* =================================
          LEFT
      ================================= */}

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
            Join the water quality
            monitoring platform.
          </h2>


          <p className="max-w-lg mt-6 text-lg leading-relaxed text-cyan-100">

            Explore water quality information
            and contribute to better water
            resource management.

          </p>

        </div>

      </div>



      {/* =================================
          RIGHT
      ================================= */}

      <div className="flex items-center justify-center w-full px-6 py-10 lg:w-1/2">

        <div className="w-full max-w-md">


          {/* TITLE */}

          <div className="mb-7">

            <h2 className="text-3xl font-bold text-slate-900">
              Create an account
            </h2>

            <p className="mt-2 text-slate-500">
              Create your AquaCheck account.
            </p>

          </div>



          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >


            {/* NAME */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-white border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />

            </div>



            {/* EMAIL */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
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
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-white border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />

            </div>



            {/* CONFIRM */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-white border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />

            </div>



            {/* ROLE */}

            <div>

              <label className="block mb-3 text-sm font-semibold text-slate-700">
                Account Type
              </label>


              <div className="grid grid-cols-2 gap-3">


                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`p-4 border rounded-xl text-left ${
                    role === "user"
                      ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-100"
                      : "border-slate-200 bg-white"
                  }`}
                >

                  <div className="text-xl">
                    👤
                  </div>

                  <p className="mt-2 font-semibold text-slate-800">
                    User
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    View water information
                  </p>

                </button>


                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`p-4 border rounded-xl text-left ${
                    role === "admin"
                      ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-100"
                      : "border-slate-200 bg-white"
                  }`}
                >

                  <div className="text-xl">
                    🛡️
                  </div>

                  <p className="mt-2 font-semibold text-slate-800">
                    Admin
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Manage water samples
                  </p>

                </button>

              </div>

            </div>



            {/* SUBMIT */}

            <button
              type="submit"
              className="w-full py-3.5 font-semibold text-white transition rounded-xl bg-cyan-600 hover:bg-cyan-700"
            >
              Create Account
            </button>

          </form>



          {/* LOGIN */}

          <p className="mt-7 text-sm text-center text-slate-500">

            Already have an account?

            <Link
              to="/login"
              className="ml-1 font-semibold text-cyan-600 hover:text-cyan-700"
            >
              Sign in
            </Link>

          </p>


          <div className="mt-5 text-center">

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

export default Signup;