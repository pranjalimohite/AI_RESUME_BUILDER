const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  resumeID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  username: String,
  useremailId: String,
  summery: String,
  personalDetails: {
    firstName: String,
    lastName: String,
    jobTitle: String,
    address: String,
    phone: String,
    email: String,
  },
  experience: [
    {
      title: String,
      companyName: String,
      city: String,
      state: String,
      startDate: String,
      endDate: String,
      workSummery: String,
    }
  ],
  education: [
    {
      universityName: String,
      degree: String,
      major: String,
      startDate: String,
      endDate: String,
      description: String,
    }
  ],
  skills: [
    {
      name: String,
      rating: Number,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);