# app.py

from flask import Flask, request, jsonify

app = Flask(__name__)

def process_form_data(data):
    # Here, you would implement your Python function logic to process the form data
    # For demonstration purposes, let's assume the user doesn't have cancer
    return "You do not have Cancer"

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.json
    result = process_form_data(data)
    return jsonify({'message': result})

if __name__ == '__main__':
    app.run(debug=True)
