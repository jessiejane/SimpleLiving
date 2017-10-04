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
    HouseId int default null,
    Name varchar(200),
    VenmoId varchar(100),
    MasterVenmoToken varchar(100),
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
create table Config(
    DeviceToken varchar(100)
);

use SimpleLiving;
insert into Config (DeviceToken) values ('ba4ac0018e35d89f2547ac73048c98b5aa5e98e156ca13173241d52fcd4b3c67');

use SimpleLiving;
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken) values (1, 1, 'Jessie Dahlquist', 'Jessie-Dahlquist' , uuid(), 'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93'); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken) values (2, 1, 'Kevin Tanner', 'Kevin-Tanner-2' , uuid(), 'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93'); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken) values (3, 1, 'Selam Yihun', 'Selam-Yihun1' , uuid(),'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93'); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken) values (4, 1, 'John Griffin', 'jhgriffin' ,uuid(), 'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93'); 


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
    Quantity int default 0,
    ListId int not null,
    Description varchar(500),
    SensorReading int(255),
    AmazonProductUrl varchar(2000),
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
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description, AmazonProductUrl, Quantity) values (1, 1, 'Angel Soft 2 Ply Toilet Paper, 48 Double Bath Tissue', true, 3, 'Protein', 'https://www.amazon.com/gp/cart/aws-merge.html?cart-id=133-8971498-2032938&associate-id=123402bb-20&hmac=uztkD9ycMp52gsM%2FIqAIFA9rscQ%3D&SubscriptionId=AKIAJONRAXIF4HTX73DQ&MergeCart=False', 0);
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description, AmazonProductUrl, Quantity) values (2, 1, 'Bounty Paper Towel', true, 3, 'Protein', 'https://www.amazon.com/gp/cart/aws-merge.html?cart-id=142-8755991-1155408&associate-id=123402bb-20&hmac=K5u5oy8vE5aMRd5k0mZ5GpTtz2s%3D&SubscriptionId=AKIAJONRAXIF4HTX73DQ&MergeCart=False', 0);
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description, Quantity) values (3, 1, 'Milk', false, 1, 'Milk', 2);
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description, Quantity) values (4, 1, 'Bacon', false, 1, 'Protein', 3);
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description, Quantity) values (5, 1, 'Cake', false, 1, 'Sweet', 5);
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description) values (6, 1, 'Wash the dishes', false, 2, 'Chores');
insert into Item(ItemId, HouseId, Name, IsSmartStock, ListId, Description) values (7, 1, 'Dust the house', false, 2, 'Chores');

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

use SimpleLiving;
insert into Transaction(HouseId, Date, Amount, RecipientToId, RecipientFromId, TransactionGroupId, ImageUrl, Description, Type) 
values (1, '2017-10-04', 21, 1, 2, 2, 'www.google.com', 'description', 'type');