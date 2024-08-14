import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
    return (
        <Layout>
            <div className='flex-grow bg-home bg-right bg-contain bg-no-repeat'>
                <h1>Welcome to the Home page!</h1>
                <p>This is a simple home component.</p>
            </div>
        </Layout>
    );
};

export default Home;