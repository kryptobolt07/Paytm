const express = require('express')
const { authMiddleware } = require('../middleware')
const { Account } = require('../db')
const { default: mongoose } = require('mongoose') 

const router = express.Router()

//balance
router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

//transfer(bad sol)
// router.post('/transfer', authMiddleware, async (req,res) => {
//     const { amount, to } = req.body

//     const account = await Account.findOne({
//         userId: req.userId
//     })
//     if(account.balance < amount){
//         res.status(400).json({
//             message: "Insufficient Balance"
//         })
//     }

//     const toAccount = Account.findOne({
//         userId: to
//     })
//     if(!toAccount){
//         res.status(400).json({
//             message:"Invalid Account"
//         })
//     }

//     await Account.upadteOne(
//         {
//         userId: req.userId
//         },{
//         balance: -amount
//         }
//     )

//     await Account.upadteOne(
//         {
//         userId: to,
//         },{
//             $inc:{
//                 balance: amount,
//                 }
//         }
//     )
// })

//transfer (good sol)
router.post('/transfer', authMiddleware, async(req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()

    const { amount, to } = req.body

    const account = await Account.findOne({
        userId: req.userId
    })
    if(!account || account.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({userId:to }).session(session)
    if(!toAccount){
        await session.abortTransaction()
        res.status(400).json({
            message:"Invalid account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc:{balance:-amount}} ).sesion(session)
    await Account.updateOne({userId:to}, { $inc:{balance:amount}} ).session(session)

    await session.commitTransaction()
    res.json({
        message: "Transfer Successfully"
    })
})


module.exports = router