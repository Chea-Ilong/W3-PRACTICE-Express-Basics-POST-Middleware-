import express from 'express';
import courses from './course.js';
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import auth from './auth.js';

const app = express();
const PORT = 3000;

// Apply logger middleware globally
app.use(logger);

// Route: GET /departments/:dept/courses with validation and auth middleware
app.get('/departments/:dept/courses', auth, validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Filter courses by department (case-insensitive)
    let filteredCourses = courses.filter(
        course => course.department.toUpperCase() === dept.toUpperCase()
    );

    // Apply filters based on query parameters
    if (level) {
        filteredCourses = filteredCourses.filter(
            course => course.level.toLowerCase() === level.toLowerCase()
        );
    }

    if (minCredits) {
        const min = parseInt(minCredits);
        filteredCourses = filteredCourses.filter(
            course => course.credits >= min
        );
    }

    if (maxCredits) {
        const max = parseInt(maxCredits);
        filteredCourses = filteredCourses.filter(
            course => course.credits <= max
        );
    }

    if (semester) {
        filteredCourses = filteredCourses.filter(
            course => course.semester.toLowerCase() === semester.toLowerCase()
        );
    }

    if (instructor) {
        filteredCourses = filteredCourses.filter(
            course => course.instructor.toLowerCase().includes(instructor.toLowerCase())
        );
    }

    // Prepare response
    const response = {
        results: filteredCourses,
        meta: {
            total: filteredCourses.length
        }
    };

    res.json(response);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});