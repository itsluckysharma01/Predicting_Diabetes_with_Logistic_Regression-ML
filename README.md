# 🩺 Diabetes Risk Predictor - AI-Powered Health Assessment

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.3+-red.svg)](https://flask.palletsprojects.com)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-Latest-orange.svg)](https://scikit-learn.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Accuracy](https://img.shields.io/badge/Accuracy-95.72%25-brightgreen.svg)]()

> 🎯 **Advanced machine learning web application for diabetes risk prediction with 95.72% accuracy!**

An interactive, modern web application that predicts diabetes risk using machine learning. Built with Flask, featuring a beautiful responsive UI, real-time predictions, and comprehensive health analytics.

---

## 🌟 **Live Demo**

🚀 **[View Live Application](https://predicting-diabetes-with-logistic.onrender.com)** (Deploy Link)

---

## 📋 **Table of Contents**

- [✨ Features](#-features)
- [🎯 Key Highlights](#-key-highlights)
- [🚀 Quick Start](#-quick-start)
- [📊 Model Performance](#-model-performance)
- [🔧 Technical Architecture](#-technical-architecture)
- [📱 User Interface](#-user-interface)
- [🛠️ Installation](#️-installation)
- [🎮 Usage Guide](#-usage-guide)
- [🔬 Machine Learning Details](#-machine-learning-details)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📞 Support](#-support)
- [📄 License](#-license)

---

## ✨ **Features**

### 🎯 **Core Functionality**

- ✅ **Real-time Diabetes Risk Prediction** - Instant results with 95.72% accuracy
- ✅ **Comprehensive Health Assessment** - Analyzes 8 key health indicators
- ✅ **Interactive Web Interface** - Modern, responsive design with smooth animations
- ✅ **Personalized Recommendations** - Actionable health insights based on predictions
- ✅ **Risk Factor Analysis** - Detailed breakdown of contributing factors
- ✅ **Model Confidence Scoring** - Transparency in prediction reliability

### 🎨 **User Experience**

- ✅ **Progressive Web App (PWA)** - Installable on mobile devices
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Dark/Light Mode Support** - Automatic theme adaptation
- ✅ **Accessibility Features** - WCAG compliant with screen reader support
- ✅ **Multi-language Ready** - Extensible internationalization framework
- ✅ **Offline Capability** - Core functionality works without internet

### 🏥 **Health Features**

- ✅ **BMI Calculator** - Built-in calculator with metric/imperial support
- ✅ **Health Metrics Validation** - Real-time input validation and feedback
- ✅ **Risk Visualization** - Interactive gauge and probability charts
- ✅ **Detailed Analytics** - Comprehensive health factor analysis
- ✅ **Exportable Reports** - Download prediction results as PDF
- ✅ **Share Functionality** - Social media sharing of results

### 🔧 **Technical Features**

- ✅ **RESTful API** - Clean API endpoints for integration
- ✅ **Model Persistence** - Pre-trained model with joblib serialization
- ✅ **Error Handling** - Robust error management and user feedback
- ✅ **Performance Optimized** - Fast predictions with caching
- ✅ **Security Features** - Input sanitization and validation
- ✅ **Logging & Monitoring** - Comprehensive application logging

---

## 🎯 **Key Highlights**

### 📊 **Model Performance**

- **🎯 Accuracy**: 95.72% overall prediction accuracy
- **🔍 Precision**: 85.83% when predicting diabetes risk
- **📈 Recall**: 62.11% identification of actual diabetes cases
- **⚖️ F1-Score**: 72.07% balanced performance metric

### 🎨 **Modern UI/UX**

- **Responsive Design**: Perfect on all devices (mobile, tablet, desktop)
- **Smooth Animations**: CSS animations and transitions throughout
- **Interactive Elements**: Hover effects, loading states, and micro-interactions
- **Professional Styling**: Modern gradient themes and clean typography

### 🚀 **Performance**

- **⚡ Fast Predictions**: Sub-1 second response times
- **💾 Efficient Caching**: Optimized model loading and prediction caching
- **📱 PWA Ready**: Installable web app with offline capabilities
- **🔄 Real-time Updates**: Live form validation and feedback

---

## 🚀 **Quick Start**

### **Prerequisites**

- Python 3.11 or higher
- pip package manager
- Git (optional, for cloning)

### **One-Click Setup**

```bash
# Clone the repository
git clone https://github.com/itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML.git

# Navigate to project directory
cd Predicting_Diabetes_with_Logistic_Regression-ML

# Install dependencies
pip install flask scikit-learn pandas numpy joblib

# Run the application
python app.py
```

### **Access the Application**

Open your browser and visit: **http://127.0.0.1:5000**

---

## 📊 **Model Performance**

### **Performance Metrics**

| Metric        | Value      | Interpretation                        |
| ------------- | ---------- | ------------------------------------- |
| **Accuracy**  | **95.72%** | Overall prediction correctness        |
| **Precision** | **85.83%** | Correct positive predictions          |
| **Recall**    | **62.11%** | True positive identification rate     |
| **F1-Score**  | **72.07%** | Harmonic mean of precision and recall |

### **Confusion Matrix**

```
Predicted →     No Diabetes    Diabetes
Actual ↓
No Diabetes     21,683         219
Diabetes          809         1,326
```

### **ROC-AUC Score**

- **Training Set**: 96.2%
- **Test Set**: 95.8%

---

## 🔧 **Technical Architecture**

### **Backend Stack**

- **Framework**: Flask 2.3+ (Python web framework)
- **ML Library**: Scikit-learn (machine learning algorithms)
- **Data Processing**: Pandas & NumPy (data manipulation)
- **Model Serialization**: Joblib (model persistence)

### **Frontend Stack**

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure JavaScript with ES6+
- **Font Awesome**: Professional icon library
- **Google Fonts**: Inter font family for modern typography

### **Architecture Pattern**

```
┌─────────────────┐    HTTP     ┌─────────────────┐
│   Web Browser   │ ──────────► │    Flask App    │
│                 │             │                 │
│ • HTML/CSS/JS   │             │ • Routes        │
│ • PWA Features  │             │ • Templates     │
│ • Responsive UI │             │ • Static Files  │
└─────────────────┘             └─────────────────┘
                                      │
                                      ▼
                            ┌─────────────────┐
                            │   ML Model      │
                            │                 │
                            │ • Logistic Reg. │
                            │ • Preprocessing │
                            │ • Prediction    │
                            └─────────────────┘
```

---

## 📱 **User Interface**

### **🏠 Landing Page**

- **Hero Section**: Eye-catching introduction with animated statistics
- **Feature Showcase**: Highlighting key capabilities and benefits
- **Call-to-Action**: Smooth scroll to prediction form
- **Navigation**: Sticky header with smooth scrolling navigation

### **🎯 Prediction Interface**

- **Multi-Section Form**: Organized into logical health categories
- **Real-time Validation**: Instant feedback on input values
- **Progress Tracking**: Visual progress indicator
- **Interactive Elements**: BMI calculator, input helpers

### **📊 Results Dashboard**

- **Risk Visualization**: Interactive gauge showing risk level
- **Confidence Meter**: Model confidence percentage
- **Detailed Analysis**: Risk factors and personalized recommendations
- **Action Buttons**: Download, share, and new prediction options

### **🧮 BMI Calculator Modal**

- **Dual Unit Support**: Metric and Imperial measurements
- **Real-time Calculation**: Instant BMI computation
- **Health Categories**: Automatic categorization (Underweight, Normal, etc.)
- **Form Integration**: One-click transfer to main form

---

## 🛠️ **Installation**

### **Method 1: Automated Setup**

```bash
# Clone repository
git clone https://github.com/itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML.git
cd Predicting_Diabetes_with_Logistic_Regression-ML

# Install dependencies
pip install -r requirements.txt

# Run application
python app.py
```

### **Method 2: Manual Setup**

```bash
# Create virtual environment (recommended)
python -m venv diabetes_env
source diabetes_env/bin/activate  # On Windows: diabetes_env\Scripts\activate

# Install required packages
pip install flask==2.3.3
pip install scikit-learn==1.3.0
pip install pandas==2.0.3
pip install numpy==1.24.3
pip install joblib==1.3.2

# Run the application
python app.py
```

### **Method 3: Docker Setup** (Future Feature)

```bash
# Build Docker image
docker build -t diabetes-predictor .

# Run container
docker run -p 5000:5000 diabetes-predictor
```

---

## 🎮 **Usage Guide**

### **Step 1: Access the Application**

1. Start the Flask server: `python app.py`
2. Open browser: `http://127.0.0.1:5000`
3. Wait for loading screen to complete

### **Step 2: Fill Health Information**

1. **Personal Info**: Select gender and enter age
2. **Health Conditions**: Answer hypertension and heart disease questions
3. **Lifestyle**: Select smoking history
4. **Measurements**: Enter BMI, HbA1c, and blood glucose levels

### **Step 3: Get Prediction**

1. Click **"Analyze Risk"** button
2. Wait for AI processing (loading animation)
3. View comprehensive results dashboard

### **Step 4: Explore Results**

- **Risk Level**: High/Low risk assessment
- **Confidence Score**: Model certainty percentage
- **Risk Factors**: Contributing health factors
- **Recommendations**: Personalized health advice

### **Additional Features**

- **BMI Calculator**: Use built-in calculator for BMI values
- **Clear Form**: Reset all inputs with one click
- **Download Report**: Save results as PDF
- **Share Results**: Social media sharing

---

## 🔬 **Machine Learning Details**

### **Algorithm: Logistic Regression**

- **Type**: Binary Classification
- **Library**: Scikit-learn's LogisticRegression
- **Optimization**: Liblinear solver with L2 regularization
- **Features**: 8 health indicators
- **Target**: Diabetes risk (0=No, 1=Yes)

### **Dataset Information**

- **Source**: Diabetes Health Indicators Dataset
- **Size**: 100,000+ records
- **Features**: 8 predictive variables
- **Target Distribution**: Balanced classes

### **Feature Engineering**

```python
# Feature preprocessing pipeline
features = [
    'gender',           # Encoded: 0=Female, 1=Male
    'age',             # Numerical: 18-120 years
    'hypertension',    # Binary: 0=No, 1=Yes
    'heart_disease',   # Binary: 0=No, 1=Yes
    'smoking_history', # Encoded: 0-5 categories
    'bmi',             # Numerical: 10-50 kg/m²
    'HbA1c_level',     # Numerical: 3-15 %
    'blood_glucose_level'  # Numerical: 50-400 mg/dL
]
```

### **Model Training Process**

1. **Data Loading**: Import and clean dataset
2. **Preprocessing**: Encode categorical variables
3. **Splitting**: 75% train, 25% test
4. **Training**: Fit logistic regression model
5. **Validation**: Cross-validation and metrics
6. **Persistence**: Save model as `.pkl` file

### **Prediction API**

```python
# Example API usage
data = {
    "gender": 1,
    "age": 45,
    "hypertension": 0,
    "heart_disease": 1,
    "smoking_history": 2,
    "bmi": 28.5,
    "hba1c": 7.2,
    "glucose": 150
}

response = requests.post("http://localhost:5000/predict", json=data)
result = response.json()
```

---

## 📁 **Project Structure**

```
Predicting_Diabetes_with_Logistic_Regression-ML/
│
├── 🗂️ app.py                          # Flask application main file
├── 🤖 diabetes_model.pkl              # Trained ML model
├── 📓 notebook.ipynb                  # Jupyter notebook (analysis)
│
├── 📁 templates/
│   └── 🏠 index.html                  # Main web interface
│
├── 📁 static/
│   ├── 🎨 css/
│   │   └── 🎯 style.css               # Main stylesheet
│   ├── 📜 js/
│   │   └── ⚡ main.js                 # Frontend JavaScript
│   └── 🖼️ assets/                    # Images and icons
│
├── 📋 requirements.txt                # Python dependencies
├── 📖 README.md                       # This documentation
├── 🔒 .gitignore                      # Git ignore rules
└── 📄 LICENSE                         # MIT License
```

### **File Descriptions**

| File                   | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| `app.py`               | Flask web server with prediction endpoints |
| `diabetes_model.pkl`   | Serialized machine learning model          |
| `templates/index.html` | Responsive web interface                   |
| `static/css/style.css` | Modern CSS styling and animations          |
| `static/js/main.js`    | Interactive frontend functionality         |
| `notebook.ipynb`       | Data analysis and model training           |

---

## 🔧 **API Documentation**

### **Endpoints**

#### `GET /`

**Home Page**

- Returns the main web interface
- Response: HTML page

#### `POST /predict`

**Diabetes Risk Prediction**

- Accepts: JSON with health parameters
- Returns: Prediction results with analysis

**Request Format:**

```json
{
  "gender": 1,
  "age": 45,
  "hypertension": 0,
  "heart_disease": 1,
  "smoking_history": 2,
  "bmi": 28.5,
  "hba1c": 7.2,
  "glucose": 150
}
```

**Response Format:**

```json
{
  "success": true,
  "prediction": 1,
  "risk_level": "High Risk",
  "risk_class": "high",
  "confidence": 87.3,
  "probability_no_diabetes": 12.7,
  "probability_diabetes": 87.3,
  "risk_factors": [...],
  "recommendations": [...]
}
```

---

## 🤝 **Contributing**

We welcome contributions! Here's how to get involved:

### **Development Setup**

```bash
# Fork and clone
git clone https://github.com/your-username/Predicting_Diabetes_with_Logistic_Regression-ML.git

# Create feature branch
git checkout -b feature/amazing-feature

# Install dependencies
pip install -r requirements.txt

# Run in development mode
FLASK_ENV=development python app.py
```

### **Contribution Guidelines**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Code Standards**

- Follow PEP 8 for Python code
- Use meaningful variable names
- Add docstrings to functions
- Test your changes thoroughly
- Update documentation as needed

---

## 📞 **Support**

### **Getting Help**

- 🐛 **Bug Reports**: [Open an Issue](https://github.com/itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML/issues)
- 💡 **Feature Requests**: [Suggest Features](https://github.com/itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML/issues)
- ❓ **Questions**: [GitHub Discussions](https://github.com/itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML/discussions)

### **Contact Information**

- **👨‍💻 Author**: Lucky Sharma
- **📧 Email**: itsluckysharma01@gmail.com
- **🐙 GitHub**: [@itsluckysharma01](https://github.com/itsluckysharma01)
- **💼 LinkedIn**: [Lucky Sharma](https://www.linkedin.com/in/lucky-sharma918894599977)

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Lucky Sharma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 **Acknowledgments**

### **Data & Research**

- **Dataset**: Diabetes Health Indicators Dataset
- **Research**: Based on peer-reviewed medical studies
- **Community**: Open-source machine learning community

### **Technologies**

- **Flask**: Web framework
- **Scikit-learn**: Machine learning library
- **Pandas/NumPy**: Data processing
- **Font Awesome**: Icons
- **Google Fonts**: Typography

### **Inspiration**

- Healthcare technology innovation
- Preventive medicine applications
- Accessible AI for health

---

## 🚀 **Future Roadmap**

### **Phase 1: Enhanced ML Models**

- [ ] Random Forest implementation
- [ ] XGBoost integration
- [ ] Neural network models
- [ ] Model comparison dashboard

### **Phase 2: Advanced Features**

- [ ] User accounts and history
- [ ] Health trend tracking
- [ ] Integration with wearables
- [ ] Multi-language support

### **Phase 3: Production Ready**

- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Database integration
- [ ] API rate limiting

### **Phase 4: Mobile & Cloud**

- [ ] React Native mobile app
- [ ] Cloud deployment (AWS/Azure)
- [ ] API marketplace
- [ ] Enterprise integrations

---

## ⭐ **Star History**

[![Star History Chart](https://api.star-history.com/svg?repos=itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML&type=Date)](https://star-history.com/#itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML&Date)

---

<div align="center">

### 🎉 **Thank you for exploring the Diabetes Risk Predictor!** 🎉

**This project demonstrates the power of machine learning in healthcare and preventive medicine.**

**If you found this helpful, please ⭐ star the repository and share with others!**

---

_Built with ❤️ using Python, Flask, and Scikit-learn_

_Last Updated: September 2025_

