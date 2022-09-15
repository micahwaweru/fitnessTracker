const router = require('express').Router();
const User = require('../../models/user');

router.get('/', async(req,res)=>{
    const userData = await User.findAll().catch((err)=>{
        res.json(err);
    });
    res.json(userData);
});

router.post('/', async(req,res)=>{
    try{
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});



router.post('/login',async(req,res)=>{
    try{
        const userData=await User.findOne({ where: { email: req.body.email } });
        if(!userData){
            res
                .status(400)
                .json({message:'No account with this email!'});
                return;
        }

        //const validPassword = await userData.checkPassword(req.body.password);
        if(userData.password!=req.body.password){
            res
                .status(400)
                .json({message:'Incorrect password, please try again!'});
                return;
        }
        req.session.save(()=>{
            req.session.loggedIn=true;
            console.log('From: userRoutes.js, request.session save & request.session.cookie',
            req.session.cookie
            );
        })
        res
        .status(200)
        .json({user: userData, userName: userData.username, message: 'Login Success!'});
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;