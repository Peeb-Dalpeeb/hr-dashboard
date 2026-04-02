import { useGetLeaveRequestsByUserIdQuery } from "../services/hrApi";
import { useSelector } from "react-redux";
import AddLeaveRequest from "./AddLeaveRequest";

export default function LeaveHistory() {
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const { data, isLoading, error } = useGetLeaveRequestsByUserIdQuery(currentUser?.id, {
        skip: !currentUser?.id
    });

    if (!data || data.length === 0) {
        return null;
    }
    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Leave History</h1>
            
            {isLoading && (
                <div className="flex items-center justify-center p-8 text-slate-500">
                    <p className="animate-pulse">Loading leave history...</p>
                </div>
            )}
            
            {error && (
                <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <p className="font-medium">Error fetching leave history:</p>
                    <p className="text-sm">
                        {'message' in error ? error.message : 
                         'status' in error ? `Status ${error.status}: ${JSON.stringify(error.data)}` : 
                         'An unknown error occurred'}
                    </p>
                </div>
            )}
            
            {data && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <ul className="divide-y divide-slate-100">
                        {data.map((leaveRequest) => (
                            <li key={leaveRequest.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-slate-900">{leaveRequest.employee}</p>
                                        <p className="text-sm text-slate-500">{leaveRequest.date}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                        leaveRequest.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                        leaveRequest.status === 'Denied' ? 'bg-red-100 text-red-700' :
                                        'bg-amber-100 text-amber-700'
                                    }`}>
                                        {leaveRequest.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}