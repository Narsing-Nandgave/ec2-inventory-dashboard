# 📡 EC2 Inventory Admin Dashboard — API Documentation

This document describes all backend REST API endpoints for the **EC2 Inventory Admin Dashboard**.  
Base URL (development):  



---

## 🧩 Overview

All routes are prefixed with `/api`.  
The backend provides CRUD-style endpoints to:
- Fetch EC2 instance metadata  
- Filter, sort, and paginate results  
- Sync data from AWS EC2 to PostgreSQL  

Authentication is handled using IAM roles (attached to the EC2 instance) or environment AWS credentials.

---

## 🧱 Base URL

/api

GET /api/instances


---

## 📘 Endpoints

### 1. **Get All Instances**

**GET** `/instances`

#### Query Parameters

| Name | Type | Default | Description |
|------|------|----------|--------------|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Records per page |
| `search` | string | — | Search by instance ID or name |
| `state` | string | — | Filter by instance state (running, stopped, etc.) |
| `region` | string | — | Filter by AWS region |
| `sortBy` | string | `launch_time` | Field to sort by |
| `sortOrder` | string | `DESC` | Sort order (`ASC` or `DESC`) |

#### Example Request
```bash
GET /api/instances?page=1&limit=10&state=running


2. Get Single Instance

GET /instances/:instanceId

| Name         | Type   | Description         |
| ------------ | ------ | ------------------- |
| `instanceId` | string | AWS EC2 instance ID |

Example : 

GET /api/instances/i-0a1234b56789cde01

3. Get Instance Statistics

GET /instances/stats

Description

Returns aggregated statistics about EC2 instances (by state, region, etc.)


4. Sync Instances from AWS

POST /instances/sync

Description

Fetches the latest EC2 instances from AWS using the configured IAM role or credentials and updates the database.

Example Request

POST /api/instances/sync


🔒 Security

CORS enabled for allowed origins only (CLIENT_URL from .env)

Helmet.js adds security headers (CSP, X-Frame-Options, etc.)

SQL injection prevention via parameterized queries

Error handling middleware returns sanitized messages in production
