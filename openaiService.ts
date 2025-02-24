// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
// });

// export async function getAISuggestions(prompt: string): Promise<string> {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         { role: "system", content: "You are an AI that suggests creative blog topics." },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.9, 
//       max_tokens: 100,
//     });

//     return response.choices[0]?.message?.content?.trim() || "No suggestion available.";
//   } catch (error) {
//     console.error("AI Suggestion Error:", error);
//     return "Error fetching AI suggestions.";
//   }
// }
