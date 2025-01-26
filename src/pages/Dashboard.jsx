import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center gap-y-5 justify-center w-full h-screen text-5xl text-pure-greys-25">

            <p>This is Dashboard</p>

            <div className="text-blue-100">
                <Link to={"/task"}>Task</Link>
            </div>
            <div className="text-blue-100">
                <Link to={"/"}>Feed</Link>
            </div>


        </div>
    )
};

export default Dashboard;