const Cohort = require("../models/Cohort");
const Specialism = require("../models/Specialism");

// Create new cohort
exports.createNewCohort = async (req, res)=> {
    try {
        const { title, date_start, date_end, specialism_id } = req.body;
        const specialism = await Specialism.findByPk(specialism_id);
        if (!specialism) {
            return res.status(404).json({ message: 'Specialism not found.'});
        }
        const newCohort = await Cohort.create({
            title,
            date_start,
            date_end,
            specialism_id,
            registered_at: new Date(),
        });
        res.status(201).json({ message: 'New cohort created successfully.', cohortId: newCohort.id});
    }catch(error){
        res.status(500).json({ message: 'Error creating cohort:', error: error.message});
    };
};

// Get all cohorts
exports.getAllCohorts = async (req, res)=> {
    try {
        const cohorts = await Cohort.findAll();
        res.status(200).json(cohorts);
    }catch(error){
        res.status(500).json({ message: 'Error retreiving cohorts:', error: error.message});
    };
};

// Get cohort by id
exports.getCohortById = async (req, res)=> {
    try {
        const { id } = req.params;
        const cohort = await Cohort.findByPk(id);
        if (!cohort) {
            return res.status(404).json({ message: 'Cohort not found.'});
        }
        res.status(200).json(cohort);
    }catch(error){
        res.status(500).json({ message: 'Error retreining cohort:', error: error.message});
    }
}

// Update cohort
exports.updateCohortById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date_start, date_end, specialism_id } = req.body;
        const cohort = await Cohort.findByPk(id);
        if (!cohort) {
            return res.status(404).json({ message: 'Cohort not found.'});
        }

        if (specialism_id) {
            const specialism = await Specialism.findByPk(specialism_id);
            if (!specialism) {
                return res.status(404).json({ message: 'Specialism not found.'});
            }
        }

        await cohort.update({
            title,
            date_start,
            date_end,
            specialism_id,
        });
        res.status(200).json({ message: 'Cohort updated successfully.'});
    }catch(error){
        res.status(500).json({ message: 'Error updating cohort:', error: error.message});
    }
}

// Delete cohort
exports.deleteCohortById = async (req,res) => {
    try {
        const { id } = req.params;
        const cohort = await Cohort.findByPk(id);
        if (!cohort) {
            return res.status(404).json({ message: 'Cohort not found.'});
        }
        await cohort.destroy();
        res.status(200).json({ message: 'Cohort deleted successfully.'});
    }catch(error){
        res.status(500).json({ message: 'Error deleting cohort:', error: error.message});
    }
}