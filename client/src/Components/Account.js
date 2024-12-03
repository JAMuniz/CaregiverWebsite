import React, { useState, /*useEffect, */useContext } from 'react';
import UserContext from '../Components/UserContext';
import '../css/account.css';


function Account({ memberID }) {
  const [isEditing, setIsEditing] = useState(false);
  const [balance, setBalance] = useState('');
  const [rating, setRating] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone] = useState('');
  const [maxHours, setmaxHours] = useState('');
  const [parentInfo, setPinfo] = useState('');
  const [email, setEmail] = useState('');
  const [careStatus, setCareStatus] = useState('');
  const [newCareStatus, setNewCareStatus] = useState('');
  const { name, updateName } = useContext(UserContext);
  const [dailyHours, setDailyHours] = useState('');

  const formatPhoneNumber = (value) => {
        const numericValue = value.replace(/\D/g, '');

        if (numericValue.length <= 3) {
            return numericValue;
        } else if (numericValue.length <= 6) {
            return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
        } else {
            return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
        }
  };

  /*
  useEffect(() => {
    fetchAccountData();
  });
  */

  const fetchAccountData = async () => {
    const formData = { member_id: memberID };

    try {
      const response = await fetch("http://localhost:5000/API/account.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
            setBalance(result.balance);
            setRating(result.review_score);
            setAddress(result.address);
            setPhone(result.phone_number);
            setmaxHours(result.max_service_hours_per_week);
            setPinfo(result.parent_info);
            setEmail(result.email);
            updateName(result.name);
            setDailyHours(result.daily_hours);
            setCareStatus(result.careStatus || "");
            console.log("Care Status State:", result.careStatus);
      } else {
            alert(`Error: ${result.message}`);
      }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching account data.");
    }
  };
  fetchAccountData();

  const handleSave = async () => {
    const formData = {
        name: name,
        member_id: memberID,
        address: address,
        phone_number: phone_number,
        max_service_hours_per_week: maxHours,
        daily_hours: dailyHours,
        parent_info: parentInfo,
        email: email,
        careStatus: newCareStatus,
    };

    try {
      const response = await fetch("http://localhost:5000/API/updateInfo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Information updated successfully!");
        setIsEditing(false);
        fetchAccountData();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating information.");
    }
  };

  return (
    <div>
      <button className="Update-button" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Update Info"}
      </button>
      {isEditing ? (
        <div className="account-container">
          <h1>Edit Account Info</h1>
          <label className="edit-form label">Name:<input type="text" value={name} onChange={(e) => updateName(e.target.value)} /></label>
          <label className="edit-form label">Address:<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></label>
          <label className="edit-form label">Phone Number:<input type="text" value={phone_number} onChange={(e) => setPhone(formatPhoneNumber(e.target.value))} /></label>
          <label className="edit-form label">Max Hours Per Week:<input type="number" value={maxHours} onChange={(e) => setmaxHours(e.target.value)} /></label>
          <label className="edit-form label">Daily Hours:<input type="number" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} /></label>
          <label className="edit-form label">Parent Info:<input type="text" value={parentInfo} onChange={(e) => setPinfo(e.target.value)} /></label>
          <label className="edit-form input">Email:<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="edit-form input">
            Caregiver Status:
            <select value={newCareStatus} onChange={(e) => setNewCareStatus(e.target.value)}>
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="terminated">Terminate</option>
            </select>
          </label>
          <button className="save-button" onClick={handleSave}>Save Changes</button>
        </div>
      ) : (
        <div>
          <h1>Account Info</h1>
            <p><strong>Balance: </strong>C${balance}</p>
            <p><strong>Review Score: </strong>{rating}</p>
            <p><strong>Max Hours Per Week: </strong>{maxHours}</p>
            <p><strong>Daily Hours: </strong>{dailyHours}</p>
            <p><strong>Caregiver Status: </strong>{careStatus}</p>
            <br />
          <h1>Profile Info</h1>
            <p><strong>Name: </strong>{name}</p>
            <p><strong>Email: </strong>{email}</p>
            <p><strong>Address: </strong>{address}</p>
            <p><strong>Phone Number: </strong>{formatPhoneNumber(phone_number)}</p>
            <p><strong>Parent Info: </strong>{parentInfo}</p>
            <br />
        </div>
      )}
    </div>
  );
}

export default Account;
