# 🩺 Diabetes Prediction with Logistic Regression

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://python.org)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-Latest-orange.svg)](https://scikit-learn.org)
[![Pandas](https://img.shields.io/badge/Pandas-Latest-green.svg)](https://pandas.pydata.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 🎯 **Predict diabetes likelihood using machine learning with 95.72% accuracy!**

An interactive machine learning project that predicts the likelihood of diabetes in individuals based on various health metrics using Logistic Regression. This project demonstrates the complete machine learning pipeline from data preprocessing to model evaluation.

---

## 📊 **Project Overview**

This project uses the **Diabetes Health Indicators Dataset** to build a predictive model that can identify individuals at risk of diabetes. The model achieves an impressive **95.72% accuracy** with robust performance metrics.

### 🎯 **Key Features**

- ✅ Complete data preprocessing pipeline
- ✅ Categorical variable encoding (Gender, Smoking History)
- ✅ Train-test data splitting
- ✅ Logistic Regression model training
- ✅ Comprehensive model evaluation
- ✅ Model persistence for future predictions

---

## 🚀 **Quick Start**

### **Option 1: Interactive Jupyter Notebook**

```bash
# Clone the repository
git clone https://github.com/itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML.git

# Navigate to project directory
cd Predicting_Diabetes_with_Logistic_Regression-ML

# Install required packages
pip install pandas numpy matplotlib scikit-learn jupyter

# Launch Jupyter Notebook
jupyter notebook Predicting_Diabetes_with_Logistic_Regression.ipynb
```

### **Option 2: Direct Model Usage**

```python
import joblib
import numpy as np

# Load the trained model
model = joblib.load('diabetes_model.pkl')

# Make prediction (example values)
# [gender, age, hypertension, heart_disease, smoking_history, bmi, HbA1c_level, blood_glucose_level]
prediction = model.predict([[0, 80, 0, 1, 4, 25.19, 6.6, 140]])
print(f"Diabetes Risk: {'High' if prediction[0] == 1 else 'Low'}")
```

---

## 📈 **Model Performance**

Our Logistic Regression model demonstrates excellent performance:

| Metric           | Value      | Interpretation                                   |
| ---------------- | ---------- | ------------------------------------------------ |
| **🎯 Accuracy**  | **95.72%** | Overall prediction accuracy                      |
| **🔍 Precision** | **85.83%** | When predicting diabetes, correct 85.83% of time |
| **📊 Recall**    | **62.11%** | Identifies 62.11% of actual diabetes cases       |
| **⚖️ F1-Score**  | **72.07%** | Balanced measure of precision and recall         |

### 📊 **Confusion Matrix**

```
                 Predicted
                No    Yes
Actual    No  [21683  219]
          Yes [  809 1326]
```

---

## 🔧 **Technical Details**

### **Dataset Features**

| Feature               | Description                          | Type        |
| --------------------- | ------------------------------------ | ----------- |
| `gender`              | Gender (Male/Female) → Encoded (0/1) | Categorical |
| `age`                 | Age of the individual                | Numerical   |
| `hypertension`        | Hypertension status (0/1)            | Binary      |
| `heart_disease`       | Heart disease status (0/1)           | Binary      |
| `smoking_history`     | Smoking history → Encoded (0-5)      | Categorical |
| `bmi`                 | Body Mass Index                      | Numerical   |
| `HbA1c_level`         | Hemoglobin A1c level                 | Numerical   |
| `blood_glucose_level` | Blood glucose level                  | Numerical   |
| `diabetes`            | Target variable (0/1)                | Binary      |

### **Data Preprocessing Steps**

1. 🧹 **Data Cleaning**: Removed duplicate entries
2. 🔢 **Encoding**: Label encoded categorical variables
3. ✂️ **Splitting**: 75% training, 25% testing
4. 🎯 **Feature Selection**: All features used for prediction

---

## 📁 **Project Structure**

```
Predicting_Diabetes_with_Logistic_Regression-ML/
│
├── 📓 Predicting_Diabetes_with_Logistic_Regression.ipynb  # Main notebook
├── 🤖 diabetes_model.pkl                                  # Trained model
├── 📝 README.md                                          # This file
└── 📊 Dataset (loaded from URL)                          # Remote dataset
```

---

## 🛠️ **Installation & Requirements**

### **System Requirements**

- Python 3.11 or higher
- Jupyter Notebook
- 4GB+ RAM (recommended)

### **Python Dependencies**

```bash
pip install pandas numpy matplotlib scikit-learn jupyter
```

**Or using requirements.txt:**

```txt
pandas>=1.5.0
numpy>=1.21.0
matplotlib>=3.5.0
scikit-learn>=1.1.0
jupyter>=1.0.0
```

---

## 🔬 **How to Use**

### **1. Making Predictions**

```python
# Load required libraries
import joblib
import numpy as np

# Load the trained model
model = joblib.load('diabetes_model.pkl')

# Prepare input data (example)
# Format: [gender, age, hypertension, heart_disease, smoking_history, bmi, HbA1c_level, blood_glucose_level]
sample_data = [[1, 45, 1, 0, 2, 28.5, 7.2, 150]]

# Make prediction
prediction = model.predict(sample_data)
probability = model.predict_proba(sample_data)

print(f"Prediction: {'Diabetes Risk' if prediction[0] == 1 else 'No Diabetes Risk'}")
print(f"Confidence: {max(probability[0]) * 100:.2f}%")
```

### **2. Understanding Feature Encoding**

**Gender Encoding:**

- `0` = Female
- `1` = Male

**Smoking History Encoding:**

- `0` = No Info
- `1` = Current
- `2` = Ever
- `3` = Former
- `4` = Never
- `5` = Not Current

---

## 📊 **Interactive Analysis**

### **Key Insights from the Data:**

- 🔍 **Class Distribution**: Dataset shows realistic diabetes prevalence
- 📈 **Feature Importance**: BMI, HbA1c, and blood glucose are strong predictors
- ⚖️ **Model Balance**: High precision with moderate recall (conservative predictions)

### **Model Interpretation:**

- **High Precision (85.83%)**: When model predicts diabetes, it's usually correct
- **Moderate Recall (62.11%)**: Model is conservative, missing ~38% of actual cases
- **Excellent Accuracy (95.72%)**: Overall strong performance across all predictions

---

## 🎯 **Use Cases**

1. **🏥 Healthcare Screening**: Initial diabetes risk assessment
2. **📱 Health Apps**: Integration into wellness applications
3. **🔬 Research**: Baseline model for diabetes prediction studies
4. **📚 Education**: Learning machine learning with real healthcare data

---

## 🚀 **Future Enhancements**

- [ ] 🧠 **Advanced Models**: Try Random Forest, XGBoost, Neural Networks
- [ ] 🎛️ **Hyperparameter Tuning**: Optimize model parameters
- [ ] 📊 **Feature Engineering**: Create new predictive features
- [ ] 🌐 **Web Interface**: Build interactive web application
- [ ] 📱 **Mobile App**: Create mobile prediction app
- [ ] ⚖️ **Threshold Optimization**: Balance precision/recall based on use case

---

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. 🍴 Fork the repository
2. 🌟 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit changes (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push to branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

---

## 📞 **Contact & Support**

- **👨‍💻 Author**: Lucky Sharma
- **📧 Email**: [your-email@example.com]
- **🐙 GitHub**: [@itsluckysharma01](https://github.com/itsluckysharma01)
- **💼 LinkedIn**: [Your LinkedIn Profile]

### **🆘 Need Help?**

- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Suggest new features via issues
- ❓ **Questions**: Use GitHub Discussions

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- 📊 **Dataset**: Diabetes Health Indicators Dataset
- 🧰 **Libraries**: Scikit-learn, Pandas, NumPy, Matplotlib
- 🌟 **Inspiration**: Real-world healthcare applications of ML

---

## ⭐ **Star History**

[![Star History Chart](https://api.star-history.com/svg?repos=itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML&type=Date)](https://star-history.com/#itsluckysharma01/Predicting_Diabetes_with_Logistic_Regression-ML&Date)

---

<div align="center">

### 🎉 **Thank you for exploring this project!** 🎉

**If you found this helpful, please ⭐ star the repository!**

</div>

---

_Last Updated: September 2025_
