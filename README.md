# Superstock Analyzer

A specialized stock screening platform based on Jesse Stine's superstock criteria.

## Core Principles

1. **Base Formation Analysis**
   - "The longer the base, the bigger the breakout"
   - "The tighter the base, the bigger the breakout"
   - "A LONG and TIGHT base is a career-maker"
   - Minimum 12-week base formations
   - Low volatility consolidation patterns

2. **Volume Analysis**
   - Low volume during base formation (indicating apathy)
   - Volume contraction during consolidation
   - Multiple tight weekly closes

3. **Fundamental Strength**
   - Severely undervalued companies
   - Strong balance sheets
   - Cash > Market Cap
   - High leverage potential

4. **Sector Analysis**
   - Correlated stocks in the sector
   - Similar chart patterns
   - Sector-wide opportunities

5. **Sentiment Analysis**
   - Contrarian approach
   - Negative media coverage
   - Low institutional interest

## Technical Implementation

### Base Pattern Recognition
- Weekly price data analysis
- Volatility calculations
- Volume trend analysis
- Pattern recognition algorithms

### Fundamental Screening
- Balance sheet analysis
- Cash position vs. Market Cap
- Leverage metrics
- Value indicators

### Sector Correlation
- Sector-wide pattern matching
- Relative strength analysis
- Inter-stock correlation metrics

### Sentiment Analysis
- Media coverage sentiment analysis
- Institutional ownership tracking
- Analyst recommendation tracking

## Project Structure
```
src/
├── lib/
│   ├── types/          # Type definitions
│   └── utils/          # Utility functions
├── services/
│   ├── analysis.ts     # Core analysis engine
│   ├── data.ts         # Data fetching
│   └── screening.ts    # Screening logic
├── components/         # UI components
└── app/               # Next.js pages
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Add your API keys:
```env
ALPHA_VANTAGE_API_KEY=your_key
FINNHUB_API_KEY=your_key
NEWS_API_KEY=your_key
```

4. Run the development server:
```bash
npm run dev
```

## Features

- [x] Base pattern recognition
- [x] Volume analysis
- [x] Fundamental screening
- [x] Sector correlation
- [x] Sentiment analysis
- [x] Email alerts
- [ ] Options analysis
- [ ] Real-time monitoring

## Contributing

Contributions are welcome! Please read our contributing guidelines first.

## License

[MIT License](LICENSE)
