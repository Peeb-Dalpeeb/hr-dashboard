import { useState } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { useApplyForLeaveMutation } from "../services/hrApi";
import type { RootState } from "../store/store";

interface AddLeaveProps {
    onClose: () => void;
}

export default function AddLeave({ onClose }: AddLeaveProps) {
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    
    const [applyForLeave, { isLoading }] = useApplyForLeaveMutation();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;
        
        try {
            await applyForLeave({
                userId: currentUser.id,
                employee: currentUser.name,
                date,
                reason,
            }).unwrap();
            onClose();
        } catch (error) {
            console.error("Failed to submit leave request:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] z-50">
            <div className="bg-white rounded-[12px] shadow-2xl w-full max-w-[480px] overflow-hidden">
                <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
                    <h2 className="text-xl font-semibold text-slate-800">Request Leave</h2>
                    <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
                        <X size={22} strokeWidth={2.5} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="date" className="block text-[15px] font-semibold text-slate-700">
                                Date(s)
                            </label>
                            <input
                                id="date"
                                type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="e.g. 2024-01-10 to 2024-01-12"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="reason" className="block text-[15px] font-semibold text-slate-700">
                                Reason
                            </label>
                            <input
                                id="reason"
                                type="text"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="e.g. Sick Leave, Vacation"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 px-6 py-5 bg-[#FAFAFA] border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-[15px] font-semibold text-slate-700 bg-[#E8EAED] hover:bg-slate-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-[22px] py-2.5 rounded-lg text-[15px] font-semibold text-white bg-[#2563EB] hover:bg-blue-700 transition-colors disabled:opacity-70"
                        >
                            {isLoading ? "Submitting..." : "Submit Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}