// Fitness Chatbot Implementation
export class FitnessChatbot {
  knowledge: {
    workouts: any
    supplements: any
    nutrition: any
  }
  commonQuestions: Record<string, () => string>

  constructor() {
    this.knowledge = {
      workouts: {
        ppl: {
          overview:
            "Push-Pull-Legs (PPL) is a training split that divides workouts into three categories: push exercises (chest, shoulders, triceps), pull exercises (back, biceps), and leg exercises.",
          benefits: [
            "Allows for higher training frequency",
            "Provides adequate recovery time",
            "Targets all major muscle groups",
            "Flexible for both beginners and advanced lifters",
          ],
          schedule: "Typically run as a 6-day split (PPL-PPL-rest) or 3-day split (PPL-rest-PPL-rest)",
          pushDay: {
            exercises: [
              "Bench Press",
              "Overhead Press",
              "Incline Dumbbell Press",
              "Lateral Raises",
              "Tricep Pushdowns",
              "Dips",
            ],
            focus: "Chest, shoulders, and triceps",
          },
          pullDay: {
            exercises: [
              "Deadlifts",
              "Pull-ups/Lat Pulldowns",
              "Barbell Rows",
              "Face Pulls",
              "Bicep Curls",
              "Hammer Curls",
            ],
            focus: "Back, rear delts, and biceps",
          },
          legDay: {
            exercises: ["Squats", "Romanian Deadlifts", "Leg Press", "Leg Extensions", "Leg Curls", "Calf Raises"],
            focus: "Quadriceps, hamstrings, glutes, and calves",
          },
        },
        beginnerTips: [
          "Start with lighter weights to perfect form",
          "Focus on compound movements first",
          "Aim for 3-4 sets of 8-12 reps for most exercises",
          "Rest 1-2 minutes between sets",
          "Increase weight gradually using progressive overload",
        ],
        advancedTips: [
          "Incorporate periodization into your training",
          "Add intensity techniques like drop sets or supersets",
          "Track your progress meticulously",
          "Consider advanced splits like PPL with specialization days",
        ],
      },

      supplements: {
        wheyProtein: {
          overview:
            "Whey protein is a complete protein derived from milk during cheese production. It's rapidly digested and rich in essential amino acids.",
          benefits: [
            "Supports muscle growth and recovery",
            "Convenient source of high-quality protein",
            "Can help reach daily protein intake goals",
          ],
          dosage: "Typically 20-30g per serving, 1-2 servings daily depending on needs",
          types: {
            concentrate: "80-85% protein, contains some lactose and fat",
            isolate: "90%+ protein, minimal lactose and fat, faster absorption",
            hydrolysate: "Pre-digested for even faster absorption, often used post-workout",
          },
          timing: "Effective any time of day, particularly useful post-workout or between meals",
        },

        creatine: {
          overview:
            "Creatine is a naturally occurring compound that helps regenerate ATP, the body's primary energy source for short, intense activities.",
          benefits: [
            "Increases strength and power output",
            "Enhances muscle growth",
            "Improves high-intensity exercise performance",
            "Well-researched with strong safety profile",
          ],
          dosage: "Loading phase: 20g daily for 5-7 days (optional)\nMaintenance: 3-5g daily",
          types: {
            monohydrate: "Most researched and cost-effective form",
            HCL: "More soluble, may cause less water retention",
            ethyl_ester: "Claimed to have better absorption, but evidence is limited",
          },
          timing: "Can be taken any time of day, consistency is more important than timing",
        },

        bcaa: {
          overview:
            "Branched-Chain Amino Acids (BCAAs) consist of three essential amino acids: leucine, isoleucine, and valine.",
          benefits: [
            "May reduce muscle soreness",
            "Could prevent muscle breakdown during intense training",
            "Might support recovery",
          ],
          dosage: "Typically 5-10g before, during, or after workouts",
          effectiveness:
            "Research is mixed - those consuming adequate protein may not see additional benefits from BCAA supplementation",
          comparison:
            "Whey protein provides all essential amino acids including BCAAs, making isolated BCAA supplements potentially redundant for many",
        },
      },

      nutrition: {
        proteinIntake: "Aim for 1.6-2.2g of protein per kg of bodyweight daily for muscle building",
        calorieCalculation: {
          bulking: "Maintenance calories + 300-500 calories",
          cutting: "Maintenance calories - 300-500 calories",
          maintenance: "Body weight (lbs) × 14-16 for moderately active individuals",
        },
        mealTiming: "Aim for 3-5 meals spread throughout the day, each containing protein",
        preworkoutNutrition: "Consume carbs and protein 1-2 hours before training",
        postworkoutNutrition: "Consume protein and carbs within 2 hours after training",
      },
    }

    this.commonQuestions = {
      "what is ppl": this.getPPLInfo.bind(this),
      "push day exercises": this.getPushDayInfo.bind(this),
      "pull day exercises": this.getPullDayInfo.bind(this),
      "leg day exercises": this.getLegDayInfo.bind(this),
      "whey protein benefits": this.getWheyInfo.bind(this),
      "creatine dosage": this.getCreatineInfo.bind(this),
      "bcaa vs whey": this.compareBCAAWhey.bind(this),
      "how much protein": this.getProteinInfo.bind(this),
      help: this.getHelp.bind(this),
    }
  }

  processMessage(userInput: string) {
    return this.processQuery(userInput)
  }

  processQuery(userInput: string) {
    const input = userInput.toLowerCase().trim()

    // Direct matches to common questions
    for (const [key, handler] of Object.entries(this.commonQuestions)) {
      if (input.includes(key)) {
        return handler()
      }
    }

    // Categorize the query
    if (this.containsWorkoutTerms(input)) {
      return this.handleWorkoutQuery(input)
    } else if (this.containsSupplementTerms(input)) {
      return this.handleSupplementQuery(input)
    } else if (this.containsNutritionTerms(input)) {
      return this.handleNutritionQuery(input)
    } else {
      return this.getGeneralResponse(input)
    }
  }

  containsWorkoutTerms(input: string) {
    const workoutTerms = [
      "workout",
      "exercise",
      "training",
      "ppl",
      "push",
      "pull",
      "leg",
      "split",
      "rep",
      "set",
      "routine",
    ]
    return workoutTerms.some((term) => input.includes(term))
  }

  containsSupplementTerms(input: string) {
    const supplementTerms = ["supplement", "protein", "whey", "creatine", "bcaa", "amino", "shake"]
    return supplementTerms.some((term) => input.includes(term))
  }

  containsNutritionTerms(input: string) {
    const nutritionTerms = ["diet", "nutrition", "food", "meal", "calorie", "protein", "carb", "fat", "macro"]
    return nutritionTerms.some((term) => input.includes(term))
  }

  handleWorkoutQuery(input: string) {
    if (input.includes("ppl") || input.includes("push pull leg")) {
      return this.getPPLInfo()
    } else if (input.includes("push")) {
      return this.getPushDayInfo()
    } else if (input.includes("pull")) {
      return this.getPullDayInfo()
    } else if (input.includes("leg")) {
      return this.getLegDayInfo()
    } else if (input.includes("beginner")) {
      return "Tips for beginners: " + this.knowledge.workouts.beginnerTips.join(", ")
    } else {
      return "I can provide information about PPL (Push-Pull-Legs) workouts. Would you like to know about the overall structure, push day, pull day, or leg day exercises?"
    }
  }

  handleSupplementQuery(input: string) {
    if (input.includes("whey")) {
      return this.getWheyInfo()
    } else if (input.includes("creatine")) {
      return this.getCreatineInfo()
    } else if (input.includes("bcaa")) {
      return this.getBCAAInfo()
    } else if (input.includes("compare") || input.includes("vs") || input.includes("versus")) {
      if ((input.includes("bcaa") && input.includes("whey")) || (input.includes("whey") && input.includes("bcaa"))) {
        return this.compareBCAAWhey()
      }
    }
    return "I can provide information about supplements like whey protein, creatine, and BCAAs. Which would you like to learn more about?"
  }

  handleNutritionQuery(input: string) {
    if (input.includes("protein")) {
      return this.getProteinInfo()
    } else if (input.includes("calorie") || input.includes("bulk") || input.includes("cut")) {
      return this.getCalorieInfo()
    } else if (input.includes("meal") || input.includes("timing")) {
      return this.getMealTimingInfo()
    }
    return "I can provide information about nutrition including protein intake, calorie calculation for different goals, and meal timing. What specific nutrition topic are you interested in?"
  }

  getGeneralResponse(input: string) {
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! I'm your fitness assistant. I can help with PPL workouts, supplements like whey protein, creatine, and BCAAs, and nutrition advice. What would you like to know about?"
    } else {
      return "I'm not sure I understand. I can help with PPL workouts, supplements (whey protein, creatine, BCAAs), and nutrition advice. Type 'help' for more information."
    }
  }

  getPPLInfo() {
    const ppl = this.knowledge.workouts.ppl
    return `Push-Pull-Legs (PPL) Split: ${ppl.overview}\n\nBenefits: ${ppl.benefits.join(", ")}\n\nTypical Schedule: ${ppl.schedule}\n\nYou can ask about specific days (push day, pull day, leg day) for more details.`
  }

  getPushDayInfo() {
    const pushDay = this.knowledge.workouts.ppl.pushDay
    return `Push Day focuses on: ${pushDay.focus}\n\nRecommended exercises:\n${pushDay.exercises.join("\n")}\n\nStart with compound movements (bench press, overhead press) before isolation exercises. Aim for 3-4 sets of 8-12 reps for most exercises.`
  }

  getPullDayInfo() {
    const pullDay = this.knowledge.workouts.ppl.pullDay
    return `Pull Day focuses on: ${pullDay.focus}\n\nRecommended exercises:\n${pullDay.exercises.join("\n")}\n\nStart with compound movements (deadlifts, rows) before isolation exercises. Aim for 3-4 sets of 8-12 reps for most exercises.`
  }

  getLegDayInfo() {
    const legDay = this.knowledge.workouts.ppl.legDay
    return `Leg Day focuses on: ${legDay.focus}\n\nRecommended exercises:\n${legDay.exercises.join("\n")}\n\nStart with compound movements (squats, Romanian deadlifts) before isolation exercises. Aim for 3-4 sets of 8-12 reps for most exercises.`
  }

  getWheyInfo() {
    const whey = this.knowledge.supplements.wheyProtein
    return `Whey Protein: ${whey.overview}\n\nBenefits: ${whey.benefits.join(", ")}\n\nDosage: ${whey.dosage}\n\nTypes:\n- Concentrate: ${whey.types.concentrate}\n- Isolate: ${whey.types.isolate}\n- Hydrolysate: ${whey.types.hydrolysate}\n\nTiming: ${whey.timing}`
  }

  getCreatineInfo() {
    const creatine = this.knowledge.supplements.creatine
    return `Creatine: ${creatine.overview}\n\nBenefits: ${creatine.benefits.join(", ")}\n\nDosage: ${creatine.dosage}\n\nTypes:\n- Monohydrate: ${creatine.types.monohydrate}\n- HCL: ${creatine.types.HCL}\n- Ethyl Ester: ${creatine.types.ethyl_ester}\n\nTiming: ${creatine.timing}`
  }

  getBCAAInfo() {
    const bcaa = this.knowledge.supplements.bcaa
    return `BCAAs (Branched-Chain Amino Acids): ${bcaa.overview}\n\nPotential Benefits: ${bcaa.benefits.join(", ")}\n\nDosage: ${bcaa.dosage}\n\nEffectiveness: ${bcaa.effectiveness}`
  }

  compareBCAAWhey() {
    return `BCAA vs Whey Protein:\n\nBCAAs are three specific amino acids (leucine, isoleucine, valine) that are already present in whey protein.\n\nWhey protein provides all essential amino acids including BCAAs, making it more complete.\n\nFor most people consuming adequate protein (especially from whey), separate BCAA supplements may be unnecessary and redundant.\n\nWhey protein is generally more cost-effective for building muscle than isolated BCAAs.`
  }

  getProteinInfo() {
    return `Protein Intake for Muscle Building: ${this.knowledge.nutrition.proteinIntake}\n\nThis means:\n- For a 70kg person: 112-154g protein daily\n- For a 80kg person: 128-176g protein daily\n- For a 90kg person: 144-198g protein daily\n\nWhey protein supplements can help meet these targets, especially when whole food sources are limited.`
  }

  getCalorieInfo() {
    const calories = this.knowledge.nutrition.calorieCalculation
    return `Calorie Calculation:\n- Bulking: ${calories.bulking}\n- Cutting: ${calories.cutting}\n- Maintenance: ${calories.maintenance}\n\nAdjust based on your progress and results every 2-3 weeks.`
  }

  getMealTimingInfo() {
    return `Meal Timing:\n- ${this.knowledge.nutrition.mealTiming}\n- Pre-workout: ${this.knowledge.nutrition.preworkoutNutrition}\n- Post-workout: ${this.knowledge.nutrition.postworkoutNutrition}\n\nConsistency in overall daily intake is more important than perfect timing.`
  }

  getHelp() {
    return "I can help with:\n- PPL workout structure and exercises\n- Supplement information (whey protein, creatine, BCAAs)\n- Nutrition advice for fitness goals\n\nTry asking questions like:\n- 'What is PPL?'\n- 'What exercises should I do on push day?'\n- 'How much whey protein should I take?'\n- 'What's better, BCAAs or whey protein?'\n- 'How much protein do I need daily?'"
  }

  // Added to maintain compatibility with the previous interface
  getGreeting() {
    return "Hello! I'm your fitness assistant. I can help with PPL workouts, supplements like whey protein, creatine, and BCAAs, and nutrition advice. Type 'help' for more information or ask me a specific question."
  }
}

// Create a singleton instance
const chatbotInstance = new FitnessChatbot()
export default chatbotInstance
