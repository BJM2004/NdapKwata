const express=require('express');
const router=express.Router();
const bailleurRouter=require('./bailleurs');
const logementRouter=require('./logements');
const userRouter=require('./user');
router.use('/bailleur',bailleurRouter);
router.use('/user',userRouter);
router.use('/logement',logementRouter);
module.exports=router;