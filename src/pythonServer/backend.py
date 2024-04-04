from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Function to analyze medical data
def analyze_medical_data(data):
    # Read the dataset
    df = pd.read_csv('survey_lung_cancer.csv')

    # Preprocess the data
    xvalue = df.drop(['LUNG_CANCER','age','gender'], axis=1).map(lambda x: 'NO' if x == 1 else 'YES')
    xvar = df[['age']]
    xvalue = pd.concat([df['gender'],xvalue], axis=1)
    x_label = pd.concat([df['age'],xvalue], axis=1)
    x_label = x_label.columns
    xvalue = pd.get_dummies(xvalue)
    X = pd.concat([xvar,xvalue], axis=1)
    X = X.astype(int)
    y = df['LUNG_CANCER'].apply(lambda x: 1 if x == 'YES' else 0)

    # Select common columns between input data and training data
    common_columns = X.columns.intersection(data.columns)
    X = X[common_columns]
    data = data[common_columns]

    # Split the data into training and testing sets
    x_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 42)

    # Train a random forest classifier
    rf = RandomForestClassifier()
    rf.fit(x_train, y_train)

    # Predict on the testing set
    y_pred = rf.predict(X_test)

    # Predict on the input data
    result = rf.predict(data)

    # Calculate accuracy on the testing set
    accuracy = accuracy_score(y_test, y_pred)
    print("Accuracy:", accuracy)

    # Return the result based on the prediction
    if result[0] == 0:
        return "You have cancer."
    else:
        return "You do not have cancer."

# Create a Flask app
app = Flask(__name__)
CORS(app)

# Route for submitting the form
@app.route('/submit', methods=['POST'])
def submit_form():
    # Get the JSON data from the request
    df = pd.DataFrame.from_dict(request.get_json(), orient='index').transpose()

    # Preprocess the input data
    xvalue = df.drop(['age','gender'], axis=1).map(lambda x: 'NO' if x == 1 else 'YES')
    xvar = df[['age']]
    xvalue = pd.concat([df['gender'],xvalue], axis=1)
    x_label = pd.concat([df['age'],xvalue], axis=1)
    x_label = x_label.columns
    xvalue = pd.get_dummies(xvalue)
    X = pd.concat([xvar,xvalue], axis=1).astype(int)

    # Analyze the medical data
    result = analyze_medical_data(X)

    # Return the result as JSON
    return jsonify({'message': result})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
