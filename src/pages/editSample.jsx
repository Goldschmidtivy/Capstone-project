import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditSample() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get saved samples
  const savedData = localStorage.getItem("waterSamples");

  const samples = savedData
    ? JSON.parse(savedData)
    : [];

  // Find the sample we want to edit
  const existingSample = samples.find(
    (sample) => String(sample.id) === String(id)
  );

  // If sample does not exist
  if (!existingSample) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">

        <div className="p-10 text-center bg-white border shadow-sm rounded-2xl border-slate-200">

          <div className="mb-4 text-5xl">
            🔍
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            Sample Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            The sample you are trying to edit does not exist.
          </p>

          <Link
            to="/admin"
            className="inline-block px-5 py-3 mt-6 font-semibold text-white rounded-xl bg-cyan-600 hover:bg-cyan-700"
          >
            Back to Dashboard
          </Link>

        </div>

      </div>
    );
  }


  return (
    <EditForm
      existingSample={existingSample}
      samples={samples}
      navigate={navigate}
    />
  );
}


/* =================================
   EDIT FORM
================================= */

function EditForm({
  existingSample,
  samples,
  navigate,
}) {

  const [formData, setFormData] = useState({
    sampleId: existingSample.sampleId || "",
    waterSource: existingSample.waterSource || "",
    location: existingSample.location || "",
    dateCollected: existingSample.dateCollected || "",
    timeCollected: existingSample.timeCollected || "",
    temperature: existingSample.temperature || "",
    turbidity: existingSample.turbidity || "",
    conductivity: existingSample.conductivity || "",
    tds: existingSample.tds || "",
    ph: existingSample.ph || "",
    dissolvedOxygen: existingSample.dissolvedOxygen || "",
    nitrate: existingSample.nitrate || "",
    phosphate: existingSample.phosphate || "",
    remarks: existingSample.remarks || "",
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


    // Replace the old sample with the updated one

    const updatedSamples = samples.map((sample) => {

      if (String(sample.id) === String(existingSample.id)) {

        return {
          ...sample,
          ...formData,
        };

      }

      return sample;

    });


    // Save updated samples

    localStorage.setItem(
      "waterSamples",
      JSON.stringify(updatedSamples)
    );


    alert("Sample updated successfully!");


    // Return to dashboard

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
            className="flex items-center gap-3 px-4 py-3 text-white rounded-lg bg-cyan-600"
          >
            📊
            <span>Dashboard</span>
          </Link>


          <Link
            to="/admin/add-sample"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            🧪
            <span>Add Sample</span>
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


        {/* HEADER */}

        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-slate-200">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Edit Water Sample
            </h2>

            <p className="hidden text-sm text-slate-500 sm:block">
              Update the information for this sample
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


          {/* BACK */}

          <Link
            to="/admin"
            className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
          >
            ← Back to Dashboard
          </Link>


          {/* TITLE */}

          <div className="mb-8">

            <p className="mb-1 text-sm font-medium text-cyan-600">
              EDITING SAMPLE
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              {existingSample.sampleId}
            </h1>

            <p className="mt-2 text-slate-500">
              Update the water quality measurements below.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >


            {/* SAMPLE INFORMATION */}

            <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

              <div className="px-6 py-5 border-b border-slate-200">

                <h2 className="font-bold text-slate-800">
                  Sample Information
                </h2>

              </div>


              <div className="grid gap-5 p-6 md:grid-cols-2">

                <Input
                  label="Sample ID"
                  name="sampleId"
                  value={formData.sampleId}
                  onChange={handleChange}
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
                    className="w-full px-4 py-3 bg-white border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  >

                    <option value="">
                      Select source
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

              <div className="px-6 py-5 border-b border-slate-200">

                <h2 className="font-bold text-slate-800">
                  Physical Parameters
                </h2>

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
                />


                <Input
                  label="Turbidity"
                  unit="NTU"
                  type="number"
                  step="0.01"
                  name="turbidity"
                  value={formData.turbidity}
                  onChange={handleChange}
                />


                <Input
                  label="Conductivity"
                  unit="µS/cm"
                  type="number"
                  step="0.01"
                  name="conductivity"
                  value={formData.conductivity}
                  onChange={handleChange}
                />


                <Input
                  label="Total Dissolved Solids"
                  unit="mg/L"
                  type="number"
                  step="0.01"
                  name="tds"
                  value={formData.tds}
                  onChange={handleChange}
                />

              </div>

            </section>


            {/* CHEMICAL PARAMETERS */}

            <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

              <div className="px-6 py-5 border-b border-slate-200">

                <h2 className="font-bold text-slate-800">
                  Chemical Parameters
                </h2>

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
                />


                <Input
                  label="Dissolved Oxygen"
                  unit="mg/L"
                  type="number"
                  step="0.01"
                  name="dissolvedOxygen"
                  value={formData.dissolvedOxygen}
                  onChange={handleChange}
                />


                <Input
                  label="Nitrate"
                  unit="mg/L"
                  type="number"
                  step="0.01"
                  name="nitrate"
                  value={formData.nitrate}
                  onChange={handleChange}
                />


                <Input
                  label="Phosphate"
                  unit="mg/L"
                  type="number"
                  step="0.01"
                  name="phosphate"
                  value={formData.phosphate}
                  onChange={handleChange}
                />

              </div>

            </section>


            {/* REMARKS */}

            <section className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">

              <div className="px-6 py-5 border-b border-slate-200">

                <h2 className="font-bold text-slate-800">
                  Additional Notes
                </h2>

              </div>


              <div className="p-6">

                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border outline-none resize-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />

              </div>

            </section>


            {/* BUTTONS */}

            <div className="flex justify-end gap-3">

              <Link
                to="/admin"
                className="px-6 py-3 font-semibold border rounded-xl text-slate-600 border-slate-200 hover:bg-white"
              >
                Cancel
              </Link>


              <button
                type="submit"
                className="px-8 py-3 font-semibold text-white rounded-xl bg-cyan-600 hover:bg-cyan-700"
              >
                Update Sample
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}


/* =================================
   INPUT COMPONENT
================================= */

function Input({
  label,
  unit,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  step,
  min,
  max,
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
        required={required}
        step={step}
        min={min}
        max={max}
        className="w-full px-4 py-3 border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      />

    </div>
  );
}


export default EditSample;