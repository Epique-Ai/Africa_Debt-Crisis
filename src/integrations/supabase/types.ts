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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          category: string
          country_id: string | null
          created_at: string
          description: string | null
          id: string
          impact: string | null
          is_read: boolean | null
          priority: string | null
          threshold: string | null
          title: string
          value: string | null
        }
        Insert: {
          category: string
          country_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          impact?: string | null
          is_read?: boolean | null
          priority?: string | null
          threshold?: string | null
          title: string
          value?: string | null
        }
        Update: {
          category?: string
          country_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          impact?: string | null
          is_read?: boolean | null
          priority?: string | null
          threshold?: string | null
          title?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      article_countries: {
        Row: {
          article_id: string
          country_id: string
          id: string
        }
        Insert: {
          article_id: string
          country_id: string
          id?: string
        }
        Update: {
          article_id?: string
          country_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_countries_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_countries_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          category: string
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          published_at: string | null
          read_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          published_at?: string | null
          read_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          published_at?: string | null
          read_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          created_at: string
          flag_url: string | null
          id: string
          name: string
          region: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          flag_url?: string | null
          id?: string
          name: string
          region: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          flag_url?: string | null
          id?: string
          name?: string
          region?: string
          updated_at?: string
        }
        Relationships: []
      }
      country_fiscal_data: {
        Row: {
          country_id: string
          created_at: string
          debt_service_ratio: number | null
          debt_to_gdp: number | null
          expenditure_to_gdp: number | null
          external_debt_billion: number | null
          fiscal_deficit: number | null
          gdp_growth: number | null
          id: string
          inflation_rate: number | null
          revenue_to_gdp: number | null
          risk_level: string | null
          risk_score: number | null
          unemployment_rate: number | null
          updated_at: string
          year: number
        }
        Insert: {
          country_id: string
          created_at?: string
          debt_service_ratio?: number | null
          debt_to_gdp?: number | null
          expenditure_to_gdp?: number | null
          external_debt_billion?: number | null
          fiscal_deficit?: number | null
          gdp_growth?: number | null
          id?: string
          inflation_rate?: number | null
          revenue_to_gdp?: number | null
          risk_level?: string | null
          risk_score?: number | null
          unemployment_rate?: number | null
          updated_at?: string
          year: number
        }
        Update: {
          country_id?: string
          created_at?: string
          debt_service_ratio?: number | null
          debt_to_gdp?: number | null
          expenditure_to_gdp?: number | null
          external_debt_billion?: number | null
          fiscal_deficit?: number | null
          gdp_growth?: number | null
          id?: string
          inflation_rate?: number | null
          revenue_to_gdp?: number | null
          risk_level?: string | null
          risk_score?: number | null
          unemployment_rate?: number | null
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "country_fiscal_data_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_recommendations: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          priority: string | null
          timeframe: string | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          timeframe?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          timeframe?: string | null
          title?: string
        }
        Relationships: []
      }
      recommendation_countries: {
        Row: {
          country_id: string
          id: string
          recommendation_id: string
        }
        Insert: {
          country_id: string
          id?: string
          recommendation_id: string
        }
        Update: {
          country_id?: string
          id?: string
          recommendation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_countries_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_countries_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "policy_recommendations"
            referencedColumns: ["id"]
          },
        ]
      }
      scenario_projections: {
        Row: {
          country_id: string | null
          created_at: string
          debt_to_gdp: number | null
          fiscal_risk_index: number | null
          gdp_growth: number | null
          id: string
          inflation: number | null
          scenario_id: string
          unemployment: number | null
          year: number
        }
        Insert: {
          country_id?: string | null
          created_at?: string
          debt_to_gdp?: number | null
          fiscal_risk_index?: number | null
          gdp_growth?: number | null
          id?: string
          inflation?: number | null
          scenario_id: string
          unemployment?: number | null
          year: number
        }
        Update: {
          country_id?: string | null
          created_at?: string
          debt_to_gdp?: number | null
          fiscal_risk_index?: number | null
          gdp_growth?: number | null
          id?: string
          inflation?: number | null
          scenario_id?: string
          unemployment?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "scenario_projections_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scenario_projections_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      scenarios: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
