async function seeder(){
  const {Client}=require('pg')
 
  const client = new Client({
      host:process.env.PG_HOST,
      port:process.env.PG_PORT,
      user:process.env.PG_USER,
      password:process.env.PG_PASSWORD,
      database:process.env.PG_DATABASE,
      //ssl: true,
    });

  client.connect()

await client.query(`INSERT INTO users ("idKey",name,email,password,"number",address,date,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7,$8)`, (["09010","user1","user1@mail.com","password","0987654321","address-address",new Date().toISOString(),new Date().toISOString()]))
await client.query(`INSERT INTO users ("idKey",name,email,password,"number",address,date,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7,$8)`, (["090122","user2","user2@mail.com","password","0987654321","address-address",new Date().toISOString(),new Date().toISOString()]))
await client.query(`INSERT INTO users ("idKey",name,email,password,"number",address,date,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7,$8)`, (["090102","user3","user3@mail.com","password","0987654321","address-address",new Date().toISOString(),new Date().toISOString()]))


await client.query(`INSERT INTO "previousCampaigns" (title,imageUrl,description,"createDate") VALUES($1,$2,$3,$4)`, (["title1","imageUrl","description1",new Date().toISOString()]))
await client.query(`INSERT INTO "previousCampaigns" (title,imageUrl,description,"createDate") VALUES($1,$2,$3,$4)`, (["title2","imageUrl","description2",new Date().toISOString()]))
await client.query(`INSERT INTO "previousCampaigns" (title,imageUrl,description,"createDate") VALUES($1,$2,$3,$4)`, (["title3","imageUrl","description3",new Date().toISOString()]))

await client.query(`INSERT INTO "aboutUs" ("imageUrl",text1,text2,text3,text4,text5,"contactUs") VALUES($1,$2,$3,$4,$5,$6,$7)`, (["url","text1","text2","text3","text4","text5","contactUs"]))


await client.query(`INSERT INTO ads (title,description,"imageUrl","createDate") VALUES($1,$2,$3,$4)`, (["title1","description1","imageUrl1",new Date().toISOString()]))
await client.query(`INSERT INTO ads (title,description,"imageUrl","createDate") VALUES($1,$2,$3,$4)`, (["title2","description2","imageUrl2",new Date().toISOString()]))
await client.query(`INSERT INTO ads (title,description,"imageUrl","createDate") VALUES($1,$2,$3,$4)`, (["title3","description3","imageUrl3",new Date().toISOString()]))

    //isTeamDate(0),isVisited(1),isShow(2),isAllotment(3),isReceptionist(4),isDelivered(5),isRejected(6),isCanceled(7)
    /**/
await client.query(`INSERT INTO request (userId,title,description1,priority,status,description2,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7)`, ([1,"not visited","description1",1,0,"description2",new Date().toISOString()]))
await client.query(`INSERT INTO request (userId,title,description1,priority,status,description2,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7)`, ([1,"not visited-Receptionist ","description1",1,16,"description2",new Date().toISOString()]))
    /**/
await client.query(`INSERT INTO request (userId,title,description1,priority,status,description2,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7)`, ([1,"Rejected","description1",1,64,"description2",new Date().toISOString()]))
await client.query(`INSERT INTO request (userId,title,description1,priority,status,description2,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7)`, ([1,"Canceled","description1",1,128,"description2",new Date().toISOString()]))
    /**/


await client.query(`INSERT INTO request (userId,title,description1,priority,status,description2,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7)`, ([1,"not visited","description1",1,192,"description2",new Date().toISOString()]))
await client.query(`INSERT INTO request (userId,title,description1,priority,status,description2,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7)`, ([1,"visited-Receptionist","description1",1,208,"description2",new Date().toISOString()]))
   
await client.query(`INSERT INTO campaigns (title,"imageUrl",budget,"targetGroup",reason,description,minimumDonation,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7,$8)`, (["title1","url",100000,"targetGroup","reason","description",500,new Date().toISOString()]))
await client.query(`INSERT INTO campaigns (title,"imageUrl",budget,"targetGroup",reason,description,minimumDonation,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7,$8)`, (["title2","url",100000,"targetGroup","reason","description",500,new Date().toISOString()]))
await client.query(`INSERT INTO campaigns (title,"imageUrl",budget,"targetGroup",reason,description,minimumDonation,"createDate") VALUES($1,$2,$3,$4,$5,$6,$7,$8)`, (["title3","url",100000,"targetGroup","reason","description",500,new Date().toISOString()]))


await client.query(`INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"09010",2000,new Date().toISOString()]))
await client.query(`INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"09010",2000,new Date().toISOString()]))
await client.query(`INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"09010",2000,new Date().toISOString()]))
await client.query(`INSERT INTO "requestDonation" ("requestId",userIdKey,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"09010",2000,new Date().toISOString()]))

await client.query(`INSERT INTO "campaignDonation" ("campaignId",userIdKey,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"09010",2000,new Date().toISOString()]))
await client.query(`INSERT INTO "campaignDonation" ("campaignId",userIdKey,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"09010",2000,new Date().toISOString()]))
await client.query(`INSERT INTO "campaignDonation" ("campaignId",userIdKey,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"09010",2000,new Date().toISOString()]))
await client.query(`INSERT INTO "campaignDonation" ("campaignId",userIdKey,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"09010",2000,new Date().toISOString()]))

await client.query(`INSERT INTO "fundDonation" (userIdKey,count,"createDate") VALUES($1,$2,$3)`, (["09010",2000,new Date().toISOString()]))


await client.query(`INSERT INTO "teamType" (title,"createDate") VALUES($1,$2)`, (["first team",new Date().toISOString()]))
await client.query(`INSERT INTO "teamType" (title,"createDate") VALUES($1,$2)`, (["second team",new Date().toISOString()]))

await client.query(`INSERT INTO document ("typeId",item,"createDate") VALUES($1,$2,$3)`, ([1,"document1",new Date().toISOString()]))
await client.query(`INSERT INTO document ("typeId",item,"createDate") VALUES($1,$2,$3)`, ([1,"document2",new Date().toISOString()]))
await client.query(`INSERT INTO document ("typeId",item,"createDate") VALUES($1,$2,$3)`, ([1,"document3",new Date().toISOString()]))

await client.query(`INSERT INTO team ("typeId",title,"createDate") VALUES($1,$2,$3)`, ([1,"team1",new Date().toISOString()]))



await client.query(`INSERT INTO "teamMember" ("teamId",name,"createDate") VALUES($1,$2,$3)`, ([1,"member1",new Date().toISOString()]))
await client.query(`INSERT INTO "teamMember" ("teamId",name,"createDate") VALUES($1,$2,$3)`, ([1,"member2",new Date().toISOString()]))
await client.query(`INSERT INTO "teamMember" ("teamId",name,"createDate") VALUES($1,$2,$3)`, ([1,"member3",new Date().toISOString()]))


await client.query(`INSERT INTO "sendTeam" ("teamId",requestid,done,"fromDate","toDate") VALUES($1,$2,$3,$4,$5)`, ([1,1,false,new Date().toISOString(),new Date().toISOString()]))
await client.query(`INSERT INTO "sendTeam" ("teamId",requestid,done,"fromDate","toDate") VALUES($1,$2,$3,$4,$5)`, ([1,1,false,new Date().toISOString(),new Date().toISOString()]))

await client.query(`INSERT INTO form ("typeId",title,"createDate") VALUES($1,$2,$3)`, ([1,"title1",new Date().toISOString()]))
await client.query(`INSERT INTO form ("typeId",title,"createDate") VALUES($1,$2,$3)`, ([1,"title2",new Date().toISOString()]))
await client.query(`INSERT INTO form ("typeId",title,"createDate") VALUES($1,$2,$3)`, ([1,"title3",new Date().toISOString()]))


await client.query(`INSERT INTO "enteredForm" ("requestId","formItemId",answer,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,"answer",new Date().toISOString()]))
await client.query(`INSERT INTO "enteredForm" ("requestId","formItemId",answer,"createDate") VALUES($1,$2,$3,$4)`, ([1,2,"answer",new Date().toISOString()]))
await client.query(`INSERT INTO "enteredForm" ("requestId","formItemId",answer,"createDate") VALUES($1,$2,$3,$4)`, ([1,3,"answer",new Date().toISOString()]))



await client.query(`INSERT INTO "storeCategory" (title,"createDate") VALUES($1,$2)`, (["category1",new Date().toISOString()]))
await client.query(`INSERT INTO "storeCategory" (title,"createDate") VALUES($1,$2)`, (["category2",new Date().toISOString()]))
await client.query(`INSERT INTO "storeCategory" (title,"createDate") VALUES($1,$2)`, (["category3",new Date().toISOString()]))


await client.query(`INSERT INTO  "storeSubCategory" ("categoryId",title,"createDate") VALUES($1,$2,$3)`, ([1,"subCategory1",new Date().toISOString()]))
await client.query(`INSERT INTO  "storeSubCategory" ("categoryId",title,"createDate") VALUES($1,$2,$3)`, ([1,"subCategory2",new Date().toISOString()]))
await client.query(`INSERT INTO  "storeSubCategory" ("categoryId",title,"createDate") VALUES($1,$2,$3)`, ([1,"subCategory3",new Date().toISOString()]))

await client.query(`INSERT INTO  "storeItem" ("subCategoryId",title,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"item1",20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeItem" ("subCategoryId",title,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"item2",20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeItem" ("subCategoryId",title,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,"item3",20,new Date().toISOString()]))

await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))
await client.query(`INSERT INTO  "storeLog" ("itemId",state,count,"createDate") VALUES($1,$2,$3,$4)`, ([1,1,20,new Date().toISOString()]))




await client.query(`INSERT INTO  complaint ("userId",complaint,"createDate") VALUES($1,$2,$3)`, ([1,"complaint.....",new Date().toISOString()]))
await client.query(`INSERT INTO  complaint ("userId",complaint,"createDate") VALUES($1,$2,$3)`, ([1,"complaint.....",new Date().toISOString()]))
await client.query(`INSERT INTO  complaint ("userId",complaint,"createDate") VALUES($1,$2,$3)`, ([1,"complaint.....",new Date().toISOString()]))
await client.query(`INSERT INTO  complaint ("userId",complaint,"createDate") VALUES($1,$2,$3)`, ([1,"complaint.....",new Date().toISOString()]))


/**/

await client.query(`INSERT INTO  role (title,"createDate") VALUES($1,$2)`, (["role1",new Date().toISOString()]))
await client.query(`INSERT INTO  role (title,"createDate") VALUES($1,$2)`, (["role2",new Date().toISOString()]))
await client.query(`INSERT INTO  role (title,"createDate") VALUES($1,$2)`, (["role3",new Date().toISOString()]))


await client.query(`INSERT INTO  permisions (title,"createDate") VALUES($1,$2)`, (["permisions1",new Date().toISOString()]))
await client.query(`INSERT INTO  permisions (title,"createDate") VALUES($1,$2)`, (["permisions2",new Date().toISOString()]))
await client.query(`INSERT INTO  permisions (title,"createDate") VALUES($1,$2)`, (["permisions3",new Date().toISOString()]))


await client.query(`INSERT INTO "rolePermission"  ("roleId","permissionId","createDate") VALUES($1,$2,$3)`, ([1,1,new Date().toISOString()]))
await client.query(`INSERT INTO  "rolePermission" ("roleId","permissionId","createDate") VALUES($1,$2,$3)`, ([1,2,new Date().toISOString()]))
await client.query(`INSERT INTO  "rolePermission" ("roleId","permissionId","createDate") VALUES($1,$2,$3)`, ([1,3,new Date().toISOString()]))


await client.query(`INSERT INTO admin (email,"roleId",name,password,"createDate") VALUES ($1,$2,$3,$4,$5)`, (["admin1@mail.com",1,"adminName",1234567890,new Date().toISOString()]))

await client.query(`INSERT INTO fund (count) VALUES ($1)`, ([20000000]))


await client.query(`INSERT INTO "fundLog" (count,state,userIdKey,"createDate") VALUES ($1,$2,$3,$4)`,[2000,1,"reason ",new Date().toISOString()]);
await client.query(`INSERT INTO "fundLog" (count,state,userIdKey,"createDate") VALUES ($1,$2,$3,$4)`,[2000,1,"09010",new Date().toISOString()]);
await client.query(`INSERT INTO "fundLog" (count,state,userIdKey,"createDate") VALUES ($1,$2,$3,$4)`,[2000,2,"09010 ",new Date().toISOString()]);

}
module.exports=seeder;