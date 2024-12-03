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

        const date1 = new Date(startDate);
        const date2 = new Date(endDate);
        let timeDiff = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
        if (timeDiff > 7) {  //if the time is greater than 7, we're going to be eliminating hours in the next week instead of just this week
            timeDiff = 7;
        }

        const fData = {
            member_id: caregiverId
        }

        let RH = 99999;
        let DH = 99999;
        let balance = 0;

        try {
            const response = await fetch("http://localhost:5000/API/account.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(fData),
            });
      
            const result = await response.json();
            if (result.success) {
                RH = result.remainingHrs;
                DH = result.daily_hours;
                balance = result.balance;
                console.log("Care Status State:", result.careStatus);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching account data.");
        }
        
        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        } else if (new Date(endDate) < new Date(startDate)) {
            alert('End date cannot be before start date.');
            return;
        } else if (timeDiff * DH > RH) {
            alert('This caregiver does not have enough remaining hours per week. Please try another.');
            return;
        } else if (timeDiff * DH * 30 > balance) {
            alert('You do not have enough funds to hire this caregiver.');
            return;
        }
    
        const formData = {
            member_id: memberID,
            caregiver_id: caregiverId,
            start_date: startDate,
            end_date: endDate,
            daily_hours: DH, 
            rate_per_hour: 30.00,
            status: 'pending',
        };
    
        try {
            const response = await fetch('http://localhost:5000/API/hireCaregiver.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert('The Caregiver was sent this requirement!');
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
                        <p><strong>Remaining Hours per Week:</strong> {caregiver.remaining_hours}</p>
                        <p><strong>Daily Hours:</strong> {caregiver.daily_hours}</p>
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