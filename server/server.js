const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// In-memory storage array for registrations so they persist while server runs
let registrationsList = [
  { id: 1, school: 'Injibara', grade_level: 'Grade 9', guardian_name: 'Kebede Alemu', status: 'Pending' },
  { id: 2, school: 'Dangila', grade_level: 'Grade 10', guardian_name: 'Almaz Tadesse', status: 'Approved' }
];

// Test Route
app.get('/api', (req, res) => {
  res.json({ message: "SRMS Backend is running!" });
});

// Unified Auth Register Route
app.post('/api/auth/register', (req, res) => {
  try {
    console.log("Received registration body:", req.body);
    
    const newRegistration = {
      id: Date.now(),
      school: req.body.school || 'Injibara',
      grade_level: req.body.grade_level || 'N/A',
      guardian_name: req.body.guardian_name || req.body.full_name || 'N/A',
      email: req.body.email || '',
      status: 'Pending'
    };

    // Save to our array
    registrationsList.push(newRegistration);

    res.status(201).json({ 
      success: true, 
      message: 'Registered successfully', 
      registration: newRegistration 
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// Mock Auth Login Route
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const role = email && email.includes('admin') ? 'admin' : 'student';
  res.json({
    success: true,
    token: "mock-jwt-token-12345",
    user: { id: 1, email, role }
  });
});

// Admin Registrations Route (Returns live array including new sign-ups)
app.get('/api/admin/registrations', (req, res) => {
  const { school } = req.query;
  let results = registrationsList;

  if (school) {
    results = results.filter(reg => reg.school === school);
  }

  res.json({ registrations: results });
});

// Admin Statistics Route
app.get('/api/admin/statistics', (req, res) => {
  const total = registrationsList.length;
  const pending = registrationsList.filter(r => r.status === 'Pending').length;
  const approved = registrationsList.filter(r => r.status === 'Approved').length;
  const rejected = registrationsList.filter(r => r.status === 'Rejected').length;

  res.json({
    total,
    byStatus: { Pending: pending, Approved: approved, Rejected: rejected },
    bySchool: ['Injibara', 'Dangila', 'Tilili'].map(schName => {
      const schRegs = registrationsList.filter(r => r.school === schName);
      return {
        school: schName,
        total: schRegs.length,
        approved: schRegs.filter(r => r.status === 'Approved').length,
        pending: schRegs.filter(r => r.status === 'Pending').length,
        rejected: schRegs.filter(r => r.status === 'Rejected').length,
      };
    })
  });
});

// Admin Action Route (Approve / Reject)
app.patch('/api/admin/registrations/:id/:action', (req, res) => {
  const { id, action } = req.params;
  const { remark } = req.body;
  
  const registration = registrationsList.find(r => r.id == id);
  if (registration) {
    registration.status = action === 'approve' ? 'Approved' : 'Rejected';
    registration.remark = remark;
  }

  res.json({ success: true, message: `Registration successfully ${action}d` });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});