const express = require('express')
const { User } = require('../db')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { authMiddleware } = require('../middleware')

//signup , signin , update and search route 


const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

router.post("/signup", async (req,res) => {
    const body = req.body
    
    //zod validation
    const {success} = signupSchema.safeParse(req.body)
    if(!success)
        return res.status(411).json({
        message: "Email already taken/ Incorrect inputs"
    })

    const existingUser = await User.findOne({
        username: body.username
    })

    if(existingUser){    
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const dbUser = await User.create(body)
    // OR
    // const dbUser = await User,create({
    //     username: req.body.username,
    //     password: req.body.password,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // })

    const token = JWT_SECRET.sign({
        userId: dbUser._id 
    }, JWT_SECRET)

    res.json({
        message: "User Created Successfully",
        token: token
    })
})


const signinSchema = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})



const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })
})



router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router