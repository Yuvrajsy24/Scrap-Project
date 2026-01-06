"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Check,
} from "lucide-react";
import { FiGithub, FiChrome } from "react-icons/fi";

export default function HomePage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (mode === "signup") {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      if (!agreed) {
        alert("Please accept terms");
        return;
      }
    }
    console.log(mode.toUpperCase(), form);
  };

  const passwordRules = [
    { label: "8+ characters", ok: form.password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(form.password) },
    { label: "Lowercase", ok: /[a-z]/.test(form.password) },
    { label: "Number", ok: /[0-9]/.test(form.password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-xl font-bold">
            DA
          </div>
          <h1 className="text-2xl font-bold mt-4">
            {mode === "signin" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-300 text-sm">
            {mode === "signin"
              ? "Sign in to Dev AI"
              : "Join Dev AI and start building"}
          </p>
        </div>

        {/* OAuth */}
        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg">
            <FiChrome /> Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-gray-800 py-2 rounded-lg">
            <FiGithub /> Continue with GitHub
          </button>
        </div>

        <div className="border-t border-white/20 my-6" />

        {/* Form */}
        <div className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-sm">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="name"
                  onChange={handleChange}
                  className="w-full pl-10 py-2 bg-white/5 border border-white/10 rounded"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="email"
                type="email"
                onChange={handleChange}
                className="w-full pl-10 py-2 bg-white/5 border border-white/10 rounded"
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <>
              <div>
                <label className="text-sm">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded"
                  />
                  <button
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                {passwordRules.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        r.ok ? "bg-green-500" : "bg-white/10"
                      }`}
                    >
                      {r.ok && <Check size={10} />}
                    </span>
                    <span className={r.ok ? "text-green-400" : "text-gray-400"}>
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>

              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mr-2"
                />
                I agree to Terms & Privacy
              </label>
            </>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-lg font-semibold"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          {mode === "signin" ? "No account?" : "Already have an account?"}{" "}
          <button
            onClick={() =>
              setMode(mode === "signin" ? "signup" : "signin")
            }
            className="text-purple-400 font-semibold"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
