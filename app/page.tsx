import React from 'react';
import SiginForm from './components/Sigin-form/Sigin-form';

const auth = false;

function HomePage() {
    if (!auth) {
        return (
            <SiginForm />
        );
    }

    return <div className='text-3xl'>Welcome to Next.js!</div>;
}
  
export default HomePage;
