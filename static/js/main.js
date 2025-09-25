// ===========================================
// Diabetes Risk Predictor - Main JavaScript
// ===========================================

class DiabetesPredictorApp {
  constructor() {
    this.currentFormSection = 0;
    this.formSections = [];
    this.formData = {};
    this.isLoading = false;

    this.init();
  }

  // Initialize the application
  init() {
    this.setupEventListeners();
    this.initializeFormSections();
    this.updateTime();
    this.animateCounters();
    this.hideLoadingScreen();
    this.setupScrollAnimations();
    this.setupFormValidation();
  }

  // Setup all event listeners
  setupEventListeners() {
    // Navigation
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", this.handleNavigation.bind(this));
    });

    // Form submission
    const form = document.getElementById("predictionForm");
    if (form) {
      form.addEventListener("submit", this.handleFormSubmission.bind(this));
    }

    // Form inputs for real-time validation
    this.setupInputListeners();

    // Modal handlers
    this.setupModalHandlers();

    // Button handlers
    this.setupButtonHandlers();

    // Scroll handler for header
    window.addEventListener("scroll", this.handleScroll.bind(this));

    // Mobile menu
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", this.toggleMobileMenu.bind(this));
    }
  }

  // Setup input listeners for real-time validation
  setupInputListeners() {
    // BMI input
    const bmiInput = document.getElementById("bmi");
    if (bmiInput) {
      bmiInput.addEventListener("input", this.validateBMI.bind(this));
    }

    // HbA1c input
    const hba1cInput = document.getElementById("hba1c");
    if (hba1cInput) {
      hba1cInput.addEventListener("input", this.validateHbA1c.bind(this));
    }

    // Glucose input
    const glucoseInput = document.getElementById("glucose");
    if (glucoseInput) {
      glucoseInput.addEventListener("input", this.validateGlucose.bind(this));
    }

    // Age input
    const ageInput = document.getElementById("age");
    if (ageInput) {
      ageInput.addEventListener("input", this.validateAge.bind(this));
    }

    // All inputs for form progress
    const inputs = document.querySelectorAll(
      "#predictionForm input, #predictionForm select"
    );
    inputs.forEach((input) => {
      input.addEventListener("change", this.updateFormProgress.bind(this));
      input.addEventListener("input", this.updateFormProgress.bind(this));
    });
  }

  // Setup modal handlers
  setupModalHandlers() {
    // BMI calculator modal
    window.openBMICalculator = () => this.openModal("bmiModal");
    window.closeBMICalculator = () => this.closeModal("bmiModal");
    window.calculateBMI = () => this.calculateBMI();
    window.useBMI = () => this.useBMIResult();

    // Contact modal
    window.openContactModal = () => this.openModal("contactModal");
    window.closeContactModal = () => this.closeModal("contactModal");

    // Unit toggle in BMI calculator
    this.setupBMICalculator();

    // Close modals when clicking outside
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModal(e.target.id);
      }
    });
  }

  // Setup button handlers
  setupButtonHandlers() {
    // Global functions for buttons
    window.scrollToPredictor = () => this.scrollToSection("predictor");
    window.scrollToAbout = () => this.scrollToSection("about");
    window.clearForm = () => this.clearForm();
    window.closeResults = () => this.closeResults();
    window.newPrediction = () => this.newPrediction();
    window.downloadResults = () => this.downloadResults();
    window.shareResults = () => this.shareResults();
  }

  // Initialize form sections
  initializeFormSections() {
    this.formSections = document.querySelectorAll(".form-section");
    this.updateFormProgress();
  }

  // Handle navigation clicks
  handleNavigation(e) {
    e.preventDefault();
    const href =
      e.target.getAttribute("href") ||
      e.target.closest("a").getAttribute("href");

    if (href && href.startsWith("#")) {
      const targetId = href.substring(1);
      this.scrollToSection(targetId);
      this.updateActiveNavLink(href);
    }
  }

  // Scroll to section with smooth animation
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  }

  // Update active navigation link
  updateActiveNavLink(activeHref) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    const activeLink = document.querySelector(
      `.nav-link[href="${activeHref}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // Handle scroll events
  handleScroll() {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Update active nav based on scroll position
    this.updateActiveNavOnScroll();
  }

  // Update active navigation based on scroll position
  updateActiveNavOnScroll() {
    const sections = ["home", "predictor", "about"];
    const scrollPosition = window.scrollY + 200;

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          this.updateActiveNavLink(`#${sectionId}`);
          break;
        }
      }
    }
  }

  // Handle form submission
  async handleFormSubmission(e) {
    e.preventDefault();
    console.log("Form submission started"); // Debug log

    if (this.isLoading) return;

    // Collect form data first
    this.collectFormData();
    console.log("Form data collected:", this.formData); // Debug log

    // Validate form
    if (!this.validateForm()) {
      this.showToast("Please fill in all required fields correctly.", "error");
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      console.log("Sending request to /predict"); // Debug log
      // Make prediction request
      const response = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });

      const result = await response.json();
      console.log("Received response:", result); // Debug log

      if (result.success) {
        this.displayResults(result);
        this.showToast("Prediction completed successfully!", "success");
      } else {
        throw new Error(result.error || "Prediction failed");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      this.showToast(`Error: ${error.message}`, "error");
    } finally {
      this.setLoadingState(false);
    }
  }

  // Collect form data
  collectFormData() {
    this.formData = {
      gender: document.querySelector('[name="gender"]').value,
      age: document.querySelector('[name="age"]').value,
      hypertension:
        document.querySelector('input[name="hypertension"]:checked')?.value ||
        "",
      heart_disease:
        document.querySelector('input[name="heart_disease"]:checked')?.value ||
        "",
      smoking_history: document.querySelector('[name="smoking_history"]').value,
      bmi: document.querySelector('[name="bmi"]').value,
      hba1c: document.querySelector('[name="hba1c"]').value,
      glucose: document.querySelector('[name="glucose"]').value,
    };
  }

  // Validate form
  validateForm() {
    const requiredFields = [
      "gender",
      "age",
      "hypertension",
      "heart_disease",
      "smoking_history",
      "bmi",
      "hba1c",
      "glucose",
    ];

    for (const field of requiredFields) {
      let input;
      let value;

      if (field === "hypertension" || field === "heart_disease") {
        // For radio buttons, check if any is selected
        input = document.querySelector(`input[name="${field}"]:checked`);
        value = input ? input.value : null;
      } else {
        input = document.querySelector(`[name="${field}"]`);
        value = input ? input.value : null;
      }

      if (!value) {
        console.log(`Field ${field} is missing or empty`); // Debug log
        this.highlightError(
          input || document.querySelector(`[name="${field}"]`)
        );
        return false;
      }
    }

    // Validate ranges using the collected form data
    const age = parseInt(this.formData.age);
    const bmi = parseFloat(this.formData.bmi);
    const hba1c = parseFloat(this.formData.hba1c);
    const glucose = parseInt(this.formData.glucose);

    if (age < 18 || age > 120) {
      this.showToast("Age must be between 18 and 120 years.", "error");
      return false;
    }

    if (bmi < 10 || bmi > 50) {
      this.showToast("BMI must be between 10 and 50 kg/m².", "error");
      return false;
    }

    if (hba1c < 3 || hba1c > 15) {
      this.showToast("HbA1c must be between 3% and 15%.", "error");
      return false;
    }

    if (glucose < 50 || glucose > 400) {
      this.showToast(
        "Blood glucose must be between 50 and 400 mg/dL.",
        "error"
      );
      return false;
    }

    return true;
  }

  // Highlight error field
  highlightError(input) {
    if (input) {
      input.style.borderColor = "var(--error-color)";
      input.focus();

      // Remove highlight after user starts typing
      const removeHighlight = () => {
        input.style.borderColor = "";
        input.removeEventListener("input", removeHighlight);
      };
      input.addEventListener("input", removeHighlight);
    }
  }

  // Set loading state
  setLoadingState(loading) {
    this.isLoading = loading;
    const predictBtn = document.getElementById("predictBtn");
    const btnContent = predictBtn.querySelector(".btn-content");
    const btnLoading = predictBtn.querySelector(".btn-loading");

    if (loading) {
      btnContent.classList.add("hidden");
      btnLoading.classList.remove("hidden");
      predictBtn.disabled = true;
    } else {
      btnContent.classList.remove("hidden");
      btnLoading.classList.add("hidden");
      predictBtn.disabled = false;
    }
  }

  // Display prediction results
  displayResults(result) {
    const resultsPanel = document.getElementById("resultsPanel");

    // Update risk indicator
    this.updateRiskIndicator(result);

    // Update confidence score
    this.updateConfidenceScore(result);

    // Update risk factors
    this.updateRiskFactors(result.risk_factors || []);

    // Update recommendations
    this.updateRecommendations(result.recommendations || []);

    // Show results panel
    resultsPanel.classList.remove("hidden");
    resultsPanel.classList.add("show");

    // Animate gauge
    this.animateRiskGauge(result.confidence);
  }

  // Update risk indicator
  updateRiskIndicator(result) {
    const riskIndicator = document.getElementById("riskIndicator");
    const riskText = document.getElementById("riskText");

    if (riskIndicator && riskText) {
      riskIndicator.className = `risk-indicator ${result.risk_class}`;
      riskText.textContent = result.risk_level;

      // Update icon based on risk level
      const icon = riskIndicator.querySelector("i");
      if (icon) {
        if (result.risk_class === "low") {
          icon.className = "fas fa-shield-check";
        } else if (result.risk_class === "moderate") {
          icon.className = "fas fa-exclamation-triangle";
        } else {
          icon.className = "fas fa-exclamation-circle";
        }
      }
    }
  }

  // Update confidence score
  updateConfidenceScore(result) {
    const confidenceValue = document.getElementById("confidenceValue");
    const probNoDiabetes = document.getElementById("probNoDiabetes");
    const probDiabetes = document.getElementById("probDiabetes");

    if (confidenceValue) {
      confidenceValue.textContent = `${result.confidence}%`;
    }

    if (probNoDiabetes) {
      probNoDiabetes.textContent = `${result.probability_no_diabetes}%`;
    }

    if (probDiabetes) {
      probDiabetes.textContent = `${result.probability_diabetes}%`;
    }
  }

  // Update risk factors display
  updateRiskFactors(riskFactors) {
    const container = document.getElementById("riskFactors");
    if (!container) return;

    container.innerHTML = "";

    if (riskFactors.length === 0) {
      container.innerHTML =
        '<p class="text-gray-600">No significant risk factors identified.</p>';
      return;
    }

    riskFactors.forEach((factor) => {
      const factorElement = document.createElement("div");
      factorElement.className = `risk-factor ${factor.risk}`;
      factorElement.innerHTML = `
                <div class="factor-header">
                    <span class="factor-name">${factor.factor}</span>
                    <span class="factor-value">${factor.value}</span>
                </div>
                <p class="factor-description">${factor.description}</p>
            `;
      container.appendChild(factorElement);
    });
  }

  // Update recommendations display
  updateRecommendations(recommendations) {
    const container = document.getElementById("recommendationsList");
    if (!container) return;

    container.innerHTML = "";

    if (recommendations.length === 0) {
      container.innerHTML =
        '<p class="text-gray-600">No specific recommendations at this time.</p>';
      return;
    }

    recommendations.forEach((rec) => {
      const recElement = document.createElement("div");
      recElement.className = `recommendation ${rec.priority}`;
      recElement.innerHTML = `
                <div class="recommendation-header">
                    <div class="recommendation-icon">
                        <i class="${rec.icon}"></i>
                    </div>
                    <div class="recommendation-content">
                        <h5 class="recommendation-title">${rec.title}</h5>
                        <p class="recommendation-description">${rec.description}</p>
                    </div>
                </div>
            `;
      container.appendChild(recElement);
    });
  }

  // Animate risk gauge
  animateRiskGauge(confidence) {
    const gaugeFill = document.getElementById("gaugeFill");
    if (gaugeFill) {
      // Animate gauge fill based on confidence
      const percentage = confidence / 100;
      gaugeFill.style.background = `conic-gradient(
                var(--success-color) 0deg ${120 * percentage}deg,
                var(--gray-200) ${120 * percentage}deg 360deg
            )`;
    }
  }

  // Validate BMI input
  validateBMI() {
    const bmiInput = document.getElementById("bmi");
    const indicator = document.getElementById("bmiIndicator");

    if (!bmiInput || !indicator) return;

    const bmi = parseFloat(bmiInput.value);

    if (isNaN(bmi) || bmi === 0) {
      indicator.style.display = "none";
      return;
    }

    let category, className;

    if (bmi < 18.5) {
      category = "Underweight";
      className = "indicator-warning";
    } else if (bmi < 25) {
      category = "Normal weight";
      className = "indicator-normal";
    } else if (bmi < 30) {
      category = "Overweight";
      className = "indicator-warning";
    } else {
      category = "Obese";
      className = "indicator-danger";
    }

    indicator.textContent = `BMI Category: ${category}`;
    indicator.className = `bmi-indicator ${className}`;
    indicator.style.display = "block";
  }

  // Validate HbA1c input
  validateHbA1c() {
    const hba1cInput = document.getElementById("hba1c");
    const indicator = document.getElementById("hba1cIndicator");

    if (!hba1cInput || !indicator) return;

    const hba1c = parseFloat(hba1cInput.value);

    if (isNaN(hba1c) || hba1c === 0) {
      indicator.style.display = "none";
      return;
    }

    let category, className;

    if (hba1c < 5.7) {
      category = "Normal";
      className = "indicator-normal";
    } else if (hba1c < 6.5) {
      category = "Pre-diabetes";
      className = "indicator-warning";
    } else {
      category = "Diabetes range";
      className = "indicator-danger";
    }

    indicator.textContent = `HbA1c Status: ${category}`;
    indicator.className = `hba1c-indicator ${className}`;
    indicator.style.display = "block";
  }

  // Validate glucose input
  validateGlucose() {
    const glucoseInput = document.getElementById("glucose");
    const indicator = document.getElementById("glucoseIndicator");

    if (!glucoseInput || !indicator) return;

    const glucose = parseInt(glucoseInput.value);

    if (isNaN(glucose) || glucose === 0) {
      indicator.style.display = "none";
      return;
    }

    let category, className;

    if (glucose < 100) {
      category = "Normal";
      className = "indicator-normal";
    } else if (glucose < 126) {
      category = "Pre-diabetes range";
      className = "indicator-warning";
    } else {
      category = "Diabetes range";
      className = "indicator-danger";
    }

    indicator.textContent = `Glucose Status: ${category}`;
    indicator.className = `glucose-indicator ${className}`;
    indicator.style.display = "block";
  }

  // Validate age input
  validateAge() {
    const ageInput = document.getElementById("age");
    const age = parseInt(ageInput.value);

    if (age < 18 || age > 120) {
      ageInput.style.borderColor = "var(--error-color)";
    } else {
      ageInput.style.borderColor = "";
    }
  }

  // Update form progress
  updateFormProgress() {
    const form = document.getElementById("predictionForm");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.querySelector(".progress-text");

    if (!form || !progressFill) return;

    const inputs = form.querySelectorAll("input[required], select[required]");
    const filledInputs = Array.from(inputs).filter((input) => {
      if (input.type === "radio") {
        return form.querySelector(`input[name="${input.name}"]:checked`);
      }
      return input.value.trim() !== "";
    });

    const progress = (filledInputs.length / inputs.length) * 100;
    progressFill.style.width = `${progress}%`;

    if (progressText) {
      if (progress === 100) {
        progressText.textContent = "Form completed - Ready to analyze!";
      } else {
        progressText.textContent = `${Math.round(progress)}% complete`;
      }
    }
  }

  // Setup BMI calculator
  setupBMICalculator() {
    // Unit toggle handlers
    document.querySelectorAll(".unit-toggle .unit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const toggle = e.target.closest(".unit-toggle");
        const buttons = toggle.querySelectorAll(".unit-btn");
        const unit = e.target.dataset.unit;

        buttons.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");

        // Show/hide height inches input for feet/inches
        const heightInches = document.getElementById("heightInches");
        if (heightInches) {
          if (unit === "ft") {
            heightInches.classList.remove("hidden");
          } else {
            heightInches.classList.add("hidden");
          }
        }
      });
    });
  }

  // Calculate BMI
  calculateBMI() {
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const feetInput = document.getElementById("feet");
    const inchesInput = document.getElementById("inches");
    const resultDiv = document.getElementById("bmiResult");

    let height = parseFloat(heightInput.value);
    let weight = parseFloat(weightInput.value);

    // Check which unit is active for height
    const heightUnitBtn = document.querySelector(
      ".unit-toggle .unit-btn.active[data-unit]"
    );
    const weightUnitBtn = document.querySelectorAll(
      ".unit-toggle .unit-btn.active"
    )[1];

    if (!height || !weight) {
      this.showToast("Please enter both height and weight.", "error");
      return;
    }

    // Convert height to meters
    if (heightUnitBtn && heightUnitBtn.dataset.unit === "ft") {
      const feet = parseFloat(feetInput.value) || 0;
      const inches = parseFloat(inchesInput.value) || 0;
      height = (feet * 12 + inches) * 0.0254; // Convert to meters
    } else {
      height = height / 100; // Convert cm to meters
    }

    // Convert weight to kg if needed
    if (weightUnitBtn && weightUnitBtn.dataset.unit === "lbs") {
      weight = weight * 0.453592; // Convert lbs to kg
    }

    // Calculate BMI
    const bmi = weight / (height * height);

    // Determine category
    let category, range, color;
    if (bmi < 18.5) {
      category = "Underweight";
      range = "BMI < 18.5";
      color = "var(--warning-color)";
    } else if (bmi < 25) {
      category = "Normal Weight";
      range = "BMI 18.5 - 24.9";
      color = "var(--success-color)";
    } else if (bmi < 30) {
      category = "Overweight";
      range = "BMI 25.0 - 29.9";
      color = "var(--warning-color)";
    } else {
      category = "Obese";
      range = "BMI ≥ 30.0";
      color = "var(--error-color)";
    }

    // Display result
    resultDiv.querySelector(".bmi-number").textContent = bmi.toFixed(1);
    resultDiv.querySelector(".bmi-category").textContent = category;
    resultDiv.querySelector(".bmi-range").textContent = range;
    resultDiv.querySelector(".bmi-category").style.color = color;

    resultDiv.classList.remove("hidden");

    // Store BMI for use
    this.calculatedBMI = bmi.toFixed(1);
  }

  // Use calculated BMI in form
  useBMIResult() {
    if (this.calculatedBMI) {
      const bmiInput = document.getElementById("bmi");
      if (bmiInput) {
        bmiInput.value = this.calculatedBMI;
        this.validateBMI();
        this.updateFormProgress();
      }
    }
    this.closeModal("bmiModal");
    this.showToast("BMI value added to form!", "success");
  }

  // Modal management
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("show");
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  // Clear form
  clearForm() {
    const form = document.getElementById("predictionForm");
    if (form) {
      form.reset();

      // Clear indicators
      document
        .querySelectorAll(
          ".bmi-indicator, .hba1c-indicator, .glucose-indicator"
        )
        .forEach((indicator) => {
          indicator.style.display = "none";
        });

      // Reset progress
      this.updateFormProgress();

      // Clear any error highlighting
      document.querySelectorAll("input, select").forEach((input) => {
        input.style.borderColor = "";
      });

      this.showToast("Form cleared successfully!", "success");
    }
  }

  // Close results panel
  closeResults() {
    const resultsPanel = document.getElementById("resultsPanel");
    if (resultsPanel) {
      resultsPanel.classList.remove("show");
      resultsPanel.classList.add("hidden");
    }
  }

  // Start new prediction
  newPrediction() {
    this.closeResults();
    this.clearForm();
    this.scrollToSection("predictor");
  }

  // Download results as PDF
  downloadResults() {
    // This would require a PDF library like jsPDF
    this.showToast("Download feature coming soon!", "info");
  }

  // Share results
  shareResults() {
    if (navigator.share) {
      navigator.share({
        title: "Diabetes Risk Assessment Results",
        text: "I just completed a diabetes risk assessment. Check out this tool!",
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showToast("Link copied to clipboard!", "success");
      });
    }
  }

  // Toggle mobile menu
  toggleMobileMenu() {
    const nav = document.querySelector(".nav");
    if (nav) {
      nav.classList.toggle("mobile-active");
    }
  }

  // Update time display
  updateTime() {
    const timeElement = document.getElementById("currentTime");
    if (timeElement) {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      timeElement.textContent = timeString;
    }

    // Update every minute
    setTimeout(() => this.updateTime(), 60000);
  }

  // Animate counters in hero section
  animateCounters() {
    const counters = document.querySelectorAll(".animate-counter .stat-number");

    counters.forEach((counter) => {
      const target = parseFloat(counter.dataset.target);
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60 FPS
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        // Format number based on target
        if (target >= 100000) {
          counter.textContent = Math.floor(current / 1000) + "K";
        } else if (target % 1 !== 0) {
          counter.textContent = current.toFixed(2);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // Hide loading screen
  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }, 1000);
    }
  }

  // Setup scroll animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");

          // Animate metric circles
          if (entry.target.classList.contains("metric-circle")) {
            this.animateMetricCircle(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document
      .querySelectorAll(".about-card, .metric-circle, .explanation-item")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  // Animate metric circles
  animateMetricCircle(circle) {
    const percentage = parseFloat(circle.dataset.percentage);
    const progressCircle = circle.querySelector(".circle-progress");

    if (progressCircle) {
      const circumference = 314; // 2 * π * 50
      const offset = circumference - (percentage / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  // Setup form validation
  setupFormValidation() {
    const form = document.getElementById("predictionForm");
    if (!form) return;

    // Real-time validation for all inputs
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateInput(input));
      input.addEventListener("input", () => this.clearInputError(input));
    });
  }

  // Validate individual input
  validateInput(input) {
    const value = input.value.trim();
    const isRequired = input.hasAttribute("required");

    if (isRequired && !value) {
      this.showInputError(input, "This field is required");
      return false;
    }

    // Specific validations
    switch (input.name) {
      case "age":
        const age = parseInt(value);
        if (age < 18 || age > 120) {
          this.showInputError(input, "Age must be between 18 and 120");
          return false;
        }
        break;

      case "bmi":
        const bmi = parseFloat(value);
        if (bmi < 10 || bmi > 50) {
          this.showInputError(input, "BMI must be between 10 and 50");
          return false;
        }
        break;

      case "hba1c":
        const hba1c = parseFloat(value);
        if (hba1c < 3 || hba1c > 15) {
          this.showInputError(input, "HbA1c must be between 3% and 15%");
          return false;
        }
        break;

      case "glucose":
        const glucose = parseInt(value);
        if (glucose < 50 || glucose > 400) {
          this.showInputError(
            input,
            "Blood glucose must be between 50 and 400 mg/dL"
          );
          return false;
        }
        break;
    }

    this.clearInputError(input);
    return true;
  }

  // Show input error
  showInputError(input, message) {
    input.style.borderColor = "var(--error-color)";

    // Remove existing error message
    const existingError = input.parentNode.querySelector(".input-error");
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement("div");
    errorElement.className = "input-error";
    errorElement.style.color = "var(--error-color)";
    errorElement.style.fontSize = "0.875rem";
    errorElement.style.marginTop = "0.25rem";
    errorElement.textContent = message;

    input.parentNode.appendChild(errorElement);
  }

  // Clear input error
  clearInputError(input) {
    input.style.borderColor = "";
    const errorElement = input.parentNode.querySelector(".input-error");
    if (errorElement) {
      errorElement.remove();
    }
  }

  // Show toast notification
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const iconMap = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
      info: "fas fa-info-circle",
    };

    toast.innerHTML = `
            <div class="toast-header">
                <i class="${iconMap[type]}"></i>
                <span class="toast-title">${
                  type.charAt(0).toUpperCase() + type.slice(1)
                }</span>
            </div>
            <div class="toast-body">${message}</div>
        `;

    container.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add("show"), 100);

    // Hide toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DiabetesPredictorApp();
});

// Service Worker registration for PWA capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
