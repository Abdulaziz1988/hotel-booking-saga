# Hotel Booking Saga Pattern Example

This project demonstrates the implementation of the Saga pattern in a microservices architecture for a hotel booking application.

## Project Structure

- `services/`: Contains the individual microservices
  - `booking-service/`: Orchestrates the booking process
  - `payment-service/`: Handles payment processing and refunds
  - `hotel-service/`: Manages hotel availability and bookings
- `frontend/`: Simple frontend to interact with the services

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Setup

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

To start all services and the frontend, run:

```bash
npm start
```

This will start the following services:

- Booking Service: http://localhost:3001
- Payment Service: http://localhost:3002
- Hotel Service: http://localhost:3003
- Frontend: http://localhost:3000

## Using the Application

1. Open a web browser and go to http://localhost:3000
2. Fill in the booking form:
   - User ID: Any number (e.g., 1)
   - Hotel ID: 1 (Luxury Hotel) or 2 (Budget Inn)
   - Dates: Comma-separated start and end dates (e.g., 2023-06-01,2023-06-05)
3. Click "Book Hotel" to submit the booking

The application will attempt to process the booking using the saga pattern. The result will be displayed on the page.

## Understanding the Saga Pattern Implementation

This project implements the saga pattern for the hotel booking process. Here's how it works:

1. The booking service acts as the saga orchestrator.
2. The booking process is divided into three steps:
   a. Check hotel availability
   b. Process payment
   c. Confirm hotel booking

3. If any step fails, the saga will execute compensating transactions to undo the previous steps:
   - If payment fails, the hotel availability hold is released.
   - If hotel booking confirmation fails, both the payment is refunded and the hotel availability hold is released.

### Booking Service (Saga Orchestrator)

The booking service coordinates the entire saga. It:

- Initiates each step of the booking process
- Handles errors and triggers compensating transactions when necessary

### Hotel Service

The hotel service manages hotel availability and bookings. It provides endpoints for:

- Checking availability
- Confirming bookings
- Releasing availability (compensating transaction)

### Payment Service

The payment service handles payment processing and refunds. It provides endpoints for:

- Processing payments
- Refunding payments (compensating transaction)

## Error Simulation

To simulate errors and test the saga pattern:

- Hotel availability has a 70% success rate
- Payment processing has an 80% success rate
- Refund processing has a 90% success rate

These simulated error rates allow you to observe how the system handles failures and executes compensating transactions.

## Limitations

This is a simplified example for demonstration purposes. In a production environment, you would need to add:

- Persistent storage for each service
- Proper distributed transaction management
- Idempotency for all operations
- More robust error handling and logging
- Authentication and authorization
- Rate limiting and other security measures

## Conclusion

This project demonstrates a basic implementation of the saga pattern in a microservices architecture. It showcases how long-running transactions can be managed across multiple services, and how compensating transactions can be used to maintain data consistency in the face of failures.
