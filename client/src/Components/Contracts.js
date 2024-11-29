import React, { useEffect, useState } from 'react';
import '../css/contracts.css';


function Contracts({ memberID }) {
    const [hiringContracts, setHiringContracts] = useState([]);
    const [caregiverContracts, setCaregiverContracts] = useState([]);

    useEffect(() => {
        fetchContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchContracts = async () => {
        const formData = { member_id: memberID };

        try {
            const response = await fetch('http://localhost:5000/API/contracts.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setHiringContracts(result.hiring_contracts);
                setCaregiverContracts(result.caregiver_contracts);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching contracts.');
        }
    };

    const terminateContract = async (contract_id) => {
        if (!window.confirm('Are you sure you want to terminate this contract?')) {
          return;
        }
    
        const formData = { contract_id };
    
        try {
          const response = await fetch('http://localhost:5000/API/terminateContract.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
    
          if (result.success) {
            alert('Contract terminated successfully!');
            fetchContracts();
          } else {
            alert(`Error: ${result.message}`);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while terminating the contract.');
        }
      };

    return (
        <div className="contracts-container">
            <div className="hiring-contracts">
                <h1>Hiring Contracts</h1>
                {hiringContracts.length > 0 ? (
                    hiringContracts.map((contract) => (
                        <div key={contract.contract_id} className="contract-card">
                            <p><strong>Contract ID:</strong> {contract.contract_id}</p>
                            <p><strong>Caregiver Name:</strong> {contract.caregiver_name}</p>
                            <p><strong>Start Date:</strong> {contract.start_date}</p>
                            <p><strong>End Date:</strong> {contract.end_date}</p>
                            <p><strong>Daily Hours:</strong> {contract.daily_hours}</p>
                            <p><strong>Rate per Hour:</strong> {contract.rate_per_hour}</p>
                            <button className="terminate-button" onClick={() => terminateContract(contract.contract_id)}>Terminate Contract</button>
                        </div>
                    ))
                ) : (
                    <p className="empty-message">No hiring contracts found.</p>
                )}
            </div>
            <div className="caregiver-contracts">
                <h1>Caregiver Contracts</h1>
                {caregiverContracts.length > 0 ? (
                    caregiverContracts.map((contract) => (
                        <div key={contract.contract_id} className="contract-card">
                            <p><strong>Contract ID:</strong> {contract.contract_id}</p>
                            <p><strong>Hiring Member ID:</strong> {contract.member_id}</p>
                            <p><strong>Start Date:</strong> {contract.start_date}</p>
                            <p><strong>End Date:</strong> {contract.end_date}</p>
                            <p><strong>Daily Hours:</strong> {contract.daily_hours}</p>
                            <p><strong>Rate per Hour:</strong> {contract.rate_per_hour}</p>
                            <button className="terminate-button" onClick={() => terminateContract(contract.contract_id)}>Terminate Contract</button>
                        </div>
                    ))
                ) : (
                    <p className="empty-message">No caregiver contracts found.</p>
                )}
            </div>
        </div>
    );
  
}

export default Contracts;
