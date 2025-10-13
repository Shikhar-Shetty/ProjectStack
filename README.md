# 🎓 ProjectStack — College Project Management Platform

> A collaborative platform for college students to share, discover, and contribute to real-time academic and personal projects — like LinkedIn for student projects.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Overview

**ProjectStack** is a full-stack web application designed for university students to:
- 🔍 Discover active tech and academic projects.
- 🧠 Share their own projects and look for contributors.
- 🫂 Collaborate with peers based on skills and interests.
- 📂 Track contributions and build a mini project portfolio.

Built as a group project by our class to streamline and enrich collaborative learning and innovation on campus.

---

## 🚀 Tech Stack

| Category        | Tech Used                                      |
|-----------------|------------------------------------------------|
| Frontend        | **Next.js (App Router)**, **Tailwind CSS**, **TypeScript** |
| Backend         | **Next.js Server Actions**, **Prisma ORM**     |
| Database        | **PostgreSQL with NEON DB**  |
| Auth            | **NextAuth.js** (Credentials & OAuth)          |
| Validation      | **Zod** + **React Hook Form**                  |
| Styling         | **Tailwind CSS**, **ShadCN UI** (Optional)     |
| DevOps          | **Docker**, **Vercel**, **GitHub CI/CD**       |

---

## 🔑 Features

- 📋 **Post and manage your project listings**
- 🧑‍💼 **User profiles with skill tags, social links, and project history**
- 🔍 **Search & filter projects based on tech stack or category**
- 🤝 **Apply to join projects or invite collaborators**
- 💬 **Internal messaging (optional feature)**
- 🏷️ **Tag-based project discovery (e.g. AI, Web3, Robotics)**

---

## 🚀 Quick Start

Ready to get ProjectStack running locally? Follow these simple steps:

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** database (we recommend [Neon](https://neon.tech/) for free hosting)
- **Git**

### Installation

```bash
# 1. Clone and navigate to the project
git clone https://github.com/yourusername/projectstack.git
cd projectstack

# 2. Install dependencies
npm install

# 3. Set up your environment variables
cp .env.example .env
```

### Environment Setup

Open your `.env` file and add these required variables:

```env
# Database (get from Neon, Supabase, or your PostgreSQL provider)
DATABASE_URL="postgresql://username:password@host:port/database"

# Authentication (generate a random secret)
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional - for Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Database Setup & Launch

```bash
# Set up your database schema
npx prisma db push

# Start the development server
npm run dev
```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) and start exploring ProjectStack!
---

## 🤝 Join the Mission — We're Open for Collaborators!

Whether you're a developer, designer or just a curious learner — if the vision of ProjectStack excites you, we’d love to have you onboard.

# 💡 What You’ll Get

    Real-world full-stack experience with Next.js, PostgreSQL, Prisma, and modern dev workflows.

    Exposure to collaborative product building — planning, coding, reviews, and shipping.

    Opportunity to contribute to open-source, build your portfolio, and maybe even impress future employers.

## 🛠️ Open Areas to Contribute:

    🚀 Frontend polishing with Tailwind & animation (Framer Motion, Anime.js)

    🔐 Auth flows with NextAuth & OAuth (Google, GitHub)

    📦 Backend API design using Server Actions and Prisma

    🧠 AI-based project recommendations (future roadmap)

    📬 Real-time messaging feature (optional but awesome)

    🐳 Docker + Vercel + GitHub CI/CD for production-grade DevOps

## 📋 How to Contribute

1. **Check out our [Issues](https://github.com/Shikhar-Shetty/ProjectStack/issues)** for beginner-friendly tasks
2. **Fork the repository** and create your feature branch
3. **Follow our coding standards** (ESLint)
4. **Submit a Pull Request** with a clear description


## 📬 How to Reach Us

We’d love to hear from you!  
Got suggestions or found a bug? Open an issue on [GitHub](https://github.com/Shikhar-Shetty/ProjectStack)