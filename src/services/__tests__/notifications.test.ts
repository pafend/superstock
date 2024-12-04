import { notificationService } from '../notifications'
import { supabase } from '@/lib/supabase'

jest.mock('@/lib/supabase')

describe('NotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('sendStockAlert', () => {
    it('should generate and send email alert', async () => {
      const mockStock = {
        symbol: 'AAPL',
        companyName: 'Apple Inc',
        price: 150,
        volume: 1000000,
        marketCap: 2000000000000,
        peRatio: 25,
        eps: 6,
        sector: 'Technology',
        industry: 'Consumer Electronics',
        beta: 1.2,
        fiftyTwoWeekHigh: 155,
        fiftyTwoWeekLow: 120,
        rsi14: 65,
      }

      const mockCriteria = ['Price > $100', 'Volume > 1M']

      const result = await notificationService.sendStockAlert(
        'test@example.com',
        mockStock,
        mockCriteria
      )

      expect(result).toBe(true)
    })
  })

  describe('processAlerts', () => {
    it('should process and group alerts by user', async () => {
      const mockAlerts = [
        {
          id: '1',
          watchlist_id: 'w1',
          stock_id: 's1',
          criteria_matched: ['Price > $100'],
          status: 'pending',
          triggered_at: '2024-01-01T00:00:00Z',
          watchlist: {
            user_id: 'u1',
            email_notifications: true,
            notification_frequency: 'realtime',
          },
          stock: {
            symbol: 'AAPL',
            company_name: 'Apple Inc',
            price: 150,
          },
        },
      ]

      ;(supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({
          data: mockAlerts,
          error: null,
        }),
      })

      const result = await notificationService.processAlerts()

      expect(result).toBe(true)
      expect(supabase.from).toHaveBeenCalledWith('alerts')
    })

    it('should handle errors gracefully', async () => {
      ;(supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({
          data: null,
          error: new Error('Database error'),
        }),
      })

      const result = await notificationService.processAlerts()

      expect(result).toBe(false)
    })
  })
}) 