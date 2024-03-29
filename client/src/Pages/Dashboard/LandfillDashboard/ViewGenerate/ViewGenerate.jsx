import React, { useEffect, useState } from 'react';

const ViewGenerate = () => {
    const [lastBill, setLastBill] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/bills')
            .then(res => res.json())
            .then(data => {
                // Check if there are any bills in the array
                if (data.length > 0) {
                    // Set the last bill in the array
                    setLastBill(data[data.length - 1]);
                }
            });
    }, []); // Empty dependency array to fetch data only once

    const handlePrint = () => {
        window.print(); // Invoke print function when the button is clicked
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Bill Details</h1>
            {lastBill && (
                <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-bold">Registration Number:</p>
                            <p>{lastBill.registrationNumber}</p>
                        </div>
                        <div>
                            <p className="font-bold">Waste Volume:</p>
                            <p>{lastBill.wasteVolume}</p>
                        </div>
                        <div>
                            <p className="font-bold">Distance:</p>
                            <p>{lastBill.distance}</p>
                        </div>
                        <div>
                            <p className="font-bold">Bill Amount:</p>
                            <p>{lastBill.billAmount.toFixed(2)}</p> {/* Fixing bill amount to two decimal places */}
                        </div>
                        <div>
                            <p className="font-bold">Departure Location:</p>
                            <p>{lastBill.departureLocation}</p>
                        </div>
                        <div>
                            <p className="font-bold">Arrival Location:</p>
                            <p>{lastBill.arrivalLocation}</p>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={handlePrint} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Print
            </button>
        </div>
    );
};

export default ViewGenerate;
