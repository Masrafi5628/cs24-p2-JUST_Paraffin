import React, { useEffect, useState } from 'react';

const ViewGenerateBill = () => {
    const [lastBill, setLastBill] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/bills')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setLastBill(data[data.length - 1]);
                }
            });
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-10">Bill Details</h1>
            {lastBill && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 hover:bg-green-200 transition-all space-y-3 duration-300 ease-in-out transform hover:translate-y-1">
                        <p className="font-bold  text-lg">Total Waste:</p>
                        <p className='font-bold'>{lastBill.totalwaste} Ton</p>
                    </div>
                    <div className="bg-white p-5 hover:bg-green-200 space-y-3  transition-all duration-300 ease-in-out transform hover:translate-y-1">
                        <p className="font-bold text-lg">Required Waste:</p>
                        <p className='font-bold'>{lastBill.requiredwaste} Ton</p>
                    </div>
                    <div className="bg-white p-5 hover:bg-green-200 space-y-3  transition-all duration-300 ease-in-out transform hover:translate-y-1">
                        <p className="font-bold text-lg">Basic Pay:</p>
                        <p className='font-bold'>{lastBill.basicpay} ৳</p>
                    </div>
                    <div className="bg-white p-5 hover:bg-green-200 space-y-3  transition-all duration-300 ease-in-out transform hover:translate-y-1">
                        <p className="font-bold text-lg">Deficit:</p>
                        <p className='font-bold'>{lastBill.deficit} Ton</p>
                    </div>
                    <div className="bg-white p-5 hover:bg-green-200 space-y-3  transition-all duration-300 ease-in-out transform hover:translate-y-1">
                        <p className="font-bold text-lg">Fine:</p>
                        <p className='font-bold'>{lastBill.fine.toFixed(2)} ৳</p>
                    </div>
                    <div className="bg-white p-5 hover:bg-green-200 space-y-3  transition-all duration-300 ease-in-out transform hover:translate-y-1">
                        <p className="font-bold text-lg">Total Bill:</p>
                        <p className='font-bold'>{lastBill.totalbill} ৳</p>
                    </div>
                </div>
            )}
            <button onClick={handlePrint} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Print
            </button>
        </div>
    );
};

export default ViewGenerateBill;
