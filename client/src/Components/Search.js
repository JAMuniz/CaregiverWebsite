import React, {useEffect, useState } from "react";
import '../css/search.css';

function Search(){
    const [caregivers, setCaregivers] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [today, setToday] = useState('');

    useEffect(() => {
        fetchCaregivers();
        setToday(new Date().toISOString().split("T")[0]);
    }, []);

    const fetchCaregivers = async () => {
        const memberID = localStorage.getItem('mem_id');

        try {
            const response = await fetch('http://localhost:5000/API/searchCaregivers.php', {
                method: 'POST',
                headers: {'Content-type': 'application/json' },
                body: JSON.stringify({ member_id: memberID })
            });

            const result = await response.json();

            if (result.success){
                setCaregivers(result.caregivers);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (err) {
            console.error('Error: ', err);
            alert('An error ocurred while fetching caregivers.');
        }
    };

    const handleHire = async (caregiverId) => {
        const memberID = localStorage.getItem('mem_id'); 

        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        } else if (new Date(endDate) < new Date(startDate)) {
            alert('End date cannot be before start date.');
            return;
        }
    
        const formData = {
            member_id: memberID,
            caregiver_id: caregiverId,
            start_date: startDate,
            end_date: endDate,
            daily_hours: 8, 
            rate_per_hour: 30.00,
        };
    
        try {
            const response = await fetch('http://localhost:5000/API/hireCaregiver.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert('Caregiver hired successfully!');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while hiring the caregiver.');
        }
      };

    return (
        <div className="search-container">
            <h1>Available Caregivers</h1>
            <div className="date-picker-container">
                <label>
                    Start Date:<input type="date" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)}/>
                </label>
                <label>
                    End Date:<input type="date" value={endDate} min={startDate || today} onChange={(e) => setEndDate(e.target.value)}/>
                </label>
            </div>
            {caregivers.length > 0 ? (
                <div className="caregiver-grid">
                {caregivers.map((caregiver) => (
                    <div key={caregiver.member_id} className="caregiver-card">
                        <p><strong>Name:</strong> {caregiver.name}</p>
                        <p><strong>Phone:</strong> {caregiver.phone_number}</p>
                        <p><strong>Max Hours per Week:</strong> {caregiver.max_service_hours_per_week}</p>
                        <p><strong>Review Score:</strong> {caregiver.review_score}</p>
                        <button className="hire-button" onClick={() => handleHire(caregiver.member_id)}>Hire</button>
                    </div>
                ))}
                </div>
            ) : (
                <p className="empty-message">No caregivers available at the moment.</p>
            )}
        </div>
    );
}

export default Search;