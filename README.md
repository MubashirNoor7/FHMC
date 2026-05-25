# 🏥 Frontier Homeopathic Medical College (FHMC)

Official website for **Frontier Homeopathic Medical College Peshawar**. A modern, high-performance web application designed to provide academic resources, faculty information, admissions guidance, and comprehensive information about BHMS and Diploma programs in Homeopathic medicine.

---

## 🚀 Tech Stack

This project is built using modern web technologies focusing on speed, type-safety, scalability, and professional standards:

* **Frontend:** Vite + React 19 (TypeScript)
* **Styling:** Tailwind CSS with responsive design
* **Backend:** Express.js server
* **Database:** PostgreSQL with SQL schema management
* **Authentication:** Supabase integration
* **Type Safety:** Strict TypeScript compiler configuration
* **Build Tool:** Vite for optimized production builds

---

## 📋 Features

- **Responsive Design:** Fully responsive across all devices
- **Student Management:** Comprehensive student information portal
- **Faculty Directory:** Complete faculty profiles and contact information
- **Admissions Information:** Detailed program details and application guidance
- **Course Management:** Academic curriculum and course schedules
- **News & Updates:** Latest announcements and college news
- **Contact & Support:** Multiple channels for student inquiries

---

## 📁 Project Structure

```text
├── dist/                    # Production-ready compiled build
├── public/                  # Static assets (images, icons, logos)
├── src/                     # Core application source code
│   ├── components/          # Reusable React components
│   ├── pages/               # Application pages
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── styles/              # Global styles
├── .env.example             # Template for environment variables
├── database_setup.sql       # Database schema definition
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite bundler configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies
```

---

## 🛠️ Installation & Setup

**Prerequisites:** Node.js (v18+), npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/MubashirNoor7/FHMC.git
cd FHMC
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:
```env
# Application URL
APP_URL="http://localhost:3000"

# Supabase Configuration
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 4. Setup Database
```bash
# Run the database setup script
psql -U postgres -d your_database -f database_setup.sql
```

### 5. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000` 

---

## 📦 Building for Production

### Build the Application
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run clean` | Remove build artifacts |
| `npm run lint` | Run TypeScript type checking |

---

## 🏗️ Project Architecture

### Frontend
- **Framework:** React 19 with modern hooks
- **Build Tool:** Vite for fast development and optimized builds
- **Styling:** Tailwind CSS for utility-first CSS
- **State Management:** React Context API or similar
- **Routing:** React Router v7 for client-side navigation

### Backend
- **Server:** Express.js with TypeScript
- **Database:** PostgreSQL for reliable data management
- **Authentication:** Supabase for secure user management

---

## 🔐 Security Best Practices

- Environment variables are managed via `.env.local` (never commit this file)
- Database credentials are secured and never exposed in code
- TypeScript ensures type-safe operations
- Regular dependency updates for security patches

---

## 🤝 Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📞 Contact & Support

For questions, support, or feedback regarding FHMC:

- **Email:** contact@fhmc.edu.pk
- **Phone:** [College Phone Number]
- **Address:** Peshawar, Pakistan
- **Website:** www.fhmc.edu.pk

---

## 📄 License

This project is proprietary to Frontier Homeopathic Medical College Peshawar. Unauthorized copying or use is prohibited.

---

## 👨‍💼 About FHMC

Frontier Homeopathic Medical College (FHMC) is a leading educational institution in Peshawar offering:
- **BHMS (Bachelor of Homeopathic Medicine & Surgery)**
- **Diploma in Homeopathic Medicine**
- Professional faculty with extensive clinical experience
- Modern facilities and state-of-the-art laboratories
- Strong emphasis on practical training and clinical excellence
