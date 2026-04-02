import UserTable from "../Components/UserTable";
import PendingLeave from "../Components/PendingLeave";
import AdminHeader from "../Components/AdminHeader";

export default function AdminPortal() {
    return (
        <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 font-sans">
            <AdminHeader />
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
                <div className="flex-1 w-full min-w-0">
                    <UserTable />
                </div>
                <div className="w-full lg:w-[400px] shrink-0">
                    <PendingLeave />
                </div>
            </div>
        </div>
    );
}