import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "https://water-quality-backend-5br2.onrender.com";

function AdminDashboard() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("loggedInUser");

  const user = savedUser ? JSON.parse(savedUser) : null;

  const [samples, setSamples] = useState([]);

  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(true);

  // Load samples from backend
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await fetch(`${API_URL}/api/samples`);

        if (!response.ok) {
          throw new Error("Failed to load samples");
        }

        const data = await response.json();

        setSamples(data);
      } catch (error) {
        console.error("Error loading samples:", error);
        alert("Failed to load water samples.");
      } finally {
        setLoading(false);
      }
    };

    fetchSamples();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.waterSource || !formData.location) {
      alert("Please fill in the Water Source and Location.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/samples`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: formData.location,
          waterSource: formData.waterSource,
          dateCollected: formData.dateCollected,
          timeCollected: formData.timeCollected,
          temperature: formData.temperature,
          turbidity: formData.turbidity,
          conductivity: formData.conductivity,
          TDS: formData.tds,
          pH: formData.ph,
          dissolvedOxygen: formData.dissolvedOxygen,
          nitrate: formData.nitrate,
          phosphate: formData.phosphate,
          remarks: formData.remarks,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save sample");
      }

      alert(`Water sample saved successfully! Sample ID: ${data.sampleId}`);

      // Reload samples from backend
      const updatedResponse = await fetch(`${API_URL}/api/samples`);
      const updatedSamples = await updatedResponse.json();

      setSamples(updatedSamples);

      // Clear form
      setFormData({
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
    } catch (error) {
      console.error("Error saving sample:", error);
      alert(`Failed to save sample: ${error.message}`);
    }
  };

  const handleDelete = async (sampleId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sample?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/samples/${sampleId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete sample");
      }

      alert("Sample deleted successfully.");

      setSamples((previous) =>
        previous.filter((sample) => sample.sampleId !== sampleId)
      );
    } catch (error) {
      console.error("Error deleting sample:", error);
      alert(`Failed to delete sample: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAVBAR */}

      <header className="bg-white border-b border-slate-200">
        <div className="flex items-center justify-between max-w-7xl px-6 py-4 mx-auto">

          <Link
            to="/admin"
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
                Admin Panel
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-700">
                {user?.name || "Administrator"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email || "Admin account"}
              </p>
            </div>

            <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-cyan-100 text-cyan-700">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "A"}
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium border rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Logout
            </button>

          </div>
        </div>
      </header>


      {/* MAIN */}

      <main className="max-w-7xl px-6 py-8 mx-auto">

        {/* PAGE HEADER */}

        <div className="mb-8">

          <p className="text-sm font-semibold tracking-wide text-cyan-600">
            ADMINISTRATION
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Water Quality Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Add, manage and monitor water quality samples.
          </p>

        </div>


        {/* SUMMARY */}

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
                samples
                  .map((sample) => sample.waterSource)
                  .filter(Boolean)
              ).size
            }
            icon="💧"
          />

          <SummaryCard
            title="Locations"
            value={
              new Set(
                samples
                  .map((sample) => sample.location)
                  .filter(Boolean)
              ).size
            }
            icon="📍"
          />

        </div>


        {/* ADD SAMPLE FORM */}

        <section className="p-6 mb-8 bg-white border rounded-2xl border-slate-200">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Add Water Sample
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the information collected from the water sample.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* SAMPLE INFORMATION */}

            <div className="mb-8">

              <h3 className="mb-4 text-sm font-bold tracking-wide uppercase text-slate-600">
                Sample Information
              </h3>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                <SelectField
                  label="Water Source"
                  name="waterSource"
                  value={formData.waterSource}
                  onChange={handleChange}
                  required
                  options={[
                    "River",
                    "Lake",
                    "Well",
                    "Borehole",
                    "Tap Water",
                    "Reservoir",
                    "Stream",
                    "Other",
                  ]}
                />

                <InputField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Lake Volta"
                  required
                />

                <InputField
                  label="Date Collected"
                  name="dateCollected"
                  type="date"
                  value={formData.dateCollected}
                  onChange={handleChange}
                />

                <InputField
                  label="Time Collected"
                  name="timeCollected"
                  type="time"
                  value={formData.timeCollected}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* WATER QUALITY */}

            <div className="mb-8">

              <h3 className="mb-4 text-sm font-bold tracking-wide uppercase text-slate-600">
                Water Quality Measurements
              </h3>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                <InputField
                  label="Temperature"
                  name="temperature"
                  type="number"
                  step="0.01"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  unit="°C"
                />

                <InputField
                  label="pH"
                  name="ph"
                  type="number"
                  step="0.01"
                  value={formData.ph}
                  onChange={handleChange}
                  placeholder="e.g. 7.2"
                />

                <InputField
                  label="Turbidity"
                  name="turbidity"
                  type="number"
                  step="0.01"
                  value={formData.turbidity}
                  onChange={handleChange}
                  placeholder="e.g. 3.5"
                  unit="NTU"
                />

                <InputField
                  label="Conductivity"
                  name="conductivity"
                  type="number"
                  step="0.01"
                  value={formData.conductivity}
                  onChange={handleChange}
                  placeholder="e.g. 250"
                  unit="µS/cm"
                />

                <InputField
                  label="Total Dissolved Solids"
                  name="tds"
                  type="number"
                  step="0.01"
                  value={formData.tds}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  unit="mg/L"
                />

                <InputField
                  label="Dissolved Oxygen"
                  name="dissolvedOxygen"
                  type="number"
                  step="0.01"
                  value={formData.dissolvedOxygen}
                  onChange={handleChange}
                  placeholder="e.g. 6.5"
                  unit="mg/L"
                />

                <InputField
                  label="Nitrate"
                  name="nitrate"
                  type="number"
                  step="0.01"
                  value={formData.nitrate}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  unit="mg/L"
                />

                <InputField
                  label="Phosphate"
                  name="phosphate"
                  type="number"
                  step="0.01"
                  value={formData.phosphate}
                  onChange={handleChange}
                  placeholder="e.g. 1.2"
                  unit="mg/L"
                />

              </div>

            </div>


            {/* REMARKS */}

            <div className="mb-6">

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Remarks
              </label>

              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="4"
                placeholder="Enter any observations or comments about the sample..."
                className="w-full px-4 py-3 border outline-none resize-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />

            </div>


            {/* BUTTONS */}

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setFormData({
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
                  })
                }
                className="px-5 py-3 font-semibold border rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Clear
              </button>

              <button
                type="submit"
                className="px-6 py-3 font-semibold text-white transition rounded-xl bg-cyan-600 hover:bg-cyan-700"
              >
                Save Water Sample
              </button>

            </div>

          </form>

        </section>


        {/* SAMPLE TABLE */}

        <section className="overflow-hidden bg-white border rounded-2xl border-slate-200">

          <div className="px-6 py-5 border-b border-slate-200">

            <h2 className="text-xl font-bold text-slate-800">
              Water Samples
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage saved water quality records.
            </p>

          </div>


          {loading ? (

            <div className="px-6 py-16 text-center">
              <p className="text-slate-500">
                Loading water samples...
              </p>
            </div>

          ) : samples.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <div className="mb-4 text-5xl">
                🧪
              </div>

              <h3 className="font-semibold text-slate-700">
                No water samples yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add your first water sample using the form above.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="text-left bg-slate-50">

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Sample ID
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Source
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Location
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      pH
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Turbidity
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {samples.map((sample) => (

                    <tr
                      key={sample.sampleId}
                      className="hover:bg-slate-50"
                    >

                      <td className="px-5 py-4 font-semibold text-slate-800">
                        {sample.sampleId}
                      </td>

                      <td className="px-5 py-4">

                        <span className="px-3 py-1 text-xs font-medium text-blue-700 rounded-full bg-blue-50">
                          {sample.waterSource}
                        </span>

                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {sample.location}
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {sample.pH || "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {sample.turbidity
                          ? `${sample.turbidity} NTU`
                          : "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {sample.dateCollected
                          ? sample.dateCollected.split("T")[0]
                          : "—"}
                      </td>

                      <td className="px-5 py-4">

                        <div className="flex gap-2">

                          <Link
                            to={`/samples/${sample.sampleId}`}
                            className="px-3 py-2 text-xs font-semibold text-cyan-700 rounded-lg bg-cyan-50 hover:bg-cyan-100"
                          >
                            View
                          </Link>

                          <Link
                            to={`/edit-sample/${sample.sampleId}`}
                            className="px-3 py-2 text-xs font-semibold text-amber-700 rounded-lg bg-amber-50 hover:bg-amber-100"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(sample.sampleId)
                            }
                            className="px-3 py-2 text-xs font-semibold text-red-700 rounded-lg bg-red-50 hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}


/* =========================================
   INPUT FIELD
========================================= */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  step,
  unit,
}) {
  return (
    <div>

      <label className="block mb-2 text-sm font-semibold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <div className="relative">

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          step={step}
          className={`w-full px-4 py-3 ${
            unit ? "pr-16" : ""
          } border outline-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100`}
        />

        {unit && (
          <span className="absolute text-xs -translate-y-1/2 right-4 top-1/2 text-slate-400">
            {unit}
          </span>
        )}

      </div>

    </div>
  );
}


/* =========================================
   SELECT FIELD
========================================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <div>

      <label className="block mb-2 text-sm font-semibold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-white border outline-none appearance-none rounded-xl border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      >

        <option value="">
          Select water source
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}


/* =========================================
   SUMMARY CARD
========================================= */

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

export default AdminDashboard;

