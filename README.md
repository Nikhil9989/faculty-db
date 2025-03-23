# Faculty Database

A database design and storage solution for managing faculty profiles from top AI/ML universities.

## Overview

This repository contains database schemas and related code for storing, querying, and managing faculty data collected from university websites. The data includes:

- Faculty basic information (name, title, contact details)
- University and department affiliations
- Research interests
- Publications

## Database Options

This project supports two different database approaches:

### Relational Database (SQL)

The SQL schema is designed to capture the hierarchical structure of universities, departments, and faculty members, along with many-to-many relationships for research interests and publications.

#### Entity Relationship Diagram

```
Universities 1:N Departments 1:N Faculty N:M Research Interests
                                    |
                                    N:M
                                    |
                                Publications
```

#### Tables

- **universities**: Stores information about universities
- **departments**: Stores department data linked to universities
- **faculty**: Stores faculty profiles linked to departments
- **research_interests**: Stores research interest categories
- **faculty_research_interests**: Links faculty to their research interests
- **publications**: Stores publication information
- **faculty_publications**: Links faculty to their publications

### Document Database (MongoDB)

The MongoDB schema provides a more flexible approach, allowing for:

- Nested document structures
- Variable fields across different faculty
- Unstructured or semi-structured data
- Original data preservation

#### Collections

- **universities**: Stores university information with nested departments
- **faculty**: Stores faculty profiles with embedded publications and research interests

## Data Synchronization

The project includes utilities for mapping data between SQL and MongoDB schemas, allowing for:

- Bidirectional synchronization
- Polyglot persistence
- Consistent data across storage systems

## Usage

### SQL Implementation

To initialize the database with the SQL schema:

```bash
# PostgreSQL
psql -U username -d faculty_db -f schema.sql

# MySQL
mysql -u username -p faculty_db < schema.sql
```

### MongoDB Implementation

To initialize MongoDB with the document schema:

```bash
# Execute the schema creation script
mongo < mongodb_schema.js
```

### Data Mapping

To convert between SQL and MongoDB data formats:

```javascript
// Example Node.js usage
const { sqlToMongo, mongoToSql } = require('./data_mapper');

// Convert SQL query result to MongoDB document
const mongoDoc = sqlToMongo(sqlQueryResult);

// Convert MongoDB document to SQL tables data
const sqlData = mongoToSql(mongoDocument);
```

## Future Enhancements

- Add GraphQL API layer for unified access
- Implement full-text search capabilities
- Add data validation and cleaning utilities
- Develop migration scripts and versioning system
