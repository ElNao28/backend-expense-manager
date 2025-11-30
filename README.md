<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# Nest Base – Backend Starter with NestJS

## 📌 Overview

Nest Base is a starter backend template built with **NestJS**, designed to provide a clean, scalable, and production-ready foundation for new projects.  
The goal of this project is to offer a solid structure that includes the most common and essential modules required in modern backend applications, allowing developers to build faster and with best practices from the beginning.

This base is ideal for projects that need authentication, role management, protected routes, file handling, and email support. It is lightweight, easy to extend, and works as a good starting point for APIs, microservices, and monolithic applications.

---

## 📦 Tech Stack

- **NestJS** (main framework)
- **TypeScript**
- **TypeORM / PostgreSQL**
- **Nodemailer**
- **Multer**
- **JWT**
- **Class Validator / Transformer**

---

## 🚀 Features Included

### **🔐 Authentication & Authorization**
A complete auth module that handles:
- **User registration and login**
- **JWT-based authentication**
- **Role-based access control (RBAC)**
- **Route protection with guards**
- Basic CRUD operations for:
  - Users
  - Roles

This module serves as the foundation for secure endpoints and controlled access across the application.

---

### **📁 File Upload Module**
A reusable file uploader implemented with Multer and NestJS, supporting:
- Single and multiple file uploads  
- Local storage strategy  
- Basic validation (size, type)

This module can later be expanded to support cloud storage (AWS S3, Cloudinary, etc.).

---

### **📧 Email Module**
A flexible mailing module built to:
- Send transactional emails
- Use dynamic email templates
- Configure SMTP or external providers

Common use cases include account confirmations, password resets, and notification emails.

---

## 🎯 Purpose of the Project

The main objective of this repository is to serve as a **ready-to-use backend base** for personal or professional projects.  
Instead of starting from scratch every time, this template provides:

- A clean project structure  
- Common modules used in real applications  
- Strong separation of concerns (controllers, services, entities)  
- Scalable and maintainable code using NestJS best practices  

This setup speeds up development and ensures consistency across new projects.

---

## 🚀 Quick Start

```bash
# Install all project dependencies
npm install

# Start the development server with hot reload
npm run start:dev

# (Optional) Start Docker services like database, cache, etc.
docker compose up -d

# Run all tests
npm run test

# Build the project for production
npm run build

# Start the production server
npm run start:prod