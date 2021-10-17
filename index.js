const express = require("express")
const app = express();
const router = express.Router()
const users = require('./users.json')


router.get("/user", function(req, res) {
  const userid = req.query.uid;
  let user = userid in users ? users.filter(x => x.id == userid).map(u => { return (
      {
        id:u.id, 
        name:u.name, 
        emai:u.email, 
        address:u.address.street +", "+ u.address.city +", "+ u.address.zipcode, 
        phone:u.phone
      })}): {message: "user not found"}
  res.send(user)
})

router.get("/users/all", function(req, res) {
  users.sort(function(a, b){
    if(a.username < b.username) { return -1; }
    if(a.username > b.username) { return 1; }
    return 0;
  })
  res.send(users.map(function(item) { return item["username"]}))
})

app.use('/', router);
app.listen(process.env.port || 8081);
console.log('Web Server is listening at port '+ (process.env.port || 8081));