import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, LeaveRequest } from '../types'; // Adjust this path to your actual types file

export const hrApi = createApi({
  reducerPath: 'hrApi',
  // fetchBaseQuery is your "Axios replacement" - set your base URL here
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),

  // Tags are the "labels" that tell Redux when to auto-refresh the UI
  tagTypes: ['Users', 'LeaveRequests'],

  endpoints: (builder) => ({
    // --- USER ENDPOINTS ---

    // 1. Get all users
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),

    // 2. Add a new user
    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'], // Automatically refreshes any component using useGetUsersQuery
    }),

    // 3. Delete a user
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    // --- LEAVE REQUEST ENDPOINTS ---

    // 4. Get all leave requests
    getLeaveRequests: builder.query<LeaveRequest[], void>({
      query: () => '/leaveRequests',
      providesTags: ['LeaveRequests'],
    }),

    // 5. Apply for leave (Employee Action)
    applyForLeave: builder.mutation<LeaveRequest, Partial<LeaveRequest>>({
      query: (request) => ({
        url: '/leaveRequests',
        method: 'POST',
        body: { ...request, status: 'Pending' },
      }),
      invalidatesTags: ['LeaveRequests'],
    }),

    // 6. Approve or Deny leave (Admin Action)
    // We use PATCH because we only want to change the 'status' field
    updateLeaveStatus: builder.mutation<
      LeaveRequest,
      { id: number; status: 'Approved' | 'Denied' }
    >({
      query: ({ id, status }) => ({
        url: `/leaveRequests/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['LeaveRequests'],
    }),
  }),
});

// RTK Query generates these hooks automatically based on the endpoint names above
export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetLeaveRequestsQuery,
  useApplyForLeaveMutation,
  useUpdateLeaveStatusMutation,
} = hrApi;
