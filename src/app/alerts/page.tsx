'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { supabase } from '@/lib/supabase'

interface Alert {
  id: string
  watchlist_id: string
  stock_id: string
  criteria_matched: string[]
  status: 'pending' | 'sent' | 'error'
  triggered_at: string
  created_at: string
  stock: {
    symbol: string
    company_name: string
  }
  watchlist: {
    name: string
  }
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          *,
          stock:stocks(symbol, company_name),
          watchlist:watchlists(name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAlerts(data || [])
    } catch (error) {
      console.error('Error fetching alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const dismissAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ status: 'sent' })
        .eq('id', alertId)

      if (error) throw error
      await fetchAlerts()
    } catch (error) {
      console.error('Error dismissing alert:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Alerts</h1>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">
                    {alert.stock.symbol} - {alert.stock.company_name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    from {alert.watchlist.name}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Triggered: {formatDate(alert.triggered_at)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {alert.criteria_matched.map((criterion, index) => (
                    <span
                      key={index}
                      className="text-xs bg-secondary px-2 py-1 rounded"
                    >
                      {criterion}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert(alert.id)}
                disabled={alert.status === 'sent'}
              >
                {alert.status === 'sent' ? 'Dismissed' : 'Dismiss'}
              </Button>
            </div>
          </Card>
        ))}

        {alerts.length === 0 && !loading && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              No alerts at the moment. They will appear here when your watchlist criteria are met.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
} 