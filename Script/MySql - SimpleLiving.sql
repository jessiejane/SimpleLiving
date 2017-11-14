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
insert into House (HouseId, Name, Address, BulletinInfo) values (2, 'Snow white', '911 Dark Forest, Boston, MA 02116', 'N/A');
insert into House (HouseId, Name, Address, BulletinInfo) values (3, 'Packers', '1265 Lombardi Ave, Green Bay, WI 54304', 'N/A');

   
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
insert into Config (DeviceToken) values 
('ba4ac0018e35d89f2547ac73048c98b5aa5e98e156ca13173241d52fcd4b3c67'),
('d1be75f7142cef5e57ed94e1b76556e60e00c066843044f274cdd435f19437b0'),
('f82141ab76c2777e73fd89364f896f31b3c4c49473e191ea9eeb1c18d53f7624'),
('b035559116ecdf602644e27058f35d9034bc63285b8db25ecc09f4f22d2baf20'),
('6092b35428f94f645955d9aa1f8af56755786b6880837f9a9b977b1dc75ac7a9');

use SimpleLiving;
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken, ImageUrl) values (1, 1, 'Jessie Dahlquist', 'Jessie-Dahlquist' , uuid(), 'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93', "https://github.com/jessiejane/SimpleLiving/blob/master/App/simpleliving/src/assets/img/joeyIcon1.jpg?raw=true"); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken, ImageUrl) values (2, 1, 'Kevin Tanner', 'Kevin-Tanner-2' , uuid(), 'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93', "https://raw.githubusercontent.com/jessiejane/SimpleLiving/master/App/simpleliving/src/assets/img/monicaIcon1.jpg"); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken, ImageUrl) values (3, 1, 'Selam Yihun', 'Selam-Yihun1' , uuid(),'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93', "https://raw.githubusercontent.com/jessiejane/SimpleLiving/master/App/simpleliving/src/assets/img/phoebeIcon1.jpg"); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken, ImageUrl) values (4, 1, 'John Griffin', 'jhgriffin' ,uuid(), 'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93', "https://raw.githubusercontent.com/jessiejane/SimpleLiving/master/App/simpleliving/src/assets/img/rossIcon1.jpg"); 

insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken, ImageUrl) values (5, 2, 'Joe Young', 'Kevin-Tanner-2' , uuid(), 'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93', "https://raw.githubusercontent.com/jessiejane/SimpleLiving/master/App/simpleliving/src/assets/img/monicaIcon1.jpg"); 
insert into User (UserId, HouseId, Name, VenmoId, DeviceId, MasterVenmoToken, ImageUrl) values (6, 2, 'Boston Lue', 'Selam-Yihun1' , uuid(),'e5a0c532f1e23bfb4fa5850a36919440a3188745738d05410f0b4f7043effc93', "https://www.shareicon.net/data/128x128/2015/09/20/104335_avatar_512x512.png"); 

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
insert into List (ListId, HouseId, Name) values (2, 1, 'Chores  List');
insert into List (ListId, HouseId, Name) values (3, 1, 'Smart Stock List');
insert into List (ListId, HouseId, Name) values (6, 1, 'Events');

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
insert into Item(HouseId, Name, IsSmartStock, ListId, Description, AmazonProductUrl, Quantity) values (1, 'Angel Soft 2 Ply Toilet Paper', true, 3, 'Protein', 'https://www.amazon.com/gp/cart/aws-merge.html?cart-id=133-8971498-2032938&associate-id=123402bb-20&hmac=uztkD9ycMp52gsM%2FIqAIFA9rscQ%3D&SubscriptionId=AKIAJONRAXIF4HTX73DQ&MergeCart=False', 1);

insert into Item(HouseId, Name, IsSmartStock, ListId, Description, Quantity) values (1, 'Milk', false, 1, 'Dairy', 2);
insert into Item(HouseId, Name, IsSmartStock, ListId, Description, Quantity) values (1, 'Bacon', false, 1, 'Deli', 3);
insert into Item(HouseId, Name, IsSmartStock, ListId, Description, Quantity) values (1, 'Cake', false, 1, 'Bakery', 1);
insert into Item(HouseId, Name, IsSmartStock, ListId, Description) values (1, 'Wash the dishes', false, 2, 'Chores');
insert into Item(HouseId, Name, IsSmartStock, ListId, Description) values (1, 'Dust the house', false, 2, 'Chores');
insert into Item(HouseId, Name, IsSmartStock, ListId, Description) values (1, 'Take the trash out', false, 2, 'Chores');
insert into Item(HouseId, Name, IsSmartStock, ListId, Description) values (1, 'Clean the bathroom', false, 2, 'Chores');
insert into Item(HouseId, Name, IsSmartStock, ListId, Description) values (1, 'Rake the leaves', false, 2, 'Chores');

insert into Item(HouseId, Name, IsSmartStock, ListId, Description) values (1, 'Halloween Party', false, 6, 'Events');
insert into Item(HouseId, Name, IsSmartStock, ListId, Description) values (1, 'Selam''s friend crashing Nov 18-21', false, 6, 'Events');
insert into Item(HouseId, Name, IsSmartStock, ListId, Description) values (1, 'Friendsgiving', false, 6, 'Events');

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
values (1, '2017-10-04', 21, 1, 2, 2, 'www.google.com', 'Milk shot', 'type');