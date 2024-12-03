import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold inline-block">Superstock Analysis</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/watchlists">
                <Button variant="ghost">Watchlists</Button>
              </Link>
              <Link href="/screener">
                <Button variant="ghost">Screener</Button>
              </Link>
              <Link href="/alerts">
                <Button variant="ghost">Alerts</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Quick Stats</h3>
            <div className="space-y-2">
              <p className="text-sm">Active Watchlists: 0</p>
              <p className="text-sm">Pending Alerts: 0</p>
              <p className="text-sm">Tracked Stocks: 0</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Recent Alerts</h3>
            <p className="text-sm text-muted-foreground">No recent alerts</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Market Overview</h3>
            <p className="text-sm text-muted-foreground">Loading market data...</p>
          </Card>

          <Card className="p-6 md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-medium mb-4">Getting Started</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-medium">1. Create a Watchlist</h4>
                <p className="text-sm text-muted-foreground">
                  Set up your first watchlist with custom criteria
                </p>
                <Link href="/watchlists/new">
                  <Button size="sm">Create Watchlist</Button>
                </Link>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">2. Configure Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Set up email notifications for matching stocks
                </p>
                <Link href="/alerts/settings">
                  <Button size="sm" variant="outline">Configure Alerts</Button>
                </Link>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">3. Screen Stocks</h4>
                <p className="text-sm text-muted-foreground">
                  Use the screener to find matching stocks
                </p>
                <Link href="/screener">
                  <Button size="sm" variant="outline">Open Screener</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
