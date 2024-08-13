const pool = require("../../Config/db");

module.exports.getEventAttendanceRate = async(eventId) => {
    try {
        const query = `SELECT 
                        COUNT(event_id) AS attendance_rate 
                    FROM 
                        attendance 
                    WHERE 
                        event_id = $1;`;

        const attendanceRate = await pool.query(query, [eventId]);

        console.log("Attendance Rate : ", attendanceRate.rows);

        return attendanceRate.rows[0].attendance_rate;

    } catch (error) {
        console.error("Error running sql query: ", error);
        throw error;
    }
}