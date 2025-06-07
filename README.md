# Barbers-Booking-App

Barbers Booking App is a modern full-stack web application designed to connect clients with professional barbers. Users can easily discover barbers, explore their services, and book appointments based on real-time availability. Barbers can register, promote their business, manage schedules, and receive appointment requests directly through the platform. The app features secure user authentication, a clean and responsive user interface, and automated email notifications for booking confirmations — ensuring a seamless experience for both clients and barbers.

## Technologies Used

- **Frontend**: React + TypeScript + Tailwind CSS  
- **Backend**: NestJS w/ TypeORM  
- **Database**: PostgreSQL

## How to start it

### Prerequisites

- Node.js  
- PostgreSQL

### Installation

1. First, clone the repository
2. Install dependencies for the frontend:  
   `cd /client`  
   `npm install`
3. Install dependencies for the backend:  
   `cd ../server`  
   `npm install`
4. Create a PostgreSQL database named `barbers-booking-db` and configure the `.env` files for both frontend and backend.

### Usage

(Open two terminals for smoother development)

1. Start the backend server:  
   `npm run start:dev`
2. Start the frontend server:  
   `npm run dev`
3. Open your web browser and visit the frontend URL to access the Barbers Booking App.

## Features

- Browse and view a list of barbers and their services
- Register and log in as barber
- Barbers can create, update, and manage their prfoile, schedule and services
- Calendar view for managing appointments
- Clients can book appointments based on barber availability
- Email notifications for booking confirmations and updates ( currently commented )
- Multi-language support  
- Responsive UI with modern design

## Planned Features

- Review and rating system for barbers
- SMS validation for booking appointment
- In-app notifications for updates and reminders
- Admin dashboard for monitoring users and analytics
- Payment integration (Stripe/PayPal)


