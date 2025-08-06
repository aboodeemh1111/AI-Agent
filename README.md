# AI Research Agent

This repository contains an AI-powered research assistant that generates research papers and summaries using advanced language models and web tools. The project includes a Python backend (Flask API) and a Next.js frontend.

## Features

- Generate research summaries and papers on any topic
- Uses Google Gemini, DuckDuckGo, and Wikipedia for information gathering
- Saves research outputs to text files
- REST API for integration
- Modern Next.js frontend (see `research-frontend/`)

---

## Backend (Flask API)

### Requirements

- Python 3.11+
- See `requirements.txt` for dependencies

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/AI-Agent.git
   cd AI-Agent
   ```
2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up environment variables:**
   - Create a `.env` file and add your Google API key:
     ```env
     GOOGLE_API_KEY=your_google_api_key_here
     ```

### Running the API

```bash
python app.py
```

- The API will be available at `http://localhost:5001/api/research`

### API Usage

- **Endpoint:** `POST /api/research`
- **Request Body:**
  ```json
  { "query": "Your research topic here" }
  ```
- **Response:**
  ```json
  {
    "topic": "...",
    "summary": "...",
    "sources": ["..."],
    "tools": ["..."]
  }
  ```

---

## Frontend (Next.js)

The frontend is located in the [`research-frontend/`](research-frontend/) directory. See its [README](research-frontend/README.md) for setup and usage instructions.

---

## Project Structure

- `main.py` — Core research agent logic
- `app.py` — Flask API server
- `tools.py` — Web, Wikipedia, and file-saving tools
- `requirements.txt` — Python dependencies
- `research-frontend/` — Next.js frontend

---

## License

MIT (or specify your license)
