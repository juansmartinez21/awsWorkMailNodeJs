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
                    resolve(data ) 
                }
            });
        }
    )
}

const myPromise2 = (userId, name) => {
    var params = {
        Email: name+'@korngroup.com.co', 
        EntityId: userId, 
        OrganizationId: organizationId
      };
    return new Promise((resolve, reject) => {               
          console.log("--------------");
          console.log(params);
          workmail.registerToWorkMail(params, function(err, data) {
            if (err) reject(err.stack); // an error occurred
            else {
                console.log('User registered to workmail succesfully');
                resolve(data);           
            }   
          });    
    })
    
} 

const organizationId = '6401ec4caa7a490a9eb4c9570f458c02'

for(let i = 0; i < userData.length; i++)
{
    let nameArray = userData[i].email.split('@')
    var params = {
        DisplayName: nameArray[0], /* required */
        Name: nameArray[0], /* required */
        OrganizationId: organizationId, /* required */
        Password: 'Provisional2022' /* required */
    };
    console.log(params) 
    console.log(i)       
    return await myPromise(params)
    .then((data) => { await myPromise2(data.UserId, nameArray[0])})
    .catch((error) => { console.error(error)})

}