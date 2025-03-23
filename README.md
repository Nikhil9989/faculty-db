# Faculty Database

A database design and storage solution for managing faculty profiles from top AI/ML universities.

## Overview

This repository contains database schemas and related code for storing, querying, and managing faculty data collected from university websites. The data includes:

- Faculty basic information (name, title, contact details)
- University and department affiliations
- Research interests
- Publications

## Schema Design

The database is designed with a relational schema that captures the hierarchical structure of universities, departments, and faculty members, along with many-to-many relationships for research interests and publications.

### Entity Relationship Diagram

```
Universities 1:N Departments 1:N Faculty N:M Research Interests
                                    |
                                    N:M
                                    |
                                Publications
```

### Tables

- **universities**: Stores information about universities
- **departments**: Stores department data linked to universities
- **faculty**: Stores faculty profiles linked to departments
- **research_interests**: Stores research interest categories
- **faculty_research_interests**: Links faculty to their research interests
- **publications**: Stores publication information
- **faculty_publications**: Links faculty to their publications

## Usage

To initialize the database with the schema:

```bash
# PostgreSQL
psql -U username -d faculty_db -f schema.sql

# MySQL
mysql -u username -p faculty_db < schema.sql
```

## Future Enhancements

- Add indexes for improved query performance
- Support for NoSQL databases for more flexible schema
- Data migration scripts
- API for accessing the faculty data
