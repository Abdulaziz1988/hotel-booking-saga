# Hotel Booking Saga Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant BookingService
    participant HotelService
    participant PaymentService

    User->>Frontend: Submit booking form
    Frontend->>BookingService: POST /book
    BookingService->>HotelService: POST /check-availability
    HotelService-->>BookingService: Availability response
    BookingService->>PaymentService: POST /process-payment
    PaymentService-->>BookingService: Payment response
    BookingService->>HotelService: POST /confirm-booking
    HotelService-->>BookingService: Booking confirmation
    BookingService-->>Frontend: Booking result
    Frontend-->>User: Display booking result
```
