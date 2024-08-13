const { findByAttribute } = require("../../SQL/AuthQueries/FindExistingEntity");
const { getEventAttendanceList } = require("../../SQL/EventQueries/GetEventAttendanceList");
const { getEventAttendanceRate } = require("../../SQL/EventQueries/GetEventAttendanceRate");

module.exports.GetEventAttendanceList = async(req, res) => {
    try {
        const eventId = req.params.eventId;

        const existingEvent = await findByAttribute('event', 'id', eventId);

        if(!existingEvent.length) {
            console.log("Event not found");
            res.send({ message : "Event not found" });
            return;
        }

        const attendanceList = await getEventAttendanceList(eventId);
        const attendanceRate = await getEventAttendanceRate(eventId);

        console.log("attendance List: ", attendanceList);

        res.status(200)
           .send({
                message : "Attendance list returned successfully",
                attendanceList : attendanceList,
                attendanceRate : attendanceRate
        });
        
    } catch (error) {
        console.error("Error handling request: ", error);
        res.status(500)
           .send({ message : "Internal server error"});
        throw error;
    }
}