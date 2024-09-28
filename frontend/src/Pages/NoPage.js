import React from 'react';

const NoPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#00754ae2]">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <p className="text-2xl text-white">Oops! Page not found.</p>
                <a href="/" className="mt-6 inline-block px-6 py-3 bg-white text-green-500 font-semibold rounded-lg shadow hover:bg-green-100 transition-colors duration-300">
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default NoPage;
