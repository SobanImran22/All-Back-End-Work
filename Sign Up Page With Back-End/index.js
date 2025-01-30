import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

let users =[]

function randomNumber(){
    return Math.floor(Math.random()*100000000)
}

app.post('/user', (req ,res) => { 
console.log(req.body)

let newUser ={
    id: randomNumber(),
    fullname: req.body.fullname,
    username : req.body.username,
    password : req.body.password    
}
users.push(newUser)

res.status(201).send(' new user is created')

})

app.get('/user/:userId',(req ,res)=>{ // get all user user
    res.send(users)
    
} )


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
