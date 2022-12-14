import React, { useState, useRef, Suspense } from "react"
import { resources } from "../../resource"
import { Route, Routes, Link } from "react-router-dom"
import useNightMode from "../../hooks/night-mode"
import OffCanvas from "../UI/OffCanvas/OffCanvas"

import { ReactNotifications } from 'react-notifications-component'
import logo from "../../assets/images/logo.png"
import lightLogo from "../../assets/images/logo-light.png"
import Loading from "../UI/Loading/Loading"

import './uikit.css'
import './style.css'
import './tailwind.css'

const Signup = React.lazy(() => import("../../containers/Signup/Signup"))
const Signin = React.lazy(() => import("../../containers/Signin/Signin"))
const SignupRole = React.lazy(() => import("../UI/SignupRule/SignupRule"))

const InitLayout = (props) => {

    const [nightMode, toggleNightMode] = useNightMode()
    const [showOffCanvas, setShowOffCanvas] = useState(false)
    const [confirmRule, setConfirmRule] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const offcanvasRef = useRef()


    const onShowCanvasPageHandler = () => {
        setShowOffCanvas(true)
        // document.body.style.overflowY = "hidden"
    }

    const showLoadingHandler = () => {
        setLoading(true)
    }

    const hideLoadingHandler = () => {
        setLoading(false)
    }

    const onHideCanvasPageHandler = () => {
        offcanvasRef.current.classList.add('animate__animated')
        offcanvasRef.current.classList.add('animate__fadeOutRight')
        setTimeout(() => {
            if (showOffCanvas) {
                setShowOffCanvas(false)
                // document.body.style.overflowY = "auto"
            }
        }, 500);
    }

    const onConfirmRuleHandler = () => {
        setConfirmRule(true);
        onHideCanvasPageHandler();
    }

    return (<div className="bg-gray-100 init-layout" >
        <div id="wrapper" className="flex flex-col justify-between h-screen">
            <div className="bg-white py-4 shadow dark:bg-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center lg:justify-between justify-around">

                        <Link to="/">
                            <img src={logo} loading="lazy" className="w-32 logo_dark" alt="" />
                            <img src={lightLogo} loading="lazy" className="w-32 logo_light" alt="" />
                        </Link>

                        <div className="capitalize flex font-semibold hidden lg:block my-2 space-x-3 text-center text-sm">
                            <Link to="/" className="py-3 px-4">{resources.INITlAYOUT.BUTTON_SIGNIN}</Link>
                            <Link to="/Signup" className="bg-pink-500 pink-500 px-6 py-3 rounded-md shadow text-white">{resources.INITlAYOUT.BUTTON_SIGNUP}</Link>
                        </div>

                    </div>
                </div>
            </div>

            <div style={{ position: "relative" }}>
                <ReactNotifications />
                <Loading style={isLoading ? { display: "flex" } : { display: "none" }} />
                <div className="lg:p-12 max-w-md max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
                    <Suspense fallback={<Loading style={{ display: "flex" }} />}>
                        <Routes>
                            <Route path="/Signup" element={<Signup confirmRule={confirmRule} onConfirmRule={() => setConfirmRule(!confirmRule)} onShowCanvasPage={onShowCanvasPageHandler} onShowLoading={showLoadingHandler} onHideLoading={hideLoadingHandler} ></Signup>} />
                            <Route path="/" element={<Signin onShowLoading={showLoadingHandler} onHideLoading={hideLoadingHandler}></Signin>} />
                        </Routes>
                    </Suspense>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <label htmlFor="night-light-checkbox" className="night-light-label">
                    <input type="checkbox" id="night-light-checkbox" onChange={toggleNightMode} defaultChecked={nightMode} />
                    <span className="night-light-ball"></span>
                    <svg viewBox="0 0 512 512" className="sun-svg">
                        <path id="sun-svg" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z">
                        </path>
                    </svg>
                    <svg viewBox="0 0 512 512" className="moon-svg">
                        <path id="moon-svg" d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z">
                        </path>
                    </svg>
                </label>
            </div>

            <div className="lg:mb-5 py-3 uk-link-reset">
                <div className="flex flex-col items-center justify-between lg:flex-row max-w-6xl mx-auto lg:space-y-0 space-y-3">
                    <div className="flex space-x-2 text-gray-700 uppercase">
                        <Link to="/"> {resources.INITlAYOUT.ABOUT} &nbsp;</Link>
                        <Link to="/"> {resources.INITlAYOUT.HELP}</Link>
                        <Link to="/"> {resources.INITlAYOUT.TERMS}</Link>
                        <Link to="/"> {resources.INITlAYOUT.PRIVACY}</Link>
                    </div>
                    <p className="capitalize">
                        <span> {resources.INITlAYOUT.DEVELOP}</span>
                        <span style={{ color: "#be185d" }}> {resources.INITlAYOUT.INSTELLLO}</span>
                    </p>
                </div>
            </div>
        </div>

        <OffCanvas ref={offcanvasRef} title={resources.SIGNUP.TERMS_AND_CONDITIONS} isShow={showOffCanvas} onHide={onHideCanvasPageHandler} >
            <Suspense fallback={<Loading style={{ display: "flex" }} />}>
                <SignupRole onConfirmRule={onConfirmRuleHandler} ></SignupRole>
            </Suspense>
        </OffCanvas>
    </div>
    )

}

export default InitLayout