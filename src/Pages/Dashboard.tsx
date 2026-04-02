import LeaveHistory from "../Components/LeaveHistory";
import AddLeaveRequest from "../Components/AddLeaveRequest";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <AddLeaveRequest />
            <LeaveHistory />
        </div>
    );
}