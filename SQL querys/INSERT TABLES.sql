USE CaregiverWebsite;

INSERT INTO Members (name, password, address, phone_number, max_service_hours_per_week, care_money_balance, parent_info) 
VALUES 
('Alice Johnson', 'hashed_password_1', '123 Main St, Cityville', '123-456-7890', 20, 2000.00, 'Lives with dementia, requires assistance with daily activities'),
('Bob Smith', 'hashed_password_2', '456 Oak Ave, Townsville', '987-654-3210', 15, 2000.00, 'Has limited mobility, needs assistance with walking and cooking');

INSERT INTO CaregiverAccount (member_id, balance, review_score)
VALUES 
(1, 3000.00, 4.5),
(2, 1500.00, 4.0);

INSERT INTO Contracts (member_id, caregiver_id, start_date, end_date, daily_hours, rate_per_hour) 
VALUES 
(1, 2, '2024-11-01', '2024-11-30', 3, 30.00),
(2, 1, '2024-12-01', '2024-12-15', 2, 30.00);

INSERT INTO Ratings (contract_id, score, review_text) 
VALUES 
(1, 5, 'Excellent caregiver! Very attentive and kind.'),
(2, 4, 'Good service, but occasionally late.');

INSERT INTO Transactions (account_id, amount, transaction_date, description) 
VALUES 
(1, 300.00, '2024-11-02 10:00:00', 'Received payment for caregiving services'),
(2, -150.00, '2024-12-02 14:00:00', 'Paid caregiver for services');

UPDATE Members SET email = "alicejohnson@gmail.com" WHERE member_id = 1;
UPDATE Members SET email = "bobsmith@gmail.com" WHERE member_id = 2;
