# Malmo's Marine - Marine Industry Job Platform

![Malmo's Marine](https://example.com/hero-image.jpg)

A modern web application built with Next.js.14, TypeScript, and Tailwind CSS for connecting marine professionals with job opportunities across New Zealand.

## Features

- **User Authentication**: Secure login and registration with role-based access (Employer/Employee)
- **Employer Dashboard**: Post jobs, manage listings, and view applicants
- **Employee Dashboard**: Browse jobs, apply, and track applications
- **Responsive Design**: Mobile-friendly interface with modern UI/UX
- **Database Integration**: (To be implemented in future versions)

## Tech Stack

- **Frontend**: Next.js.14, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (Frontend/Backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/malmo-marine.git
cd malmo-marine
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

### Vercel Deployment

1. Create a Vercel account and connect your GitHub repository
2. Set up the environment variables in the Vercel dashboard
3. Deploy the application

### Database

Database functionality will be implemented in future versions.

## Project Structure

```
├── app/                   # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── components/        # Shared components
│   ├── employer/          # Employer dashboard pages
│   ├── employee/          # Employee dashboard pages
│   └── ...                # Other app files
├── public/                # Static assets
├── types/                 # TypeScript type definitions
└── ...                    # Config files
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or feedback, please contact us at info@malmosmarine.co.nz
