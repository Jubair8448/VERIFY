"use client";

import { useState, useEffect } from "react";

interface CodeItem {
  _id: string;
  code: string;
  createdAt: string;
  lastVerifiedAt?: string;
  verifyCount?: number;
}

export default function Dashboard() {
  const [code, setCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState<CodeItem[]>([]);

  // Fetch all codes
  const fetchCodes = async () => {
    try {
      const res = await fetch("/api/codes/list");
      const data = await res.json();
      if (data.success) setCodes(data.codes);
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to fetch codes");
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  // Add single code
  const addCode = async () => {
    if (!code.trim()) return setMsg("❌ Code is required");
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/codes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setLoading(false);
      setMsg(data.msg);
      setCode("");
      fetchCodes();
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMsg("❌ Server error");
    }
  };

  // Upload CSV
  const uploadCSV = async () => {
    if (!file) return setMsg("❌ Please select a CSV file");
    setLoading(true);
    setMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/codes/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMsg(`✅ Uploaded: ${data.saved}, Duplicates skipped: ${data.duplicates}`);
      setFile(null);
      fetchCodes();
    } catch (err) {
      console.error(err);
      setMsg("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete code
 const deleteCode = async (id: string) => {
  if (!confirm("Are you sure you want to delete this code?")) return;

  setLoading(true);
  setMsg("");

  try {
    const res = await fetch(`/api/codes/delete/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setMsg(data.msg);
    fetchCodes(); // refresh list
  } catch (err) {
    console.error(err);
    setMsg("❌ Delete failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center">📊 Admin Dashboard</h1>

        {/* Add Single Code */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Add Single Code</h2>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
            <button
              onClick={addCode}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>

        {/* CSV Upload */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Upload Code File (CSV)</h2>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm"
            />
            <button
              onClick={uploadCSV}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition disabled:opacity-50"
            >
              Upload CSV
            </button>
          </div>
        </div>

        {/* Code List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">All Codes</h2>
          {codes.length === 0 ? (
            <p className="text-gray-500">No codes added yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Code</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase">Verified Count</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase">Last Verified</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {codes.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{item.code}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.verifyCount || 0}</td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {item.lastVerifiedAt ? new Date(item.lastVerifiedAt).toLocaleString() : "-"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteCode(item._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Message */}
        {msg && (
          <div className="p-4 bg-gray-100 text-gray-700 rounded-lg shadow-inner text-center">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
