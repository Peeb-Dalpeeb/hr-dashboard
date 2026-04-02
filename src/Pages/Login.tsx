import { useActionState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { loginAction } from '../actions';

export default function Login() {
  const [state, formAction] = useActionState(loginAction, null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state?.success && state.user) {
      dispatch(setCredentials(state.user));
      navigate('/dashboard');
    }
  }, [state, navigate, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-500">Access your HR Dashboard</p>
        </div>

        <form action={formAction} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="john@company.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-blue-600 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Sign In
          </button>

          {state?.message && !state.success && (
            <div className="mt-4 rounded bg-red-50 p-3 text-center text-sm text-red-700">
              {state.message}
            </div>
          )}
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/" className="font-medium text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
