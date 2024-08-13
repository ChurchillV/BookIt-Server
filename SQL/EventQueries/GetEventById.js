const pool = require('../../Config/db');

module.exports.getEventById = async(eventID) => {
    try {
        let query = `SELECT 
                        event.title,
                        event.image, 
                        event.bio, 
                        event.venue, 
                        event.price, 
                        event.event_timestamp, 
                        event.event_limit, 
                        organizer.id AS org_id,
                        organizer.name AS organizer_name, 
                        organizer.logo AS organizer_logo,
                        organizer.contact AS organizer_contact,
                        organizer.email AS organizer_email,
                        organizer.website AS organizer_website
                    FROM 
                        event 
                    FULL JOIN 
                        organizer 
                    ON 
                        event.org_id = organizer.id 
                    WHERE 
                        event.id = $1;`;
    
        const eventData = await pool.query(query, [eventID]);
    
        console.log(eventData.rows[0]);
    
        query = `SELECT 
                    tags 
                FROM 
                    categories 
                WHERE 
                    categories.event_id = $1`;
    
        const eventCategoryInfo = await pool.query(query, [eventID]);
    
        console.log(eventCategoryInfo.rows);
    
        let eventCategories = [];
        
        eventCategoryInfo.rows.map(category => {
            eventCategories.push(category.tags);
        });
        
        query = `SELECT 
                    guest.first_name,
                    guest.last_name,
                    guest.email,
                    review.content,
                    review.rating
                FROM 
                    review
                JOIN    
                    guest
                ON 
                    review.guest_id = guest.id
                WHERE 
                    review.event_id = $1
                GROUP BY 
                    guest.first_name,
                    guest.last_name,
                    guest.email,
                    review.content,
                    review.rating;`;

        const eventReviews = await pool.query(query, [eventID]);

        console.log("Event reviews: ", eventReviews.rows);

        const event = {
            eventData : eventData.rows[0],
            eventCategories : eventCategories,
            eventReviews : eventReviews.rows
        };
    
        return event;
        
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}