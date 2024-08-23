const pool = require('../../Config/db');

module.exports.editProfile = async(table ,attributes, id) => {
    // Logic: 
    // `attributes` contains a key-value pairing of all the attributes we're going to update
    // We want to insert all these values dynamically into the query
    // Steps:
    // 1 - Create a mapping of object keys and respective indexes. 
    // Key stands for the name of the attribute we are updating
    //  Index will be the placeholder parameter for updating the table
    // 2 - Pass the object values in the values array , alongside the user id
    // 3 - For the user id, we pass at at the end of the values array. Hence, to reference it, 
    //     we go the entire length of the attribute values array (since the parameter strings)
    //     start from 1

    try {
        console.log("Attributes: ", attributes);
        const attributesToUpdate = Object.keys(attributes).length > 1 ?
        Object.keys(attributes).map((key, index) => {
            return `${key} = $${index + 1}`;
        }).join(' ,')
        : 
        Object.keys(attributes).map((key, index) => {
            return `${key} = $${index + 1}`;
        });

        const values = [...Object.values(attributes), parseInt(id)];

        const query = `UPDATE 
                        ${table}
                       SET 
                        ${attributesToUpdate}
                       WHERE
                        id = $${values.length}
                       RETURNING *`;

        const response = await pool.query(query, values);

        console.log(response.rows[0]);

        return response.rows;

    } catch(error) {
        console.error("Error editing entity: ", error);
        throw error;
    }
}