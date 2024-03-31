import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const AddminAllUserView = () => {
    const [roles, setRoles] = useState(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/usercount')
            .then(res => res.json())
            .then(data => {
                setRoles(data)
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
            });
    }, []);

    useEffect(() => {
        if (roles !== null) {
            if (chartInstance !== null) {
                // Destroy existing chart instance
                chartInstance.destroy();
            }

            // Doughnut Chart
            const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
            const newChartInstance = new Chart(doughnutCtx, {
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

            // Set the new chart instance
            setChartInstance(newChartInstance);
        }
    }, [roles]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <canvas id="doughnutChart" width="400" height="400"></canvas>
            </div>
        </div>
    );
};

export default AddminAllUserView;
