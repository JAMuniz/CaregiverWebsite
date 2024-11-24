USE CaregiverWebsite;

-- Members table to store user information
CREATE TABLE Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(15),
    max_service_hours_per_week INT,
    care_money_balance DECIMAL(10, 2) DEFAULT 2000.00,
    parent_info TEXT
);

-- Caregiver Account table for managing caregiver accounts
CREATE TABLE CaregiverAccount (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    review_score DECIMAL(3, 2),
    FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

-- Contracts table for service agreements between members
CREATE TABLE Contracts (
    contract_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,             -- hiring member
    caregiver_id INT,          -- member providing care
    start_date DATE,
    end_date DATE,
    daily_hours INT,
    rate_per_hour DECIMAL(5, 2) DEFAULT 30.00,
    FOREIGN KEY (member_id) REFERENCES Members(member_id),
    FOREIGN KEY (caregiver_id) REFERENCES Members(member_id)
);

-- Ratings table for storing caregiver ratings
CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT,
    score INT CHECK (score BETWEEN 1 AND 5),
    review_text TEXT,
    FOREIGN KEY (contract_id) REFERENCES Contracts(contract_id)
);

-- Transactions table for tracking Care Dollar usage
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    amount DECIMAL(10, 2),
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(255),
    FOREIGN KEY (account_id) REFERENCES CaregiverAccount(account_id)
);

-- Add foreign key to reference Member
ALTER TABLE Ratings
ADD COLUMN member_id INT,
ADD FOREIGN KEY (member_id) REFERENCES Members(member_id);

-- Add email field to Member login/info
ALTER TABLE Members
ADD email VARCHAR(255) NOT NULL;