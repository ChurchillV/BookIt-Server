const pool = require('../../Config/db');

module.exports.getUserProfile = async(userId) => {
    try {
        const query = `SELECT
                        guest.email,
                        guest.first_name,
                        guest.last_name,
                        guest.password,
                        guest.image,
                        ARRAY_AGG(interest.interest) AS interests
                    FROM 
                        guest
                    LEFT JOIN 
                        interest
                    ON 
                        interest.guest_id = guest.id
                    WHERE 
                        guest.id = $1
                    GROUP BY
                        guest.email,
                        guest.first_name,
                        guest.password,
                        guest.last_name;`;

        const userProfile = await pool.query(query, [userId]);

        console.log("User profile: ", userProfile.rows);

        return userProfile.rows;

    } catch (error) {
        console.error("Error running query: ", error);
        throw error;
    }
}