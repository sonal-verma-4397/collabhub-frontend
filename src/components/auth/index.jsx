import React, { useState } from 'react'
import { LoginModal } from './login';
import { SignupModal } from './signUp';

const Auth = ({ setShowAuthModal }) => {

    const [showLogin, setShowLogin] = useState(true)
    const [showSignup, setShowSignup] = useState(false)

    setShowAuthModal(showLogin || showSignup)
    return (
        <>
            <LoginModal
                open={showLogin}
                onOpenChange={setShowLogin}
                onSwitchToSignup={() => {
                    setShowLogin(false)
                    setShowSignup(true)
                }}
            />
            <SignupModal
                open={showSignup}
                onOpenChange={setShowSignup}
                onSwitchToLogin={() => {
                    setShowSignup(false)
                    setShowLogin(true)
                }}
            />
        </>
    )
}

export default Auth;