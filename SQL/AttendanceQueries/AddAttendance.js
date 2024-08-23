const pool  = require('../../Config/db');

module.exports.addAttendance = async(userID, eventID) => {
   try {
    let query = `INSERT INTO attendance (guest_id, event_id)
                  VALUES ($1, $2)
                  RETURNING *;`;

    const values = [userID, eventID];

    const response = await pool.query(query, values);

    console.log("Response: ", response.rows);

    return response.rows;
    
   } catch (error) {
    console.error(error);
    throw error;
   }
}