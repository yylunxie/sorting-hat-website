# AWS Educate TW Cloud Ambassador led- Certificate Buddy Program CPE Workshop - Sorting Hat Quiz

This project is a simple **Sorting Hat Quiz** inspired by Harry Potter, designed to help participants learn **AWS Cloud Services** by deploying **a static website (S3)** with **a backend API (EC2 & Flask)**.

## 📂 Project Structure

```plaintext
cpe_workshop/
│
├── backend/                       # Backend code
│   ├── app.py                     # Flask application
│   └── run.sh                     # Script to start the backend
│
├── frontend/                      # Frontend code (S3)
│   ├── index.html                 # Main HTML file
│   ├── style.css                  # Stylesheet
│   └── script.js                  # Javascript logic
│
└── README.md                      # Project documentation
```

## 🎯 Features

**Frontend (S3 Static Website)**

- Dynamically fetch quiz questions from the backend
- Interactive quiz experience with real-time results
- Simple and lightweight UI

**Backend (EC2 Flask API)**

- Provides quiz questions (/questions endpoint)
- Processes user responses and returns results (/submit endpoint)
- Supports CORS for S3 API access

**AWS Cloud Architecture**

- S3: Static website hosting
- EC2: Flask backend API
- Elastic IP: Ensures API URL remains unchanged
- Security Groups: Opens port 8080 for API access

## Setup Instructions

### 📌 1️⃣ AWS Services (EC2 & S3)

You can follow this [tutorial](https://yylunxie.notion.site/Sorting-Hat-Quiz-AWS-198535036c1780bb98b9e9552e1dd060?pvs=4).

### 📌 2️⃣ Deploying the Frontend (S3)

1. **Upload files to the S3 bucket**

   Upload all three files, `index.html`, `stlye.css`, and `script.js` to your S3 bucket.

### 📌 3️⃣ Deploying the Backend (EC2 & Flask API)

1. **Upload files to EC2**

   First, ssh to your EC2 instance.

   Second, upload `backend` folder to your EC2 instance.

2. **Navigate to the backend/ directory:**

   ```bash
   cd backend
   ```

3. **Required Python packages:**

   All required python packages would be installed when launching an EC2 instance.

4. **Run the backend server:**

   ```bash
   cd backend
   chmod +x run.sh
   ./run.sh
   ```
