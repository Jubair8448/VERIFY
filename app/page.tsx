"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const verify = async () => {
    if (!code.trim()) {
      setMsg("❌ Please enter your product verification code");
      return;
    }

    const res = await fetch("/api/codes/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setMsg(data.msg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-green-100">

        {/* Brand Trust Header */}
        <h1 className="text-3xl font-extrabold text-center text-red-700">
          Product Authentication
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Verify your product to ensure authenticity & quality
        </p>

        {/* Trust Badges */}
        <div className="flex justify-center gap-4 mt-4 text-sm text-green-600 font-medium">
          <span>✔ 100% Genuine</span>
          <span>✔ Secure Check</span>
          <span>✔ Official Source</span>
        </div>

        {/* Input */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-gray-700">
            Enter Verification Code
          </label>
          <input
            type="text"
            placeholder="Example: xxxx"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg tracking-wider"
          />
        </div>

        {/* Button */}
        <button
          onClick={verify}
          className="w-full mt-6 bg-red-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-[1.02]"
        >
          Verify Product
        </button>

        {/* Result Message */}
        {msg && (
          <div className="mt-5 p-3 rounded-lg bg-green-50 text-center text-green-700 font-semibold">
            {msg}
          </div>
        )}

        {/* Marketing / Revenue Text */}
        <div className="mt-8 border-t pt-6 text-sm text-gray-600 space-y-2">
          <p>
            🔒 This verification system protects you from counterfeit products.
          </p>
          <p>
            🧪 Every product is quality tested & approved by our experts.
          </p>
          <p className="text-green-700 font-semibold">
            💚 Thank you for choosing trusted & original products.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center text-sm">
          <p>
            Want more original products?
          </p>
          <a
            href="#"
            className="text-green-600 font-semibold hover:underline"
          >
            Visit our official store →
          </a>
        </div>

      </div>
    </div>
  );
}
