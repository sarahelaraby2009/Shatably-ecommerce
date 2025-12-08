export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const response = await $fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       model: "openai/gpt-3.5-turbo",
        messages: body.messages,
      }),
    });

    return response;
  } catch (err) {
    return { error: "Chat API error", message: err.message };
  }
});
