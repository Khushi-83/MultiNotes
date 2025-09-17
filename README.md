# SaaS Notes - Multi-Tenant Notes Application

A secure, multi-tenant SaaS application built with Next.js that allows multiple tenants (companies) to manage their users and notes with role-based access control and subscription limits.

## 🏗️ Architecture

### Multi-Tenancy Approach

This application uses a **shared schema with tenant ID column** approach for multi-tenancy:

- **Single Database**: All tenants share the same database instance
- **Tenant Isolation**: Each record includes a `tenantId` column to ensure strict data isolation
- **Benefits**: 
  - Cost-effective for scaling
  - Easier maintenance and updates
  - Efficient resource utilization
- **Security**: All queries are filtered by tenant ID to prevent cross-tenant data access

### Database Schema

The application uses PostgreSQL with Prisma ORM:

- **Tenants**: Store tenant information (name, slug, subscription plan)
- **Users**: Store user accounts with roles (Admin/Member) linked to tenants
- **Notes**: Store notes with tenant and user associations

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/Member)
- Secure tenant isolation

### Subscription Management
- **Free Plan**: Limited to 3 notes per tenant
- **Pro Plan**: Unlimited notes
- Admin-only upgrade functionality

### Notes Management
- Full CRUD operations (Create, Read, Update, Delete)
- Tenant-isolated data access
- Real-time note limits enforcement

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd saas-notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/saas_notes?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   ```

4. **Setup database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed the database with test data
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Test Accounts

The following test accounts are pre-configured (password: `password`):

| Email | Role | Tenant | Description |
|-------|------|---------|-------------|
| admin@acme.test | Admin | Acme | Can upgrade subscriptions and manage users |
| user@acme.test | Member | Acme | Can only manage notes |
| admin@globex.test | Admin | Globex | Can upgrade subscriptions and manage users |
| user@globex.test | Member | Globex | Can only manage notes |

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Health Check
- `GET /api/health` - Application health status

### Notes Management
- `GET /api/notes` - List all notes for current tenant
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get specific note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Tenant Management
- `POST /api/tenants/:slug/upgrade` - Upgrade tenant to Pro plan (Admin only)

## 🔒 Security Features

### Tenant Isolation
- All database queries include tenant ID filtering
- JWT tokens contain tenant information
- API endpoints validate tenant access

### Role-Based Access
- Admin: Can upgrade subscriptions and manage tenant settings
- Member: Can only perform CRUD operations on notes

### CORS Configuration
- Enabled for cross-origin requests
- Supports automated testing scripts and dashboards

## 📊 Subscription Plans

### Free Plan
- Maximum 3 notes per tenant
- All basic note management features
- Can be upgraded by Admin users

### Pro Plan
- Unlimited notes
- All premium features
- Instant upgrade activation

## 🚀 Deployment (Vercel)

1. **Connect your repository to Vercel**
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

2. **Set environment variables**
   ```
   DATABASE_URL=your_production_database_url
   JWT_SECRET=your_production_jwt_secret
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Run database migrations in production
   - Seed production database with test accounts

## 🧪 Testing

The application includes comprehensive validation for:

- ✅ Health endpoint availability
- ✅ Authentication for all test accounts
- ✅ Tenant isolation enforcement
- ✅ Role-based access restrictions
- ✅ Subscription limit enforcement
- ✅ CRUD operations functionality
- ✅ Frontend accessibility

## 🎨 UI/UX Features

- **Modern Design**: Clean, elegant interface with Tailwind CSS
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Interactive Elements**: Smooth animations and hover effects
- **Accessibility**: Proper semantic markup and keyboard navigation
- **Quick Login**: One-click login for test accounts
- **Real-time Feedback**: Instant validation and error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the existing GitHub issues
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

