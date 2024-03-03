-- getting data from the table
select * from customer

-- inserting data into the tables
insert into customer values(2, 'Nkwa', 'Fintech');
insert into customer values(3, 'G2G', 'Entertainment');
insert into customer values(4, 'MyEazySchool', 'EduTech');
insert into customer values(5, 'FlutterWave', 'Fintech');
insert into customer values(6, 'MoMo', 'Fintech');

-- inserting multiple records at the same time
INSERT INTO customer VALUES 
(6, 'TechCorp', 'Technology'),
(7, 'DataSolutions', 'Data Analytics'),
(8, 'MedTech', 'Healthcare'),
(9, 'EduTech', 'Education'),
(10, 'CloudServices', 'Cloud Computing'),
(11, 'FinAnalytics', 'Financial Services'),
(12, 'RetailTech', 'Retail'),
(13, 'TravelTech', 'Travel'),
(14, 'AutoTech', 'Automotive'),
(15, 'AgriTech', 'Agriculture');

-- queries to get specific data
select name from customer where type='Fintech'

-- create another table

-- (CustomerID, CustomerName, ContactName, Address, City, PostalCode, Country)

create table customers(
    customerId int primary key,
    customerName varchar(30),
    contactName varchar(40),
    address varchar(30),
    city varchar(30),
    postalCode int,
    country varchar(55)
);

select * from customers

INSERT INTO customers (customerID, customerName, contactName, address, city, postalCode, country) VALUES
(1, 'AfricanTech', 'John Doe', '123 Main Street', 'Nairobi', '00100', 'Kenya'),
(2, 'Sahara Systems', 'Jane Smith', '456 Elm Avenue', 'Cairo', '1001', 'Egypt'),
(3, 'Savannah Solutions', 'Alice Johnson', '789 Oak Boulevard', 'Lagos', '10001', 'Nigeria'),
(4, 'Kilimanjaro Technologies', 'James Brown', '101 Pine Street', 'Dar es Salaam', '10010', 'Tanzania'),
(5, 'Cape Coast Computers', 'Emily Davis', '202 Maple Avenue', 'Accra', '20001', 'Ghana'),
(6, 'Kalahari Networks', 'Michael Wilson', '303 Cedar Street', 'Johannesburg', '20010', 'South Africa'),
(7, 'Sahel Services', 'Sarah Lee', '404 Birch Boulevard', 'Dakar', '30001', 'Senegal'),
(8, 'Nile Solutions', 'David Jones', '505 Palm Street', 'Khartoum', '30010', 'Sudan'),
(9, 'Victoria Valley Ventures', 'Rachel Miller', '606 Spruce Avenue', 'Kampala', '40001', 'Uganda'),
(10, 'Atlas Apps', 'Matthew Taylor', '707 Fir Street', 'Addis Ababa', '40010', 'Ethiopia'),
(11, 'Maghreb Microsystems', 'Olivia Martinez', '808 Cherry Boulevard', 'Algiers', '50001', 'Algeria'),
(12, 'Namibian Networks', 'Daniel Wilson', '909 Pineapple Place', 'Windhoek', '50010', 'Namibia'),
(13, 'Zambezi Systems', 'Emma Brown', '1010 Oakwood Lane', 'Lusaka', '60001', 'Zambia'),
(14, 'KongoTech', 'Noah Garcia', '1111 Elmwood Drive', 'Kinshasa', '60010', 'Democratic Republic of the Congo'),
(15, 'Gaborone IT Solutions', 'Sophia Thompson', '1212 Maplewood Avenue', 'Gaborone', '70001', 'Botswana'),
(16, 'Mozambican Innovations', 'Liam Robinson', '1313 Pineview Street', 'Maputo', '70010', 'Mozambique'),
(17, 'Harare Hardware', 'Ava White', '1414 Cedarwood Drive', 'Harare', '80001', 'Zimbabwe'),
(18, 'Malagasy Technologies', 'Logan Adams', '1515 Birchwood Road', 'Antananarivo', '80010', 'Madagascar'),
(19, 'Djibouti Data Solutions', 'Harper Thomas', '1616 Oakhill Avenue', 'Djibouti City', '90001', 'Djibouti'),
(20, 'Kinshasa Computers', 'Mia Hall', '1717 Elmwood Terrace', 'Brazzaville', '90010', 'Republic of the Congo');
insert into customers values (21, 'Dohtech Solutions', 'Nkwi Cyril', 'Opposite ENAMEN Pharmarcy', 'Buea', '10231', 'Cameroon');

-- select particlar records using the LIKE keyword and the % wildcard
-- '%' represents a sequence of characters

-- get records whose country starts with the letter S
select * from customers where country like 'S%'  

-- get a column only for country that starts with S
select customername from customers where country like 'S%'  


-- updating records in the table

update customers set country='Cameroon' where country like 'S%';
update customers set city='Buea' where country='Cameroon';
update customers set address='Opposite ENAMEN Pharmarcy' where country='Cameroon';

select * from customers ORDER BY customerId

-- deleting a record from a table

delete from customers where customerid=21

update customers set customername='Better Focus Tech' where city='Buea'