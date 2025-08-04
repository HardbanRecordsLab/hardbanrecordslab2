export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string | null
          id: string
          permissions: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_requests: {
        Row: {
          completed_at: string | null
          created_at: string
          credits_used: number | null
          error_message: string | null
          id: string
          input_data: Json
          output_data: Json | null
          request_type: string
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          credits_used?: number | null
          error_message?: string | null
          id?: string
          input_data: Json
          output_data?: Json | null
          request_type: string
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          credits_used?: number | null
          error_message?: string | null
          id?: string
          input_data?: Json
          output_data?: Json | null
          request_type?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics: {
        Row: {
          country: string | null
          currency: string | null
          device_type: string | null
          event_type: string
          id: string
          metadata: Json | null
          platform: string | null
          product_id: string
          region: string | null
          revenue: number | null
          timestamp: string
          user_id: string
        }
        Insert: {
          country?: string | null
          currency?: string | null
          device_type?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          platform?: string | null
          product_id: string
          region?: string | null
          revenue?: number | null
          timestamp?: string
          user_id: string
        }
        Update: {
          country?: string | null
          currency?: string | null
          device_type?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          platform?: string | null
          product_id?: string
          region?: string | null
          revenue?: number | null
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      collaborations: {
        Row: {
          collaborator_id: string
          created_at: string
          id: string
          project_id: string
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          collaborator_id: string
          created_at?: string
          id?: string
          project_id: string
          role: string
          status?: string
          updated_at?: string
        }
        Update: {
          collaborator_id?: string
          created_at?: string
          id?: string
          project_id?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collaborations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          instructor_id: string
          price: number | null
          status: string
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          instructor_id: string
          price?: number | null
          status?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          instructor_id?: string
          price?: number | null
          status?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      digital_products: {
        Row: {
          cover_url: string | null
          created_at: string
          currency: string | null
          description: string | null
          download_count: number | null
          duration: number | null
          file_format: string | null
          file_size: number | null
          file_url: string | null
          genres: string[] | null
          id: string
          is_featured: boolean | null
          languages: string[] | null
          license_type: Database["public"]["Enums"]["license_type"] | null
          like_count: number | null
          metadata: Json | null
          page_count: number | null
          preview_url: string | null
          price: number | null
          product_type: Database["public"]["Enums"]["product_type"]
          release_date: string | null
          status: Database["public"]["Enums"]["product_status"]
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
          view_count: number | null
          word_count: number | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          download_count?: number | null
          duration?: number | null
          file_format?: string | null
          file_size?: number | null
          file_url?: string | null
          genres?: string[] | null
          id?: string
          is_featured?: boolean | null
          languages?: string[] | null
          license_type?: Database["public"]["Enums"]["license_type"] | null
          like_count?: number | null
          metadata?: Json | null
          page_count?: number | null
          preview_url?: string | null
          price?: number | null
          product_type: Database["public"]["Enums"]["product_type"]
          release_date?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          view_count?: number | null
          word_count?: number | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          download_count?: number | null
          duration?: number | null
          file_format?: string | null
          file_size?: number | null
          file_url?: string | null
          genres?: string[] | null
          id?: string
          is_featured?: boolean | null
          languages?: string[] | null
          license_type?: Database["public"]["Enums"]["license_type"] | null
          like_count?: number | null
          metadata?: Json | null
          page_count?: number | null
          preview_url?: string | null
          price?: number | null
          product_type?: Database["public"]["Enums"]["product_type"]
          release_date?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number | null
          word_count?: number | null
        }
        Relationships: []
      }
      distribution_channels: {
        Row: {
          api_endpoint: string | null
          commission_rate: number | null
          created_at: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          supported_formats: string[] | null
          type: string
        }
        Insert: {
          api_endpoint?: string | null
          commission_rate?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          supported_formats?: string[] | null
          type: string
        }
        Update: {
          api_endpoint?: string | null
          commission_rate?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          supported_formats?: string[] | null
          type?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          certificate_issued: boolean | null
          certificate_url: string | null
          completed_at: string | null
          course_id: string
          enrolled_at: string
          final_score: number | null
          id: string
          progress: number | null
          student_id: string
        }
        Insert: {
          certificate_issued?: boolean | null
          certificate_url?: string | null
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          final_score?: number | null
          id?: string
          progress?: number | null
          student_id: string
        }
        Update: {
          certificate_issued?: boolean | null
          certificate_url?: string | null
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          final_score?: number | null
          id?: string
          progress?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          course_id: string
          created_at: string
          duration: number | null
          id: string
          is_free: boolean | null
          lesson_type: string | null
          order_index: number
          quiz_data: Json | null
          resources: Json | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string
          duration?: number | null
          id?: string
          is_free?: boolean | null
          lesson_type?: string | null
          order_index?: number
          quiz_data?: Json | null
          resources?: Json | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string
          duration?: number | null
          id?: string
          is_free?: boolean | null
          lesson_type?: string | null
          order_index?: number
          quiz_data?: Json | null
          resources?: Json | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          commission: number | null
          created_at: string
          currency: string | null
          id: string
          metadata: Json | null
          net_amount: number | null
          payment_method: string | null
          platform: string | null
          processed_at: string | null
          product_id: string | null
          status: Database["public"]["Enums"]["payment_status"]
          stripe_payment_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          commission?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          payment_method?: string | null
          platform?: string | null
          processed_at?: string | null
          product_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          commission?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          payment_method?: string | null
          platform?: string | null
          processed_at?: string | null
          product_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_distributions: {
        Row: {
          channel_id: string
          created_at: string
          error_message: string | null
          external_id: string | null
          id: string
          metadata: Json | null
          product_id: string
          published_at: string | null
          status: Database["public"]["Enums"]["distribution_status"]
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          channel_id: string
          created_at?: string
          error_message?: string | null
          external_id?: string | null
          id?: string
          metadata?: Json | null
          product_id: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["distribution_status"]
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          channel_id?: string
          created_at?: string
          error_message?: string | null
          external_id?: string | null
          id?: string
          metadata?: Json | null
          product_id?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["distribution_status"]
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_distributions_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "distribution_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_distributions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          social_links: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["app_role"]
          social_links?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          social_links?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      project_files: {
        Row: {
          created_at: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          name: string
          project_id: string
          uploaded_by: string
          version: string | null
        }
        Insert: {
          created_at?: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          name: string
          project_id: string
          uploaded_by: string
          version?: string | null
        }
        Update: {
          created_at?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          name?: string
          project_id?: string
          uploaded_by?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          metadata: Json | null
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          is_public: boolean | null
          is_verified_purchase: boolean | null
          product_id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          is_verified_purchase?: boolean | null
          product_id: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          is_verified_purchase?: boolean | null
          product_id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      royalty_splits: {
        Row: {
          created_at: string
          id: string
          is_confirmed: boolean | null
          percentage: number
          product_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_confirmed?: boolean | null
          percentage: number
          product_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_confirmed?: boolean | null
          percentage?: number
          product_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "royalty_splits_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_cycle: string
          cancel_at_period_end: boolean | null
          created_at: string
          currency: string | null
          current_period_end: string
          current_period_start: string
          id: string
          metadata: Json | null
          plan_name: string
          price: number
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_cycle: string
          cancel_at_period_end?: boolean | null
          created_at?: string
          currency?: string | null
          current_period_end: string
          current_period_start: string
          id?: string
          metadata?: Json | null
          plan_name: string
          price: number
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_cycle?: string
          cancel_at_period_end?: boolean | null
          created_at?: string
          currency?: string | null
          current_period_end?: string
          current_period_start?: string
          id?: string
          metadata?: Json | null
          plan_name?: string
          price?: number
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          created_at: string
          id: string
          last_refill: string | null
          remaining_credits: number | null
          total_credits: number | null
          updated_at: string
          used_credits: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_refill?: string | null
          remaining_credits?: number | null
          total_credits?: number | null
          updated_at?: string
          used_credits?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_refill?: string | null
          remaining_credits?: number | null
          total_credits?: number | null
          updated_at?: string
          used_credits?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_artist: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_author: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_instructor: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_student: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "artist" | "author" | "instructor" | "student" | "admin"
      distribution_status:
        | "pending"
        | "processing"
        | "live"
        | "failed"
        | "removed"
      license_type:
        | "standard"
        | "exclusive"
        | "non_exclusive"
        | "creative_commons"
        | "royalty_free"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      product_status:
        | "draft"
        | "pending_review"
        | "approved"
        | "published"
        | "rejected"
        | "archived"
      product_type:
        | "music"
        | "ebook"
        | "audiobook"
        | "course"
        | "podcast"
        | "sample_pack"
        | "beat"
        | "stems"
      subscription_status: "active" | "canceled" | "expired" | "paused"
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
      app_role: ["artist", "author", "instructor", "student", "admin"],
      distribution_status: [
        "pending",
        "processing",
        "live",
        "failed",
        "removed",
      ],
      license_type: [
        "standard",
        "exclusive",
        "non_exclusive",
        "creative_commons",
        "royalty_free",
      ],
      payment_status: ["pending", "completed", "failed", "refunded"],
      product_status: [
        "draft",
        "pending_review",
        "approved",
        "published",
        "rejected",
        "archived",
      ],
      product_type: [
        "music",
        "ebook",
        "audiobook",
        "course",
        "podcast",
        "sample_pack",
        "beat",
        "stems",
      ],
      subscription_status: ["active", "canceled", "expired", "paused"],
    },
  },
} as const
