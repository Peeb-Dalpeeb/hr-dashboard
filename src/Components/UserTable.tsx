import { useGetUsersQuery, useDeleteUserMutation } from '../services/hrApi';
import { MoreHorizontal, Users } from 'lucide-react';

export default function UserTable() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  if (isLoading)
    return (
      <div className="w-full p-4 text-center text-slate-500">Loading...</div>
    );
  if (error)
    return (
      <div className="w-full p-4 text-center text-red-500">
        Error: Could not fetch users
      </div>
    );

  return (
    <div className="w-full font-sans">
      {/* Header section */}
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-slate-500" strokeWidth={2} />
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Employee Directory
          </h2>
        </div>
        <div className="rounded-full bg-slate-100/80 px-3 py-1 text-sm font-medium text-slate-600">
          {users?.length || 0} members
        </div>
      </div>

      {/* Table section */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Department
                </th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-200 transition-colors last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-600">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm font-semibold text-slate-800">
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => deleteUser(user.id)}
                      disabled={isDeleting}
                      className="text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
                      aria-label="Actions"
                      title={isDeleting ? 'Deleting...' : 'More Actions'}
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
