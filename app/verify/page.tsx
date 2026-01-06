/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCode = async () => {
    if (!code.trim()) {
      setMsg("❌ Please enter verification code");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/codes/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setMsg(data.msg);
    } catch (err) {
      setMsg("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-200 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">
        
        {/* Logo / Icon */}
        <div className="text-5xl mb-4">🔐</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Product Verification
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Enter your product verification code below
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-6 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Button */}
        <button
          onClick={verifyCode}
          disabled={loading}
          className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify Product"}
        </button>

        {/* Message */}
        {msg && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm font-medium ${
              msg.includes("✅")
                ? "bg-green-100 text-green-700"
                : msg.includes("⚠")
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {msg}
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          © 2026 Your Company Name. All rights reserved.
        </p>
      </div>
    </div>
  );
}
