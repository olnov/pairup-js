const Specialism = require('../models/Specialism');

// Create new specialism
exports.createNewSpecialism = async (req, res)=> {
    try {
        const { title,stack } = req.body;
        const existingSpecialism = await Specialism.findOne({ where: { title } });
        if (existingSpecialism) {
            return res.status(409).json({ message: 'Specialism already exists.' });
        }
        const newSpecialism = await Specialism.create({
            title,
            stack,
        });
        res.status(201).json({ message: 'New specialism created successfully.', specialismId: newSpecialism.id});
    }catch(error){
        res.status(500).json({ message: 'Error creating specialism:', error: error.message});
    };
};

// Get all specialisms
exports.getAllSpecialisms = async (req, res)=> {
    try {
        const specialisms = await Specialism.findAll();
        res.status(200).json(specialisms);
    }catch(error){
        res.status(500).json({ message: 'Error retreiving specialisms:', error: error.message});
    };
};

// Get specialism by id
exports.getSpecialismById = async (req, res)=> {
    try {
        const { id } = req.params;
        const specialism = await Specialism.findByPk(id);
        if (!specialism) {
            return res.status(404).json({ message: 'Specialism not found.'});
        }
        res.status(200).json(specialism);
    }catch(error){
        res.status(500).json({ message: 'Error retreining specialism:', error: error.message});
    }
}

// Update specialism
exports.updateSpecialismById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, stack } = req.body;
        const specialism = await Specialism.findByPk(id);
        if (!specialism) {
            return res.status(404).json({ message: 'Specialism not found.'});
        }

        await specialism.update({
            title,
            stack,
        });
        res.status(200).json({ message: 'Specialism updated successfully.', specialismId: specialism.id});
    }catch(error){
        res.status(500).json({ message: 'Error updating specialism:', error: error.message});
    };
}

// Delete specialism
exports.deleteSpecialism = async (req, res) => {
    try {
        const { id } = req.params;
        const specialism = await Specialism.findByPk(id);
        if (!specialism) {
            return res.status(404).json({ message: 'Specialism not found.'});
        }
        await specialism.destroy();
        res.status(200).json({ message: 'Specialism deleted successfully.'});
    }catch(error){
        res.status(500).json({ message: 'Error deleting specialism:', error: error.message});
    }
}