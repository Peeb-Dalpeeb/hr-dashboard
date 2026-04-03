import LeaveHistory from '../Components/LeaveHistory';
import LeaveRequestHeader from '../Components/LeaveRequestHeader';

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1200px] px-8 py-10 pt-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Employee Dashboard
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Welcome back! Manage your time off and view history.
        </p>
      </div>

      <LeaveRequestHeader />

      <div className="mt-10">
        <LeaveHistory />
      </div>
    </div>
  );
}
