import { stockDataService } from '../stockData'
import { supabase } from '@/lib/supabase'

jest.mock('@/lib/supabase')

describe('StockDataService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchStockData', () => {
    it('should fetch and transform stock data correctly', async () => {
      const mockApiResponse = {
        'Global Quote': {
          '01. symbol': 'AAPL',
          '02. open': '150.0',
          '03. high': '155.0',
          '04. low': '149.0',
          '05. price': '152.0',
          '06. volume': '1000000',
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockApiResponse),
      })

      const result = await stockDataService.fetchStockData('AAPL')

      expect(result).toEqual(
        expect.objectContaining({
          symbol: 'AAPL',
          price: 152.0,
          volume: 1000000,
          fiftyTwoWeekHigh: 155.0,
          fiftyTwoWeekLow: 149.0,
        })
      )
    })

    it('should handle API errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

      const result = await stockDataService.fetchStockData('AAPL')
      expect(result).toBeNull()
    })
  })

  describe('screenStocks', () => {
    it('should filter stocks based on criteria', async () => {
      const mockStocks = [
        {
          symbol: 'AAPL',
          company_name: 'Apple Inc',
          price: 150,
          volume: 1000000,
          market_cap: 2000000000000,
          pe_ratio: 25,
          eps: 6,
          sector: 'Technology',
          industry: 'Consumer Electronics',
          beta: 1.2,
          fifty_two_week_high: 155,
          fifty_two_week_low: 120,
          rsi_14: 65,
        },
      ]

      const criteria = [
        {
          type: 'price',
          field: 'price',
          operator: 'gt',
          value: 100,
        },
      ]

      // Mock Supabase response
      ;(supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: mockStocks,
          error: null,
        }),
      })

      const result = await stockDataService.screenStocks(criteria)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(
        expect.objectContaining({
          symbol: 'AAPL',
          price: 150,
        })
      )
    })
  })

  describe('calculateTechnicalIndicators', () => {
    it('should calculate technical indicators', async () => {
      const result = await stockDataService.calculateTechnicalIndicators('AAPL')

      expect(result).toEqual({
        rsi14: 0,
        sma50: 0,
        sma200: 0,
      })
    })
  })
}) 