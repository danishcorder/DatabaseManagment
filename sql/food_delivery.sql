-- ===========================================
-- Food Delivery Management System Database
-- Database Management Systems Academic Project
-- ===========================================
-- Project Team: Computer Science Students
-- Supervisor: Dr. Jennifer Thompson
-- Date: January 2026
-- ===========================================

-- ===========================================
-- DATABASE CREATION
-- ===========================================

-- Create the Food Delivery Database
CREATE DATABASE FoodDeliveryDBMS;

-- Use the created database
USE FoodDeliveryDBMS;

-- ===========================================
-- TABLE CREATION STATEMENTS
-- ===========================================

-- Customer Table
-- Stores basic information about customers
CREATE TABLE Customer (
    -- Primary Key: Unique identifier for each customer
    CustomerID VARCHAR(10) PRIMARY KEY,

    -- Customer's full name
    CustomerName VARCHAR(100) NOT NULL
);

-- CustomerPhone Table
-- Stores multiple phone numbers for each customer (weak entity)
CREATE TABLE CustomerPhone (
    -- Foreign Key + Primary Key: References Customer table
    CustomerID VARCHAR(10),

    -- Primary Key: Phone number (part of composite key)
    PhoneNumber VARCHAR(15),

    -- Composite Primary Key constraint
    PRIMARY KEY (CustomerID, PhoneNumber),

    -- Foreign Key constraint
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Restaurant Table
-- Contains information about restaurants participating in the delivery service
CREATE TABLE Restaurant (
    -- Primary Key: Unique identifier for each restaurant
    RestaurantID VARCHAR(10) PRIMARY KEY,

    -- Restaurant name
    RestaurantName VARCHAR(100) NOT NULL,

    -- Restaurant location/area
    Location VARCHAR(100) NOT NULL,

    -- Contact phone number
    ContactNumber VARCHAR(15) NOT NULL
);

-- Rider Table
-- Stores information about delivery riders and their vehicles
CREATE TABLE Rider (
    -- Primary Key: Unique identifier for each rider
    RiderID VARCHAR(10) PRIMARY KEY,

    -- Rider's full name
    RiderName VARCHAR(100) NOT NULL,

    -- Contact phone number
    ContactNumber VARCHAR(15) NOT NULL,

    -- Type of vehicle used for delivery
    VehicleType VARCHAR(20) NOT NULL
);

-- Orders Table
-- Main table storing order information with foreign key relationships
CREATE TABLE Orders (
    -- Primary Key: Unique identifier for each order
    OrderID VARCHAR(10) PRIMARY KEY,

    -- Foreign Key: References Customer table
    CustomerID VARCHAR(10) NOT NULL,

    -- Foreign Key: References Restaurant table
    RestaurantID VARCHAR(10) NOT NULL,

    -- Foreign Key: References Rider table
    RiderID VARCHAR(10) NOT NULL,

    -- Date when order was placed
    OrderDate DATE NOT NULL,

    -- Total amount for the order
    TotalAmount DECIMAL(10,2) NOT NULL,

    -- Foreign Key constraints
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (RiderID) REFERENCES Rider(RiderID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Food Table
-- Contains information about individual food items available for order
CREATE TABLE Food (
    -- Primary Key: Unique identifier for each food item
    FoodID VARCHAR(10) PRIMARY KEY,

    -- Name of the food item
    FoodName VARCHAR(100) NOT NULL,

    -- Description of the food item
    Description VARCHAR(255),

    -- Price per unit
    Price DECIMAL(8,2) NOT NULL
);

-- OrderFood Table
-- Junction table for many-to-many relationship between Orders and Food
CREATE TABLE OrderFood (
    -- Foreign Key + Primary Key: References Orders table
    OrderID VARCHAR(10),

    -- Foreign Key + Primary Key: References Food table
    FoodID VARCHAR(10),

    -- Quantity of this food item in the order
    Quantity INT NOT NULL CHECK (Quantity > 0),

    -- Composite Primary Key
    PRIMARY KEY (OrderID, FoodID),

    -- Foreign Key constraints
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (FoodID) REFERENCES Food(FoodID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Payment Table
-- Records payment transactions for completed orders
CREATE TABLE Payment (
    -- Primary Key: Unique identifier for each payment
    PaymentID VARCHAR(10) PRIMARY KEY,

    -- Foreign Key: References Orders table
    OrderID VARCHAR(10) NOT NULL UNIQUE,

    -- Payment method used
    PaymentMethod VARCHAR(20) NOT NULL,

    -- Payment amount
    Amount DECIMAL(10,2) NOT NULL,

    -- Date when payment was made
    PaymentDate DATE NOT NULL,

    -- Foreign Key constraint with UNIQUE to ensure 1:1 relationship
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ===========================================
-- SAMPLE DATA INSERTION
-- ===========================================

-- Insert Customers
INSERT INTO Customer (CustomerID, CustomerName) VALUES
('C001', 'John Smith'),
('C002', 'Mary Johnson');

-- Insert Customer Phone Numbers
INSERT INTO CustomerPhone (CustomerID, PhoneNumber) VALUES
('C001', '555-1234'),
('C001', '555-5678'),
('C002', '555-9012');

-- Insert Restaurants
INSERT INTO Restaurant (RestaurantID, RestaurantName, Location, ContactNumber) VALUES
('R001', 'Domino\'s Pizza', 'Downtown', '555-1111'),
('R002', 'McDonald\'s', 'Mall', '555-2222'),
('R003', 'Sushi Express', 'City Center', '555-3333');

-- Insert Riders
INSERT INTO Rider (RiderID, RiderName, ContactNumber, VehicleType) VALUES
('RD001', 'Alex Rider', '555-4444', 'Motorcycle'),
('RD002', 'Sarah Wilson', '555-5555', 'Bicycle'),
('RD003', 'Mike Chen', '555-6666', 'Car');

-- Insert Orders (referencing existing customers, restaurants, and riders)
INSERT INTO Orders (OrderID, CustomerID, RestaurantID, RiderID, OrderDate, TotalAmount) VALUES
('O001', 'C001', 'R001', 'RD001', '2026-01-15', 25.99),
('O002', 'C001', 'R002', 'RD002', '2026-01-15', 15.50),
('O003', 'C002', 'R003', 'RD003', '2026-01-15', 32.75);

-- Insert Food Items
INSERT INTO Food (FoodID, FoodName, Description, Price) VALUES
('F001', 'Margherita Pizza', 'Classic pizza with tomato sauce and mozzarella', 15.99),
('F002', 'Coca Cola', 'Carbonated soft drink', 2.50),
('F003', 'Big Mac', 'Iconic hamburger with special sauce', 8.99),
('F004', 'French Fries', 'Golden crispy fries', 3.99),
('F005', 'California Roll', 'Crab and avocado sushi roll', 12.99),
('F006', 'Green Tea', 'Traditional Japanese green tea', 3.50);

-- Insert Order-Food relationships (junction table)
INSERT INTO OrderFood (OrderID, FoodID, Quantity) VALUES
('O001', 'F001', 1),
('O001', 'F002', 2),
('O002', 'F003', 1),
('O002', 'F004', 1),
('O003', 'F005', 1),
('O003', 'F006', 2);

-- Insert Payment records
INSERT INTO Payment (PaymentID, OrderID, PaymentMethod, Amount, PaymentDate) VALUES
('P001', 'O001', 'Credit Card', 25.99, '2026-01-15'),
('P002', 'O002', 'Debit Card', 15.50, '2026-01-15'),
('P003', 'O003', 'Credit Card', 32.75, '2026-01-15');

-- ===========================================
-- SAMPLE QUERY EXAMPLES
-- ===========================================

-- Example 1: Get Customer Order History
-- Retrieve all orders for a specific customer with restaurant and rider details
SELECT
    o.OrderID,
    o.OrderDate,
    o.TotalAmount,
    r.RestaurantName,
    rd.RiderName
FROM Orders o
JOIN Restaurant r ON o.RestaurantID = r.RestaurantID
JOIN Rider rd ON o.RiderID = rd.RiderID
WHERE o.CustomerID = 'C001';

-- Example 2: Revenue Analysis by Restaurant
-- Calculate total revenue for each restaurant
SELECT
    r.RestaurantName,
    COUNT(o.OrderID) AS TotalOrders,
    SUM(o.TotalAmount) AS TotalRevenue
FROM Restaurant r
LEFT JOIN Orders o ON r.RestaurantID = o.RestaurantID
GROUP BY r.RestaurantID, r.RestaurantName;

-- Example 3: Get Order Details with Food Items
-- Show complete order information including all food items
SELECT
    o.OrderID,
    c.CustomerName,
    r.RestaurantName,
    rd.RiderName,
    f.FoodName,
    of.Quantity,
    f.Price,
    (of.Quantity * f.Price) AS ItemTotal
FROM Orders o
JOIN Customer c ON o.CustomerID = c.CustomerID
JOIN Restaurant r ON o.RestaurantID = r.RestaurantID
JOIN Rider rd ON o.RiderID = rd.RiderID
JOIN OrderFood of ON o.OrderID = of.OrderID
JOIN Food f ON of.FoodID = f.FoodID
ORDER BY o.OrderID, f.FoodName;

-- Example 4: Rider Performance Analysis
-- Show rider statistics including number of deliveries and total amount
SELECT
    rd.RiderName,
    rd.VehicleType,
    COUNT(o.OrderID) AS TotalDeliveries,
    SUM(o.TotalAmount) AS TotalAmountDelivered,
    AVG(o.TotalAmount) AS AverageOrderValue
FROM Rider rd
LEFT JOIN Orders o ON rd.RiderID = o.RiderID
GROUP BY rd.RiderID, rd.RiderName, rd.VehicleType;

-- Example 5: Popular Food Items
-- Find most ordered food items
SELECT
    f.FoodName,
    f.Description,
    f.Price,
    SUM(of.Quantity) AS TotalQuantityOrdered,
    COUNT(DISTINCT of.OrderID) AS OrdersContainingItem
FROM Food f
LEFT JOIN OrderFood of ON f.FoodID = of.FoodID
GROUP BY f.FoodID, f.FoodName, f.Description, f.Price
ORDER BY TotalQuantityOrdered DESC;

-- Example 6: Customer Payment History
-- Show payment history for all customers
SELECT
    c.CustomerName,
    o.OrderID,
    p.PaymentMethod,
    p.Amount,
    p.PaymentDate
FROM Customer c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN Payment p ON o.OrderID = p.OrderID
ORDER BY c.CustomerName, p.PaymentDate DESC;

-- ===========================================
-- DATABASE VERIFICATION QUERIES
-- ===========================================

-- Verify table creation and constraints
SHOW TABLES;

-- Check table structures
DESCRIBE Customer;
DESCRIBE CustomerPhone;
DESCRIBE Restaurant;
DESCRIBE Rider;
DESCRIBE Orders;
DESCRIBE Food;
DESCRIBE OrderFood;
DESCRIBE Payment;

-- Verify referential integrity
SELECT
    'Customer-Orders' AS Relationship,
    COUNT(*) AS Records
FROM Customer c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
UNION ALL
SELECT
    'Restaurant-Orders' AS Relationship,
    COUNT(*) AS Records
FROM Restaurant r
LEFT JOIN Orders o ON r.RestaurantID = o.RestaurantID
UNION ALL
SELECT
    'Rider-Orders' AS Relationship,
    COUNT(*) AS Records
FROM Rider rd
LEFT JOIN Orders o ON rd.RiderID = o.RiderID;

-- ===========================================
-- DATABASE STATISTICS
-- ===========================================

-- Show database summary
SELECT
    'Total Customers' AS Metric,
    COUNT(*) AS Value
FROM Customer
UNION ALL
SELECT
    'Total Restaurants' AS Metric,
    COUNT(*) AS Value
FROM Restaurant
UNION ALL
SELECT
    'Total Riders' AS Metric,
    COUNT(*) AS Value
FROM Rider
UNION ALL
SELECT
    'Total Orders' AS Metric,
    COUNT(*) AS Value
FROM Orders
UNION ALL
SELECT
    'Total Food Items' AS Metric,
    COUNT(*) AS Value
FROM Food
UNION ALL
SELECT
    'Total Payments' AS Metric,
    COUNT(*) AS Value
FROM Payment;

-- ===========================================
-- END OF SQL SCRIPT
-- ===========================================
-- This script creates a complete, normalized database
-- for a Food Delivery Management System with proper
-- constraints, relationships, and sample data.
--
-- Academic Project - Database Management Systems Course
-- Computer Science Department - 2026
