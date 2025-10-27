# 🌍 Earthquake Data Stream Producer (`earthquake-service`)

This microservice is a simple **Producer** application designed to simulate and publish continuous, real-time event data (simulated earthquake events) to an Apache Kafka topic. It is built on **Express.js** and uses the `node-rdkafka` library for high-performance streaming.

## ✨ Key Features

  * **Real-Time Simulation:** Generates synthetic earthquake events (ID, magnitude, location, timestamp) at a high frequency (e.g., every 100ms).
  * **Kafka Producer:** Uses **`node-rdkafka`** to publish events efficiently to a designated Kafka topic.
  * **API Control:** Provides simple REST endpoints (`/start` and `/stop`) to control the event stream flow.
  * **Stateless Design:** Focuses purely on data generation and publishing.
  * **Configuration:** Manages Kafka connection details and application port using **`dotenv`** and **Joi** validation.

-----

## 🛠️ System Requirements

To run this project, you need the following installed:

1.  **Node.js** (v18 or higher)
2.  **npm** (Node Package Manager)
3.  **Docker & Docker Compose** (to run Kafka, Zookeeper, and Kafka UI)
4.  **Postman** or **curl** (for testing the API control endpoints)

-----

## ⚙️ Configuration and Local Execution

### Step 1: Clone the Repository & Install Dependencies

```bash
# Clone the repository
git clone [Your Repository URL] earthquake-service
cd earthquake-service

# Install Node.js packages
npm install
```

### Step 2: Configure Environment Variables

Create a **`.env`** file in the project's `configs` directory with the following variables. These connect the service to the running Kafka cluster.

```env
# SERVER CONFIGURATION
PORT=3001

# KAFKA CONFIGURATION
KAFKA_CLIENT_ID=earthquake-service
# Use the external port mapped in docker-compose
KAFKA_BROKERS=localhost:29092
KAFKA_TOPIC=earthquake-service-topic
```

### Step 3: Start the Infrastructure (Kafka Cluster)

This service requires a running Kafka cluster. Use the included `docker-compose.yml` file to launch Kafka and its dependencies (Zookeeper, Kafka UI).

```bash
docker compose up -d
```

*(Verify Kafka is running and accessible on port 29092.)*

### Step 4: Start the Microservice

```bash
# Start the Express server
npm start
```

You should see the message: `earthquake service started { port: 3001 }`

-----

## 🌐 API Endpoints (Stream Control)

The service provides two **POST** endpoints to manage the continuous data stream.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/earthquake-events/start` | **Starts** the continuous generation and publishing of earthquake events to the Kafka topic. |
| **POST** | `/earthquake-events/stop` | **Stops** the continuous event generation and clears the internal stream interval. |

### How to Test (Using curl)

1.  **Start the Stream:**

    ```bash
    curl -X POST http://localhost:3001/earthquake-events/start
    # Output: Earthquake event stream started
    ```

    (The console will now show messages being queued to Kafka.)

2.  **Stop the Stream:**

    ```bash
    curl -X POST http://localhost:3001/earthquake-events/stop
    # Output: Earthquake event stream stopped
    ```

-----

## 💻 Project Structure

```
.
├── configs/
│   └── .env            # Environment variables
├── src/
│   ├── config/         # Configuration validation logic (Joi)
│   ├── services/       # Producer logic (earthquake.js)
│   ├── index.js        # Main entry point (server setup)
│   └── app.js          # Express app and API routes
├── docker-compose.yml  # Kafka, Zookeeper, Kafka UI definition
└── package.json
```

-----

## 🧑‍💻 Contributions

Feel free to open issues or submit pull requests for bug fixes, new features, or improvements\!