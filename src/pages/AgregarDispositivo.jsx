import React, { useState } from 'react';
import Layout from '../components/Layout';

const AgregarDispositivo = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle the form submission here
        console.log('Device added:', { name, location, description });
        // Reset the form fields
        setName('');
        setLocation('');
        setDescription('');
    };

    return (
        <Layout>
            <div className='flex-grow'>
                <h2>Add Device</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </Layout>
    );
};

export default AgregarDispositivo;