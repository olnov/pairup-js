const User = require("../models/User");

// Create new user
exports.createUser = async (req, res)=> {
    try {
        const { full_name, email, password } = req.body;
        const existingEmail = await User.findOne({ where: {email}});
        if (existingEmail) {
            res.status(409).json({ message: 'Email already exists.'});
            return
        }
        const newUser = await User.create({
            full_name,
            email,
            password,
            registered_at: new Date(),
        });
        res.status(201).json({ message: 'New user created successfully.', userId: newUser.id});
    }catch(error){
        res.status(500).json({message: 'Error creating user:', error: error.message});
    };
};

// Get all users from DB
exports.getAllUsers = async (req,res)=> {
    try {
        const users =  await User.findAll();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({ message: 'Error retreiving users:', error: error.message});
    };
};

// Get user by id
exports.getUserById = async (req, res)=> {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found. '})
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({ message: 'Error retreining user:', error: error.message});
    }
}

// Update user
exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, password } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found. '});
        };

        if (email) {
            const existingEmail = await User.findOne({ where: {email}});
            if (existingEmail) {
                return res.status(409).json({ message: 'Email already exists.'});
            }
        }

        await user.update({
            full_name: full_name || user.full_name,
            email: email || user.email,
            password: password || user.password,
        })
        res.status(200).json({ message: 'Updated successfully.', user})
    }catch(error){
        res.status(500).json({ message: 'Error updating user: ', error:error.message})
    }
}

// Delete user
exports.deleteUserById = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.'});
        }
        await user.destroy();
        res.status(204).json({ message: 'User deleted successfully.'});
    }catch(error){
        res.status(500).json({ message: 'Error deleting user:', error:error.message});
    }
}