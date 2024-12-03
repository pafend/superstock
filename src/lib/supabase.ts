import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

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
      stocks: {
        Row: {
          id: string
          symbol: string
          company_name: string
          sector: string
          industry: string
          market_cap: number
          price: number
          volume: number
          avg_volume: number
          pe_ratio: number | null
          eps: number | null
          beta: number | null
          fifty_two_week_high: number
          fifty_two_week_low: number
          rsi_14: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          symbol: string
          company_name: string
          sector: string
          industry: string
          market_cap: number
          price: number
          volume: number
          avg_volume: number
          pe_ratio?: number | null
          eps?: number | null
          beta?: number | null
          fifty_two_week_high: number
          fifty_two_week_low: number
          rsi_14?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      criteria: {
        Row: {
          id: string
          name: string
          description: string
          type: 'technical' | 'fundamental' | 'volume' | 'price'
          conditions: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          type: 'technical' | 'fundamental' | 'volume' | 'price'
          conditions: Json
          created_at?: string
        }
      }
      watchlists: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          criteria_ids: string[]
          email_notifications: boolean
          notification_frequency: 'daily' | 'weekly' | 'realtime'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          criteria_ids: string[]
          email_notifications: boolean
          notification_frequency: 'daily' | 'weekly' | 'realtime'
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          watchlist_id: string
          stock_id: string
          criteria_matched: string[]
          status: 'pending' | 'sent' | 'error'
          triggered_at: string
          created_at: string
        }
        Insert: {
          id?: string
          watchlist_id: string
          stock_id: string
          criteria_matched: string[]
          status: 'pending' | 'sent' | 'error'
          triggered_at?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          settings: Json
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          settings?: Json
          created_at?: string
        }
      }
      stock_analysis: {
        Row: {
          id: string
          stock_id: string
          analysis_type: 'technical' | 'fundamental' | 'sentiment'
          data: Json
          created_at: string
        }
        Insert: {
          id?: string
          stock_id: string
          analysis_type: 'technical' | 'fundamental' | 'sentiment'
          data: Json
          created_at?: string
        }
      }
    }
  }
} 