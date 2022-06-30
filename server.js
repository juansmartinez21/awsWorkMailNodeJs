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


var name = 'l.vaquero';
var displayName = 'L. Vaquero';
var organizationId = 'm-6401ec4caa7a490a9eb4c9570f458c02'

var params = {
    DisplayName: displayName, /* required */
    Name: name, /* required */
    OrganizationId: organizationId, /* required */
    Password: 'Provisional2022' /* required */
};

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

const myPromise2 = (userId) => {
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

myPromise(params)
.then((data) => { myPromise2(data.UserId)})
.catch((error) => { console.error(error)})

