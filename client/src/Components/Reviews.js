/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

function Reviews({memberID}){
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState('');

    useEffect(() => {
        fetchAccountData();
      },[]);
    
      const fetchAccountData = async () => {
        const formData = { member_id: memberID };
    
        try {
          const ratingsResponse = await fetch("http://localhost:5000/API/getReviews.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          const ratingsResult = await ratingsResponse.json();
          if (ratingsResult.success) {
            setRatings(ratingsResult.ratings);
            setAverageRating(ratingsResult.average_score);
          } else {
            alert(`Error fetching reviews: ${ratingsResult.message}`);
          }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching account data.");
        }
      };

      return (
        <div>
             
              <h1>Recent Reviews</h1>
              <p><strong>Average Rating:</strong> {averageRating}</p>
              {ratings.length > 0 ? (
                <ul>
                  {ratings.map((rating, index) => (
                    <li key={index}>
                      <p><strong>Score:</strong> {rating.score}</p>
                      <p><strong>Message:</strong> {rating.review_text || "No message provided"}</p>
                      <p><strong>Contract ID:</strong> {rating.contract_id}</p>
                      <hr />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}
        </div>
      );
}

export default Reviews;