// server.js
import express from "express";
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
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
        if (!isNaN(min)) {
            filteredCourses = filteredCourses.filter(
                course => course.credits >= min
            );
        }
    }

    if (maxCredits) {
        const max = parseInt(maxCredits);
        if (!isNaN(max)) {
            filteredCourses = filteredCourses.filter(
                course => course.credits <= max
            );
        }
    }

    // Validate credit range
    if (minCredits && maxCredits) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);
        if (!isNaN(min) && !isNaN(max) && min > max) {
            return res.status(400).json({
                error: 'Invalid credit range: minCredits cannot be greater than maxCredits'
            });
        }
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
