-- Faculty Database Schema
-- This schema defines the structure for storing faculty data from universities

-- Create Universities table
CREATE TABLE universities (
    university_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on university name for faster lookups
CREATE INDEX idx_university_name ON universities(name);

-- Create Departments table
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    university_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (university_id) REFERENCES universities(university_id)
);

-- Create index on department name and university_id for faster joins
CREATE INDEX idx_department_name ON departments(name);
CREATE INDEX idx_department_university ON departments(university_id);

-- Create Faculty table
CREATE TABLE faculty (
    faculty_id SERIAL PRIMARY KEY,
    department_id INTEGER NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    title VARCHAR(100),
    email VARCHAR(100),
    profile_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Create indexes for faculty lookups and joins
CREATE INDEX idx_faculty_last_name ON faculty(last_name);
CREATE INDEX idx_faculty_department ON faculty(department_id);
CREATE INDEX idx_faculty_email ON faculty(email);
CREATE INDEX idx_faculty_name ON faculty(last_name, first_name);

-- Create Research Interests table
CREATE TABLE research_interests (
    interest_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on research interest name
CREATE INDEX idx_interest_name ON research_interests(name);

-- Create Faculty Research Interests (many-to-many relationship)
CREATE TABLE faculty_research_interests (
    faculty_id INTEGER NOT NULL,
    interest_id INTEGER NOT NULL,
    PRIMARY KEY (faculty_id, interest_id),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (interest_id) REFERENCES research_interests(interest_id)
);

-- Create indexes for efficient lookups and joins on both sides of the relationship
CREATE INDEX idx_fri_faculty ON faculty_research_interests(faculty_id);
CREATE INDEX idx_fri_interest ON faculty_research_interests(interest_id);

-- Create Publications table
CREATE TABLE publications (
    publication_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    venue VARCHAR(100),
    year INTEGER,
    doi VARCHAR(100),
    url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes on publication attributes commonly used in searches
CREATE INDEX idx_publication_year ON publications(year);
CREATE INDEX idx_publication_title ON publications(title);
CREATE INDEX idx_publication_venue ON publications(venue);

-- Create Faculty Publications (many-to-many relationship)
CREATE TABLE faculty_publications (
    faculty_id INTEGER NOT NULL,
    publication_id INTEGER NOT NULL,
    is_primary_author BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (faculty_id, publication_id),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (publication_id) REFERENCES publications(publication_id)
);

-- Create indexes for efficient lookups and joins for publication authorship
CREATE INDEX idx_fp_faculty ON faculty_publications(faculty_id);
CREATE INDEX idx_fp_publication ON faculty_publications(publication_id);
CREATE INDEX idx_fp_primary_author ON faculty_publications(faculty_id, is_primary_author);

-- Common query optimization: Partial index for primary authors
CREATE INDEX idx_primary_authors ON faculty_publications(faculty_id, publication_id) 
WHERE is_primary_author = TRUE;
