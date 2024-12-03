import { supabase } from '@/lib/supabase'

export interface StockData {
  symbol: string
  companyName: string
  price: number
  volume: number
  marketCap: number
  peRatio: number | null
  eps: number | null
  sector: string
  industry: string
  beta: number | null
  fiftyTwoWeekHigh: number
  fiftyTwoWeekLow: number
  rsi14: number | null
}

export interface ScreenerCriteria {
  type: 'technical' | 'fundamental' | 'volume' | 'price'
  field: string
  operator: 'gt' | 'lt' | 'eq' | 'between' | 'contains'
  value: number | string | [number, number]
}

class StockDataService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.ALPHA_VANTAGE_API_KEY || ''
  }

  async fetchStockData(symbol: string): Promise<StockData | null> {
    try {
      // In a real implementation, this would call Alpha Vantage or another data provider
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`
      )
      const data = await response.json()
      
      // Transform the data into our format
      return {
        symbol: symbol,
        companyName: '', // Would come from company overview endpoint
        price: parseFloat(data['Global Quote']['05. price']),
        volume: parseInt(data['Global Quote']['06. volume']),
        marketCap: 0, // Would come from company overview endpoint
        peRatio: null,
        eps: null,
        sector: '',
        industry: '',
        beta: null,
        fiftyTwoWeekHigh: parseFloat(data['Global Quote']['03. high']),
        fiftyTwoWeekLow: parseFloat(data['Global Quote']['04. low']),
        rsi14: null
      }
    } catch (error) {
      console.error('Error fetching stock data:', error)
      return null
    }
  }

  async screenStocks(criteria: ScreenerCriteria[]): Promise<StockData[]> {
    // In a real implementation, this would query our database with the criteria
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      
    if (error) {
      console.error('Error screening stocks:', error)
      return []
    }

    return data.map(stock => ({
      symbol: stock.symbol,
      companyName: stock.company_name,
      price: stock.price,
      volume: stock.volume,
      marketCap: stock.market_cap,
      peRatio: stock.pe_ratio,
      eps: stock.eps,
      sector: stock.sector,
      industry: stock.industry,
      beta: stock.beta,
      fiftyTwoWeekHigh: stock.fifty_two_week_high,
      fiftyTwoWeekLow: stock.fifty_two_week_low,
      rsi14: stock.rsi_14
    }))
  }

  async calculateTechnicalIndicators(symbol: string): Promise<{
    rsi14: number
    sma50: number
    sma200: number
  } | null> {
    try {
      // This would calculate or fetch technical indicators
      return {
        rsi14: 0,
        sma50: 0,
        sma200: 0
      }
    } catch (error) {
      console.error('Error calculating technical indicators:', error)
      return null
    }
  }

  async getInsiderTrading(symbol: string): Promise<any[]> {
    try {
      // This would fetch insider trading data from SEC EDGAR
      return []
    } catch (error) {
      console.error('Error fetching insider trading data:', error)
      return []
    }
  }
}

export const stockDataService = new StockDataService() 