/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"

// import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, formType }) {
    const { loading } = useSelector((state) => state.auth)

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (

                <div className="mx-auto flex w-11/12 max-w-maxContent items-center justify-between ">
                    <div className="mx-auto w-11/12 max-w-[450px] ">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {title}
                        </h1>

                        {formType === "signup" ? <SignupForm /> : <LoginForm />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Template