// components/InputField.tsx
import React from 'react';

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function InputField({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-gray-600 font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
