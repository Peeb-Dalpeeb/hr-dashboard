import { useState } from 'react';
import { useApplyForLeaveMutation } from '../services/hrApi';
import { useSelector } from 'react-redux';

export default function AddLeaveRequest() {
    const [applyForLeave, { isLoading }] = useApplyForLeaveMutation();
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const parsedUserId = isNaN(Number(currentUser.id)) ? currentUser.id : Number(currentUser.id);
            
            await applyForLeave({
                userId: parsedUserId,
                employee: currentUser.name,
                reason,
                date,
                status: 'Pending'
            }).unwrap();
            setReason('');
            setDate('');
        } catch (error) {
            console.error('Failed to apply for leave:', error);
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Apply for Leave</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 transition"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50"
                >
                    {isLoading ? 'Applying...' : 'Apply for Leave'}
                </button>
            </form>
        </div>
    );
}