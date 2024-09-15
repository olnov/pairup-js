const Student = require("../models/Student");
const Cohort = require("../models/Cohort");

// Create new student
exports.createNewStudent = async (req,res) => {
    try {
        const { full_name, email, skill_level, cohort_id } = req.body;
        const cohort = Cohort.findByPk(cohort_id);
        if (!cohort) {
            return res.status(404).json({ message: 'Cohort not found. '});
        }
        const newStudent = Student.findOne({ where: {email}});
        if (newStudent) {
            return res.status(409).json({ message: 'Email already registerd.'});
        }
        await newStudent.create({
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
        const students = await Student.findAll();
        res.status(200).json(students)
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