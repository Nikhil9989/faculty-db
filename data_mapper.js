/**
 * Data Mapper Utility for Faculty Database
 * 
 * Provides functions to map data between SQL and MongoDB schemas,
 * allowing for bidirectional synchronization between databases.
 */

/**
 * Maps SQL faculty data to MongoDB document format
 * 
 * @param {Object} sqlData - Faculty data from SQL database
 * @returns {Object} - MongoDB document structure
 */
function sqlToMongo(sqlData) {
  // Example implementation for converting SQL query results to MongoDB document format
  return {
    first_name: sqlData.first_name,
    last_name: sqlData.last_name,
    title: sqlData.title,
    email: sqlData.email,
    profile_url: sqlData.profile_url,
    university: {
      name: sqlData.university_name,
      university_id: sqlData.university_id
    },
    department: {
      name: sqlData.department_name
    },
    research_interests: sqlData.research_interests || [],  // Assuming this is an array in SQL result
    publications: sqlData.publications || [],              // Assuming this is an array in SQL result
    created_at: sqlData.created_at,
    updated_at: sqlData.updated_at,
    // Store the original SQL IDs for reference and synchronization
    _sql_ids: {
      faculty_id: sqlData.faculty_id,
      department_id: sqlData.department_id,
      university_id: sqlData.university_id
    }
  };
}

/**
 * Maps MongoDB faculty document to SQL table format
 * 
 * @param {Object} mongoData - Faculty document from MongoDB
 * @returns {Object} - Structured data for SQL tables
 */
function mongoToSql(mongoData) {
  // Return object containing data for different SQL tables
  return {
    // Universities table data
    university: {
      university_id: mongoData._sql_ids?.university_id,  // Use existing ID if available
      name: mongoData.university.name,
      location: mongoData.university.location,
      website: mongoData.university.website
    },
    
    // Departments table data
    department: {
      department_id: mongoData._sql_ids?.department_id,  // Use existing ID if available
      university_id: mongoData._sql_ids?.university_id,
      name: mongoData.department.name,
      website: mongoData.department.website
    },
    
    // Faculty table data
    faculty: {
      faculty_id: mongoData._sql_ids?.faculty_id,  // Use existing ID if available
      department_id: mongoData._sql_ids?.department_id,
      first_name: mongoData.first_name,
      last_name: mongoData.last_name,
      title: mongoData.title,
      email: mongoData.email,
      profile_url: mongoData.profile_url
    },
    
    // Research interests data
    research_interests: (mongoData.research_interests || []).map(interest => ({ name: interest })),
    
    // Publications data
    publications: (mongoData.publications || []).map(pub => ({
      title: pub.title,
      venue: pub.venue,
      year: pub.year,
      doi: pub.doi,
      url: pub.url,
      is_primary_author: pub.is_primary_author
    }))
  };
}

/**
 * Synchronizes data between SQL and MongoDB
 * 
 * @param {string} direction - 'sql-to-mongo' or 'mongo-to-sql'
 * @param {Object} data - Data to synchronize
 * @param {Object} options - Synchronization options
 * @returns {Promise} - Resolves when synchronization is complete
 */
async function synchronizeData(direction, data, options = {}) {
  if (direction === 'sql-to-mongo') {
    const mongoDoc = sqlToMongo(data);
    // Implementation would include MongoDB database operations
    return mongoDoc;
  } 
  else if (direction === 'mongo-to-sql') {
    const sqlData = mongoToSql(data);
    // Implementation would include SQL database operations
    return sqlData;
  }
  else {
    throw new Error(`Invalid synchronization direction: ${direction}`);
  }
}

// Export functions if using in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sqlToMongo,
    mongoToSql,
    synchronizeData
  };
}
