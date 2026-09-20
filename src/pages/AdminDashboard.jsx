import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  
  // GET LOGGED-IN USER
  
  

  const savedUser = localStorage.getItem("loggedInUser");

  const user = savedUser
    ? JSON.parse(savedUser)
    : null;



  // LOAD WATER SAMPLE

  const [samples] = useState(() => {
    const savedSamples =
      localStorage.getItem("waterSamples");

    if (!savedSamples) {
      return [];
    }

    try {
      return JSON.parse(savedSamples);
    } catch (error) {
      console.error(
        "Could not load water samples:",
        error
      );

      return [];
    }
  });


  
  // SEARCH
  

  const [search, setSearch] = useState("");


  
  // FILTER SAMPLES


  const filteredSamples = samples.filter(
    (sample) => {
      const searchText =
        search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      return (
        String(sample.sampleId || "")
          .toLowerCase()
          .includes(searchText) ||

        String(sample.location || "")
          .toLowerCase()
          .includes(searchText) ||

        String(sample.waterSource || "")
          .toLowerCase()
          .includes(searchText)
      );
    }
  );



  // LOGOUT


  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    navigate("/login");
  };


  // UNIQUE SOURCES

  const numberOfSources = new Set(
    samples
      .map((sample) => sample.waterSource)
      .filter(Boolean)
  ).size;


  
  // UNIQUE LOCATIONS

  const numberOfLocations = new Set(
    samples
      .map((sample) => sample.location)
      .filter(Boolean)
  ).size;


  return (
    <div className="min-h-screen bg-slate-50">


          NAVBAR


      <header className="bg-white border-b border-slate-200">

        <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">


           LOGO

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
                Water Quality Management
              </p>

            </div>

          </Link>


          USER INFORMATION

          <div className="flex items-center gap-4">


            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-slate-700">

                {user?.name || "User"}

              </p>

              <p className="text-xs text-slate-400">

                {user?.email || "User account"}

              </p>

            </div>


             PROFILE CIRCLE

            <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-cyan-100 text-cyan-700">

              {user?.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}

            </div>


             LOGOUT

            <button
              onClick={handleLogout}
              className="hidden px-4 py-2 text-sm font-medium border rounded-lg sm:block border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


          MAIN

      <main className="max-w-6xl px-6 py-10 mx-auto">


        
            WELCOME
        

        <div className="mb-8">

          <p className="text-sm font-semibold tracking-wide text-cyan-600">
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


        
            SUMMARY CARDS
        

        <div className="grid gap-4 mb-8 sm:grid-cols-3">


          <SummaryCard
            title="Total Samples"
            value={samples.length}
            icon="🧪"
          />


          <SummaryCard
            title="Water Sources"
            value={numberOfSources}
            icon="💧"
          />


          <SummaryCard
            title="Locations"
            value={numberOfLocations}
            icon="📍"
          />

        </div>


        
            SEARCH
        

        <div className="p-5 mb-6 bg-white border rounded-2xl border-slate-200">

          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Search Water Samples
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


        
            TABLE
        

        <div className="overflow-hidden bg-white border rounded-2xl border-slate-200">


           TABLE HEADER 

          <div className="px-6 py-5 border-b border-slate-200">

            <h2 className="font-bold text-slate-800">
              Available Water Samples
            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {filteredSamples.length} sample
              {filteredSamples.length !== 1
                ? "s"
                : ""}

            </p>

          </div>


          
              NO RESULTS
          

          {filteredSamples.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <div className="mb-4 text-5xl">
                💧
              </div>

              <h3 className="font-semibold text-slate-700">
                No samples found
              </h3>

              <p className="max-w-md mx-auto mt-2 text-sm text-slate-500">

                {samples.length === 0
                  ? "There are currently no water samples available."
                  : "Try searching with a different keyword."}

              </p>

            </div>

          ) : (

            /* =================================
               DATA TABLE
            ================================== */

            <div className="overflow-x-auto">

              <table className="w-full">


                HEAD

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


                 BODY

                <tbody className="divide-y divide-slate-100">

                  {filteredSamples.map(
                    (sample) => (

                      <tr
                        key={sample.id}
                        className="transition hover:bg-slate-50"
                      >


                       SAMPLE ID

                        <td className="px-6 py-5">

                          <p className="font-semibold text-slate-800">

                            {sample.sampleId || "—"}

                          </p>

                        </td>


                         SOURCE

                        <td className="px-6 py-5">

                          <span className="px-3 py-1 text-xs font-medium text-blue-700 rounded-full bg-blue-50">

                            {sample.waterSource || "—"}

                          </span>

                        </td>


                         LOCATION

                        <td className="px-6 py-5 text-sm text-slate-600">

                          {sample.location || "—"}

                        </td>


                         PH

                        <td className="px-6 py-5">

                          <span className="font-semibold text-slate-700">

                            {sample.ph || "—"}

                          </span>

                        </td>


                         TURBIDITY

                        <td className="px-6 py-5 text-sm text-slate-600">

                          {sample.turbidity
                            ? `${sample.turbidity} NTU`
                            : "—"}

                        </td>


                         ACTION

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



   SUMMARY CARD


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