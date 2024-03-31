// import React, { useEffect, useState } from 'react';

// const FleetTruckView = () => {
//     const [fleetTruckDetails, setFleetTruckDetails] = useState([]);
//     var [volumeOfWaste, setVolumeOfWaste] = useState(0);



//     useEffect(() => {
//         fetch('http://localhost:5000/fleettruck')
//             .then(res => res.json())
//             .then(data => {
//                 // Sort bill details by ratio from low to high
//                 const sortedDetails = data.sort((a, b) => a.Ratio - b.Ratio);
//                 setFleetTruckDetails(sortedDetails);
//                 // Calculate total volume of waste
//                 // const totalVolume = sortedDetails.reduce((acc, item) => acc + item.volumeOfWaste, 0);
//                 // we want volume of wast last index
//                 setVolumeOfWaste(sortedDetails[sortedDetails.length - 1].volumeOfWaste);
//             });
//     }, []); // Empty dependency array to fetch data only once

//     let volume = volumeOfWaste;
//     console.log(volume);

//     return (
//         <div className="container mx-auto py-8">
//             <h1 className="text-3xl font-bold mb-4">Fleet Truck Details</h1>
//             {fleetTruckDetails.length > 0 && (
//                 <div className="bg-gray-100 p-6 rounded-lg">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             {fleetTruckDetails.map((item, index) => {
//                                 // console.log(volume);
//                                 const cap = Math.min(volume, 3 * item.capacity);
//                                 const trip = Math.ceil(cap / item.capacity);
//                                 // update the volume of waste
//                                 volume -= cap;
//                                 // console.log(volume);
//                                 return (
//                                     <div key={index} className="border border-gray-400 p-4 rounded-lg mb-4">
//                                         <p>Registration Number: {item.registrationNumber}</p>
//                                         <p>Capacity: {item.capacity}</p>
//                                         <p>Ratio: {item.Ratio}</p>
//                                         <p>Number of Trips: {trip}</p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FleetTruckView;


import React, { useEffect, useState } from 'react';

const FleetTruckView = () => {
    const [fleetTruckDetails, setFleetTruckDetails] = useState([]);
    var [volumeOfWaste, setVolumeOfWaste] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/fleettruck')
            .then(res => res.json())
            .then(data => {
                // Sort fleet truck details by ratio from low to high
                const sortedDetails = data.sort((a, b) => a.Ratio - b.Ratio);
                setFleetTruckDetails(sortedDetails);
                // Calculate total volume of waste
                setVolumeOfWaste(sortedDetails[sortedDetails.length - 1].volumeOfWaste);
            });
    }, []);

    return (
        <div className="container mx-auto py-8">
            {fleetTruckDetails.length > 0 && (
                <div className="overflow-x-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center mb-10 text-blue-700">Total Wast Volume: {volumeOfWaste}</h2>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2">Registration Number</th>
                                <th className="px-4 py-2">Capacity</th>
                                <th className="px-4 py-2">Cost kg<sup>-1</sup> km <sup>-1</sup></th>
                                <th className="px-4 py-2">Number of Trips</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fleetTruckDetails.map((item, index) => {
                                const cap = Math.min(volumeOfWaste, 3 * item.capacity);
                                const trip = Math.ceil(cap / item.capacity);
                                volumeOfWaste -= cap;
                                return (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{item.registrationNumber}</td>
                                        <td className="border px-4 py-2">{item.capacity}</td>
                                        <td className="border px-4 py-2">{item.Ratio}</td>
                                        <td className="border px-4 py-2">{trip}</td>
                                    </tr>

                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FleetTruckView;
