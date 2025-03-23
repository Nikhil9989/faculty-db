/**
 * MongoDB Schema for Faculty Database
 * 
 * This file defines the document schemas and validation rules for storing
 * faculty data in MongoDB. Unlike the SQL schema, this NoSQL approach
 * allows for more flexible, nested document structures and accommodates
 * varying data across different universities.
 */

// Database setup commands
db = db.getSiblingDB('faculty_db');

// Create Collections with JSON Schema Validation

// Universities Collection
db.createCollection('universities', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Name of the university'
        },
        location: {
          bsonType: 'string',
          description: 'University location'
        },
        website: {
          bsonType: 'string',
          description: 'University website URL'
        },
        departments: {
          bsonType: 'array',
          description: 'List of departments within the university',
          items: {
            bsonType: 'object',
            required: ['name'],
            properties: {
              name: {
                bsonType: 'string',
                description: 'Name of the department'
              },
              website: {
                bsonType: 'string',
                description: 'Department website URL'
              }
            }
          }
        },
        created_at: {
          bsonType: 'date',
          description: 'Timestamp of when the document was created'
        },
        updated_at: {
          bsonType: 'date',
          description: 'Timestamp of the last update to the document'
        }
      }
    }
  }
});

// Faculty Collection
db.createCollection('faculty', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['first_name', 'last_name', 'university', 'department'],
      properties: {
        first_name: {
          bsonType: 'string',
          description: 'Faculty member\'s first name'
        },
        last_name: {
          bsonType: 'string',
          description: 'Faculty member\'s last name'
        },
        title: {
          bsonType: 'string',
          description: 'Faculty member\'s title or position'
        },
        email: {
          bsonType: 'string',
          description: 'Faculty member\'s email address'
        },
        profile_url: {
          bsonType: 'string',
          description: 'URL to faculty member\'s profile page'
        },
        university: {
          bsonType: 'object',
          required: ['name'],
          description: 'University information',
          properties: {
            name: {
              bsonType: 'string',
              description: 'Name of the university'
            },
            university_id: {
              bsonType: 'objectId',
              description: 'Reference to university document'
            }
          }
        },
        department: {
          bsonType: 'object',
          required: ['name'],
          description: 'Department information',
          properties: {
            name: {
              bsonType: 'string',
              description: 'Name of the department'
            }
          }
        },
        research_interests: {
          bsonType: 'array',
          description: 'List of research interests',
          items: {
            bsonType: 'string'
          }
        },
        publications: {
          bsonType: 'array',
          description: 'List of publications',
          items: {
            bsonType: 'object',
            properties: {
              title: {
                bsonType: 'string',
                description: 'Title of the publication'
              },
              venue: {
                bsonType: 'string',
                description: 'Publication venue (journal, conference, etc.)'
              },
              year: {
                bsonType: 'int',
                description: 'Publication year'
              },
              doi: {
                bsonType: 'string',
                description: 'Digital Object Identifier'
              },
              url: {
                bsonType: 'string',
                description: 'URL to the publication'
              },
              authors: {
                bsonType: 'array',
                description: 'List of authors',
                items: {
                  bsonType: 'string'
                }
              },
              is_primary_author: {
                bsonType: 'bool',
                description: 'Whether the faculty member is the primary author'
              }
            }
          }
        },
        // Additional flexible fields for unstructured data
        courses: {
          bsonType: 'array',
          description: 'Courses taught by the faculty member',
          items: {
            bsonType: 'object'
          }
        },
        research_projects: {
          bsonType: 'array',
          description: 'Research projects',
          items: {
            bsonType: 'object'
          }
        },
        awards: {
          bsonType: 'array',
          description: 'Awards and recognitions',
          items: {
            bsonType: 'object'
          }
        },
        // Original document storage
        raw_data: {
          bsonType: 'object',
          description: 'Original scraped data in its raw form'
        },
        created_at: {
          bsonType: 'date',
          description: 'Timestamp of when the document was created'
        },
        updated_at: {
          bsonType: 'date',
          description: 'Timestamp of the last update to the document'
        }
      }
    }
  }
});

// Create indexes for efficient queries

// University indexes
db.universities.createIndex({ name: 1 }, { unique: true });
db.universities.createIndex({ "departments.name": 1 });

// Faculty indexes
db.faculty.createIndex({ last_name: 1, first_name: 1 });
db.faculty.createIndex({ email: 1 }, { unique: true, sparse: true });
db.faculty.createIndex({ "university.name": 1, "department.name": 1 });
db.faculty.createIndex({ research_interests: 1 });
db.faculty.createIndex({ "publications.year": 1 });

// Text search index
db.faculty.createIndex(
  { 
    first_name: "text", 
    last_name: "text", 
    "publications.title": "text",
    research_interests: "text"
  },
  {
    weights: {
      last_name: 10,
      first_name: 5,
      research_interests: 3,
      "publications.title": 1
    },
    name: "faculty_text_search"
  }
);

// Sample document to illustrate schema
const sampleFaculty = {
  first_name: "Jane",
  last_name: "Smith",
  title: "Associate Professor",
  email: "jane.smith@stanford.edu",
  profile_url: "https://cs.stanford.edu/people/jsmith",
  university: {
    name: "Stanford University",
    university_id: ObjectId("5f8f8f8f8f8f8f8f8f8f8f8f")
  },
  department: {
    name: "Computer Science"
  },
  research_interests: [
    "Machine Learning",
    "Computer Vision",
    "Artificial Intelligence"
  ],
  publications: [
    {
      title: "Deep Learning for Computer Vision",
      venue: "Conference on Computer Vision and Pattern Recognition",
      year: 2023,
      doi: "10.1145/12345.67890",
      url: "https://doi.org/10.1145/12345.67890",
      authors: ["Jane Smith", "John Doe", "Alice Johnson"],
      is_primary_author: true
    },
    {
      title: "Advances in Neural Networks",
      venue: "Journal of Machine Learning Research",
      year: 2022,
      doi: "10.1145/98765.43210",
      url: "https://doi.org/10.1145/98765.43210",
      authors: ["Bob Brown", "Jane Smith", "Carol White"],
      is_primary_author: false
    }
  ],
  courses: [
    {
      code: "CS231",
      name: "Deep Learning for Computer Vision",
      term: "Spring 2023"
    },
    {
      code: "CS229",
      name: "Machine Learning",
      term: "Fall 2022"
    }
  ],
  research_projects: [
    {
      name: "Neural Scene Representation",
      description: "Research on representing 3D scenes with neural networks",
      funding: "NSF Grant #12345",
      start_date: new Date("2022-01-01"),
      end_date: new Date("2024-12-31")
    }
  ],
  awards: [
    {
      name: "Outstanding Faculty Award",
      organization: "Computer Science Department",
      year: 2022
    }
  ],
  raw_data: {
    // Original scraped data preserved in its original form
    // This can include additional fields not mapped to the schema structure
  },
  created_at: new Date(),
  updated_at: new Date()
};

// Print a confirmation message
print("MongoDB schema for faculty database created successfully");
