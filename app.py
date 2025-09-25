from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import os

app = Flask(__name__)

# Load the trained model
model_path = 'diabetes_model.pkl'
if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    model = None

# Define feature names for better interpretation
feature_names = [
    'gender', 'age', 'hypertension', 'heart_disease', 
    'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level'
]

@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests"""
    try:
        if model is None:
            return jsonify({
                'error': 'Model not found. Please ensure diabetes_model.pkl exists.',
                'success': False
            })

        # Get data from request
        data = request.json
        
        # Extract features in the correct order
        features = [
            float(data['gender']),
            float(data['age']),
            float(data['hypertension']),
            float(data['heart_disease']),
            float(data['smoking_history']),
            float(data['bmi']),
            float(data['hba1c']),
            float(data['glucose'])
        ]
        
        # Make prediction
        features_array = np.array([features])
        prediction = model.predict(features_array)[0]
        probability = model.predict_proba(features_array)[0]
        
        # Calculate confidence (max probability)
        confidence = max(probability) * 100
        
        # Determine risk level
        risk_level = "High Risk" if prediction == 1 else "Low Risk"
        risk_class = "high" if prediction == 1 else "low"
        
        # Generate risk factors analysis
        risk_factors = analyze_risk_factors(data)
        
        # Generate recommendations
        recommendations = generate_recommendations(data, prediction)
        
        return jsonify({
            'success': True,
            'prediction': int(prediction),
            'risk_level': risk_level,
            'risk_class': risk_class,
            'confidence': round(confidence, 1),
            'probability_no_diabetes': round(probability[0] * 100, 1),
            'probability_diabetes': round(probability[1] * 100, 1),
            'risk_factors': risk_factors,
            'recommendations': recommendations
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Prediction error: {str(e)}',
            'success': False
        })

def analyze_risk_factors(data):
    """Analyze individual risk factors"""
    factors = []
    
    # Age analysis
    age = float(data['age'])
    if age >= 45:
        factors.append({
            'factor': 'Age',
            'value': f"{age} years",
            'risk': 'elevated' if age >= 60 else 'moderate',
            'description': 'Age is a significant risk factor for diabetes'
        })
    
    # BMI analysis
    bmi = float(data['bmi'])
    if bmi >= 25:
        risk_level = 'high' if bmi >= 30 else 'moderate'
        factors.append({
            'factor': 'BMI',
            'value': f"{bmi} kg/m²",
            'risk': risk_level,
            'description': 'Overweight/obesity increases diabetes risk'
        })
    
    # HbA1c analysis
    hba1c = float(data['hba1c'])
    if hba1c >= 5.7:
        risk_level = 'high' if hba1c >= 6.5 else 'moderate'
        factors.append({
            'factor': 'HbA1c Level',
            'value': f"{hba1c}%",
            'risk': risk_level,
            'description': 'Elevated HbA1c indicates poor glucose control'
        })
    
    # Blood glucose analysis
    glucose = float(data['glucose'])
    if glucose >= 100:
        risk_level = 'high' if glucose >= 126 else 'moderate'
        factors.append({
            'factor': 'Blood Glucose',
            'value': f"{glucose} mg/dL",
            'risk': risk_level,
            'description': 'Elevated glucose levels indicate diabetes risk'
        })
    
    # Hypertension
    if data['hypertension'] == '1':
        factors.append({
            'factor': 'Hypertension',
            'value': 'Present',
            'risk': 'moderate',
            'description': 'High blood pressure increases diabetes risk'
        })
    
    # Heart disease
    if data['heart_disease'] == '1':
        factors.append({
            'factor': 'Heart Disease',
            'value': 'Present',
            'risk': 'high',
            'description': 'Cardiovascular disease strongly linked to diabetes'
        })
    
    # Smoking history
    smoking_map = {
        '0': 'No Info', '1': 'Current', '2': 'Ever', 
        '3': 'Former', '4': 'Never', '5': 'Not Current'
    }
    if data['smoking_history'] in ['1', '2']:  # Current or Ever
        factors.append({
            'factor': 'Smoking',
            'value': smoking_map[data['smoking_history']],
            'risk': 'moderate',
            'description': 'Smoking increases risk of type 2 diabetes'
        })
    
    return factors

def generate_recommendations(data, prediction):
    """Generate personalized recommendations"""
    recommendations = []
    
    # General recommendations
    if prediction == 1:
        recommendations.append({
            'icon': 'fas fa-user-md',
            'title': 'Consult Healthcare Provider',
            'description': 'Schedule an appointment with your doctor for comprehensive diabetes evaluation and management plan.',
            'priority': 'high'
        })
    
    # BMI-based recommendations
    bmi = float(data['bmi'])
    if bmi >= 25:
        recommendations.append({
            'icon': 'fas fa-weight',
            'title': 'Weight Management',
            'description': 'Focus on gradual weight loss through balanced diet and regular exercise. Target 5-10% weight reduction.',
            'priority': 'high' if bmi >= 30 else 'medium'
        })
    
    # HbA1c-based recommendations
    hba1c = float(data['hba1c'])
    if hba1c >= 5.7:
        recommendations.append({
            'icon': 'fas fa-chart-line',
            'title': 'Blood Sugar Monitoring',
            'description': 'Regular monitoring of blood glucose levels and HbA1c. Consider continuous glucose monitoring.',
            'priority': 'high'
        })
    
    # Exercise recommendations
    recommendations.append({
        'icon': 'fas fa-running',
        'title': 'Regular Physical Activity',
        'description': 'Aim for 150 minutes of moderate aerobic activity weekly plus strength training exercises.',
        'priority': 'medium'
    })
    
    # Diet recommendations
    recommendations.append({
        'icon': 'fas fa-apple-alt',
        'title': 'Healthy Diet',
        'description': 'Follow a balanced diet rich in vegetables, lean proteins, and whole grains. Limit processed foods and sugar.',
        'priority': 'medium'
    })
    
    # Smoking cessation
    if data['smoking_history'] in ['1', '2']:
        recommendations.append({
            'icon': 'fas fa-ban',
            'title': 'Quit Smoking',
            'description': 'Smoking cessation significantly reduces diabetes risk and improves overall health outcomes.',
            'priority': 'high'
        })
    
    # Stress management
    recommendations.append({
        'icon': 'fas fa-meditation',
        'title': 'Stress Management',
        'description': 'Practice stress-reduction techniques like meditation, yoga, or regular relaxation exercises.',
        'priority': 'low'
    })
    
    return recommendations

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'version': '1.0.0'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
