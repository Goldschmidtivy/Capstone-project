import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddSamples() {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("SUBMIT BUTTON WORKED");
  alert("Submit function is working");

  try {
      const response = await fetch(
        "https://water-quality-backend-5br2.onrender.com/api/samples",
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save sample");
      }

      alert(`Sample saved successfully! Sample ID: ${data.sampleId}`);

      navigate("/admin");
    } catch (error) {
      console.error("Error saving sample:", error);
      alert("Failed to save sample. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-xl font-bold text-blue-600 mb-8">
          Water Quality
        </h1>

        <nav className="space-y-4">
          <Link
            to="/admin"
            className="block text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/add-sample"
            className="block text-blue-600 font-semibold"
          >
            Add Sample
          </Link>

          <Link
            to="/user"
            className="block text-gray-700 hover:text-blue-600"
          >
            User View
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Add Water Sample
            </h2>

            <p className="text-gray-600 mt-2">
              Enter the water quality information below.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Sample Information */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-5">
                Sample Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Water Source"
                  name="waterSource"
                  value={formData.waterSource}
                  onChange={handleChange}
                  placeholder="e.g. Lake, River, Borehole"
                  required
                />

                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Lake Volta"
                  required
                />

                <Input
                  label="Date Collected"
                  name="dateCollected"
                  type="date"
                  value={formData.dateCollected}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Time Collected"
                  name="timeCollected"
                  type="time"
                  value={formData.timeCollected}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Physical Parameters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-5">
                Physical Parameters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Temperature (°C)"
                  name="temperature"
                  type="number"
                  step="0.01"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="e.g. 27.50"
                />

                <Input
                  label="Turbidity (NTU)"
                  name="turbidity"
                  type="number"
                  step="0.01"
                  value={formData.turbidity}
                  onChange={handleChange}
                  placeholder="e.g. 3.50"
                />

                <Input
                  label="Conductivity (µS/cm)"
                  name="conductivity"
                  type="number"
                  step="0.01"
                  value={formData.conductivity}
                  onChange={handleChange}
                  placeholder="e.g. 120.00"
                />

                <Input
                  label="TDS (mg/L)"
                  name="tds"
                  type="number"
                  step="0.01"
                  value={formData.tds}
                  onChange={handleChange}
                  placeholder="e.g. 80.00"
                />
              </div>
            </div>

            {/* Chemical Parameters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-5">
                Chemical Parameters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="pH"
                  name="ph"
                  type="number"
                  step="0.01"
                  value={formData.ph}
                  onChange={handleChange}
                  placeholder="e.g. 7.20"
                />

                <Input
                  label="Dissolved Oxygen (mg/L)"
                  name="dissolvedOxygen"
                  type="number"
                  step="0.01"
                  value={formData.dissolvedOxygen}
                  onChange={handleChange}
                  placeholder="e.g. 6.80"
                />

                <Input
                  label="Nitrate (mg/L)"
                  name="nitrate"
                  type="number"
                  step="0.01"
                  value={formData.nitrate}
                  onChange={handleChange}
                  placeholder="e.g. 2.10"
                />

                <Input
                  label="Phosphate (mg/L)"
                  name="phosphate"
                  type="number"
                  step="0.01"
                  value={formData.phosphate}
                  onChange={handleChange}
                  placeholder="e.g. 0.50"
                />
              </div>
            </div>

            {/* Remarks */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-5">
                Remarks
              </h3>

              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Enter any additional observations or remarks..."
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
  type="submit"
  onClick={() => alert("SAVE BUTTON CLICKED")}
  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  Save Sample
</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

/* Reusable Input Component */
function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={type === "number" ? "0.01" : undefined}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default AddSamples;

