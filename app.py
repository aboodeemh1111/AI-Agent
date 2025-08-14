from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from main import get_research_response
import os

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}}, supports_credentials=False)

@app.route('/api/research', methods=['POST'])
def research():
	data = request.json
	query = data.get('query', '')
	
	if not query:
		return jsonify({"error": "Query is required"}), 400
	
	try:
		result = get_research_response(query)
		return jsonify(result)
	except Exception as e:
		return jsonify({"error": str(e)}), 500

# Backward-compatible alias for clients pointing to "/research" instead of "/api/research"
@app.route('/research', methods=['POST'])
def research_alias():
	return research()

# Explicit CORS preflight handlers to ensure 200/204 on OPTIONS
@app.route('/api/research', methods=['OPTIONS'])
def api_research_options():
	resp = make_response('', 204)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
	resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
	return resp

@app.route('/research', methods=['OPTIONS'])
def research_options():
	resp = make_response('', 204)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
	resp.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
	return resp

@app.route('/', methods=['GET'])
def health():
	return jsonify({"status": "ok"})

if __name__ == '__main__':
	port = int(os.environ.get("PORT", 5000))
	app.run(host="0.0.0.0", port=port, debug=False)