export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const body = await readBody(event)
        console.log('API Key exists:', !!config.openrouterKey)
    console.log('API Key starts with:', config.openrouterKey?.substring(0, 10))

    const response = await $fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.openrouterKey}`, // ✅ غيرها من OPENROUTER_KEY
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Graduation Project Chatbot",
        },
        body: {
          model: "mistralai/mistral-7b-instruct",
          messages: body.messages,
        },
      }
    )

    return response
  } catch (err) {
    console.error("CHAT API ERROR:", err)
    return {
      error: true,
      message: err?.message || "Chat API error",
    }
  }
})