const pool = require('../../Config/db');

module.exports.findExistingEventReview = async(guestID, eventID) => {
    try {
        const query = `SELECT
                        *
                    FROM 
                        review
                    WHERE 
                        guest_id = $1 AND event_id = $2;`;
    
        const values = [guestID, eventID];
    
        const response = await pool.query(query, values);
    
        console.log("SQL response: ", response.rows);
    
        return response.rows;
        
    } catch (error) {
        console.error("Error running SQL query: ", error);
        throw error;
    }
}