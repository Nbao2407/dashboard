-- Add RLS policies for provinces and wards (public read access)
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE wards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view provinces"
  ON provinces FOR SELECT
  USING (TRUE);

CREATE POLICY "Anyone can view wards"
  ON wards FOR SELECT
  USING (TRUE);

-- Add RLS policies for batches (through product -> organization)
CREATE OR REPLACE FUNCTION public.get_product_org_id(_product_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.products WHERE id = _product_id LIMIT 1
$$;

CREATE POLICY "Org members can manage batches"
  ON batches FOR ALL
  USING (public.is_org_member(auth.uid(), public.get_product_org_id(product_id)));

-- Add RLS policies for rows (through warehouse -> organization)
CREATE OR REPLACE FUNCTION public.get_warehouse_org_id(_warehouse_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.warehouses WHERE id = _warehouse_id LIMIT 1
$$;

CREATE POLICY "Org members can manage rows"
  ON rows FOR ALL
  USING (public.is_org_member(auth.uid(), public.get_warehouse_org_id(warehouse_id)));

-- Add RLS policies for racks (through row -> warehouse -> organization)
CREATE OR REPLACE FUNCTION public.get_row_org_id(_row_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT w.organization_id 
  FROM public.rows r 
  JOIN public.warehouses w ON r.warehouse_id = w.id 
  WHERE r.id = _row_id LIMIT 1
$$;

CREATE POLICY "Org members can manage racks"
  ON racks FOR ALL
  USING (public.is_org_member(auth.uid(), public.get_row_org_id(row_id)));

-- Add RLS policies for shelves (through rack -> row -> warehouse -> organization)
CREATE OR REPLACE FUNCTION public.get_rack_org_id(_rack_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT w.organization_id 
  FROM public.racks ra 
  JOIN public.rows r ON ra.row_id = r.id 
  JOIN public.warehouses w ON r.warehouse_id = w.id 
  WHERE ra.id = _rack_id LIMIT 1
$$;

CREATE POLICY "Org members can manage shelves"
  ON shelves FOR ALL
  USING (public.is_org_member(auth.uid(), public.get_rack_org_id(rack_id)));

-- Add RLS policies for blocks (through shelf -> rack -> row -> warehouse -> organization)
CREATE OR REPLACE FUNCTION public.get_shelf_org_id(_shelf_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT w.organization_id 
  FROM public.shelves s 
  JOIN public.racks ra ON s.rack_id = ra.id 
  JOIN public.rows r ON ra.row_id = r.id 
  JOIN public.warehouses w ON r.warehouse_id = w.id 
  WHERE s.id = _shelf_id LIMIT 1
$$;

CREATE POLICY "Org members can manage blocks"
  ON blocks FOR ALL
  USING (public.is_org_member(auth.uid(), public.get_shelf_org_id(shelf_id)));

-- Add RLS policies for payments (through contract -> organization)
CREATE OR REPLACE FUNCTION public.get_contract_org_id(_contract_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.rental_contracts WHERE id = _contract_id LIMIT 1
$$;

CREATE POLICY "Org members can manage payments"
  ON payments FOR ALL
  USING (public.is_org_member(auth.uid(), public.get_contract_org_id(rental_contract_id)));