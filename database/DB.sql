BEGIN;
--TODO : update ERD
DROP TABLE IF EXISTS public.users,public.confirmation,public."previousCampaigns",public."aboutUs",
public."aboutUs",public.ads,public.ads,public.request,public.campaigns,public."enteredForm",
public."documentImage",public."requestDonation",public."campaignDonation",public."fundDonation",
public."teamType",public.document,public.team,public."teamMember",public."sendTeam",public.fund,
public.form,public."allotmentFund",public."allotmentStore",public."storeCategory",
public."storeSubCategory",public."storeItem",public."requestBuying",public.complaint,
public."storeLog",public."fundLog",public.role,public.permisions,public."rolePermission",public.admin;
--CHANGELOG : in Request table change column name : status -> status
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
    priority integer,
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
    isDisable boolean,
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

    "fromDate" timestamp,
    "toDate" timestamp,
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

CREATE FUNCTION requestDelete(idRPar integer) RETURNs boolean AS
$BODY$
	
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
END;

$BODY$
	
LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100;

Drop FUNCTION IF EXISTS addItem;
CREATE FUNCTION addItem(subCategoryIdPar integer ,titlePar text ,countPar integer,datePar timestamp) RETURNs void AS
$BODY$
DECLARE idVar integer ;

BEGIN

INSERT INTO  "storeItem" ("subCategoryId",title,count,"createDate") VALUES (subCategoryIdPar,titlePar,countPar,datePar) RETURNING id  INTO idVar;
INSERT INTO "storeLog" ("itemId",state,count,"createDate") VALUES (idVar,1,countPar,datePar) ;


	
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
	
DECLARE userIdKey text ;

BEGIN

UPDATE request  SET status = status + 8  WHERE id = idPar;

SELECT users."idKey" into userIdKey FROM request JOIN users ON users.id = request.userId   WHERE request.id = idPar;
	
INSERT INTO "fundLog" (count,state,userIdKey,"createDate") VALUES (amountPar,2,userIdKey,datePar) ;
	
INSERT INTO "allotmentFund" ("requestId",count,"createDate") VALUES (idPar,amountPar,datePar) ;

UPDATE fund  SET count = count - amountPar where id = 1 ;

	
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



--Alter releation 

/*
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
*/
END;
