DROP database IF EXISTS SimpleLiving;

Create database SimpleLiving;

use SimpleLiving;
CREATE TABLE House(
    HouseId INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(200) NOT NULL,
    Address VARCHAR(5000) not null,
    BulletinInfo VARCHAR(5000),
    PRIMARY KEY (HouseId)
);

use SimpleLiving;
insert into House (HouseId, Name, Address, BulletinInfo) values (1, 'Alexa', '157 Berkeley St, Boston, MA 02116', 'N/A');
   
use SimpleLiving;
create table User(
	UserId int not null auto_increment,
    HouseId int not null,
    Name varchar(200),
    VenmoId varchar(100),
    DeviceId varchar(100),
    ImageUrl varchar(500),
    DeviceToken varchar(100),
    PRIMARY KEY (UserId),
    
    FOREIGN KEY fk_house(HouseId)
	REFERENCES House(HouseId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT
);

use SimpleLiving;
insert into User (UserId, HouseId, Name, VenmoId, DeviceId) values (1, 1, 'Jessie Dahlquist', uuid(), uuid()); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId) values (2, 1, 'Kevin Tanner', uuid(), uuid()); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId) values (3, 1, 'Selam Yihun', uuid(), uuid()); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId) values (4, 1, 'John Griffin', uuid(), uuid()); 


use SimpleLiving;
create table List(
	ListId int not null auto_increment,
    HouseId int not null,
    Name varchar(200),
	PRIMARY KEY (ListID),
    
    FOREIGN KEY fk_house(HouseId)
	REFERENCES House(HouseId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT
);

use SimpleLiving;
insert into List (ListId, HouseId, Name) values (1, 1, 'Shopping List');
insert into List (ListId, HouseId, Name) values (2, 1, 'Chorus List');
insert into List (ListId, HouseId, Name) values (3, 1, 'Smart Stock List');
insert into List (ListId, HouseId, Name) values (4, 1, 'To Do List');

use SimpleLiving;
create table Item(
	ItemId int not null auto_increment,
    HouseId int not null,
    Name varchar(200),
    IsSmartStock boolean DEFAULT NULL,
    ListId int not null,
    Description varchar(500),
    SensorReading int(255),
    AmazonProductId varchar(20),
	PRIMARY KEY (ItemId),
    
    FOREIGN KEY fk_house(HouseId)
	REFERENCES House(HouseId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT,
    
	FOREIGN KEY fk_list(ListId)
	REFERENCES List(ListId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT    
);

use SimpleLiving;
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description) values (1, 1, 'Wash the dishes', false, 2, 'Chorus');
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description) values (2, 1, 'Dust the house', false, 2, 'Chorus');
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description) values (3, 1, 'Milk', false, 1, 'Milk');
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description) values (4, 1, 'Bacon', false, 1, 'Protein');
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description) values (5, 1, 'Cake', false, 1, 'Sweet');
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description, AmazonProductId) values (6, 1, 'Angel Soft 2 Ply Toilet Paper, 48 Double Bath Tissue', false, 3, 'Protein', 'B00FFJ2LXU');
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description, AmazonProductId) values (7, 1, 'Dial All Day Freshness Spring Water Bar Soap, 4 ounces 22 Bar', false, 3, 'Protein', 'B0077S7R8G');

use SimpleLiving;
create table Transaction(
	TransactionId int not null auto_increment,
    HouseId int not null,
    Date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Amount numeric(19,4),
    RecipientToId int not null,
    RecipientFromId int not null,
    TransactionGroupId int not null,
    ImageUrl varchar(500),
    Description varchar(500),
    Type varchar(500),
    PRIMARY KEY (TransactionId),
    
	FOREIGN KEY fk_house(HouseId)
	REFERENCES House(HouseId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT,
    
	FOREIGN KEY fk_user_to(RecipientToId)
	REFERENCES User(UserId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT,
    
	FOREIGN KEY fk_user_from(RecipientFromId)
	REFERENCES User(UserId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT    
);
