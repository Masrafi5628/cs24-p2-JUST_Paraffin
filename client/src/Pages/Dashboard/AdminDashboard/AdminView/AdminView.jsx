import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import './AdminView.css';

const AdminView = () => {
    const [totalWasteVolume, setTotalWasteVolume] = useState(null);
    const [roles, setRoles] = useState(null);
    const [doughnutChart, setDoughnutChart] = useState(null);
    const [userPieChart, setUserPieChart] = useState(null);





    useEffect(() => {
        fetch('http://localhost:5000/totalwaste')
            .then(res => res.json())
            .then(data => {
                setTotalWasteVolume(data.totalWasteVolume);
            })
            .catch(error => {
                console.error('Error fetching total waste volume:', error);
            });

        fetch('http://localhost:5000/usercount')
            .then(res => res.json())
            .then(data => {
                setRoles(data);
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
            });
    }, []);


    useEffect(() => {
        if (totalWasteVolume !== null) {
            const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
            if (doughnutChart) {
                doughnutChart.destroy();
            }
            const newDoughnutChart = new Chart(doughnutCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Total Waste Dumped'],
                    datasets: [{
                        label: 'Waste Dumped',
                        data: [totalWasteVolume],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.5)', // Blue
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)', // Blue
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            setDoughnutChart(newDoughnutChart);
        }
    }, [totalWasteVolume]);

    useEffect(() => {
        if (roles !== null) {
            const userPieCtx = document.getElementById('userPieChart').getContext('2d');
            if (userPieChart) {
                userPieChart.destroy();
            }
            const newUserPieChart = new Chart(userPieCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Total Users', 'Landfill Managers', 'STS Managers'],
                    datasets: [{
                        label: 'User Distribution',
                        data: [roles.userCount, roles.landfillManagerCount, roles.stsManagerCount],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)', // Red
                            'rgba(54, 162, 235, 0.5)', // Blue
                            'rgba(255, 206, 86, 0.5)', // Yellow
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', // Red
                            'rgba(54, 162, 235, 1)', // Blue
                            'rgba(255, 206, 86, 1)', // Yellow
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            setUserPieChart(newUserPieChart);
        }
    }, [roles]);

    return (
        <>
            <section className="common-section bg-gray-100 space-y-10 min-h-screen py-20 px-5">
                <div className="container mx-auto">
                    <div className="flex flex-col flex-wrap md:flex-row justify-center gap-6">
                        {/* Card 1 */}
                        <div className="bg-white p-6 w-80  rounded-lg hover:translate-y-1 transition-all .3s shadow-md">
                            <h2 className="text-xl font-bold mb-4">Total Waste Dumped</h2>
                            <p className="text-gray-700 font-medium text-xl">{totalWasteVolume}</p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-6 w-80 rounded-lg hover:translate-y-1 transition-all .3s shadow-md">
                            <h2 className="text-xl font-bold mb-4">Total Users</h2>
                            <p className="text-gray-700 font-medium  text-xl">{roles?.userCount}</p>
                        </div>
                    </div>
                </div>
                <div className="chart-view" >
                    <div className="bg-white p-3 rounded-lg">
                        <canvas id="doughnutChart" width="400" height="400"></canvas>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <canvas id="userPieChart" width="400" height="400"></canvas>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AdminView;

