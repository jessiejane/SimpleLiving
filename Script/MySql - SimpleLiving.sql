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
create table User(
	UserId int not null auto_increment,
    HouseId int not null,
    Name varchar(200),
    VenmoId varchar(100),
    DeviceId varchar(100),
    ImageUrl varchar(500),
    PRIMARY KEY (UserId),
    
    FOREIGN KEY fk_house(HouseId)
	REFERENCES House(HouseId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT
);

use SimpleLiving;
create table List(
	ListID int not null auto_increment,
    HouseId int not null,
    Name varchar(200),
	PRIMARY KEY (ListID),
    
    FOREIGN KEY fk_house(HouseId)
	REFERENCES House(HouseId)
	ON UPDATE CASCADE
	ON DELETE RESTRICT
);

use SimpleLiving;
create table Item(
	ItemId int not null auto_increment,
    HouseId int not null,
    Name varchar(200),
    IsSmartStock boolean DEFAULT NULL,
    ListId int not null,
    Description varchar(500),
    SensorReading int(255),
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
