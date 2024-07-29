const pool = require('../../Config/db');

module.exports.getAllEventsBookedByUser = async(userId) => {
    try {
        const query = `SELECT 
                        event.id AS event_id, 
                        event.title, 
                        event.image,
                        event.event_timestamp, 
                        event.price,
                        event.bio, 
                        event.venue, 
                        event.event_limit,
                        organizer.id AS org_id,
                        organizer.name AS organizer_name,
                        organizer.logo AS organizer_logo,
                        ARRAY_AGG(categories.tags) AS event_tags
                    FROM 
                        event
                    JOIN 
                        organizer
                    ON  
                        event.org_id = organizer.id
                    JOIN 
                        categories
                    ON 
                        categories.event_id = event.id
                    JOIN 
                        booking
                    ON 
                        booking.event_id = event.id
                    WHERE 
                        booking.guest_id = $1
                    GROUP BY
                        event.id, 
                        event.title, 
                        event.image,
                        event.event_timestamp, 
                        event.price,
                        event.bio, 
                        event.venue, 
                        event.event_limit,
                        organizer.name,
                        organizer.logo,
                        organizer.id;`;

        const bookedEventsData = await pool.query(query, [userId]);

        console.log("Events booked by user: ", bookedEventsData.rows);

        return bookedEventsData.rows;

    } catch (error) {
        console.error("Error running query: ", error);
        throw error;
    }
}