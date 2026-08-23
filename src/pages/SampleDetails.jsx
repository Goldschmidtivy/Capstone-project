import { Link, useParams, useNavigate } from "react-router-dom";

function SampleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get logged-in user
  const savedUser = localStorage.getItem("loggedInUser");

  const user = savedUser
    ? JSON.parse(savedUser)
    : null;

  // Get samples
  const savedSamples = localStorage.getItem("waterSamples");

  const samples = savedSamples
    ? JSON.parse(savedSamples)
    : [];

  // Find selected sample
  const sample = samples.find(
    (item) => String(item.id) === String(id)
  );

  // If sample doesn't exist
  if (!sample) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">

        <div className="p-8 text-center bg-white border rounded-2xl border-slate-200">

          <div className="mb-4 text-5xl">
            💧
          </div>

          <h1 className="text-xl font-bold text-slate-800">
            Sample Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The water sample you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-3 mt-6 font-semibold text-white rounded-xl bg-cyan-600 hover:bg-cyan-700"
          >
            Go Back
          </button>

        </div>

      </div>
    );
  }

  // Decide where the Back button should go
  const backPath =
    user?.role === "admin"
      ? "/admin"
      : "/user";

  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAVBAR */}

      <header className="bg-white border-b border-slate-200">

        <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">

          <Link
            to={backPath}
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


          {/* USER */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-slate-700">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email || ""}
              </p>

            </div>

            <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-cyan-100 text-cyan-700">

              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}

            </div>

          </div>

        </div>

      </header>


      {/* MAIN */}

      <main className="max-w-5xl px-6 py-10 mx-auto">

        {/* BACK */}

        <Link
          to={backPath}
          className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-cyan-700 hover:text-cyan-800"
        >
          ← Back to Dashboard
        </Link>


        {/* HEADER */}

        <div className="p-6 mb-6 bg-white border rounded-2xl border-slate-200">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <p className="text-sm font-semibold text-cyan-600">
                WATER SAMPLE
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Sample {sample.sampleId}
              </h1>

              <p className="mt-2 text-slate-500">
                Detailed water quality measurements
              </p>

            </div>


            <span className="px-4 py-2 text-sm font-semibold text-blue-700 rounded-full bg-blue-50">
              {sample.waterSource || "Unknown Source"}
            </span>

          </div>

        </div>


        {/* COLLECTION INFORMATION */}

        <section className="p-6 mb-6 bg-white border rounded-2xl border-slate-200">

          <h2 className="mb-5 text-lg font-bold text-slate-800">
            Collection Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <InfoItem
              label="Sample ID"
              value={sample.sampleId}
            />

            <InfoItem
              label="Water Source"
              value={sample.waterSource}
            />

            <InfoItem
              label="Location"
              value={sample.location}
            />

            <InfoItem
              label="Date Collected"
              value={sample.dateCollected}
            />

            <InfoItem
              label="Time Collected"
              value={sample.timeCollected}
            />

          </div>

        </section>


        {/* WATER QUALITY */}

        <section className="p-6 mb-6 bg-white border rounded-2xl border-slate-200">

          <h2 className="mb-5 text-lg font-bold text-slate-800">
            Water Quality Measurements
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


            <Measurement
              label="pH"
              value={sample.ph}
              unit=""
            />


            <Measurement
              label="Temperature"
              value={sample.temperature}
              unit="°C"
            />


            <Measurement
              label="Turbidity"
              value={sample.turbidity}
              unit="NTU"
            />


            <Measurement
              label="Conductivity"
              value={sample.conductivity}
              unit="µS/cm"
            />


            <Measurement
              label="TDS"
              value={sample.tds}
              unit="mg/L"
            />


            <Measurement
              label="Dissolved Oxygen"
              value={sample.dissolvedOxygen}
              unit="mg/L"
            />


            <Measurement
              label="Nitrate"
              value={sample.nitrate}
              unit="mg/L"
            />


            <Measurement
              label="Phosphate"
              value={sample.phosphate}
              unit="mg/L"
            />

          </div>

        </section>


        {/* REMARKS */}

        {sample.remarks && (

          <section className="p-6 mb-6 bg-white border rounded-2xl border-slate-200">

            <h2 className="mb-3 text-lg font-bold text-slate-800">
              Remarks
            </h2>

            <p className="leading-7 text-slate-600">
              {sample.remarks}
            </p>

          </section>

        )}


        {/* FOOTER ACTION */}

        <div className="flex justify-end">

          <Link
            to={backPath}
            className="px-5 py-3 font-semibold text-white rounded-xl bg-cyan-600 hover:bg-cyan-700"
          >
            Back to Dashboard
          </Link>

        </div>

      </main>

    </div>
  );
}


/* =========================================
   INFO ITEM
========================================= */

function InfoItem({ label, value }) {
  return (
    <div>

      <p className="mb-1 text-xs font-semibold tracking-wide uppercase text-slate-400">
        {label}
      </p>

      <p className="font-medium text-slate-700">
        {value || "Not provided"}
      </p>

    </div>
  );
}


/* =========================================
   MEASUREMENT
========================================= */

function Measurement({
  label,
  value,
  unit,
}) {
  return (
    <div className="p-5 border rounded-xl border-slate-200 bg-slate-50">

      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <div className="flex items-baseline gap-2 mt-2">

        <span className="text-2xl font-bold text-slate-800">
          {value || "—"}
        </span>

        {unit && (
          <span className="text-sm text-slate-500">
            {unit}
          </span>
        )}

      </div>

    </div>
  );
}

export default SampleDetails;