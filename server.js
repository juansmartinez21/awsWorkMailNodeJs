const userData = require('./data');
const { WorkMail, createUser } = require("@aws-sdk/client-workmail");
var config = require("./config");

var workmail = new WorkMail({
    endpoint: 'https://workmail.us-east-1.amazonaws.com',  
    region : 'us-east-1',
    credentials: {
        accessKeyId: config.ACCESS_KEY_ID,
        secretAccessKey: config.SECRET_ACCESS_KEY
      }
});


const myPromise = (params) => {
    return new Promise(
        (resolve, reject) =>
        {
            workmail.createUser(params, function(err, data) {
                if(err) reject(err.stack); // an error occurred
                else {
                    console.log('User created succesfully');
                    resolve(data) 
                }
            });
        }
    )
}


const myPromise2 = (userId, name, userEmail) => {
    var params = {
        Email: userEmail+'@'+config.DOMAIN, 
        EntityId: userId, 
        OrganizationId: config.ORGANIZATION_ID
      };
    return new Promise((resolve, reject) => {               
          workmail.registerToWorkMail(params, function(err, data) {
            if (err) reject(err.stack); // an error occurred
            else {
                console.log(params);          
                console.log('User registered to workmail succesfully');
                resolve(data);           
            }   
          });    
    })
    
} 

const main = async() => {
    for(let i = 0; i < userData.length; i++)
    {
        let userName = userData[i].name
        let userEmail = userData[i].email
        var params = {
            DisplayName: userName, 
            Name: userEmail, 
            OrganizationId: config.ORGANIZATION_ID,
            Password: 'Provisional2022' 
        }
        console.log(params) 
        console.log(i)    
        try{
            let data = await myPromise(params);
            await myPromise2(data.UserId, userName, userEmail);            
        }
        catch(error){
            console.error(error)
        }
    }
}

main();