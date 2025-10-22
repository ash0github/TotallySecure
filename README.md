# 🛡️ TotallySecure

A full-stack secure authentication and transaction platform built with React, Express, and HTTPS. Designed for modularity, resilience, and premium UX.

---

## 🚀 Setup Instructions ~Kiro

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/your-username/totallysecure.git
cd totallysecure
```

Open the project in Visual Studio Code.

### 2. 🧪 Install Dependencies

Split your terminal and run the following in each pane:
# Terminal 1
```
cd backend
npm ci
```
# Terminal 2
```
cd frontend
npm ci
```
npm ci performs a clean install based on package-lock.json, ensuring consistent builds.

### 3. 🔐 Generate Development TLS Certificates
Open a Bash terminal, navigate to the backend folder, and run the certificate script:
```bash
cd backend
./scripts/init-dev-certs.sh
```
This will generate and self-sign TLS certificates inside the certs/ directory for secure local development.

### 4. ⚙️ Environment Configuration
Create .env files in both backend/ and frontend/ folders.

backend/.env
```
PORT=4040
JWT_SECRET=your_jwt_secret
```
frontend/.env
```
VITE_API_URL=https://localhost:4040/totallysecure/
```

### 5. 🧯 Run the App
```bash
# Backend (HTTPS)
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

## 🧠 Notes

- Backend runs on https://localhost:4040
- Frontend runs on http://localhost:4114
- Cookies require Secure: true and SameSite: None for cross-origin auth
- Rate limiting is applied globally: 100 requests per hour

---

## 🔒 Security Features

- JWT-based authentication
- OTP verification
- HTTPS with self-signed certs
- Rate limiting
- CORS with credential support

---

## 🧰 Tech Stack

- Frontend: React, Vite, JSX, CSS
- Backend: Express, Node.js, JWT, HTTPS
- Security: Helmet, cookie-parser, express-rate-limit

---

## 🧙 Authors

Team Name: Totally spies

Members: 
- Ashish Dannyeswar
- Azrah Habib
- Fathima Shariff
- Kayden Reddy
- Keagan Shaw

---

## Links

- Youtube:
- Hyperlink: 

