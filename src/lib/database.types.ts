export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      page_content: {
        Row: {
          id: string
          page_name: string
          section_key: string
          content: string | null
          content_type: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          page_name: string
          section_key: string
          content?: string | null
          content_type?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          page_name?: string
          section_key?: string
          content?: string | null
          content_type?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          category: string
          description: string | null
          material_thickness: string | null
          location: string | null
          images: Json | null
          featured: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          category: string
          description?: string | null
          material_thickness?: string | null
          location?: string | null
          images?: Json | null
          featured?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          category?: string
          description?: string | null
          material_thickness?: string | null
          location?: string | null
          images?: Json | null
          featured?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          service_type: string | null
          material_preference: string | null
          message: string
          images: Json | null
          read: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          service_type?: string | null
          material_preference?: string | null
          message: string
          images?: Json | null
          read?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          service_type?: string | null
          material_preference?: string | null
          message?: string
          images?: Json | null
          read?: boolean | null
          created_at?: string | null
        }
      }
    }
  }
}
