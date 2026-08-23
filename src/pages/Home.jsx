import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            AquaCheck
          </h1>

          <p className="text-xs text-slate-500">
            Water Quality Management System
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 font-medium text-blue-700 transition border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 font-medium text-white transition bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 py-24 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500">

        {/* Decorative circles */}
        <div className="absolute w-64 h-64 bg-white rounded-full opacity-10 -top-20 -right-20"></div>

        <div className="absolute w-48 h-48 bg-white rounded-full opacity-10 -bottom-24 left-20"></div>

        <div className="relative grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-2">

          {/* Hero Text */}
          <div className="text-white">

            <span className="inline-block px-4 py-2 mb-5 text-sm font-medium rounded-full bg-white/20">
              💧 Smarter Water Monitoring
            </span>

            <h2 className="text-4xl font-bold leading-tight md:text-6xl">
              Monitor Water.
              <br />
              Protect Life.
            </h2>

            <p className="max-w-xl mt-6 text-lg leading-relaxed text-blue-100">
              A simple platform for collecting, managing and monitoring
              water quality data from different water sources.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/login"
                className="px-7 py-3 font-semibold text-blue-700 transition bg-white rounded-lg shadow-lg hover:bg-blue-50"
              >
                Get Started →
              </Link>

              <Link
                to="/signup"
                className="px-7 py-3 font-semibold text-white transition border border-white rounded-lg hover:bg-white/10"
              >
                Create Account
              </Link>

            </div>
          </div>

          {/* Hero Card */}
          <div className="hidden md:block">

            <div className="p-6 bg-white shadow-2xl rounded-2xl">

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500">
                    Sample Overview
                  </p>

                  <h3 className="text-2xl font-bold text-slate-800">
                    Water Quality
                  </h3>
                </div>

                <div className="flex items-center justify-center w-12 h-12 text-2xl bg-blue-100 rounded-full">
                  💧
                </div>
              </div>

              {/* pH */}
              <div className="p-4 mb-4 rounded-xl bg-slate-50">

                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-700">
                    pH Level
                  </span>

                  <span className="font-bold text-green-600">
                    7.2
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200">
                  <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                </div>

              </div>

              {/* Turbidity */}
              <div className="p-4 mb-4 rounded-xl bg-slate-50">

                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-700">
                    Turbidity
                  </span>

                  <span className="font-bold text-blue-600">
                    2.4 NTU
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200">
                  <div className="w-1/2 h-2 bg-blue-500 rounded-full"></div>
                </div>

              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-green-50">

                <div>
                  <p className="text-sm text-slate-500">
                    Overall Status
                  </p>

                  <p className="font-bold text-green-600">
                    Good Quality
                  </p>
                </div>

                <div className="flex items-center justify-center w-10 h-10 text-green-600 bg-green-100 rounded-full">
                  ✓
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="px-8 py-20 bg-white">

        <div className="max-w-6xl mx-auto">

          <div className="max-w-2xl mx-auto text-center">

            <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
              About the System
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              Making Water Quality Data Easier to Manage
            </h2>

            <p className="mt-5 leading-relaxed text-slate-600">
              AquaCheck provides a centralized platform for recording
              water quality measurements and making important water
              quality information easier to access and understand.
            </p>

          </div>

          {/* Features */}
          <div className="grid gap-6 mt-12 md:grid-cols-3">

            <div className="p-7 transition border border-slate-200 rounded-2xl bg-slate-50 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-center justify-center w-12 h-12 mb-5 text-2xl bg-blue-100 rounded-xl">
                🧪
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                Sample Management
              </h3>

              <p className="mt-3 leading-relaxed text-slate-600">
                Record water samples and important physical, chemical
                and biological parameters.
              </p>

            </div>

            <div className="p-7 transition border border-slate-200 rounded-2xl bg-slate-50 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-center justify-center w-12 h-12 mb-5 text-2xl bg-cyan-100 rounded-xl">
                📊
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                Data Monitoring
              </h3>

              <p className="mt-3 leading-relaxed text-slate-600">
                View and monitor recorded water quality measurements
                from different sources and locations.
              </p>

            </div>

            <div className="p-7 transition border border-slate-200 rounded-2xl bg-slate-50 hover:-translate-y-1 hover:shadow-lg">

              <div className="flex items-center justify-center w-12 h-12 mb-5 text-2xl bg-green-100 rounded-xl">
                🔍
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                Easy Search
              </h3>

              <p className="mt-3 leading-relaxed text-slate-600">
                Quickly search and view water quality information
                whenever you need it.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Parameters Section */}
      <section className="px-8 py-20 bg-slate-50">

        <div className="max-w-6xl mx-auto">

          <div className="text-center">

            <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
              Water Quality
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              Parameters We Monitor
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-4">

            {[
              "pH",
              "Turbidity",
              "Temperature",
              "Electrical Conductivity",
              "TDS",
              "Dissolved Oxygen",
              "Nitrate",
              "Phosphate",
            ].map((parameter) => (

              <div
                key={parameter}
                className="p-5 text-center transition bg-white border rounded-xl border-slate-200 hover:border-blue-400 hover:shadow-md"
              >
                <p className="font-semibold text-slate-700">
                  {parameter}
                </p>
              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Call To Action */}
      <section className="px-8 py-20 text-center bg-blue-700">

        <h2 className="text-3xl font-bold text-white">
          Ready to Manage Water Quality Data?
        </h2>

        <p className="max-w-2xl mx-auto mt-4 text-blue-100">
          Log in to your account or create a new account to get started.
        </p>

        <div className="flex justify-center gap-4 mt-8">

          <Link
            to="/login"
            className="px-7 py-3 font-semibold text-blue-700 bg-white rounded-lg hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-7 py-3 font-semibold text-white border border-white rounded-lg hover:bg-white/10"
          >
            Sign Up
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center bg-slate-900">

        <h3 className="font-bold text-white">
          AquaCheck
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Water Quality Management System
        </p>

        <p className="mt-4 text-xs text-slate-500">
          © 2026 AquaCheck. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;