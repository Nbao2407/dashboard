-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- ENUMS
-- ========================================

CREATE TYPE province_type AS ENUM ('CITY', 'PROVINCE');
CREATE TYPE ward_type AS ENUM ('WARD', 'COMMUNE', 'TOWNSHIP', 'TOWN', 'CITY');
CREATE TYPE partner_type AS ENUM ('SUPPLIER', 'CUSTOMER', 'BOTH');
CREATE TYPE contract_status AS ENUM ('PENDING', 'ACTIVE', 'OVERDUE_LEVEL_1', 'OVERDUE_LEVEL_2', 'OVERDUE_LEVEL_3', 'SEALED', 'LIQUIDATED', 'CANCELLED', 'COMPLETED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'EXPIRED');
CREATE TYPE payment_type AS ENUM ('NEW_CONTRACT', 'RENEWAL');
CREATE TYPE duration_unit AS ENUM ('MONTH', 'YEAR');
CREATE TYPE receipt_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED');
CREATE TYPE export_status AS ENUM ('PENDING', 'PICKING', 'PACKED', 'SHIPPED', 'CANCELLED');
CREATE TYPE transaction_type AS ENUM ('INBOUND', 'OUTBOUND', 'TRANSFER', 'ADJUSTMENT', 'RETURN');
CREATE TYPE app_role AS ENUM ('admin', 'member', 'viewer');

-- ========================================
-- LOCATION TABLES
-- ========================================

CREATE TABLE provinces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT,
  type province_type,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE wards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT,
  type ward_type,
  province_id UUID NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_wards_province ON wards(province_id);

-- ========================================
-- PROFILES TABLE (linked to auth.users)
-- ========================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  language TEXT DEFAULT 'vi',
  name TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_banned BOOLEAN DEFAULT FALSE,
  is_online BOOLEAN DEFAULT FALSE,
  last_online TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, COALESCE(new.raw_user_meta_data ->> 'name', new.email), new.email);
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- ORGANIZATIONS
-- ========================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- ========================================
-- USER ROLES
-- ========================================

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'member',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  UNIQUE(user_id, organization_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role AND is_active = TRUE
  )
$$;

CREATE OR REPLACE FUNCTION public.is_org_member(_user_id UUID, _org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND organization_id = _org_id AND is_active = TRUE
  ) OR EXISTS (
    SELECT 1 FROM public.organizations
    WHERE id = _org_id AND owner_id = _user_id
  )
$$;

-- RLS for organizations
CREATE POLICY "Users can view orgs they belong to"
  ON organizations FOR SELECT
  USING (owner_id = auth.uid() OR public.is_org_member(auth.uid(), id));

CREATE POLICY "Users can create organizations"
  ON organizations FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update their orgs"
  ON organizations FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Owners can delete their orgs"
  ON organizations FOR DELETE
  USING (owner_id = auth.uid());

-- RLS for user_roles
CREATE POLICY "Users can view their own roles"
  ON user_roles FOR SELECT
  USING (user_id = auth.uid());

-- ========================================
-- PARTNERS (Customers/Suppliers)
-- ========================================

CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  type partner_type NOT NULL,
  phone TEXT,
  email TEXT,
  tax_code TEXT,
  address_detail TEXT,
  ward_id UUID REFERENCES wards(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view partners"
  ON partners FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org members can manage partners"
  ON partners FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));

-- ========================================
-- WAREHOUSES
-- ========================================

CREATE TABLE warehouses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  address_detail TEXT,
  ward_id UUID REFERENCES wards(id),
  length INTEGER NOT NULL,
  width INTEGER NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  block_length DECIMAL(10,4) NOT NULL,
  block_width DECIMAL(10,4) NOT NULL,
  ceiling_height DECIMAL(10,4),
  max_load_capacity DECIMAL(19,4),
  total_weight_capacity DECIMAL(19,4),
  is_active BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view warehouses"
  ON warehouses FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org members can manage warehouses"
  ON warehouses FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));

-- ========================================
-- UNITS
-- ========================================

CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage units"
  ON units FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));

-- ========================================
-- PRODUCTS
-- ========================================

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  barcode TEXT,
  weight DECIMAL(10,4),
  length DECIMAL(10,4),
  width DECIMAL(10,4),
  height DECIMAL(10,4),
  max_weight_capacity DECIMAL(19,4),
  cost_price DECIMAL(19,4) DEFAULT 0,
  base_unit_id UUID REFERENCES units(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage products"
  ON products FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));

-- ========================================
-- BATCHES
-- ========================================

CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  manufacturing_date TIMESTAMPTZ,
  expiry_date TIMESTAMPTZ,
  import_price DECIMAL(19,4) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE batches ENABLE ROW LEVEL SECURITY;

-- ========================================
-- ROWS (Warehouse rows)
-- ========================================

CREATE TABLE rows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  warehouse_id UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  is_rented BOOLEAN DEFAULT FALSE,
  position_x DECIMAL(10,4),
  position_y DECIMAL(10,4),
  position_rotation DECIMAL(10,4),
  total_weight_capacity DECIMAL(19,4),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

CREATE INDEX idx_rows_warehouse ON rows(warehouse_id);

ALTER TABLE rows ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RACKS
-- ========================================

CREATE TABLE racks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  row_id UUID NOT NULL REFERENCES rows(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  is_rented BOOLEAN DEFAULT FALSE,
  position_x DECIMAL(10,4),
  position_y DECIMAL(10,4),
  position_rotation DECIMAL(10,4),
  dimensions_width DECIMAL(10,4),
  dimensions_depth DECIMAL(10,4),
  dimensions_height DECIMAL(10,4),
  default_block_max_weight_capacity DECIMAL(19,4),
  total_weight_capacity DECIMAL(19,4),
  total_height DECIMAL(10,4),
  overload_threshold_percent DECIMAL(5,2) DEFAULT 10,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

CREATE INDEX idx_racks_row ON racks(row_id);

ALTER TABLE racks ENABLE ROW LEVEL SECURITY;

-- ========================================
-- SHELVES
-- ========================================

CREATE TABLE shelves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rack_id UUID NOT NULL REFERENCES racks(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  assigned_product_id UUID REFERENCES products(id),
  height DECIMAL(10,4),
  total_weight_capacity DECIMAL(19,4),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE shelves ENABLE ROW LEVEL SECURITY;

-- ========================================
-- BLOCKS
-- ========================================

CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shelf_id UUID NOT NULL REFERENCES shelves(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  position_x DECIMAL(10,4),
  position_y DECIMAL(10,4),
  dimensions_width DECIMAL(10,4),
  dimensions_height DECIMAL(10,4),
  max_weight_capacity DECIMAL(19,4),
  height DECIMAL(10,4),
  is_overloaded BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RENTAL CONTRACTS
-- ========================================

CREATE TABLE rental_contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT,
  status contract_status DEFAULT 'PENDING',
  started_at TIMESTAMPTZ NOT NULL,
  expired_at TIMESTAMPTZ,
  actual_ended_at TIMESTAMPTZ,
  total_price DECIMAL(19,4) NOT NULL,
  discount_rate DECIMAL(5,2) DEFAULT 0,
  final_price DECIMAL(19,4) NOT NULL,
  overdue_penalty DECIMAL(19,4) DEFAULT 0,
  overdue_penalty_percent DECIMAL(5,2) DEFAULT 0,
  notes TEXT,
  is_sealed BOOLEAN DEFAULT FALSE,
  is_liquidated BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

CREATE INDEX idx_contracts_org ON rental_contracts(organization_id);

ALTER TABLE rental_contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage contracts"
  ON rental_contracts FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));

-- ========================================
-- PAYMENTS
-- ========================================

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rental_contract_id UUID NOT NULL REFERENCES rental_contracts(id) ON DELETE CASCADE,
  payment_code TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  type payment_type NOT NULL,
  status payment_status DEFAULT 'PENDING',
  duration_months INTEGER,
  qr_code TEXT,
  expired_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT
);

CREATE INDEX idx_payments_contract ON payments(rental_contract_id);
CREATE INDEX idx_payments_code ON payments(payment_code);
CREATE INDEX idx_payments_status ON payments(status);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- ========================================
-- INVENTORY
-- ========================================

CREATE TABLE inventories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  warehouse_id UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES batches(id),
  quantity DECIMAL(19,4) DEFAULT 0,
  quantity_on_hand DECIMAL(19,4) DEFAULT 0,
  quantity_allocated DECIMAL(19,4) DEFAULT 0,
  quantity_available DECIMAL(19,4) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

CREATE INDEX idx_inv_org ON inventories(organization_id);
CREATE INDEX idx_inv_warehouse ON inventories(warehouse_id);
CREATE INDEX idx_inv_product ON inventories(product_id);

ALTER TABLE inventories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage inventory"
  ON inventories FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));

-- ========================================
-- INVENTORY TRANSACTIONS
-- ========================================

CREATE TABLE inventory_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  warehouse_id UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES batches(id),
  from_block_id UUID REFERENCES blocks(id),
  to_block_id UUID REFERENCES blocks(id),
  type transaction_type NOT NULL,
  quantity DECIMAL(19,4) NOT NULL,
  conversion_rate DECIMAL(10,4) DEFAULT 1,
  unit_price DECIMAL(19,4) DEFAULT 0,
  total_value DECIMAL(19,4) DEFAULT 0,
  reference_code TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage transactions"
  ON inventory_transactions FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));

-- ========================================
-- RECEIPTS (Inbound)
-- ========================================

CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  warehouse_id UUID NOT NULL REFERENCES warehouses(id),
  partner_id UUID REFERENCES partners(id),
  code TEXT NOT NULL,
  purchase_order_code TEXT,
  status receipt_status DEFAULT 'PENDING',
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage receipts"
  ON receipts FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));

-- ========================================
-- EXPORTS (Outbound)
-- ========================================

CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  warehouse_id UUID NOT NULL REFERENCES warehouses(id),
  partner_id UUID REFERENCES partners(id),
  code TEXT NOT NULL,
  sales_order_code TEXT,
  status export_status DEFAULT 'PENDING',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  deleted_by TEXT
);

ALTER TABLE exports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage exports"
  ON exports FOR ALL
  USING (public.is_org_member(auth.uid(), organization_id));