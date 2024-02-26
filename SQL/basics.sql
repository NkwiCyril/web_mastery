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

