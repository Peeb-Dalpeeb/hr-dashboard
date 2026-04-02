import { X } from 'lucide-react';
import { useAddUserMutation } from '../services/hrApi';

interface AddEmployeeProps {
  onClose: () => void;
}

export default function AddEmployee({ onClose }: AddEmployeeProps) {
  const [addUser, { isLoading }] = useAddUserMutation();

  // React 19 provides the formData automatically!
  const clientAction = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const department = formData.get('department') as string;
    const email = formData.get('email') as string;

    try {
      await addUser({
        name,
        department,
        email,
        role: 'employee',
      }).unwrap();
      onClose(); 
    } catch (error) {
      console.error('Failed to save employee:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Notice we changed this to a <form> tag */}
      <form action={clientAction} className="bg-white rounded-xl shadow-xl w-full max-w-[480px] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 mb-2">
          <h2 className="text-[1.15rem] font-semibold text-slate-800">Add New Employee</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input
              name="name" // CRITICAL: This is how formData finds the value
              type="text"
              required
              placeholder="e.g. Jane Doe"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
            <input
              name="department" // CRITICAL
              type="text"
              required
              placeholder="e.g. Engineering"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <input
              name="email" // CRITICAL
              type="email"
              required
              placeholder="jane@company.com"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role</label>
            <select
              name="role"
              required
              defaultValue=""
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white transition"
            >
              <option value="" disabled hidden>Select a role...</option>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 border-t border-slate-100 mt-4 bg-white">
          <button
            type="button" // Type button prevents form submission
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition text-sm"
          >
            Cancel
          </button>
          <button
            type="submit" // This triggers the 'action'
            disabled={isLoading}
            className="px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Employee'}
          </button>
        </div>
      </form>
    </div>
  );
}