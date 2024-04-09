import React from 'react';
import Navbar from "./Navbar";
import GetStartedUser from './GetStartedUser';
import GetStartedManager from "./GetStartedManager"
import BackgroundImage from "../assets/BackgroundMain.jpeg"
import ViewPurchasesButton from './ViewPurchasesButton';

const LandingPage = () => {
    return (
        <div style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            margin: 0,
            padding: 0,
            height: '100vh',
          }}>
            <div className='LandingPage'>
                <Navbar sticky="top" exact />
                <div className="line-separator my-5"></div>

                <div style={{ marginTop: '350px' }}>
                    <ViewPurchasesButton />
                    <GetStartedUser />
                    <GetStartedManager />
                </div>
                
            </div>
        </div>
    );
}
 
export default LandingPage;

