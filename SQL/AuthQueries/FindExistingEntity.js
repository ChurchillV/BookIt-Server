const pool = require('../../Config/db');

// Utility for finding all existing entities in any table
const findByAttribute = async (tableName, attributeName, attributeValue) => {
    try {
        const query = `SELECT * FROM ${tableName} WHERE ${attributeName} = $1`;
        const values = [attributeValue]
        const result = await pool.query(query, values);
        console.log("Entity Details: ", result.rows);
        return result.rows;
    } catch (error) {
        console.error("Attribute error: " ,error);
        throw error;
    }
}


module.exports = { findByAttribute };