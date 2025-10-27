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
      circuits: {
        Row: {
          avg_humidity: number | null
          avg_temperature: number | null
          avg_wind_speed: number | null
          corners: number
          country: string
          created_at: string
          elevation_gain: number | null
          id: string
          length: number
          name: string
          rookie_avg_finish: number | null
          sector1_time: number
          sector2_time: number
          sector3_time: number
          speed_vs_downforce_rating: number | null
          surface_type: string | null
          top_speed: number
          track_complexity_score: number | null
          track_type: string | null
        }
        Insert: {
          avg_humidity?: number | null
          avg_temperature?: number | null
          avg_wind_speed?: number | null
          corners: number
          country: string
          created_at?: string
          elevation_gain?: number | null
          id?: string
          length: number
          name: string
          rookie_avg_finish?: number | null
          sector1_time: number
          sector2_time: number
          sector3_time: number
          speed_vs_downforce_rating?: number | null
          surface_type?: string | null
          top_speed: number
          track_complexity_score?: number | null
          track_type?: string | null
        }
        Update: {
          avg_humidity?: number | null
          avg_temperature?: number | null
          avg_wind_speed?: number | null
          corners?: number
          country?: string
          created_at?: string
          elevation_gain?: number | null
          id?: string
          length?: number
          name?: string
          rookie_avg_finish?: number | null
          sector1_time?: number
          sector2_time?: number
          sector3_time?: number
          speed_vs_downforce_rating?: number | null
          surface_type?: string | null
          top_speed?: number
          track_complexity_score?: number | null
          track_type?: string | null
        }
        Relationships: []
      }
      drivers: {
        Row: {
          age: number | null
          avg_finish: number
          career_win_rate: number | null
          consistency: number
          crash_rate: number
          created_at: string
          f2_position: number | null
          f3_position: number | null
          id: string
          momentum_score: number | null
          name: string
          nationality: string | null
          podium_percentage: number | null
          podiums: number
          poles: number
          races_completed: number
          recent_form_score: number | null
          team: string
          updated_at: string
          wet_race_experience: number | null
          wins: number
        }
        Insert: {
          age?: number | null
          avg_finish: number
          career_win_rate?: number | null
          consistency: number
          crash_rate: number
          created_at?: string
          f2_position?: number | null
          f3_position?: number | null
          id?: string
          momentum_score?: number | null
          name: string
          nationality?: string | null
          podium_percentage?: number | null
          podiums?: number
          poles?: number
          races_completed?: number
          recent_form_score?: number | null
          team: string
          updated_at?: string
          wet_race_experience?: number | null
          wins?: number
        }
        Update: {
          age?: number | null
          avg_finish?: number
          career_win_rate?: number | null
          consistency?: number
          crash_rate?: number
          created_at?: string
          f2_position?: number | null
          f3_position?: number | null
          id?: string
          momentum_score?: number | null
          name?: string
          nationality?: string | null
          podium_percentage?: number | null
          podiums?: number
          poles?: number
          races_completed?: number
          recent_form_score?: number | null
          team?: string
          updated_at?: string
          wet_race_experience?: number | null
          wins?: number
        }
        Relationships: []
      }
      feature_engineering: {
        Row: {
          calculated_at: string
          circuit_id: string | null
          driver_circuit_compatibility: number | null
          driver_id: string | null
          form_trend: number | null
          id: string
          rolling_avg_finish: number | null
          team_strength_factor: number | null
          track_experience_factor: number | null
          weather_adaptation_score: number | null
        }
        Insert: {
          calculated_at?: string
          circuit_id?: string | null
          driver_circuit_compatibility?: number | null
          driver_id?: string | null
          form_trend?: number | null
          id?: string
          rolling_avg_finish?: number | null
          team_strength_factor?: number | null
          track_experience_factor?: number | null
          weather_adaptation_score?: number | null
        }
        Update: {
          calculated_at?: string
          circuit_id?: string | null
          driver_circuit_compatibility?: number | null
          driver_id?: string | null
          form_trend?: number | null
          id?: string
          rolling_avg_finish?: number | null
          team_strength_factor?: number | null
          track_experience_factor?: number | null
          weather_adaptation_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feature_engineering_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feature_engineering_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      historical_races: {
        Row: {
          circuit_id: string | null
          created_at: string
          dnf: boolean | null
          driver_id: string | null
          fastest_lap: boolean | null
          finishing_position: number
          humidity: number | null
          id: string
          lap_time: number | null
          points_scored: number
          qualifying_position: number
          race_number: number
          season: number
          sector1_time: number | null
          sector2_time: number | null
          sector3_time: number | null
          temperature: number | null
          weather_condition: string | null
          wind_speed: number | null
        }
        Insert: {
          circuit_id?: string | null
          created_at?: string
          dnf?: boolean | null
          driver_id?: string | null
          fastest_lap?: boolean | null
          finishing_position: number
          humidity?: number | null
          id?: string
          lap_time?: number | null
          points_scored: number
          qualifying_position: number
          race_number: number
          season: number
          sector1_time?: number | null
          sector2_time?: number | null
          sector3_time?: number | null
          temperature?: number | null
          weather_condition?: string | null
          wind_speed?: number | null
        }
        Update: {
          circuit_id?: string | null
          created_at?: string
          dnf?: boolean | null
          driver_id?: string | null
          fastest_lap?: boolean | null
          finishing_position?: number
          humidity?: number | null
          id?: string
          lap_time?: number | null
          points_scored?: number
          qualifying_position?: number
          race_number?: number
          season?: number
          sector1_time?: number | null
          sector2_time?: number | null
          sector3_time?: number | null
          temperature?: number | null
          weather_condition?: string | null
          wind_speed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "historical_races_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historical_races_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      model_versions: {
        Row: {
          accuracy_within_2_positions: number | null
          created_at: string
          feature_count: number | null
          feature_importance: Json | null
          hyperparameters: Json | null
          id: string
          is_active: boolean | null
          mae: number | null
          mape: number | null
          model_type: Database["public"]["Enums"]["model_type"]
          r_squared: number | null
          rmse: number | null
          test_samples: number | null
          training_duration_seconds: number | null
          training_samples: number | null
          version: string
        }
        Insert: {
          accuracy_within_2_positions?: number | null
          created_at?: string
          feature_count?: number | null
          feature_importance?: Json | null
          hyperparameters?: Json | null
          id?: string
          is_active?: boolean | null
          mae?: number | null
          mape?: number | null
          model_type: Database["public"]["Enums"]["model_type"]
          r_squared?: number | null
          rmse?: number | null
          test_samples?: number | null
          training_duration_seconds?: number | null
          training_samples?: number | null
          version: string
        }
        Update: {
          accuracy_within_2_positions?: number | null
          created_at?: string
          feature_count?: number | null
          feature_importance?: Json | null
          hyperparameters?: Json | null
          id?: string
          is_active?: boolean | null
          mae?: number | null
          mape?: number | null
          model_type?: Database["public"]["Enums"]["model_type"]
          r_squared?: number | null
          rmse?: number | null
          test_samples?: number | null
          training_duration_seconds?: number | null
          training_samples?: number | null
          version?: string
        }
        Relationships: []
      }
      predictions: {
        Row: {
          actual_points: number | null
          actual_position: number | null
          circuit_id: string | null
          confidence: number
          created_at: string
          driver_id: string | null
          feature_contributions: Json | null
          id: string
          model_version_id: string | null
          predicted_lap_time: number | null
          predicted_points: number
          predicted_position: number
          predicted_qualifying: number
          predicted_sector1: number | null
          predicted_sector2: number | null
          predicted_sector3: number | null
          prediction_error: number | null
          prediction_lower_bound: number | null
          prediction_upper_bound: number | null
          shap_values: Json | null
          status: Database["public"]["Enums"]["prediction_status"] | null
          top_10_probability: number | null
          weather_humidity: number | null
          weather_temperature: number | null
          weather_wind: number | null
        }
        Insert: {
          actual_points?: number | null
          actual_position?: number | null
          circuit_id?: string | null
          confidence: number
          created_at?: string
          driver_id?: string | null
          feature_contributions?: Json | null
          id?: string
          model_version_id?: string | null
          predicted_lap_time?: number | null
          predicted_points: number
          predicted_position: number
          predicted_qualifying: number
          predicted_sector1?: number | null
          predicted_sector2?: number | null
          predicted_sector3?: number | null
          prediction_error?: number | null
          prediction_lower_bound?: number | null
          prediction_upper_bound?: number | null
          shap_values?: Json | null
          status?: Database["public"]["Enums"]["prediction_status"] | null
          top_10_probability?: number | null
          weather_humidity?: number | null
          weather_temperature?: number | null
          weather_wind?: number | null
        }
        Update: {
          actual_points?: number | null
          actual_position?: number | null
          circuit_id?: string | null
          confidence?: number
          created_at?: string
          driver_id?: string | null
          feature_contributions?: Json | null
          id?: string
          model_version_id?: string | null
          predicted_lap_time?: number | null
          predicted_points?: number
          predicted_position?: number
          predicted_qualifying?: number
          predicted_sector1?: number | null
          predicted_sector2?: number | null
          predicted_sector3?: number | null
          prediction_error?: number | null
          prediction_lower_bound?: number | null
          prediction_upper_bound?: number | null
          shap_values?: Json | null
          status?: Database["public"]["Enums"]["prediction_status"] | null
          top_10_probability?: number | null
          weather_humidity?: number | null
          weather_temperature?: number | null
          weather_wind?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "predictions_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "predictions_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "predictions_model_version_id_fkey"
            columns: ["model_version_id"]
            isOneToOne: false
            referencedRelation: "model_versions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      model_type:
        | "linear_regression"
        | "random_forest"
        | "xgboost"
        | "neural_network"
        | "ensemble"
      prediction_status: "pending" | "completed" | "failed"
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
      model_type: [
        "linear_regression",
        "random_forest",
        "xgboost",
        "neural_network",
        "ensemble",
      ],
      prediction_status: ["pending", "completed", "failed"],
    },
  },
} as const
