export interface BaseFormation {
  duration: number          // Length of base in weeks
  priceRange: {            // Price volatility during base
    high: number
    low: number
  }
  volumeProfile: {         // Volume characteristics
    average: number
    trend: 'declining' | 'flat' | 'increasing'
  }
  weeklyCloses: {
    prices: number[]
    volatility: number     // Measure of "tightness"
  }
}

export interface FundamentalMetrics {
  marketCap: number
  cashPosition: number
  totalDebt: number
  currentRatio: number
  quickRatio: number
  debtToEquity: number
  freeCashFlow: number
}

export interface SectorAnalysis {
  sector: string
  correlatedStocks: string[]
  sectorTrend: 'bullish' | 'bearish' | 'neutral'
  relativeStrength: number
}

export interface SentimentIndicators {
  mediaAnalysis: {
    sentiment: 'positive' | 'negative' | 'neutral'
    coverage: number      // Amount of media coverage
    sources: string[]     // Media sources
  }
  analystCoverage: {
    recommendations: {
      buy: number
      hold: number
      sell: number
    }
    priceTargets: {
      low: number
      high: number
      average: number
    }
  }
}

export interface SuperstockCriteria {
  baseFormation: BaseFormation
  fundamentals: FundamentalMetrics
  sectorAnalysis: SectorAnalysis
  sentiment: SentimentIndicators
  technicalSignals: {
    volumeContraction: boolean
    priceConsolidation: boolean
    lowVolatility: boolean
    retestPattern: boolean
  }
} 