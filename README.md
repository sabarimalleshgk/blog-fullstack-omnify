<img width="1504" height="1009" alt="image" src="https://github.com/user-attachments/assets/b5211dfe-5c9b-4355-b3e5-3a9c894c7df1" />
<img width="1504" height="1009" alt="image" src="https://github.com/user-attachments/assets/292ac840-a071-4abb-8566-878e029e458a" />
<img width="1504" height="1009" alt="image" src="https://github.com/user-attachments/assets/fed3a6cd-af07-410f-9660-da316369061a" />

# 📝 Full Stack Blog Application

A modern full-stack blog application with user authentication, blog creation, editing, and deletion. Built using **React.js (frontend)** and **Django + PostgreSQL (backend)** with **JWT authentication**.

---

## 📌 Features

- ✅ Signup / Login functionality
- ✅ JWT-based authentication
- ✅ Create / Edit / Delete blogs (only for the author)
- ✅ View all blogs (public listing with pagination)
- ✅ Responsive UI using Tailwind CSS

---

## 🛠️ Technologies Used

**Frontend:**
- React.js (with Vite)
- Tailwind CSS
- Axios
- React Router DOM
- JWT (client-side auth)

**Backend:**
- Django
- Django REST Framework
- PostgreSQL
- Simple JWT (for authentication)

---

## 🚀 How to Run the Project

### 🔧 1. Clone the repo

```bash
git clone https://github.com/yourusername/blog-fullstack.git
cd blog-fullstack
⚙️ 2. Setup Backend (Django)
bash
Copy
Edit
cd blog-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Create .env file and add your DB and secret key configs
cp .env.example .env

python manage.py migrate
python manage.py runserver
📝 By default, backend runs at: http://localhost:8000

🌐 3. Setup Frontend (React)
bash
Copy
Edit
cd ../blog-frontend
npm install
npm run dev
📝 Frontend runs at: http://localhost:5173

🔐 Authentication
Uses JWT tokens for secure login.

Token is stored in localStorage or cookies.

Protected routes only allow access if logged in.

Blogs can only be edited/deleted by their author.

🌍 Deployment
You can deploy with:

Frontend: Firebase Hosting, Vercel, or Netlify

Backend: Google Cloud p.




