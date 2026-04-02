import { useState } from "react";
import AddLeave from "./AddLeave";

export default function LeaveRequestHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Need some time off?
        </h2>
        <p className="text-sm font-medium text-slate-500">
          Submit a new leave request for approval.
        </p>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
      >
        Request Leave
      </button>
      {isModalOpen && <AddLeave onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
