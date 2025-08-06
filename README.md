# Redis Vector Database - Security Policy Search

A semantic search application that uses Redis as a vector database to search through security policies and responses using natural language queries. Built with TypeScript, Redis, and the Xenova transformers library for embedding generation.

## 🎯 Features

- **Semantic Search**: Search security policies using natural language queries
- **Vector Similarity**: Uses HNSW algorithm for fast similarity search
- **Interactive CLI**: Command-line interface for easy querying
- **Real-time Results**: Instant search results with similarity scores
- **Comprehensive Data**: Includes policy tags, responsible individuals, and relevant documents

## 🏗️ Architecture

```
src/
├── handlers/
│   ├── ask-question.ts    # Interactive CLI input handling
│   └── vector-search.ts   # Vector search implementation
├── redis/
│   ├── connect.ts         # Redis client connection
│   ├── create-index.ts    # Vector index creation
│   └── search-schema.ts   # Redis search schema definition
├── seed/
│   ├── index.ts          # Data seeding logic
│   └── responses_dataset.json  # Security policy dataset
├── transformer/
│   └── pipeline.ts       # Embedding generation pipeline
└── index.ts              # Main application entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Redis server running locally or accessible via REDIS_URL
- npm or yarn

### Installation

1. **Clone and install dependencies:**

   ```bash
   cd blog-ts
   npm install
   ```

2. **Start Redis server:**

   ```bash
   # Using Docker (recommended)
   docker run -d -p 6379:6379 redis:latest

   # Or install Redis locally
   # brew install redis (macOS)
   # sudo apt-get install redis-server (Ubuntu)
   ```

3. **Build the project:**

   ```bash
   npm run build
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

### Usage

When you run `npm start`, the application will:

1. **Initialize the database**: Clear existing data and create vector index
2. **Seed the data**: Load security policies and generate embeddings
3. **Prompt for query**: Ask for your search query
4. **Display results**: Show relevant policies with similarity scores

**Example queries:**

- "How do we handle data retention?"
- "What is our password policy?"
- "How do we respond to security incidents?"
- "How do we encrypt customer data?"

## 🔧 Configuration

### Environment Variables

- `REDIS_URL`: Redis connection string (default: `redis://localhost:6379`)

### Redis Index Configuration

The vector index is configured with:

- **Algorithm**: HNSW (Hierarchical Navigable Small World)
- **Distance Metric**: L2 (Euclidean distance)
- **Vector Dimension**: 768 (matches the transformer model)
- **Data Type**: FLOAT32

## 📊 Data Structure

Each security policy contains:

- **Question**: The policy question
- **Response**: Detailed policy response
- **Policy Tag**: Category (e.g., "Data Retention", "Password Policy")
- **Responsible Individuals**: Team members responsible
- **Relevant Documents**: Related documentation
- **Response Embedding**: 768-dimensional vector representation

## 🛠️ Development

### Project Structure

- **TypeScript**: Full type safety with strict configuration
- **Redis**: Vector database with RediSearch module
- **Transformers**: Xenova library for embedding generation
- **ES Modules**: Modern JavaScript module system

### Available Scripts

```bash
npm run build          # Build TypeScript to JavaScript
npm start              # Run the application
npm run start:dev      # Run with nodemon for development
```

### Key Components

#### Vector Search (`handlers/vector-search.ts`)

- Generates embeddings for user queries
- Performs KNN search in Redis
- Returns ranked results with similarity scores

#### Data Seeding (`seed/index.ts`)

- Loads security policy dataset
- Generates embeddings for all responses
- Stores data in Redis with vector embeddings

#### Redis Schema (`redis/search-schema.ts`)

- Defines vector field configuration
- Sets up text and tag fields for metadata
- Configures HNSW algorithm parameters

## 🔍 Search Algorithm

The application uses:

1. **Embedding Generation**: Xenova/all-distilroberta-v1 model
2. **Vector Storage**: Redis with RediSearch module
3. **Similarity Search**: HNSW algorithm for fast KNN queries
4. **Result Ranking**: L2 distance-based similarity scoring

## 📈 Performance

- **Embedding Generation**: ~100ms per query
- **Vector Search**: ~10-50ms depending on dataset size
- **Total Response Time**: ~150-200ms for typical queries

## 🧪 Testing

The application includes a comprehensive dataset of security policies covering:

- Data retention and encryption
- Password and access control policies
- Incident response procedures
- Employee training and compliance
- Network and application security
- Cloud infrastructure security
- Mobile device management
- Vendor risk assessment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

ISC License - see package.json for details

## 🆘 Troubleshooting

### Common Issues

**Redis Connection Error:**

```bash
# Ensure Redis is running
redis-cli ping
# Should return PONG
```

**Vector Dimension Mismatch:**

```bash
# Clear existing data and recreate index
npm start
# The application will automatically clear and recreate the index
```

**Module Resolution Errors:**

```bash
# Rebuild the project
npm run build
```

## 📚 Resources

- [Redis Vector Search Documentation](https://redis.io/docs/stack/search/reference/vectors/)
- [Xenova Transformers](https://github.com/xenova/transformers.js)
- [TypeScript Configuration](https://www.typescriptlang.org/docs/)
- [Node.js ES Modules](https://nodejs.org/api/esm.html)
