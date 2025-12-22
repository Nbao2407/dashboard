export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      batches: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          expiry_date: string | null
          id: string
          import_price: number | null
          is_active: boolean | null
          is_deleted: boolean | null
          manufacturing_date: string | null
          product_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          expiry_date?: string | null
          id?: string
          import_price?: number | null
          is_active?: boolean | null
          is_deleted?: boolean | null
          manufacturing_date?: string | null
          product_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          expiry_date?: string | null
          id?: string
          import_price?: number | null
          is_active?: boolean | null
          is_deleted?: boolean | null
          manufacturing_date?: string | null
          product_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batches_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      blocks: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          dimensions_height: number | null
          dimensions_width: number | null
          height: number | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          is_overloaded: boolean | null
          max_weight_capacity: number | null
          name: string
          position_x: number | null
          position_y: number | null
          shelf_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          dimensions_height?: number | null
          dimensions_width?: number | null
          height?: number | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_overloaded?: boolean | null
          max_weight_capacity?: number | null
          name: string
          position_x?: number | null
          position_y?: number | null
          shelf_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          dimensions_height?: number | null
          dimensions_width?: number | null
          height?: number | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_overloaded?: boolean | null
          max_weight_capacity?: number | null
          name?: string
          position_x?: number | null
          position_y?: number | null
          shelf_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blocks_shelf_id_fkey"
            columns: ["shelf_id"]
            isOneToOne: false
            referencedRelation: "shelves"
            referencedColumns: ["id"]
          },
        ]
      }
      exports: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          organization_id: string
          partner_id: string | null
          sales_order_code: string | null
          status: Database["public"]["Enums"]["export_status"] | null
          updated_at: string | null
          updated_by: string | null
          warehouse_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          organization_id: string
          partner_id?: string | null
          sales_order_code?: string | null
          status?: Database["public"]["Enums"]["export_status"] | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          organization_id?: string
          partner_id?: string | null
          sales_order_code?: string | null
          status?: Database["public"]["Enums"]["export_status"] | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exports_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exports_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exports_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      inventories: {
        Row: {
          batch_id: string | null
          block_id: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          organization_id: string
          product_id: string
          quantity: number | null
          quantity_allocated: number | null
          quantity_available: number | null
          quantity_on_hand: number | null
          updated_at: string | null
          updated_by: string | null
          warehouse_id: string
        }
        Insert: {
          batch_id?: string | null
          block_id: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          organization_id: string
          product_id: string
          quantity?: number | null
          quantity_allocated?: number | null
          quantity_available?: number | null
          quantity_on_hand?: number | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id: string
        }
        Update: {
          batch_id?: string | null
          block_id?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          organization_id?: string
          product_id?: string
          quantity?: number | null
          quantity_allocated?: number | null
          quantity_available?: number | null
          quantity_on_hand?: number | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventories_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventories_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventories_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_transactions: {
        Row: {
          batch_id: string | null
          conversion_rate: number | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          from_block_id: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          organization_id: string
          product_id: string
          quantity: number
          reference_code: string | null
          to_block_id: string | null
          total_value: number | null
          type: Database["public"]["Enums"]["transaction_type"]
          unit_price: number | null
          updated_at: string | null
          updated_by: string | null
          warehouse_id: string
        }
        Insert: {
          batch_id?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          from_block_id?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          organization_id: string
          product_id: string
          quantity: number
          reference_code?: string | null
          to_block_id?: string | null
          total_value?: number | null
          type: Database["public"]["Enums"]["transaction_type"]
          unit_price?: number | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id: string
        }
        Update: {
          batch_id?: string | null
          conversion_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          from_block_id?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          organization_id?: string
          product_id?: string
          quantity?: number
          reference_code?: string | null
          to_block_id?: string | null
          total_value?: number | null
          type?: Database["public"]["Enums"]["transaction_type"]
          unit_price?: number | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_from_block_id_fkey"
            columns: ["from_block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_to_block_id_fkey"
            columns: ["to_block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          owner_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          owner_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          owner_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address_detail: string | null
          code: string
          created_at: string | null
          deleted_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          organization_id: string
          phone: string | null
          tax_code: string | null
          type: Database["public"]["Enums"]["partner_type"]
          updated_at: string | null
          ward_id: string | null
        }
        Insert: {
          address_detail?: string | null
          code: string
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          organization_id: string
          phone?: string | null
          tax_code?: string | null
          type: Database["public"]["Enums"]["partner_type"]
          updated_at?: string | null
          ward_id?: string | null
        }
        Update: {
          address_detail?: string | null
          code?: string
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          organization_id?: string
          phone?: string | null
          tax_code?: string | null
          type?: Database["public"]["Enums"]["partner_type"]
          updated_at?: string | null
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partners_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          description: string
          duration_months: number | null
          expired_at: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          paid_at: string | null
          payment_code: string
          qr_code: string | null
          rental_contract_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          type: Database["public"]["Enums"]["payment_type"]
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          description: string
          duration_months?: number | null
          expired_at?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          paid_at?: string | null
          payment_code: string
          qr_code?: string | null
          rental_contract_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          type: Database["public"]["Enums"]["payment_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          description?: string
          duration_months?: number | null
          expired_at?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          paid_at?: string | null
          payment_code?: string
          qr_code?: string | null
          rental_contract_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          type?: Database["public"]["Enums"]["payment_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_rental_contract_id_fkey"
            columns: ["rental_contract_id"]
            isOneToOne: false
            referencedRelation: "rental_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          barcode: string | null
          base_unit_id: string | null
          cost_price: number | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          height: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_deleted: boolean | null
          length: number | null
          max_weight_capacity: number | null
          name: string
          organization_id: string
          sku: string
          updated_at: string | null
          updated_by: string | null
          weight: number | null
          width: number | null
        }
        Insert: {
          barcode?: string | null
          base_unit_id?: string | null
          cost_price?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          height?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_deleted?: boolean | null
          length?: number | null
          max_weight_capacity?: number | null
          name: string
          organization_id: string
          sku: string
          updated_at?: string | null
          updated_by?: string | null
          weight?: number | null
          width?: number | null
        }
        Update: {
          barcode?: string | null
          base_unit_id?: string | null
          cost_price?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          height?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_deleted?: boolean | null
          length?: number | null
          max_weight_capacity?: number | null
          name?: string
          organization_id?: string
          sku?: string
          updated_at?: string | null
          updated_by?: string | null
          weight?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_base_unit_id_fkey"
            columns: ["base_unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          is_banned: boolean | null
          is_online: boolean | null
          is_verified: boolean | null
          language: string | null
          last_online: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          is_banned?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          language?: string | null
          last_online?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_banned?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          language?: string | null
          last_online?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      provinces: {
        Row: {
          code: string
          created_at: string | null
          deleted_at: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          slug: string | null
          type: Database["public"]["Enums"]["province_type"] | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          slug?: string | null
          type?: Database["public"]["Enums"]["province_type"] | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          slug?: string | null
          type?: Database["public"]["Enums"]["province_type"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      racks: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          default_block_max_weight_capacity: number | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          dimensions_depth: number | null
          dimensions_height: number | null
          dimensions_width: number | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          is_rented: boolean | null
          name: string
          overload_threshold_percent: number | null
          position_rotation: number | null
          position_x: number | null
          position_y: number | null
          row_id: string
          total_height: number | null
          total_weight_capacity: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          default_block_max_weight_capacity?: number | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          dimensions_depth?: number | null
          dimensions_height?: number | null
          dimensions_width?: number | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_rented?: boolean | null
          name: string
          overload_threshold_percent?: number | null
          position_rotation?: number | null
          position_x?: number | null
          position_y?: number | null
          row_id: string
          total_height?: number | null
          total_weight_capacity?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          default_block_max_weight_capacity?: number | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          dimensions_depth?: number | null
          dimensions_height?: number | null
          dimensions_width?: number | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_rented?: boolean | null
          name?: string
          overload_threshold_percent?: number | null
          position_rotation?: number | null
          position_x?: number | null
          position_y?: number | null
          row_id?: string
          total_height?: number | null
          total_weight_capacity?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "racks_row_id_fkey"
            columns: ["row_id"]
            isOneToOne: false
            referencedRelation: "rows"
            referencedColumns: ["id"]
          },
        ]
      }
      receipts: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          notes: string | null
          organization_id: string
          partner_id: string | null
          purchase_order_code: string | null
          status: Database["public"]["Enums"]["receipt_status"] | null
          updated_at: string | null
          updated_by: string | null
          warehouse_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          notes?: string | null
          organization_id: string
          partner_id?: string | null
          purchase_order_code?: string | null
          status?: Database["public"]["Enums"]["receipt_status"] | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          notes?: string | null
          organization_id?: string
          partner_id?: string | null
          purchase_order_code?: string | null
          status?: Database["public"]["Enums"]["receipt_status"] | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "receipts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipts_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipts_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_contracts: {
        Row: {
          actual_ended_at: string | null
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          discount_rate: number | null
          expired_at: string | null
          final_price: number
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          is_liquidated: boolean | null
          is_sealed: boolean | null
          name: string | null
          notes: string | null
          organization_id: string
          overdue_penalty: number | null
          overdue_penalty_percent: number | null
          started_at: string
          status: Database["public"]["Enums"]["contract_status"] | null
          total_price: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_ended_at?: string | null
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          discount_rate?: number | null
          expired_at?: string | null
          final_price: number
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_liquidated?: boolean | null
          is_sealed?: boolean | null
          name?: string | null
          notes?: string | null
          organization_id: string
          overdue_penalty?: number | null
          overdue_penalty_percent?: number | null
          started_at: string
          status?: Database["public"]["Enums"]["contract_status"] | null
          total_price: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_ended_at?: string | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          discount_rate?: number | null
          expired_at?: string | null
          final_price?: number
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_liquidated?: boolean | null
          is_sealed?: boolean | null
          name?: string | null
          notes?: string | null
          organization_id?: string
          overdue_penalty?: number | null
          overdue_penalty_percent?: number | null
          started_at?: string
          status?: Database["public"]["Enums"]["contract_status"] | null
          total_price?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_contracts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      rows: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          is_rented: boolean | null
          name: string
          position_rotation: number | null
          position_x: number | null
          position_y: number | null
          total_weight_capacity: number | null
          updated_at: string | null
          updated_by: string | null
          warehouse_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_rented?: boolean | null
          name: string
          position_rotation?: number | null
          position_x?: number | null
          position_y?: number | null
          total_weight_capacity?: number | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          is_rented?: boolean | null
          name?: string
          position_rotation?: number | null
          position_x?: number | null
          position_y?: number | null
          total_weight_capacity?: number | null
          updated_at?: string | null
          updated_by?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rows_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      shelves: {
        Row: {
          assigned_product_id: string | null
          code: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          height: number | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          rack_id: string
          total_weight_capacity: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          assigned_product_id?: string | null
          code: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          height?: number | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          rack_id: string
          total_weight_capacity?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          assigned_product_id?: string | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          height?: number | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          rack_id?: string
          total_weight_capacity?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shelves_assigned_product_id_fkey"
            columns: ["assigned_product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shelves_rack_id_fkey"
            columns: ["rack_id"]
            isOneToOne: false
            referencedRelation: "racks"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string | null
          organization_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string | null
          organization_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string | null
          organization_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "units_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          organization_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wards: {
        Row: {
          code: string
          created_at: string | null
          deleted_at: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          province_id: string
          slug: string | null
          type: Database["public"]["Enums"]["ward_type"] | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          province_id: string
          slug?: string | null
          type?: Database["public"]["Enums"]["ward_type"] | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          province_id?: string
          slug?: string | null
          type?: Database["public"]["Enums"]["ward_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wards_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["id"]
          },
        ]
      }
      warehouses: {
        Row: {
          address_detail: string | null
          block_length: number
          block_width: number
          ceiling_height: number | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          latitude: number | null
          length: number
          longitude: number | null
          max_load_capacity: number | null
          name: string
          organization_id: string
          total_weight_capacity: number | null
          updated_at: string | null
          updated_by: string | null
          ward_id: string | null
          width: number
        }
        Insert: {
          address_detail?: string | null
          block_length: number
          block_width: number
          ceiling_height?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          latitude?: number | null
          length: number
          longitude?: number | null
          max_load_capacity?: number | null
          name: string
          organization_id: string
          total_weight_capacity?: number | null
          updated_at?: string | null
          updated_by?: string | null
          ward_id?: string | null
          width: number
        }
        Update: {
          address_detail?: string | null
          block_length?: number
          block_width?: number
          ceiling_height?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          latitude?: number | null
          length?: number
          longitude?: number | null
          max_load_capacity?: number | null
          name?: string
          organization_id?: string
          total_weight_capacity?: number | null
          updated_at?: string | null
          updated_by?: string | null
          ward_id?: string | null
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "warehouses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warehouses_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_contract_org_id: { Args: { _contract_id: string }; Returns: string }
      get_product_org_id: { Args: { _product_id: string }; Returns: string }
      get_rack_org_id: { Args: { _rack_id: string }; Returns: string }
      get_row_org_id: { Args: { _row_id: string }; Returns: string }
      get_shelf_org_id: { Args: { _shelf_id: string }; Returns: string }
      get_warehouse_org_id: { Args: { _warehouse_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_org_member: {
        Args: { _org_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "member" | "viewer"
      contract_status:
        | "PENDING"
        | "ACTIVE"
        | "OVERDUE_LEVEL_1"
        | "OVERDUE_LEVEL_2"
        | "OVERDUE_LEVEL_3"
        | "SEALED"
        | "LIQUIDATED"
        | "CANCELLED"
        | "COMPLETED"
      duration_unit: "MONTH" | "YEAR"
      export_status: "PENDING" | "PICKING" | "PACKED" | "SHIPPED" | "CANCELLED"
      partner_type: "SUPPLIER" | "CUSTOMER" | "BOTH"
      payment_status: "PENDING" | "PAID" | "CANCELLED" | "EXPIRED"
      payment_type: "NEW_CONTRACT" | "RENEWAL"
      province_type: "CITY" | "PROVINCE"
      receipt_status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"
      transaction_type:
        | "INBOUND"
        | "OUTBOUND"
        | "TRANSFER"
        | "ADJUSTMENT"
        | "RETURN"
      ward_type: "WARD" | "COMMUNE" | "TOWNSHIP" | "TOWN" | "CITY"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member", "viewer"],
      contract_status: [
        "PENDING",
        "ACTIVE",
        "OVERDUE_LEVEL_1",
        "OVERDUE_LEVEL_2",
        "OVERDUE_LEVEL_3",
        "SEALED",
        "LIQUIDATED",
        "CANCELLED",
        "COMPLETED",
      ],
      duration_unit: ["MONTH", "YEAR"],
      export_status: ["PENDING", "PICKING", "PACKED", "SHIPPED", "CANCELLED"],
      partner_type: ["SUPPLIER", "CUSTOMER", "BOTH"],
      payment_status: ["PENDING", "PAID", "CANCELLED", "EXPIRED"],
      payment_type: ["NEW_CONTRACT", "RENEWAL"],
      province_type: ["CITY", "PROVINCE"],
      receipt_status: ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"],
      transaction_type: [
        "INBOUND",
        "OUTBOUND",
        "TRANSFER",
        "ADJUSTMENT",
        "RETURN",
      ],
      ward_type: ["WARD", "COMMUNE", "TOWNSHIP", "TOWN", "CITY"],
    },
  },
} as const
