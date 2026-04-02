import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div>
      <h1>LuminaHR</h1>

      <Outlet />
    </div>
  );
}
