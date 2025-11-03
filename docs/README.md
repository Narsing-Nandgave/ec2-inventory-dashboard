# 🖥️ EC2 Inventory Admin Dashboard

A full-stack web application that fetches **AWS EC2 instance metadata**, stores it in **PostgreSQL**, and provides an **interactive admin dashboard** for monitoring, filtering, and analyzing EC2 instances.

---

## 🚀 Project Overview

This project demonstrates how to integrate AWS services with a modern web stack — Node.js, React, and PostgreSQL — using industry best practices for scalable, secure, and production-ready cloud apps.

---

## 🏗️ Architecture Overview

### System Components
1. **Backend (Node.js + Express.js)**
   - RESTful API with CRUD operations  
   - AWS SDK v3 integration for EC2 data retrieval  
   - PostgreSQL connection and ORM models  
   - Security middleware (helmet, rate limiter, CORS)  
   - Sync service to auto-fetch EC2 metadata  

2. **Frontend (React)**
   - Interactive dashboard with charts & tables  
   - Search, filter, and pagination  
   - Real-time instance stats and visualization  

3. **Database (PostgreSQL)**
   - Normalized schema with indexed queries  
   - JSONB columns for tags and security groups  
   - Auto timestamps and efficient indexing  

4. **AWS Services**
   - EC2 for metadata
   - IAM roles for secure access

---

## 📂 Project Structure

ec2-inventory-dashboard/
│
├── backend/
│ ├── config/
│ │ ├── database.js
│ │ └── aws.js
│ ├── models/
│ │ └── ec2Instance.js
│ ├── routes/
│ │ └── instances.js
│ ├── controllers/
│ │ └── instanceController.js
│ ├── services/
│ │ ├── awsService.js
│ │ └── syncService.js
│ ├── middleware/
│ │ ├── errorHandler.js
│ │ └── rateLimiter.js
│ ├── scripts/
│ │ └── syncEC2Data.js
│ ├── .env.example
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── index.jsx
│ └── package.json
│
├── database/
│ └── schema.sql
│
└── docs/
├── API.md
├── README.md



---

## 🧰 Technology Stack

**Backend**
- Node.js 18+, Express.js, AWS SDK v3  
- PostgreSQL (pg driver)
- Helmet, Rate limiter, CORS  
- dotenv for config management  

**Frontend**
- React 18+, Axios, TanStack Table  
- Recharts (charts), React Router  

**Database**
- PostgreSQL 14+ with indexed schema  

---

## 🛡️ AWS IAM Configuration

### 1. Create IAM Policy (`EC2ReadOnlyAccess`)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus",
        "ec2:DescribeInstanceTypes",
        "ec2:DescribeTags",
        "ec2:DescribeRegions"
      ],
      "Resource": "*"
    }
  ]
}

```

2. Create IAM Role

Role name: EC2-Inventory-Role

Attach the above policy

Attach role to your EC2 instance under:
Actions → Security → Modify IAM Role

⚙️ Installation & Setup
Prerequisites

Node.js 18+

PostgreSQL 14+

AWS Account with EC2 access

Step 1: Clone Repository

git clone <repository-url>
cd ec2-inventory-dashboard

Step 2: Backend Setup

cd backend
npm install

Create .env:

NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ec2_inventory
DB_USER=postgres
DB_PASSWORD=your_password

AWS_REGION=us-east-1

Step 3: Database Setup

createdb ec2_inventory
psql -d ec2_inventory -f ../database/schema.sql


Step 4: Frontend Setup

cd ../frontend
npm install

Create .env:

REACT_APP_API_URL=http://localhost:5000/api

Step 5: Run the Application

# Terminal 1
cd backend
npm start

# Terminal 2
cd frontend
npm run dev







