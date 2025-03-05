// components/Sidebar.tsx
"use client";

import React, { useState } from "react";

// Simple Checkbox component (simulate your ShadCN UI Checkbox)
interface CheckboxProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}
const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className="h-4 w-4"
  />
);

interface FilterItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
const FilterItem: React.FC<FilterItemProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded hover:bg-blue-50 ${
        checked ? "bg-blue-100" : ""
      }`}
    >
      <Checkbox checked={checked} onChange={onChange} />
      <span className="text-sm">{label}</span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  // Example filter states – you can expand to more filters
  const [remote, setRemote] = useState(false);
  const [fullTime, setFullTime] = useState(false);

  return (
    <aside className="p-4 border-r w-64">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="flex flex-col gap-3">
        <FilterItem label="Remote" checked={remote} onChange={setRemote} />
        <FilterItem
          label="Full Time"
          checked={fullTime}
          onChange={setFullTime}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
