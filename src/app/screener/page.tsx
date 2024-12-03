'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ScreenerCriteria, StockData } from '@/services/stockData'
import { stockDataService } from '@/services/stockData'

export default function ScreenerPage() {
  const [criteria, setCriteria] = useState<ScreenerCriteria[]>([])
  const [results, setResults] = useState<StockData[]>([])
  const [loading, setLoading] = useState(false)

  const addCriteria = () => {
    setCriteria([
      ...criteria,
      {
        type: 'technical',
        field: '',
        operator: 'gt',
        value: 0
      }
    ])
  }

  const removeCriteria = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index))
  }

  const updateCriteria = (index: number, updates: Partial<ScreenerCriteria>) => {
    setCriteria(
      criteria.map((criterion, i) =>
        i === index ? { ...criterion, ...updates } : criterion
      )
    )
  }

  const runScreener = async () => {
    setLoading(true)
    try {
      const results = await stockDataService.screenStocks(criteria)
      setResults(results)
    } catch (error) {
      console.error('Error running screener:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Stock Screener</h1>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="font-medium mb-4">Screening Criteria</h2>
            {criteria.map((criterion, index) => (
              <div key={index} className="space-y-2 mb-4">
                <select
                  className="w-full p-2 border rounded"
                  value={criterion.type}
                  onChange={(e) =>
                    updateCriteria(index, { type: e.target.value as any })
                  }
                >
                  <option value="technical">Technical</option>
                  <option value="fundamental">Fundamental</option>
                  <option value="volume">Volume</option>
                  <option value="price">Price</option>
                </select>
                <select
                  className="w-full p-2 border rounded"
                  value={criterion.operator}
                  onChange={(e) =>
                    updateCriteria(index, { operator: e.target.value as any })
                  }
                >
                  <option value="gt">Greater Than</option>
                  <option value="lt">Less Than</option>
                  <option value="eq">Equals</option>
                  <option value="between">Between</option>
                </select>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={criterion.value as number}
                  onChange={(e) =>
                    updateCriteria(index, { value: parseFloat(e.target.value) })
                  }
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCriteria(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={addCriteria} className="w-full mt-2">
              Add Criteria
            </Button>
            <Button
              onClick={runScreener}
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run Screener'}
            </Button>
          </Card>
        </div>

        <div>
          <Card className="p-4">
            <h2 className="font-medium mb-4">Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-2">Symbol</th>
                    <th className="p-2">Company</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Volume</th>
                    <th className="p-2">Market Cap</th>
                    <th className="p-2">P/E Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((stock) => (
                    <tr key={stock.symbol} className="border-b">
                      <td className="p-2">{stock.symbol}</td>
                      <td className="p-2">{stock.companyName}</td>
                      <td className="p-2">${stock.price.toFixed(2)}</td>
                      <td className="p-2">
                        {stock.volume.toLocaleString()}
                      </td>
                      <td className="p-2">
                        ${(stock.marketCap / 1e9).toFixed(2)}B
                      </td>
                      <td className="p-2">
                        {stock.peRatio?.toFixed(2) || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 