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

-- Create Research Interests table
CREATE TABLE research_interests (
    interest_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Faculty Research Interests (many-to-many relationship)
CREATE TABLE faculty_research_interests (
    faculty_id INTEGER NOT NULL,
    interest_id INTEGER NOT NULL,
    PRIMARY KEY (faculty_id, interest_id),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (interest_id) REFERENCES research_interests(interest_id)
);

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

-- Create Faculty Publications (many-to-many relationship)
CREATE TABLE faculty_publications (
    faculty_id INTEGER NOT NULL,
    publication_id INTEGER NOT NULL,
    is_primary_author BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (faculty_id, publication_id),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (publication_id) REFERENCES publications(publication_id)
);
