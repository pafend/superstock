'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { supabase } from '@/lib/supabase'

interface Watchlist {
  id: string
  name: string
  description: string
  email_notifications: boolean
  notification_frequency: string
  created_at: string
}

export default function WatchlistsPage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWatchlists()
  }, [])

  const fetchWatchlists = async () => {
    try {
      const { data, error } = await supabase
        .from('watchlists')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setWatchlists(data || [])
    } catch (error) {
      console.error('Error fetching watchlists:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleNotifications = async (watchlistId: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('watchlists')
        .update({ email_notifications: !currentState })
        .eq('id', watchlistId)

      if (error) throw error
      await fetchWatchlists()
    } catch (error) {
      console.error('Error toggling notifications:', error)
    }
  }

  const deleteWatchlist = async (watchlistId: string) => {
    if (!confirm('Are you sure you want to delete this watchlist?')) return

    try {
      const { error } = await supabase
        .from('watchlists')
        .delete()
        .eq('id', watchlistId)

      if (error) throw error
      await fetchWatchlists()
    } catch (error) {
      console.error('Error deleting watchlist:', error)
    }
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Watchlists</h1>
        <Link href="/watchlists/new">
          <Button>Create New Watchlist</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {watchlists.map((watchlist) => (
          <Card key={watchlist.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{watchlist.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteWatchlist(watchlist.id)}
              >
                Delete
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {watchlist.description}
            </p>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toggleNotifications(watchlist.id, watchlist.email_notifications)
                }
              >
                {watchlist.email_notifications ? 'Notifications On' : 'Notifications Off'}
              </Button>
              <span className="text-sm text-muted-foreground">
                {watchlist.notification_frequency}
              </span>
            </div>
          </Card>
        ))}

        {watchlists.length === 0 && !loading && (
          <Card className="p-6 col-span-full text-center">
            <p className="text-muted-foreground mb-4">
              You haven't created any watchlists yet.
            </p>
            <Link href="/watchlists/new">
              <Button>Create Your First Watchlist</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
} 