# AWS Educate 證照陪跑計劃 CPE Workshop - 哈利波特分類帽

## Project Structure

```plaintext
cpe_workshop/
│
├── backend/                       # 後端程式碼目錄
│   └── app.py     # Flask 後端程式碼
│
├── frontend/                      # 前端程式碼目錄
│   ├── index.html                 # 前端主要 HTML 檔案
│   └── style.css                  # 前端樣式表 (CSS)
│
└── README.md                      # 專案說明文件
```

## Features

- Dynamic quiz questions from the backend.
- Real-time result calculation based on user responses.
- Simple and lightweight implementation for learning purposes.

## Setup Instructions

### Backend

1. Navigate to the backend/ directory:

   ```bash
   cd backend
   ```

2. Install required Python packages:

   ```bash
   pip install flask flask-cors
   ```

3. Run the backend server:

   ```bash
   python app.py
   ```

### Frontend

1. Navigate to the frontend/ directory:

   ```bash
   cd frontend
   ```

2. Start a simple HTTP server:

   ```bash
   python -m http.server
   ```

3. Open a browser and visit:

   ```plaintext
   http://127.0.0.1:8000
   ```
