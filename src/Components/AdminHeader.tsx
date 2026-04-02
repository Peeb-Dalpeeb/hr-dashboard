import { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import AddEmployee from './AddEmployee';

export default function AdminHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-5 sm:gap-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                        <Users size={28} className="stroke-[1.5]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HR Dashboard</h1>
                        <p className="text-sm text-slate-500 mt-0.5">Manage your team and review leave requests.</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    Add Employee
                </button>
            </div>

            {isModalOpen && <AddEmployee onClose={() => setIsModalOpen(false)} />}
        </>
    );
}