const express = require('express');
const app = express();

app.use(express.json());

const students = [
  { id: 101, name: "Rahul Sharma", email: "rahul@gmail.com", course: "CSE", age: 21 }
];

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/api/students', (req, res) => {
  const { id, name, email, course, age } = req.body;

  if (!id || !name || !email || !course || !age) {
    return res.status(400).json({ error: "All fields (id, name, email, course, age) are required." });
  }

  const studentExists = students.find(s => s.id === Number(id));
  if (studentExists) {
    return res.status(400).json({ error: "A student with this ID already exists." });
  }

  const newStudent = { id: Number(id), name, email, course, age: Number(age) };
  students.push(newStudent);
  res.status(201).json({ message: "Student record created successfully", student: newStudent });
});

app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

app.get('/api/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.status(200).json(student);
});

app.put('/api/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const { name, email, course, age } = req.body;

  if (name) student.name = name;
  if (email) student.email = email;
  if (course) student.course = course;
  if (age) student.age = Number(age);

  res.status(200).json({
    message: "Student record updated successfully",
    student: student
  });
});

app.delete('/api/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1)[0];
  res.status(200).json({
    message: "Student record deleted successfully",
    student: deletedStudent
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});