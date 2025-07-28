import React, { useState } from "react";
import { ShowPasswordIcon, HidePasswordIcon } from "../../../assets/icons";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  error?: string;
  showPasswordToggle?: boolean;
};

export default function InputField({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  minLength,
  maxLength,
  autoComplete,
  error,
  showPasswordToggle = false,
}: InputFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const inputType =
    showPasswordToggle && type === "password"
      ? passwordVisible
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-1 relative">
      <label htmlFor={name} className="block text-gray-600 font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={"w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 "}
      />
      {showPasswordToggle && type === "password" && (
        <button
          type="button"
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          tabIndex={-1}
          aria-label={passwordVisible ? "Şifreyi gizle" : "Şifreyi göster"}
        >
          {passwordVisible ? <HidePasswordIcon /> : <ShowPasswordIcon />}
        </button>
      )}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
