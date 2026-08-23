import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddSamples() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sampleId: "",
    waterSource: "",
    location: "",
    dateCollected: "",
    timeCollected: "",
    temperature: "",
    turbidity: "",
    conductivity: "",
    tds: "",
    ph: "",
    dissolvedOxygen: "",
    nitrate: "",
    phosphate: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSample = {
      id: Date.now(),
      ...formData,
    };

    const existingData = localStorage.getItem("waterSamples");

    const existingSamples = existingData
      ? JSON.parse(existingData)
      : [];

    const updatedSamples = [
      ...existingSamples,
      newSample,
    ];

    localStorage.setItem(
      "waterSamples",
      JSON.stringify(updatedSamples)
    );

    alert("Sample saved successfully!");

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR */}

      <aside className="fixed top-0 left-0 z-20 hidden w-64 h-screen bg-slate-900 lg:block">

        <div className="flex items-center h-20 px-6 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center w-10 h-10 text-xl text-white rounded-lg bg-cyan-600">
              💧
            </div>

            <div>

              <h1 className="font-bold text-white">
                AquaCheck
              </h1>

              <p className="text-xs text-slate-400">
                Water Quality System
              </p>

            </div>

          </div>

        </div>


        <nav className="p-4 space-y-2">

          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            📊
            <span>Dashboard</span>
          </Link>


          <Link
            to="/admin/add-sample"
            className="flex items-center gap-3 px-4 py-3 text-white rounded-lg bg-cyan-600"
          >
            🧪
            <span className="font-medium">
              Add Sample
            </span>
          </Link>


          <Link
            to="/user"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            👥
            <span>User View</span>
          </Link>

        </nav>


        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">

          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white"
          >
            ←
            <span>Back to Website</span>
          </Link>

        </div>

      </aside>


      {/* MAIN */}

      <div className="lg:ml-64">

        {/* TOP BAR */}

        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-slate-200">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Add Water Sample
            </h2>

            <p className="hidden text-sm text-slate-500 sm:block">
              Record a new water quality sample
            </p>

          </div>


          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-cyan-100 text-cyan-700">
              A
            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-semibold text-slate-700">
                Administrator
              </p>

              <p className="text-xs text-slate-400">
                Admin
              </p>

            </div>

          </div>

        </header>


        {/* CONTENT */}

        <main className="max-w-6xl p-6 mx-auto md:p-8">

          {/* PAGE TITLE */}

          <div className="mb-8">

            <Link
              to="/admin"
              className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-cyan-600 hover:text-cyan-700"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-slate-900">
              Add Water Sample
            </h1>

            <p className="mt-2 text-slate-500">
              Enter the information collected from your water sample.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* SAMPLE INFORMATION */}

            <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">

                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-50">
                  📋
                </div>

                <div>

                  <h2 className="font-bold text-slate-800">
                    Sample Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Basic information about the sample
                  </p>

                </div>

              </div>


              <div className="grid gap-5 p-6 md:grid-cols-2">

                <Input
                  label="Sample ID"
                  name="sampleId"
                  value={formData.sampleId}
                  onChange={handleChange}
                  placeholder="e.g. WQ-001"
                  required
                />


                <div>

                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Water Source
                  </label>

                  <select
                    name="waterSource"
                    value={formData.waterSource}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition bg-white border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  >

                    <option value="">
                      Select water source
                    </option>

                    <option value="Borehole">
                      Borehole
                    </option>

                    <option value="Well">
                      Well
                    </option>

                    <option value="River">
                      River
                    </option>

                    <option value="Stream">
                      Stream
                    </option>

                    <option value="Lake">
                      Lake
                    </option>

                    <option value="Dam">
                      Dam
                    </option>

                    <option value="Tap Water">
                      Tap Water
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <Input
                  label="Sampling Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Lake Volta"
                  required
                />


                <Input
                  label="Date Collected"
                  type="date"
                  name="dateCollected"
                  value={formData.dateCollected}
                  onChange={handleChange}
                  required
                />


                <Input
                  label="Time Collected"
                  type="time"
                  name="timeCollected"
                  value={formData.timeCollected}
                  onChange={handleChange}
                />

              </div>

            </section>


            {/* PHYSICAL PARAMETERS */}

            <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">

                <div className="flex items-center justify-center w-10 h-10 text-xl rounded-lg bg-blue-50">
                  🌡️
                </div>

                <div>

                  <h2 className="font-bold text-slate-800">
                    Physical Parameters
                  </h2>

                  <p className="text-sm text-slate-500">
                    Physical characteristics of the water
                  </p>

                </div>

              </div>


              <div className="grid gap-5 p-6 md:grid-cols-2">

                <Input
                  label="Temperature"
                  unit="°C"
                  type="number"
                  step="0.01"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="e.g. 25.4"
                />


                <Input
                  label="Turbidity"
                  unit="NTU"
                  type="number"
                  step="0.01"
                  name="turbidity"
                  value={formData.turbidity}
                  onChange={handleChange}
                  placeholder="e.g. 2.5"
                />


                <Input
                  label="Electrical Conductivity"
                  unit="µS/cm"
                  type="number"
                  step="0.01"
                  name="conductivity"
                  value={formData.conductivity}
                  onChange={handleChange}
                  placeholder="e.g. 450"
                />


                <Input
                  label="Total Dissolved Solids"
                  unit="mg/L"
                  type="number"
                  step="0.01"
                  name="tds"
                  value={formData.tds}
                  onChange={handleChange}
                  placeholder="e.g. 300"
                />

              </div>

            </section>


            {/* CHEMICAL PARAMETERS */}

            <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">

                <div className="flex items-center justify-center w-10 h-10 text-xl rounded-lg bg-emerald-50">
                  🧪
                </div>

                <div>

                  <h2 className="font-bold text-slate-800">
                    Chemical Parameters
                  </h2>

                  <p className="text-sm text-slate-500">
                    Chemical measurements of the water
                  </p>

                </div>

              </div>


              <div className="grid gap-5 p-6 md:grid-cols-2">

                <Input
                  label="pH"
                  type="number"
                  step="0.01"
                  min="0"
                  max="14"
                  name="ph"
                  value={formData.ph}
                  onChange={handleChange}
                  placeholder="e.g. 7.2"
                  required
                />


                <Input
                  label="Dissolved Oxygen"
                  unit="mg/L"
                  type="number"
                  step="0.01"
                  name="dissolvedOxygen"
                  value={formData.dissolvedOxygen}
                  onChange={handleChange}
                  placeholder="e.g. 7.5"
                />


                <Input
                  label="Nitrate"
                  unit="mg/L"
                  type="number"
                  step="0.01"
                  name="nitrate"
                  value={formData.nitrate}
                  onChange={handleChange}
                  placeholder="e.g. 5.2"
                />


                <Input
                  label="Phosphate"
                  unit="mg/L"
                  type="number"
                  step="0.01"
                  name="phosphate"
                  value={formData.phosphate}
                  onChange={handleChange}
                  placeholder="e.g. 0.8"
                />

              </div>

            </section>


            {/* REMARKS */}

            <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

              <div className="px-6 py-5 border-b border-slate-200">

                <h2 className="font-bold text-slate-800">
                  Additional Notes
                </h2>

                <p className="text-sm text-slate-500">
                  Add observations or comments about the sample
                </p>

              </div>


              <div className="p-6">

                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Enter any observations, unusual characteristics, or other notes..."
                  className="w-full px-4 py-3 transition border outline-none resize-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />

              </div>

            </section>


            {/* ACTIONS */}

            <div className="flex flex-col justify-end gap-3 pt-2 sm:flex-row">

              <Link
                to="/admin"
                className="px-6 py-3 font-semibold text-center transition border rounded-xl text-slate-600 border-slate-200 hover:bg-white"
              >
                Cancel
              </Link>


              <button
                type="submit"
                className="px-8 py-3 font-semibold text-white transition shadow-lg rounded-xl bg-cyan-600 shadow-cyan-100 hover:bg-cyan-700"
              >
                Save Water Sample
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}


/* =================================
   REUSABLE INPUT COMPONENT
================================= */

function Input({
  label,
  unit,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step,
}) {

  return (
    <div>

      <label className="block mb-2 text-sm font-semibold text-slate-700">

        {label}

        {unit && (
          <span className="ml-1 font-normal text-slate-400">
            ({unit})
          </span>
        )}

      </label>


      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="w-full px-4 py-3 transition border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      />

    </div>
  );
}


export default AddSamples;