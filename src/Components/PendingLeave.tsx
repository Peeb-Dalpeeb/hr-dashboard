import { useGetLeaveRequestsQuery } from '../services/hrApi';
import { FileText, XCircle, CheckCircle } from 'lucide-react';

export default function PendingLeave() {
  const { data: leaveRequests, isLoading, error } = useGetLeaveRequestsQuery();

  if (isLoading)
    return (
      <div className="w-full p-4 text-center text-slate-500">Loading...</div>
    );
  if (error)
    return (
      <div className="w-full p-4 text-center text-red-500">
        Error: Could not fetch leave requests
      </div>
    );

  const pendingRequests =
    leaveRequests?.filter(
      (leaveRequest) => leaveRequest.status === 'Pending'
    ) || [];

  return (
    <div className="w-full font-sans">
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-[#1e293b]">
          <FileText className="h-5 w-5 text-slate-500" strokeWidth={2} />
          <h2 className="text-lg font-semibold tracking-tight text-[#0f172a]">
            Pending Leave
          </h2>
        </div>
        <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-50 px-1.5 text-xs font-semibold text-red-600">
          {pendingRequests.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {pendingRequests.map((leaveRequest) => (
          <div
            key={leaveRequest.id}
            className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#0f172a]">
                {leaveRequest.employee}
              </h3>
              <span className="rounded border border-slate-100 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-500">
                {leaveRequest.date}
              </span>
            </div>

            <div className="mb-5 flex items-center gap-2 text-slate-500">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
              <span className="text-sm">{leaveRequest.reason}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button className="flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                <XCircle className="h-4 w-4" strokeWidth={2} />
                Deny
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700">
                <CheckCircle className="h-4 w-4" strokeWidth={2} />
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
