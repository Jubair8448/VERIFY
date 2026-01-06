"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const verify = async () => {
    if (!code.trim()) {
      setMsg("❌ Please enter a code");
      return;
    }

    const res = await fetch("/api/codes/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setMsg(data.msg);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Product Verification</h2>

      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ padding: 10, width: 250 }}
      />

      <br /><br />

      <button onClick={verify}>Verify</button>

      <p>{msg}</p>
    </div>
  );
}
