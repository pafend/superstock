import { supabase } from '@/lib/supabase'
import type { StockData } from './stockData'

export interface NotificationPreferences {
  email: string
  frequency: 'daily' | 'weekly' | 'realtime'
  watchlistIds: string[]
}

class NotificationService {
  private emailApiKey: string

  constructor() {
    this.emailApiKey = process.env.EMAIL_SERVICE_API_KEY || ''
  }

  async sendStockAlert(
    userEmail: string,
    stock: StockData,
    matchedCriteria: string[]
  ) {
    try {
      // In a real implementation, this would use an email service like SendGrid
      const emailContent = this.generateEmailContent(stock, matchedCriteria)
      
      // Mock email sending
      console.log('Sending email to:', userEmail)
      console.log('Content:', emailContent)
      
      return true
    } catch (error) {
      console.error('Error sending email alert:', error)
      return false
    }
  }

  private generateEmailContent(stock: StockData, matchedCriteria: string[]) {
    return {
      subject: `Stock Alert: ${stock.symbol} Matches Your Criteria`,
      body: `
        <h2>Stock Alert for ${stock.symbol}</h2>
        <p>Company: ${stock.companyName}</p>
        <p>Current Price: $${stock.price}</p>
        <p>Volume: ${stock.volume.toLocaleString()}</p>
        <h3>Matched Criteria:</h3>
        <ul>
          ${matchedCriteria.map(criterion => `<li>${criterion}</li>`).join('')}
        </ul>
      `
    }
  }

  async processAlerts() {
    try {
      // Get all pending alerts
      const { data: alerts, error } = await supabase
        .from('alerts')
        .select(`
          *,
          watchlist:watchlists(
            user_id,
            email_notifications,
            notification_frequency
          ),
          stock:stocks(*)
        `)
        .eq('status', 'pending')

      if (error) throw error

      // Group alerts by user and frequency
      const alertsByUser = this.groupAlertsByUser(alerts)

      // Send notifications based on frequency settings
      for (const [userId, userAlerts] of Object.entries(alertsByUser)) {
        await this.sendUserNotifications(userId, userAlerts)
      }

      return true
    } catch (error) {
      console.error('Error processing alerts:', error)
      return false
    }
  }

  private groupAlertsByUser(alerts: any[]) {
    return alerts.reduce((acc, alert) => {
      const userId = alert.watchlist.user_id
      if (!acc[userId]) {
        acc[userId] = []
      }
      acc[userId].push(alert)
      return acc
    }, {} as Record<string, any[]>)
  }

  private async sendUserNotifications(userId: string, alerts: any[]) {
    try {
      // Get user email preferences
      const { data: user, error } = await supabase
        .from('users')
        .select('email, settings')
        .eq('id', userId)
        .single()

      if (error) throw error

      // Send email notification
      const success = await this.sendStockAlert(
        user.email,
        alerts[0].stock,
        alerts[0].criteria_matched
      )

      if (success) {
        // Update alert status
        await supabase
          .from('alerts')
          .update({ status: 'sent' })
          .in(
            'id',
            alerts.map(a => a.id)
          )
      }
    } catch (error) {
      console.error('Error sending user notifications:', error)
    }
  }
}

export const notificationService = new NotificationService() 