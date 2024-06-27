

async function query(text, params,fun) {      
    const start = Date.now();    
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
    console.log('params ', params);
    try {

        const result = await client.query(text, params)
            
                  

        client.end();
        console.log('executed query', {text})
        return result;
    } catch (error) {
       
        client.end();
        console.log('error in query', {text});
        throw error;
    }

}




module.exports= query