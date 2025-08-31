from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

vectorizer = CountVectorizer()
X_train = ["App crashes", "Button not working", "Login fails"]
y_train = ["S1", "S2", "S3"]
X = vectorizer.fit_transform(X_train)
model = LogisticRegression().fit(X, y_train)

def predict_severity(text: str):
    x_test = vectorizer.transform([text])
    return model.predict(x_test)[0]