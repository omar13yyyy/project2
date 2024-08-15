BEGIN;
--TODO : update ERD
DROP TABLE IF EXISTS public.users,public.confirmation,public."previousCampaigns",public."aboutUs",
public."aboutUs",public.ads,public.ads,public.request,public.campaigns,public."enteredForm",
public."documentImage",public."requestDonation",public."campaignDonation",public."fundDonation",
public."teamType",public.document,public.team,public."teamMember",public."sendTeam",public.fund,
public.form,public."allotmentFund",public."allotmentStore",public."storeCategory",
public."storeSubCategory",public."storeItem",public."requestBuying",public.complaint,
public."storeLog",public."fundLog",public.role,public.permisions,public."rolePermission","campaignBuying"
,
public.admin,public.wallets,public.transactions;
--CHANGELOG : in Request table change column name : status -> status

CREATE TABLE IF NOT EXISTS public.wallets (
    WalletID serial,
    amountwallet integer,
    createtDate timestamp,
    "idKey" TEXT
);




CREATE TABLE IF NOT EXISTS public.wallets (
    WalletID serial,
    amountwallet integer,
    createtDate timestamp,
    "idKey" TEXT
);
CREATE TABLE IF NOT EXISTS public.transactions (
  TransactionID SERIAL NOT NULL,
  IsIncoming integer NOT NULL,
  WalletID integer NOT NULL,

  TransactionDate timestamp NOT NULL,
  Quantity integer NOT NULL,
 "createDate" timestamp,

  PRIMARY KEY (TransactionID)
);
CREATE TABLE IF NOT EXISTS public.users
(
    id serial,
    "idKey" text,
    name text,
    email text,
    password text,
    "number" text,
    address text,
    date timestamp,
    "createDate" timestamp,
    comf boolean DEFAULT false ,
    PRIMARY KEY ("idKey")
);


CREATE TABLE IF NOT EXISTS public.confirmation
(
    email text,
    code text,
    "createDate" timestamp,
    PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS public."previousCampaigns"
(
    id serial,
    title text,
    description text,
    imageUrl text,
    "isDisable" boolean DEFAULT false ,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."aboutUs"
(   id serial,
    "imageUrl" text,
    text1 text,
    text2 text,
    text3 text,
    text4 text,
    text5 text,
    "contactUs" text,
        PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS public.ads
(
    id serial,
    title text,
    description text,
    "imageUrl" text,
    "isDisable" boolean DEFAULT false ,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.request
(
    --ADD TO NEW PROJECT
    id serial,
    userId integer,
    title text,
    description1 text,
    priority integer DEFAULT 0 ,
    status integer DEFAULT 0, 
    rejectedReason text  ,
    description2 text,
    "createDate" timestamp,
    work text,
    PRIMARY KEY (id)
);
comment on column request.status is 'the order is : isTeamDate(0),isVisited(1),isShow(2),isAllotment(3),isReceptionist(4),isDelivered(5),isRejected(6),isCanceled(7)';


CREATE TABLE IF NOT EXISTS public.campaigns
(
    id serial,
    title text,
    "imageUrl" text,
    budget integer,
    "targetGroup" text,
    reason text,
    description text,
    minimumDonation integer,
    isFinish boolean DEFAULT false ,
    isDisable boolean DEFAULT false ,
    isAllotment boolean DEFAULT false ,

    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."enteredForm"
(
    id serial,
    "requestId" integer,
    "formItemId" integer,
    answer text,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."documentImage"
(
    id serial,
    "imageUrl" text,
    "requestId" integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."requestDonation"
(
    id serial,
    "requestId" integer,
    userIdKey integer,
    count integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."campaignDonation"
(
    id serial,
    "campaignId" integer,
    userIdKey text,
    count integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."fundDonation"
(
    id serial,
    userIdKey integer,
    count integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."teamType"
(
    id serial,
    title text,
    isDisable boolean DEFAULT false ,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.document
(
    id serial,
    "typeId" integer,
    item text,
    "isDisable" boolean DEFAULT false ,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.team
(
    id serial,
    "typeId" integer,
    title text,
    "isDisable" boolean DEFAULT false ,
    adminId integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."teamMember"
(
    id serial,
    "teamId" integer,
    name text,
    "isDisable" boolean DEFAULT false ,

    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."sendTeam"
(
    id serial,
    "teamId" integer,
    requestid integer,
    done boolean DEFAULT false ,
appointmentaccepted boolean DEFAULT false,
    "dayDate" timestamp,
    "dateInteger" integer,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS public."Dates"
(
    id serial,
    "dayDate" timestamp,
    
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS public.fund
(   
    id serial,
    count integer
);

CREATE TABLE IF NOT EXISTS public.form
(
    id serial,
    "typeId" integer,
    "isDisable" boolean DEFAULT false ,

    title text,
    "createDate" timestamp,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."allotmentFund"
(
    id serial,
    "requestId" integer,
    count integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."allotmentStore"
(
    id serial,
    "requestId" integer,
    "itemId" integer,
    count integer,
    "createDate" timestamp,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."storeCategory"
(
    id serial,
    title text,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."storeSubCategory"
(
    id serial,
    "categoryId" integer,
    title text,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."storeItem"
(
    id serial,
    "subCategoryId" integer,
    title text,
    count integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."requestBuying"
(
    id serial,
    requestId integer,
    imageUrl text,
    cost integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."campaignBuying"
(
    id serial,
    campaignId integer,
    imageUrl text,
    cost integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.complaint
(
    id serial,
    "userId" integer,
    complaint text,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."storeLog"
(
    id serial,
    "itemId" integer,
    state integer,
    count integer,
    userIdKey Text,

    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."fundLog"
(
    id serial,
    count integer,
    state integer,
    userIdKey Text,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.role
(
    id serial,
    title text,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.permisions
(
    id serial,
    title text,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

--TODO : make (roleId-permissionId) unique

CREATE TABLE IF NOT EXISTS public."rolePermission"
(
    id serial,
    "roleId" integer,
    "permissionId" integer,
    "createDate" timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.admin
(
    id serial,
    email text,
    "roleId" integer,
    name text,
    password text,
    "createDate" timestamp,
    PRIMARY KEY (email)
);


--Create Functions............
Drop FUNCTION IF EXISTS requestDelete;

CREATE FUNCTION requestDelete(idRPar integer,userIdP integer) RETURNs boolean AS
$BODY$
	
DECLARE statusVar integer ;
DECLARE userRId integer ;

BEGIN
	
SELECT status into statusVar  From request where id =idRPar;
SELECT userId into userRId From request where id =idRPar;

if ( userIdP = userRId ) then

if (statusVar % 2 =1) then

	statusVar=statusVar - 1;
     DELETE FROM "sendTeam" WHERE requestid = idRPar;
end if;
if ((statusVar / 2) % 2) = 1 then
	statusVar=statusVar - 2;
end if;
if ((statusVar / 4) % 2) = 1 then
	statusVar=statusVar - 4;
end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 8;
	return false ;
end if;
if ((statusVar / 16) % 2) = 1 then
	statusVar=statusVar - 16;
end if;
if ((statusVar / 32) % 2) = 1 then
	statusVar=statusVar - 32;
end if;
if ((statusVar / 64) % 2) = 1 then
	statusVar=statusVar - 64;
end if;
if ((statusVar / 128) % 2) = 1 then
	statusVar=statusVar - 128;
else
	
UPDATE request  SET status = status + 128  WHERE id = idRPar;
end if;
return true ;

else
return false ;
end if;


END;

$BODY$
	
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100;




Drop FUNCTION IF EXISTS addExistingItem;
CREATE FUNCTION addExistingItem(countPar integer,idPar integer,datePar timestamp) RETURNs void AS
$BODY$
BEGIN


UPDATE "storeItem" SET count = count + countPar
    WHERE id = (idPar)  ;
INSERT INTO "storeLog" ("itemId",state,count,"createDate") VALUES (idPar,1,countPar,datePar) ;


	
END;

$BODY$
	
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100;




Drop FUNCTION IF EXISTS DecreaseExistingItem;
CREATE FUNCTION DecreaseExistingItem(countPar integer,idPar integer,datePar timestamp) RETURNs void AS
$BODY$
BEGIN


UPDATE "storeItem" SET count = count - countPar
    WHERE id = (idPar)  ;
INSERT INTO "storeLog" ("itemId",state,count,"createDate") VALUES (idPar,2,countPar,datePar) ;


	
END;

$BODY$
	
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100;




Drop FUNCTION IF EXISTS requestAllotmentFund;

CREATE FUNCTION requestAllotmentFund(idPar integer ,amountPar integer,datePar timestamp) RETURNs void AS
$BODY$
	
DECLARE statusVar integer ;
DECLARE isShow boolean ;	
DECLARE userIdKey text ;

BEGIN

SELECT status into statusVar From request where id =idPar;

if (statusVar % 2 =1) then
	statusVar=statusVar - 1;
end if;
if ((statusVar / 2) % 2) = 1 then
	statusVar=statusVar - 2;
end if;
if ((statusVar / 4) % 2) = 1 then
	statusVar=statusVar - 4;
	isShow=true;

end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 8;
else
	
UPDATE request  SET status = status + 8  WHERE id = idPar;
end if;

if isShow then
SELECT users."idKey" into userIdKey FROM request JOIN users ON users.id = request.userId   WHERE request.id = idPar;
	
INSERT INTO "fundLog" (count,state,userIdKey,"createDate") VALUES (amountPar,3,userIdKey,datePar) ;
	
INSERT INTO "allotmentFund" ("requestId",count,"createDate") VALUES (idPar,amountPar,datePar) ;

else

SELECT users."idKey" into userIdKey FROM request JOIN users ON users.id = request.userId   WHERE request.id = idPar;
	
INSERT INTO "fundLog" (count,state,userIdKey,"createDate") VALUES (amountPar,2,userIdKey,datePar) ;
	
INSERT INTO "allotmentFund" ("requestId",count,"createDate") VALUES (idPar,amountPar,datePar) ;

UPDATE fund  SET count = count - amountPar where id = 1 ;

end if;

	
END;

$BODY$
	
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100;






Drop FUNCTION IF EXISTS requestAllotmentStore;

CREATE FUNCTION requestAllotmentStore(idRPar integer,idIPar integer ,amountPar integer,datePar timestamp) RETURNs void AS
$BODY$
	
DECLARE userIdKey text ;
DECLARE statusVar integer ;
BEGIN
	
SELECT status into statusVar From request where id =idRPar;

if (statusVar % 2 =1) then
	statusVar=statusVar - 1;
end if;
if ((statusVar / 2) % 2) = 1 then
	statusVar=statusVar - 2;
end if;
if ((statusVar / 4) % 2) = 1 then
	statusVar=statusVar - 4;
end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 8;
else
	
UPDATE request  SET status = status + 8  WHERE id = idRPar;
end if;


SELECT users."idKey" into userIdKey FROM request JOIN users ON users.id = request.userId   WHERE request.id = idRPar;
	
INSERT INTO "storeLog" ("itemId",count,state,userIdKey,"createDate") VALUES (idIPar,amountPar,2,userIdKey,datePar) ;
	
INSERT INTO "allotmentStore" ("requestId","itemId",count,"createDate") VALUES (idRPar,idIPar,amountPar,datePar) ;


	
END;

$BODY$
	
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100;



Drop FUNCTION IF EXISTS rejectRequest;

CREATE FUNCTION rejectRequest(idRPar integer) RETURNs void AS
$BODY$
	
DECLARE statusVar integer ;
DECLARE change boolean ;

BEGIN
change=true;
SELECT status into statusVar From request where id =idRPar;

if (statusVar % 2 =1) then
	statusVar=statusVar - 1;
DELETE FROM "sendTeam" WHERE requestid = idRPar;

end if;
if ((statusVar / 2) % 2) = 1 then
	statusVar=statusVar - 2;
end if;
if ((statusVar / 4) % 2) = 1 then
	statusVar=statusVar - 4;
end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 8;

	
end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 8;

	
end if;
if ((statusVar / 16) % 2) = 1 then
	statusVar=statusVar - 16;

	
end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 32;

	
end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 64;

	
end if;
if ((statusVar / 8) % 2) = 1 then
	statusVar=statusVar - 128;
change =false;
	
end if;
if (change) then
UPDATE request  SET status = status + 128  WHERE id = idRPar;
	
end if;

	
END;

$BODY$
	
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100;





























INSERT INTO permisions (id,title,"createDate") VAlUES (1,'show Store Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (2,'edit Store Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (3,'store Log Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (4,'visited Team Show Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (5,'visited Team Enter Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (6,'media Team View Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (7,'media Team Edit Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (8,'superAdmin View Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (9,'superAdmin  Fund Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (10,'superAdmin Employee Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (11,'relief Manager Teams Management Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (12,'relief Manager Requests Management Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (13,'relief Manager Campaigns Managment Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (14,'relief Manager Complaint Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (15,'receptionist add Complaint Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (16,'receptionist Campaigns Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (17,'receptionist profile Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (18,'receptionist request Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (19,'receptionist create Account Permission',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (20,'full Admin Permissions',now());
INSERT INTO permisions (id,title,"createDate") VAlUES (21,'superAdmin Campaigns  Permission',now());


INSERT INTO role (title,"createDate") VAlUES ('superAdmin',now());
INSERT INTO "rolePermission" ("roleId","permissionId","createDate") VAlUES (1,8,now());
INSERT INTO "rolePermission" ("roleId","permissionId","createDate") VAlUES (1,9,now());
INSERT INTO "rolePermission" ("roleId","permissionId","createDate") VAlUES (1,10,now());
INSERT INTO "rolePermission" ("roleId","permissionId","createDate") VAlUES (1,21,now());


INSERT INTO role (title,"createDate") VAlUES ('visitedTeamteam',now());
INSERT INTO "rolePermission" ("roleId","permissionId","createDate") VAlUES (2,4,now());
INSERT INTO "rolePermission" ("roleId","permissionId","createDate") VAlUES (2,5,now());



--const hashedPassword = await bcrypt.hash("1234567890", 10);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT INTO admin (email,"roleId",name,password,"createDate") VAlUES ('admin@mail.com',1,'adminName',crypt('1234567890', gen_salt('bf', 10)),now());
INSERT INTO admin (email,"roleId",name,password,"createDate") VAlUES ('adminvisitedTeamteam@mail.com',2,'adminvisitedTeamteam',crypt('1234567890', gen_salt('bf', 10)),now());

INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'not visited','description1','work',0,0,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'not visited-Receptionist','description1','work',0,16,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'Rejected','description1','work',0,64,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'Canceled','description1','work',0,128,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'visited','description1','work',0,3,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'visited-Receptionist','description1','work',0,19,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'will-visted','description1','work',0,1,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'will-visted-Receptionist','description1','work',0,17,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'show','description1','work',0,7,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'show-Receptionist','description1','work',0,23,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'showDonation','description1','work',0,7,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(1,'showDonation-Receptionist','description1','work',0,23,'description2',now());


INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(2,'not visited-user2','description1','work',0,0,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(2,'not visited-Receptionist-user2','description1','work',0,16,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(2,'Rejected-user2','description1','work',0,64,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(2,'Canceled-user2','description1','work',0,128,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(2,'visited-user2','description1','work',0,3,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(2,'visited-Receptionist-user2','description1','work',0,11,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(2,'show-user2','description1','work',0,7,'description2',now());
INSERT INTO request (userId,title,description1,work,priority,status,description2,"createDate") VALUES(2,'show-Receptionist-user2','description1','work',0,15,'description2',now());


INSERT INTO users ("idKey",name,email,password,"number",address,date,comf,"createDate") VALUES ('09010','user1','user1@mail.com',crypt('1234567890', gen_salt('bf', 10)),'0987654321','address-address',now(),true,now());
INSERT INTO users ("idKey",name,email,password,"number",address,date,comf,"createDate") VALUES ('09011','user2','user2@mail.com',crypt('1234567890', gen_salt('bf', 10)),'0987654321','address-address',now(),true,now());


INSERT INTO form ("typeId",title,"createDate") VALUES(1,'title1',now());
INSERT INTO form ("typeId",title,"createDate") VALUES(1,'title2',now());
INSERT INTO form ("typeId",title,"createDate") VALUES(1,'title3',now());

INSERT INTO "enteredForm" ("requestId","formItemId",answer,"createDate") VALUES(5,1,'answer1',now());
INSERT INTO "enteredForm" ("requestId","formItemId",answer,"createDate") VALUES(5,1,'answer2',now());
INSERT INTO "enteredForm" ("requestId","formItemId",answer,"createDate") VALUES(5,1,'answer3',now());

INSERT INTO "teamType" (title,"createDate") VALUES('first team',now());
INSERT INTO "teamType" (title,"createDate") VALUES('second team',now());

INSERT INTO team ("typeId",title,adminId,"createDate")VALUES(1,'team1',2,now());




INSERT INTO "fundDonation" (userIdKey,count,"createDate") VALUES('09010',20000000,now());
INSERT INTO fund (count) VALUES (20000000);


INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES (5,'09010',20000,now());
INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES (6,'09010',20000,now());

INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES (7,'09010',20000,now());
INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES (8,'09010',20000,now());

INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES (9,'09010',20000,now());
INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES (10,'09010',20000,now());

INSERT INTO campaigns (title,"imageUrl",budget,"targetGroup",reason,description,minimumDonation,"createDate") VALUES
('title1','url',100000,'targetGroup','reason','description',500,now());

INSERT INTO "campaignDonation" ("campaignId",userIdKey,count,"createDate") VALUES(1,'09010',2000,now());



INSERT INTO  complaint ("userId",complaint,"createDate") VALUES(1,'complaint1',now());
INSERT INTO  complaint ("userId",complaint,"createDate") VALUES(1,'complaint2',now());
INSERT INTO  complaint ("userId",complaint,"createDate") VALUES(1,'complaint3',now());

INSERT INTO "sendTeam" ("teamId",requestid,done,appointmentaccepted,"dayDate","dateInteger") VALUES(1,1,false,true,now(),8);
INSERT INTO "sendTeam" ("teamId",requestid,done,appointmentaccepted,"dayDate","dateInteger") VALUES(1,2,false,true,now(),8);

INSERT INTO "sendTeam" ("teamId",requestid,done,appointmentaccepted,"dayDate","dateInteger") VALUES(1,7,false,false,now(),8);
INSERT INTO "sendTeam" ("teamId",requestid,done,appointmentaccepted,"dayDate","dateInteger") VALUES(1,8,false,false,now(),8);

INSERT INTO wallets (amountwallet,"idKey",createtDate) VALUES (2000000,'09010',now());

INSERT INTO "aboutUs" ("imageUrl",text1,text2,text3,text4,text5,"contactUs") VALUES('utl','text1','text2','text3','text4','text5','contactUs');



--Alter releation 


ALTER TABLE IF EXISTS public."enteredForm"
    ADD FOREIGN KEY ("requestId")
    REFERENCES public.request (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."enteredForm"
    ADD FOREIGN KEY ("formItemId")
    REFERENCES public.form (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."documentImage"
    ADD FOREIGN KEY ("requestId")
    REFERENCES public.request (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."requestDonation"
    ADD FOREIGN KEY ("requestId")
    REFERENCES public.request (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."requestDonation"
    ADD FOREIGN KEY ("userId")
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."CampaignDonation"
    ADD FOREIGN KEY ("userId")
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."CampaignDonation"
    ADD FOREIGN KEY ("CampaignId")
    REFERENCES public.campaigns (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."fundDonation"
    ADD FOREIGN KEY ("userId")
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.document
    ADD FOREIGN KEY ("typeId")
    REFERENCES public."teamType" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.team
    ADD FOREIGN KEY ("typeId")
    REFERENCES public."teamType" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."teamMember"
    ADD FOREIGN KEY ("teamId")
    REFERENCES public.team (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."sendTeam"
    ADD FOREIGN KEY ("teamId")
    REFERENCES public.team (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."sendTeam"
    ADD FOREIGN KEY (requestid)
    REFERENCES public.request (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.form
    ADD FOREIGN KEY ("typeId")
    REFERENCES public."teamType" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."allotmentFund"
    ADD FOREIGN KEY ("requestId")
    REFERENCES public.request (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."allotmentStore"
    ADD FOREIGN KEY ("requestId")
    REFERENCES public.request (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."allotmentStore"
    ADD FOREIGN KEY ("itemId")
    REFERENCES public."storeItem" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."storeSubCategory"
    ADD FOREIGN KEY ("categoryId")
    REFERENCES public."storeCategory" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."storeItem"
    ADD FOREIGN KEY ("subCategoryId")
    REFERENCES public."storeSubCategory" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."requestBuying"
    ADD FOREIGN KEY (requestid)
    REFERENCES public.request (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.complaint
    ADD FOREIGN KEY ("userId")
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."storeLog"
    ADD FOREIGN KEY ("itemId")
    REFERENCES public."storeItem" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.role
    ADD FOREIGN KEY (id)
    REFERENCES public.admin ("roleId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."rolePermission"
    ADD FOREIGN KEY ("roleId")
    REFERENCES public.role (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."rolePermission"
    ADD FOREIGN KEY ("permissionId")
    REFERENCES public.permisions (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;