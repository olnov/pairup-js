const Student = require("../models/Student");
const Cohort = require("../models/Cohort");

// Create new student
exports.createNewStudent = async (req,res) => {
    try {
        const { full_name, email, skill_level, cohort_id } = req.body;
        console.log(req.body);
        const cohort = await Cohort.findByPk(cohort_id);
        console.log(cohort);
        if (!cohort) {
            return res.status(404).json({ message: 'Cohort not found. '});
        }
        const existingStudent = await Student.findOne({ where: {email}});
        if (existingStudent) {
            return res.status(409).json({ message: 'Email already registerd.'});
        }
        const newStudent = await Student.create({
            full_name,
            email,
            skill_level,
            cohort_id,
            registered_at: new Date()
        });
        res.status(201).json({ message: 'Student successfully created: ', newStudent })
    }catch(error){
        res.status(500).json({ message: 'Error creating student:', error:error.message });
    }
}

// Get all students
exports.getAllStudents = async (req, res)=> {
    try {
        const students = await Student.findAll({
            include: [
                {
                    model: Cohort,
                    attributes: ['title', 'date_start', 'date_end']
                }
            ]
        });

        // Modify the response to include the cohort title, date_start and date_end
        const studentsWithDetails = students.map(student => {
            const cohort = student.Cohort;
            return {
                id: student.id,
                full_name: student.full_name,
                email: student.email,
                skill_level: student.skill_level,
                cohort_title: cohort ? cohort.title : null,
                cohort_date_start: cohort ? cohort.date_start : null,
                cohort_date_end: cohort ? cohort.date_end : null,
            }
        });
        res.status(200).json(studentsWithDetails)
    }catch(error){
        res.status(500).json({ message: 'Error retreieing student.', error:error.message})
    }
}

// Get student by id
exports.getStudentById = async (req, res)=> {
    try {
        const { id } = req.body;
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'User not found.'});
        }
    }catch(error){
        res.status(500).json({ message: 'Error retreiving student.', error:error.message});
    }
}

// Update student
exports.updateStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, skill_level, cohort_id } = req.body;
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.'});
        }
        if (email) {
            const studentExists = await Student.findOne({ where: { email }});
            if (studentExists) {
                return res.status(409).json({ message: 'Email already registered.'});
            }
        }
        const updatedStudent = await student.update({
            full_name: full_name || student.full_name,
            email: email || student.email,
            skill_level: skill_level || student.skill_level,
            cohort_id: cohort_id || student.cohort_id       
        });
        res.status(200).json({ message: 'Student updated successfully.', updatedStudent });
    }catch(error){
        res.status(500).json({ message: 'Error updating student.', error:error.message });
    }
}

// Delete student
exports.deleteStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.'});
        }
        await student.destroy();
        res.status(200).json({ message: 'Student deleted successfully.'});
    }catch(error){
        res.status(500).json({ message: 'Error deleting student.', error:error.message });
    }
}
