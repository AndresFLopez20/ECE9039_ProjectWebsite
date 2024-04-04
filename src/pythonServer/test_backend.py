from sklearn.metrics import accuracy_score

def test_rf_model():
    df_test = pd.read_csv('test_data.csv')  # Replace 'test_data.csv' with your test dataset file path
    X_test = df_test.drop(['LUNG_CANCER','age','gender'], axis=1).map(lambda x: 'NO' if x == 1 else 'YES')
    xvar_test = df_test[['age']]
    xvalue_test = pd.concat([df_test['gender'], X_test], axis=1)
    x_label_test = pd.concat([df_test['age'], xvalue_test], axis=1)
    x_label_test = x_label_test.columns
    xvalue_test = pd.get_dummies(xvalue_test)
    X_test = pd.concat([xvar_test, xvalue_test], axis=1)
    X_test = X_test.astype(int)
    y_test = df_test['LUNG_CANCER'].apply(lambda x: 1 if x == 'YES' else 0)

    common_columns = X.columns.intersection(X_test.columns)

    X = X[common_columns]
    X_test = X_test[common_columns]

    x_train, _, y_train, _ = train_test_split(X, y, test_size=0.20, random_state=42)
    rf = RandomForestClassifier()
    rf.fit(x_train, y_train)

    y_pred = rf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    print("Accuracy Score:", accuracy)

# Call the test_rf_model function to see the accuracy score
test_rf_model()