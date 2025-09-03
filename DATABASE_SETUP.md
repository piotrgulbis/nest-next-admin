# Database Setup Guide

## PostgreSQL Installation on Windows

### Option 1: Official PostgreSQL Installer (Recommended)

1. **Download PostgreSQL:**
   - Go to https://www.postgresql.org/download/windows/
   - Download the latest version (15.x or 16.x)
   - Run the installer as Administrator

2. **Installation Steps:**
   - Accept the default installation directory
   - Select components: PostgreSQL Server, pgAdmin 4, Command Line Tools
   - Set data directory (default is fine)
   - **Important:** Set a password for the postgres user (remember this!)
   - Use default port 5432
   - Use default locale

3. **Verify Installation:**
   ```bash
   # Open Command Prompt and test
   psql --version
   ```

### Option 2: Using Chocolatey (If you have it)

```powershell
# Run PowerShell as Administrator
choco install postgresql
```

### Option 3: Using Scoop (If you have it)

```powershell
scoop install postgresql
```

## Database Setup

### 1. Create Database

Open pgAdmin or use command line:

```sql
-- Connect to PostgreSQL (use the password you set during installation)
CREATE DATABASE nest_admin_db;
```

**Or using Command Line:**

```bash
# Connect as postgres user
psql -U postgres

# Create database
CREATE DATABASE nest_admin_db;

# Exit
\q
```

### 2. Update Environment Variables

Update your `backend/.env` file with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_NAME=nest_admin_db
```

### 3. Test Connection

From the backend directory, run:

```bash
npm run start:dev
```

If you see database connection logs without errors, you're good to go!

## Migration Commands

Once PostgreSQL is set up:

```bash
# Navigate to backend directory
cd backend

# Generate initial migration
npm run migration:generate -- src/migrations/InitialMigration

# Run migrations
npm run migration:run

# Create a new migration
npm run migration:create -- src/migrations/NewMigration

# Revert last migration
npm run migration:revert
```

## Troubleshooting

### Common Issues:

1. **Connection refused:**
   - Make sure PostgreSQL service is running
   - Check Windows Services for "postgresql-x64-xx"

2. **Authentication failed:**
   - Verify username/password in .env file
   - Try connecting with pgAdmin first

3. **Database doesn't exist:**
   - Create the database manually using pgAdmin or command line

4. **Port already in use:**
   - Change DB_PORT in .env to another port (like 5433)
   - Or stop the conflicting service

### Useful Commands:

```bash
# Check if PostgreSQL is running
Get-Service postgresql*

# Start PostgreSQL service
Start-Service postgresql-x64-15  # Replace with your version

# Stop PostgreSQL service
Stop-Service postgresql-x64-15
```

## Next Steps

After PostgreSQL is installed and running:

1. Run the backend application: `npm run start:dev`
2. The database tables will be created automatically (synchronize: true in development)
3. Check the admin interface for real data integration
