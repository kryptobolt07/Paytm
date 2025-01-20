const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://manav25gohil:NBOFnjuXZ8XWPVHw@cluster0.7du3n.mongodb.net/')

const userSchema = ({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const accountsSchema = ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountsSchema)
const User = mongoose.model("User", userSchema)

model.export = {
    User
}