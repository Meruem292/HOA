-- Homeowner Association System - Supabase SQL Schema
-- This schema matches the TypeScript interfaces in lib/types.ts

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUMs
CREATE TYPE user_role AS ENUM ('admin', 'homeowner');
CREATE TYPE owner_type AS ENUM ('lessor', 'lessee');
CREATE TYPE payment_type AS ENUM ('monthly', 'quarterly', 'annually');
CREATE TYPE payment_status AS ENUM ('paid', 'pending', 'overdue');
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'homeowner',
    is_approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    block_number TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE lots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
    lot_number TEXT NOT NULL,
    area DECIMAL(10, 2),
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    owner_type owner_type NOT NULL DEFAULT 'lessor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(block_id, lot_number)
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    homeowner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lot_id UUID NOT NULL REFERENCES lots(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_type payment_type NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status payment_status NOT NULL DEFAULT 'pending',
    months_covered INTEGER NOT NULL DEFAULT 1,
    reference_number TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE due_computations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_type payment_type NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    effective_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE registration_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    requested_lot_id UUID REFERENCES lots(id) ON DELETE SET NULL,
    owner_type owner_type NOT NULL DEFAULT 'lessor',
    status application_status NOT NULL DEFAULT 'pending',
    admin_notes TEXT,
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_lots_block_id ON lots(block_id);
CREATE INDEX idx_lots_owner_id ON lots(owner_id);
CREATE INDEX idx_payments_homeowner_id ON payments(homeowner_id);
CREATE INDEX idx_payments_lot_id ON payments(lot_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_due_date ON payments(due_date);
CREATE INDEX idx_policies_created_by ON policies(created_by);
CREATE INDEX idx_policies_is_active ON policies(is_active);
CREATE INDEX idx_due_computations_payment_type ON due_computations(payment_type);
CREATE INDEX idx_due_computations_is_active ON due_computations(is_active);
CREATE INDEX idx_registration_applications_status ON registration_applications(status);
CREATE INDEX idx_registration_applications_reviewed_by ON registration_applications(reviewed_by);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON policies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE due_computations ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users table policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can update users" ON users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Blocks table policies
CREATE POLICY "Approved users can view blocks" ON blocks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can manage blocks" ON blocks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

-- Lots table policies
CREATE POLICY "Approved users can view lots" ON lots
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND is_approved = true
        )
    );

CREATE POLICY "Homeowners can view their lots" ON lots
    FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Admins can manage lots" ON lots
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

-- Payments table policies
CREATE POLICY "Homeowners can view their payments" ON payments
    FOR SELECT USING (homeowner_id = auth.uid());

CREATE POLICY "Admins can view all payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can manage payments" ON payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

-- Policies table policies
CREATE POLICY "Approved users can view active policies" ON policies
    FOR SELECT USING (
        is_active = true AND EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can view all policies" ON policies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can manage policies" ON policies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can update policies" ON policies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

-- Due computations table policies
CREATE POLICY "Approved users can view active due computations" ON due_computations
    FOR SELECT USING (
        is_active = true AND EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can view all due computations" ON due_computations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can manage due computations" ON due_computations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

-- Registration applications table policies
CREATE POLICY "Admins can view all applications" ON registration_applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

CREATE POLICY "Admins can manage applications" ON registration_applications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin' 
            AND is_approved = true
        )
    );

-- Allow public read access to registration applications for the registration form
CREATE POLICY "Public can create registration applications" ON registration_applications
    FOR INSERT WITH CHECK (true);

-- Create a function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, role, is_approved)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''), 'homeowner', false);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to sync user updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger AS $$
BEGIN
    UPDATE public.users
    SET 
        email = NEW.email,
        updated_at = NOW()
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user updates
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- Insert default admin user (optional - for initial setup)
-- You'll need to create this user through Supabase Auth first, then update their role
-- INSERT INTO users (id, email, full_name, role, is_approved) 
-- VALUES ('your-admin-uuid-here', 'admin@example.com', 'Admin User', 'admin', true);

-- Sample data for testing (optional)
-- INSERT INTO blocks (block_number, description) VALUES
-- ('A', 'Block A - Main entrance area'),
-- ('B', 'Block B - Near community center'),
-- ('C', 'Block C - Quiet residential area');

-- INSERT INTO due_computations (payment_type, amount, effective_date, created_by) VALUES
-- ('monthly', 500.00, '2024-01-01', 'your-admin-uuid-here'),
-- ('quarterly', 1400.00, '2024-01-01', 'your-admin-uuid-here'),
-- ('annually', 5000.00, '2024-01-01', 'your-admin-uuid-here');
