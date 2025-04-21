// Fitness Chatbot Implementation
export class FitnessBot {
  workoutSplits: any
  dietPlans: any
  fitnessAssessments: any
  exerciseLibrary: any

  constructor() {
    // Database of workout splits
    this.workoutSplits = {
      beginnerSplits: {
        "Full Body 3x": {
          description: "Train your entire body three times per week",
          schedule: {
            Monday: "Full Body Workout A",
            Wednesday: "Full Body Workout B",
            Friday: "Full Body Workout C",
            "Tuesday/Thursday/Saturday/Sunday": "Rest or Light Activity",
          },
          benefits: "Great for beginners to build overall strength and muscle",
        },
        "Upper/Lower": {
          description: "Alternating between upper and lower body",
          schedule: {
            Monday: "Upper Body",
            Tuesday: "Lower Body",
            Wednesday: "Rest",
            Thursday: "Upper Body",
            Friday: "Lower Body",
            "Saturday/Sunday": "Rest or Light Activity",
          },
          benefits: "Allows more focus on specific muscle groups while maintaining frequency",
        },
        "Push/Pull/Legs": {
          description: "Divides workouts by movement patterns",
          schedule: {
            Monday: "Push (Chest, Shoulders, Triceps)",
            Tuesday: "Pull (Back, Biceps)",
            Wednesday: "Legs",
            Thursday: "Rest",
            Friday: "Push",
            Saturday: "Pull",
            Sunday: "Rest",
          },
          benefits: "Popular split that balances volume and recovery",
        },
      },
      intermediateSplits: {
        "Arnold Split": {
          description: "Chest/Back, Shoulders/Arms, Legs repeat",
          schedule: {
            Monday: "Chest & Back",
            Tuesday: "Shoulders & Arms",
            Wednesday: "Legs",
            Thursday: "Chest & Back",
            Friday: "Shoulders & Arms",
            Saturday: "Legs",
            Sunday: "Rest",
          },
          benefits: "High volume approach popularized by Arnold Schwarzenegger",
        },
        "5-Day Bro Split": {
          description: "One muscle group per day",
          schedule: {
            Monday: "Chest",
            Tuesday: "Back",
            Wednesday: "Shoulders",
            Thursday: "Arms",
            Friday: "Legs",
            "Saturday/Sunday": "Rest",
          },
          benefits: "High volume per muscle group with longer recovery periods",
        },
      },
      advancedSplits: {
        PHAT: {
          description: "Power Hypertrophy Adaptive Training",
          schedule: {
            Monday: "Upper Body Power",
            Tuesday: "Lower Body Power",
            Wednesday: "Rest",
            Thursday: "Back & Shoulders Hypertrophy",
            Friday: "Lower Body Hypertrophy",
            Saturday: "Chest & Arms Hypertrophy",
            Sunday: "Rest",
          },
          benefits: "Combines strength and hypertrophy training in one program",
        },
        "PPL 6-Day": {
          description: "Push/Pull/Legs twice per week",
          schedule: {
            Monday: "Push",
            Tuesday: "Pull",
            Wednesday: "Legs",
            Thursday: "Push",
            Friday: "Pull",
            Saturday: "Legs",
            Sunday: "Rest",
          },
          benefits: "High frequency approach for experienced lifters",
        },
      },
      specializedSplits: {
        "Upper/Lower/Sport": {
          description: "For athletes balancing strength and sport training",
          schedule: {
            Monday: "Upper Body Strength",
            Tuesday: "Sport Training",
            Wednesday: "Lower Body Strength",
            Thursday: "Sport Training",
            Friday: "Full Body Light",
            Saturday: "Competition/Game",
            Sunday: "Active Recovery",
          },
          benefits: "Balances strength development with sport-specific training",
        },
        "Specialization Split": {
          description: "Extra focus on lagging body parts",
          schedule: {
            Monday: "Focus Muscle Group (Heavy)",
            Tuesday: "Other Muscle Groups",
            Wednesday: "Rest",
            Thursday: "Focus Muscle Group (Volume)",
            Friday: "Other Muscle Groups",
            Saturday: "Full Body Light",
            Sunday: "Rest",
          },
          benefits: "Helps bring up lagging body parts while maintaining overall development",
        },
      },
    }

    // Database of diet plans
    this.dietPlans = {
      weightLoss: {
        "Caloric Deficit": {
          description: "Consume fewer calories than you burn",
          guidelines: "500-1000 calorie deficit per day for 1-2 pounds of weight loss per week",
          macros: "Protein: 0.8-1.2g per pound of body weight, Fats: 0.3-0.5g per pound, Carbs: remaining calories",
          mealFrequency: "3-5 meals per day",
        },
        "Intermittent Fasting": {
          description: "Alternate between periods of eating and fasting",
          variants: [
            "16/8 (16 hours fasting, 8 hour eating window)",
            "5:2 (5 regular days, 2 very low calorie days)",
            "Alternate Day Fasting",
          ],
          benefits: "Can help control hunger, improve insulin sensitivity",
          considerations: "Total calorie intake still matters for weight loss",
        },
        "Low Carb": {
          description: "Reduce carbohydrate intake to induce fat burning",
          carbs: "50-100g per day",
          protein: "High (1-1.2g per pound)",
          fats: "Moderate to high",
          foods: "Focus on meats, eggs, vegetables, nuts, seeds, healthy oils",
        },
      },
      muscleGain: {
        "Lean Bulk": {
          description: "Small caloric surplus to minimize fat gain",
          surplus: "200-300 calories above maintenance",
          protein: "0.8-1g per pound of bodyweight",
          recommendations: "Focus on nutrient-dense whole foods, progressive overload in training",
        },
        "Traditional Bulk": {
          description: "Larger caloric surplus for maximizing muscle growth",
          surplus: "500+ calories above maintenance",
          protein: "1-1.2g per pound of bodyweight",
          carbs: "High to fuel intense workouts",
          considerations: "Will include some fat gain; often followed by a cutting phase",
        },
      },
      performance: {
        "Carb Cycling": {
          description: "Varying carbohydrate intake based on activity levels",
          highDays: "High carbs on intense training days (2-3g per pound)",
          lowDays: "Lower carbs on rest or light days (0.5-1g per pound)",
          protein: "Consistent at 0.8-1g per pound",
          benefits: "Can help maintain performance while managing body composition",
        },
        "Zone Diet": {
          description: "Balanced macronutrient approach focused on controlling inflammation",
          ratio: "40% carbs, 30% protein, 30% fat",
          blocking: 'Food divided into "blocks" with balanced macros',
          benefits: "Popular among CrossFit athletes and those focused on overall health",
        },
      },
      specialized: {
        Ketogenic: {
          description: "Very low carb, high fat diet to induce ketosis",
          macros: "5-10% carbs, 15-20% protein, 70-80% fat",
          foods: "Meat, fish, eggs, dairy, nuts, healthy oils, low-carb vegetables",
          considerations: "Requires adaptation period, may affect initial performance",
        },
        Mediterranean: {
          description: "Based on traditional eating patterns of Mediterranean countries",
          foods: "Olive oil, vegetables, fruits, whole grains, fish, moderate wine",
          benefits: "Heart health, longevity, overall wellness",
          flexibility: "More of an eating pattern than strict plan, easily customizable",
        },
        "Plant-Based": {
          description: "Diet centered around plant foods with minimal or no animal products",
          variants: ["Vegan", "Vegetarian", "Flexitarian"],
          considerations: "Attention to protein sources, B12, iron, zinc, and omega-3s",
          benefits: "Environmental sustainability, potential health benefits",
        },
      },
    }

    // Fitness assessments
    this.fitnessAssessments = {
      strengthTests: ["1RM Bench Press", "1RM Squat", "1RM Deadlift", "Pull-up max", "Push-up max"],
      enduranceTests: ["1-mile run time", "Cooper 12-minute run", "800m row time"],
      mobilityTests: ["Overhead squat assessment", "Shoulder mobility test", "Hip hinge assessment"],
      bodyComposition: ["Body fat percentage", "Waist circumference", "Waist-to-hip ratio"],
    }

    // Exercise library
    this.exerciseLibrary = {
      chest: ["Bench Press", "Incline Press", "Dumbbell Fly", "Cable Crossover", "Push-ups"],
      back: ["Pull-ups", "Bent-over Rows", "Lat Pulldown", "T-bar Row", "Face Pulls"],
      legs: ["Squats", "Deadlifts", "Lunges", "Leg Press", "Leg Extensions", "Leg Curls"],
      shoulders: ["Overhead Press", "Lateral Raises", "Front Raises", "Reverse Fly", "Shrugs"],
      arms: ["Bicep Curls", "Tricep Extensions", "Hammer Curls", "Skull Crushers", "Preacher Curls"],
      core: ["Plank", "Russian Twists", "Leg Raises", "Ab Rollout", "Cable Crunches"],
      cardio: ["Running", "Cycling", "Rowing", "Jump Rope", "HIIT Intervals", "Stair Climber"],
    }
  }

  // Main function to process user queries
  processQuery(userInput: string) {
    const input = userInput.toLowerCase()

    // Check for workout split requests
    if (input.includes("workout split") || input.includes("training program")) {
      return this.recommendWorkoutSplit(input)
    }

    // Check for diet plan requests
    else if (input.includes("diet") || input.includes("nutrition") || input.includes("meal plan")) {
      return this.recommendDietPlan(input)
    }

    // Check for exercise recommendations
    else if (input.includes("exercise") || input.includes("workout") || input.includes("exercises for")) {
      return this.recommendExercises(input)
    }

    // Check for fitness assessment
    else if (input.includes("assessment") || input.includes("test") || input.includes("measure")) {
      return this.provideFitnessAssessment(input)
    }

    // General fitness advice
    else {
      return this.provideGeneralFitnessAdvice()
    }
  }

  // Function to recommend workout splits based on user input
  recommendWorkoutSplit(input: string) {
    // Logic to determine user's experience level and goals
    let experienceLevel = "beginner"
    if (input.includes("intermediate") || input.includes("some experience")) {
      experienceLevel = "intermediate"
    } else if (input.includes("advanced") || input.includes("experienced")) {
      experienceLevel = "advanced"
    }

    // Get appropriate splits based on experience
    let recommendedSplits = {}
    if (experienceLevel === "beginner") {
      recommendedSplits = this.workoutSplits.beginnerSplits
    } else if (experienceLevel === "intermediate") {
      recommendedSplits = this.workoutSplits.intermediateSplits
    } else {
      recommendedSplits = this.workoutSplits.advancedSplits
    }

    // Format response
    let response = `Based on your ${experienceLevel} level, here are some recommended workout splits:\n\n`

    for (const [splitName, splitInfo] of Object.entries(recommendedSplits)) {
      response += `**${splitName}**\n`
      response += `Description: ${splitInfo.description}\n`
      response += `Benefits: ${splitInfo.benefits}\n`
      response += `Schedule:\n`

      for (const [day, workout] of Object.entries(splitInfo.schedule)) {
        response += `- ${day}: ${workout}\n`
      }

      response += `\n`
    }

    return response
  }

  // Function to recommend diet plans based on user input
  recommendDietPlan(input: string) {
    // Determine user's goal
    let dietCategory = "weightLoss"
    if (input.includes("muscle") || input.includes("gain") || input.includes("bulk")) {
      dietCategory = "muscleGain"
    } else if (input.includes("performance") || input.includes("athlete") || input.includes("energy")) {
      dietCategory = "performance"
    } else if (input.includes("keto") || input.includes("vegan") || input.includes("plant")) {
      dietCategory = "specialized"
    }

    // Get appropriate diet plans
    const recommendedDiets = this.dietPlans[dietCategory]

    // Format response
    let response = `Based on your goals, here are some recommended diet plans:\n\n`

    for (const [dietName, dietInfo] of Object.entries(recommendedDiets)) {
      response += `**${dietName}**\n`
      response += `Description: ${dietInfo.description}\n`

      // Include relevant information based on diet type
      for (const [key, value] of Object.entries(dietInfo)) {
        if (key !== "description") {
          if (Array.isArray(value)) {
            response += `${key}: ${value.join(", ")}\n`
          } else {
            response += `${key}: ${value}\n`
          }
        }
      }

      response += `\n`
    }

    return response
  }

  // Function to recommend exercises based on user input
  recommendExercises(input: string) {
    let muscleGroup = "full body"

    // Determine muscle group from input
    if (input.includes("chest")) muscleGroup = "chest"
    else if (input.includes("back")) muscleGroup = "back"
    else if (input.includes("legs") || input.includes("lower body")) muscleGroup = "legs"
    else if (input.includes("shoulders")) muscleGroup = "shoulders"
    else if (input.includes("arms") || input.includes("biceps") || input.includes("triceps")) muscleGroup = "arms"
    else if (input.includes("core") || input.includes("abs")) muscleGroup = "core"
    else if (input.includes("cardio")) muscleGroup = "cardio"

    // Get exercises for the muscle group
    let exercises = []
    if (muscleGroup === "full body") {
      // Create a full body workout with exercises from each group
      exercises = [
        `Chest: ${this.exerciseLibrary.chest[0]}`,
        `Back: ${this.exerciseLibrary.back[0]}`,
        `Legs: ${this.exerciseLibrary.legs[0]}`,
        `Shoulders: ${this.exerciseLibrary.shoulders[0]}`,
        `Arms: ${this.exerciseLibrary.arms[0]}`,
        `Core: ${this.exerciseLibrary.core[0]}`,
        `Cardio: ${this.exerciseLibrary.cardio[0]}`,
      ]
    } else {
      exercises = this.exerciseLibrary[muscleGroup]
    }

    // Format response
    let response = `Here are recommended exercises for ${muscleGroup}:\n\n`

    if (muscleGroup === "full body") {
      response += exercises.join("\n")
    } else {
      for (const exercise of exercises) {
        response += `- ${exercise}\n`
      }
    }

    return response
  }

  // Function to provide fitness assessment guidance
  provideFitnessAssessment(input: string) {
    let response = "Here are some fitness assessments you can perform:\n\n"

    response += "**Strength Tests**\n"
    for (const test of this.fitnessAssessments.strengthTests) {
      response += `- ${test}\n`
    }

    response += "\n**Endurance Tests**\n"
    for (const test of this.fitnessAssessments.enduranceTests) {
      response += `- ${test}\n`
    }

    response += "\n**Mobility Tests**\n"
    for (const test of this.fitnessAssessments.mobilityTests) {
      response += `- ${test}\n`
    }

    response += "\n**Body Composition**\n"
    for (const test of this.fitnessAssessments.bodyComposition) {
      response += `- ${test}\n`
    }

    return response
  }

  // Function to provide general fitness advice
  provideGeneralFitnessAdvice() {
    const adviceList = [
      "Consistency is more important than perfection. Aim for sustainable habits rather than extreme changes.",
      "Progressive overload is key for strength gains - gradually increase weight, reps, or sets over time.",
      "Recovery is as important as training. Ensure adequate sleep and rest days.",
      "For weight loss, focus on creating a caloric deficit through diet and increased activity.",
      "For muscle gain, ensure you're in a slight caloric surplus and consuming adequate protein.",
      "Track your progress through measurements, photos, and performance metrics, not just scale weight.",
      "Hydration affects performance significantly - aim for at least half your body weight (in pounds) in ounces of water daily.",
      "Mobility work can improve performance and reduce injury risk - incorporate dynamic stretching and mobility exercises.",
      "For best results, combine resistance training with some form of cardiovascular exercise.",
      "Your nutrition should support your fitness goals - they work together, not separately.",
    ]

    // Select 3 random pieces of advice
    const shuffled = [...adviceList].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 3)

    return "Here are some general fitness tips:\n\n- " + selected.join("\n- ")
  }

  // Added to maintain compatibility with the previous interface
  getGreeting() {
    return "Hello! I'm your fitness assistant. I can help with workout splits, diet plans, exercise recommendations, and fitness assessments. What would you like to know about today?"
  }
}

// Create a singleton instance
const fitnessBotInstance = new FitnessBot()
export default fitnessBotInstance
