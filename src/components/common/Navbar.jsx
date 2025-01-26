import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    return (
        <div className=" fixed z-48 w-full bg-richblack-900">
            <nav className="flex justify-between  border-b items-center h-16 text-white relative shadow-sm font-sans" role="navigation">
                <a href="/" className="pl-8">Logo</a>
                <div className="pr-8 ">
                    {
                        token && <>
                            <a href="/" className="p-2">Home</a>
                            <a href="/task" className="p-2">Task</a>
                        </>
                    }
                    {
                        token != null ?
                            (<a href="/" onClick={() => dispatch(logout())} className="p-2">Log out</a>)
                            : (
                                <>
                                    <a href="/login" className="p-2">Log In</a>
                                    <a href="/signup" className="p-2">Sign Up</a>
                                </>

                            )
                    }


                </div>
            </nav>
        </div>
    )
};

export default Navbar;