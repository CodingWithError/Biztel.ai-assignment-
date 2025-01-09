# React Authentication Application

This project is a React web application that implements user authentication features including signup and login functionality.

## Features

### Signup Page (Material UI Components)
- Responsive signup form with the following fields:
  - Name
  - Email (with validation)
  - Password (with validation)
  - Confirm Password
  - Optional Invite Code
- Form validation for all required fields
- Error handling for:
  - Invalid email format
  - Password mismatch
  - Required field validation
  - API error responses

### Login Page (Custom Components)
- Custom styled login form with:
  - Email field
  - Password field
- Error handling for:
  - Incorrect credentials
  - Required fields
  - API error responses

### API Integration
- Integration with authentication endpoints:
  - Signup: `bffapi.biztel.ai:8080/api/auth/signup`
  - Login: `bffapi.biztel.ai:8080/api/auth/login`
- Proper error handling and user feedback
- Loading states during API calls

## Technical Implementation

### Built With
- React (Vite)
- Material UI for signup page
- Custom CSS for login page
- React Router for navigation
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
- git clone repository-url
- cd <project-directory>
- npm install
- npm run dev