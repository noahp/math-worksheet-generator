# Math Worksheet Generator

A Cloudflare Workers-based website that generates printable math worksheets with three types of questions:

- **Algebra**: Simple equations like `123 + x = 345` (numbers < 400)
- **Simple Arithmetic**: Addition problems under 20, like `12 + 5 = ?`
- **Tens Arithmetic**: Addition with multiples of 10, like `20 + 30 = ?`

Each worksheet contains 20 questions with answer boxes. Worksheets are reproducible via URL parameters (seed-based generation).

## Features

- Print-friendly layout (fits on one page)
- Show/hide answers toggle
- Shareable URLs for reproducible worksheets
- Clean, modern UI

## Development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```
