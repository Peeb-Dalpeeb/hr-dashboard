import { useGetLeaveRequestsByUserIdQuery } from "../services/hrApi";
import { useSelector } from "react-redux";

export default function LeaveHistory() {
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const { data, isLoading, error } = useGetLeaveRequestsByUserIdQuery(currentUser?.id, {
        skip: !currentUser?.id
    });

    if (!data || data.length === 0) {
        return null; // Return null when no data
    }

    return (
        <>
        <h2 className="mb-4 text-[1.1rem] font-bold text-slate-800">Leave History</h2>  
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 gap-4 border-b border-slate-100 bg-white/50 px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <div>DATE</div>
                <div>REASON</div>
                <div className="text-right">STATUS</div>
            </div>
            
            {isLoading && (
                <div className="flex items-center justify-center p-8 text-slate-500">
                    <p className="animate-pulse">Loading leave history...</p>
                </div>
            )}
            
            {error && (
                <div className="p-4 bg-red-50 text-red-700">
                    <p className="font-medium">Error fetching leave history:</p>
                    <p className="text-sm">
                        {'message' in error ? error.message : 
                         'status' in error ? `Status ${error.status}: ${JSON.stringify(error.data)}` : 
                         'An unknown error occurred'}
                    </p>
                </div>
            )}
            
            {data && (
                <ul className="divide-y divide-slate-100">
                    {data.map((leaveRequest) => (
                        <li key={leaveRequest.id} className="grid grid-cols-3 gap-4 items-center px-6 py-4 transition-colors hover:bg-slate-50">
                            <div className="text-sm font-bold text-slate-700">
                                {leaveRequest.date}
                            </div>
                            <div className="text-sm font-medium text-slate-500">
                                {leaveRequest.reason}
                            </div>
                            <div className="flex justify-end">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                    leaveRequest.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                    leaveRequest.status === 'Denied' ? 'bg-red-100 text-red-700' :
                                    'bg-[#fdf3c6] text-[#b3851b]' // Custom matching yellow from design
                                }`}>
                                    {leaveRequest.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
           
        </div>
        </>
    );
}
