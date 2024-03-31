import React from 'react';

const Banner = () => {
    return (
        <div className="banner flex justify-center items-center h-auto py-10 md:py-20">
            <div className="max-w-4xl text-center">
                <div>
                    <div className='flex justify-between max-w-3xl mb-5	'>
                        <p>Efficiency</p>

                        <p>Sustainability</p>
                        <p>Accountability</p>
                    </div>
                </div>
                <h1 className="text-4xl mb-3 md:text-6xl font-bold mb-4">Welcome to <span className='text-blue-700'>EcoSync</span></h1>
                <p className="text-lg md:text-xl">Your partner in creating a cleaner Dhaka</p>
            </div>
        </div>
    );
};

export default Banner;