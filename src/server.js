const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const taskRoutes = require('./routes/taskRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const materialRoutes = require('./routes/materialRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const invitationRoutes = require('./routes/invitationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/invitations', invitationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});