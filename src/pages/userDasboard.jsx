import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {

  const navigate = useNavigate();


  /* =========================
     USER
  ========================== */

  const savedUser = localStorage.getItem(
    "loggedInUser"
  );

  const user = savedUser
    ? JSON.parse(savedUser)
    : null;


  /* =========================
     SAMPLES
  ========================== */

  const savedSamples = localStorage.getItem(
    "waterSamples"
  );

  const samples = savedSamples
    ? JSON.parse(savedSamples)
    : [];


  /* =========================
     SEARCH
  ========================== */

  const [search, setSearch] = useState("");


  const filteredSamples = samples.filter(
    (sample) => {

      const searchText =
        search.toLowerCase();


      return (
        sample.sampleId
          ?.toLowerCase()
          .includes(searchText) ||

        sample.location
          ?.toLowerCase()
          .includes(searchText) ||

        sample.waterSource
          ?.toLowerCase()
          .includes(searchText)
      );

    }
  );


  /* =========================
     LOGOUT
  ========================== */

  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    navigate("/login");

  };


  return (

    <div className="min-h-screen bg-slate-50">


      {/* =========================
          NAVBAR
      ========================== */}

      <header className="bg-white border-b border-slate-200">

        <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">


          {/* LOGO */}

          <Link
            to="/user"
            className="flex items-center gap-3"
          >

            <div className="flex items-center justify-center w-10 h-10 text-lg text-white rounded-xl bg-cyan-600">
              💧
            </div>

            <div>

              <h1 className="font-bold text-slate-800">
                AquaCheck
              </h1>

              <p className="text-xs text-slate-400">
                Water Quality
              </p>

            </div>

          </Link>


          {/* USER */}

          <div className="flex items-center gap-4">


            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-slate-700">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-400">
                Public Viewer
              </p>

            </div>


            <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-cyan-100 text-cyan-700">

              {user?.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}

            </div>


            <button
              onClick={handleLogout}
              className="hidden px-4 py-2 text-sm font-medium border rounded-lg sm:block border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Logout
            </button>

          </div>

        </div>

      </header>



      {/* =========================
          MAIN
      ========================== */}

      <main className="max-w-6xl px-6 py-10 mx-auto">


        {/* WELCOME */}

        <div className="mb-8">

          <p className="text-sm font-semibold text-cyan-600">
            WATER QUALITY DATA
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">

            Welcome,{" "}

            {user?.name || "User"}

          </h1>

          <p className="mt-2 text-slate-500">
            Explore available water quality
            samples and their measurements.
          </p>

        </div>



        {/* =========================
            SUMMARY
        ========================== */}

        <div className="grid gap-4 mb-8 sm:grid-cols-3">


          <SummaryCard
            title="Total Samples"
            value={samples.length}
            icon="🧪"
          />


          <SummaryCard
            title="Water Sources"
            value={
              new Set(
                samples.map(
                  (sample) =>
                    sample.waterSource
                )
              ).size
            }
            icon="💧"
          />


          <SummaryCard
            title="Locations"
            value={
              new Set(
                samples.map(
                  (sample) =>
                    sample.location
                )
              ).size
            }
            icon="📍"
          />

        </div>



        {/* =========================
            SEARCH
        ========================== */}

        <div className="p-5 mb-6 bg-white border rounded-2xl border-slate-200">

          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Search water samples
          </label>

          <div className="relative">

            <span className="absolute -translate-y-1/2 left-4 top-1/2">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by sample ID, location or water source..."
              className="w-full py-3 pl-11 pr-4 border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />

          </div>

        </div>



        {/* =========================
            SAMPLES
        ========================== */}

        <div className="overflow-hidden bg-white border rounded-2xl border-slate-200">


          <div className="px-6 py-5 border-b border-slate-200">

            <h2 className="font-bold text-slate-800">
              Available Samples
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredSamples.length} sample
              {filteredSamples.length !== 1
                ? "s"
                : ""
              } found
            </p>

          </div>



          {filteredSamples.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <div className="mb-4 text-4xl">
                🔍
              </div>

              <h3 className="font-semibold text-slate-700">
                No samples found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try a different search.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="text-left bg-slate-50">

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Sample ID
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Source
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Location
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      pH
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Turbidity
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredSamples.map(
                    (sample) => (

                      <tr
                        key={sample.id}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">

                          <p className="font-semibold text-slate-800">
                            {sample.sampleId}
                          </p>

                        </td>


                        <td className="px-6 py-5">

                          <span className="px-3 py-1 text-xs font-medium text-blue-700 rounded-full bg-blue-50">

                            {sample.waterSource}

                          </span>

                        </td>


                        <td className="px-6 py-5 text-sm text-slate-600">
                          {sample.location}
                        </td>


                        <td className="px-6 py-5 font-semibold text-slate-700">
                          {sample.ph || "—"}
                        </td>


                        <td className="px-6 py-5 text-sm text-slate-600">

                          {sample.turbidity
                            ? `${sample.turbidity} NTU`
                            : "—"}

                        </td>


                        <td className="px-6 py-5">

                          <Link
                            to={`/samples/${sample.id}`}
                            className="px-4 py-2 text-sm font-semibold text-cyan-700 rounded-lg bg-cyan-50 hover:bg-cyan-100"
                          >
                            View Details
                          </Link>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>

  );
}


/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
  title,
  value,
  icon,
}) {

  return (

    <div className="flex items-center justify-between p-5 bg-white border rounded-2xl border-slate-200">

      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-2xl font-bold text-slate-900">
          {value}
        </p>

      </div>

      <div className="flex items-center justify-center w-11 h-11 text-xl rounded-xl bg-cyan-50">
        {icon}
      </div>

    </div>

  );
}

export default UserDashboard;