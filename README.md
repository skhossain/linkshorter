## About Sheba Short Link Service

Sheba Short Link Service is a reliable and efficient URL shortening platform designed to create compact, shareable links from lengthy URLs. It ensures link uniqueness and provides a user-friendly experience for generating short URLs. With a focus on scalability, the service employs robust algorithms and caching mechanisms to handle large-scale requests efficiently. Features include easy integration, real-time analytics, and secure redirection, making it ideal for individuals and businesses seeking simplified and trackable URL management.

## Requirements

Ensure your environment meets the following requirements:

- PHP 8.2 or higher
- Composer 2.5 or higher
- MySQL 8.0 or higher
- Node.js 18.x or higher with npm/yarn
- A web server like Apache/Nginx

---

## Installation Instructions

Follow these steps to set up and run the project:

### 1. Clone the Repository
```bash
git clone https://github.com/skhossain/linkshorter.git
cd linkshorter
```
### 2. Install Dependencies
Install PHP dependencies:

```bash
composer install
```
Install Node.js dependencies:
```bash
npm install
```
### 3. Configure Environment Variables
Copy the .env.example file to .env:
```bash
cp .env.example .env
```
## Update the .env file with your local environment settings:
Database credentials (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
Other necessary configurations

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Set Up the Database
Create a database for the project.
Run the migrations to set up database tables:
```bash
php artisan migrate
```

### 6. Run the Application
Compile front-end assets:
```bash
npm run dev
```
Start the Laravel development server:
```bash
php artisan serve
```

Access the application at http://localhost:8000.
