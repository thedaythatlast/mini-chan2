# Mini-chan

A full-stack AI chat application built with Laravel, React, and Inertia.js. Integrates Groq's LLM API for responses, with persistent conversation history and user authentication.

## Prerequisites
- PHP 8.2+
- Composer
- Node.js & npm

## Setup

1. Clone the repo
2. Install dependencies
   ```bash
   composer install
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in:
   - `APP_KEY` — run `php artisan key:generate`
   - `GROQ_API_KEY` — get from [groq.com](https://groq.com)
4. Run migrations
   ```bash
   php artisan migrate
   ```
5. Start the dev server
   ```bash
   composer run dev
   ```