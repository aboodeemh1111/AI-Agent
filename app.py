from flask import Flask, request, jsonify
from flask_cors import CORS
from main import get_research_response

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True, port=5001) 