<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";

const isOpen = ref(false);
const language = ref(null);
const messages = ref([]);
const input = ref("");
const isTyping = ref(false);
const messagesEndRef = ref(null);

const apiKey =
  "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";

const toggleChat = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value && !language.value) {
    messages.value = [
      {
        from: "bot",
        text: "Please select your language / من فضلك اختر لغتك: English or العربية",
      },
    ];
  }
};

watch(messages, () => {
  if (messagesEndRef.value)
    messagesEndRef.value.scrollIntoView({ behavior: "smooth" });
});

const clearChat = () => {
  messages.value = [];
};

const handleLanguageSelect = (lang) => {
  language.value = lang;

  messages.value = [
    {
      from: "bot",
      text:
        lang === "ar"
          ? "مرحبًا! أنا مساعد التشطيب والديكور، اكتب لي أي سؤال."
          : "Hello! I'm your finishing assistant. Ask me anything about materials or construction.",
    },
  ];
};

const handleSend = async () => {
  const userText = input.value.trim();
  if (!userText) return;

  messages.value.push({ from: "user", text: userText });
  input.value = "";
  isTyping.value = true;

  try {
    const apiMessages = messages.value.map((msg) => ({
      role: msg.from === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "Finishing Assistant",
        },
        body: JSON.stringify({
          model: "x-ai/grok-4.1-fast:free",
          messages: apiMessages,
        }),
      }
    );

    if (!response.ok) {
      messages.value.push({
        from: "bot",
        text: language.value === "ar" ? "حدث خطأ في الخادم." : "Server error.",
      });
    } else {
      const data = await response.json();

      const botFull = data?.choices?.[0]?.message?.content || "";
      const botClean = botFull.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

      messages.value.push({
        from: "bot",
        text:
          botClean ||
          (language.value === "ar"
            ? "لم أفهم سؤالك."
            : "I didn't understand that."),
      });
    }
  } catch (err) {
    console.error(err);
    messages.value.push({
      from: "bot",
      text: language.value === "ar" ? "حدث خطأ." : "An error occurred.",
    });
  } finally {
    isTyping.value = false;
  }
};
</script>

<template>
  <button
    @click="toggleChat"
    class="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-xl z-50"
  >
    <img src="/robohead.png" class="w-12 h-12" />
  </button>

  <!-- Chat Window -->
  <div
    v-if="isOpen"
    class="fixed bottom-20 right-4 w-80 bg-white rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col"
  >
    <!-- Header -->
    <div class="bg-[#C76950] text-white text-center py-3 text-lg font-semibold">
      Your advisor
    </div>

    <!-- Messages -->
    <div class="p-4 h-64 overflow-y-auto space-y-3 text-sm text-gray-700">
      <p
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="
          msg.from === 'bot'
            ? 'text-left'
            : 'text-right text-[#C76950] font-semibold'
        "
      >
        {{ msg.text }}
      </p>

      <p v-if="isTyping" class="italic text-gray-500">Typing...</p>
      <div ref="messagesEndRef"></div>
    </div>

    <!-- Language Selection -->
    <div v-if="!language" class="p-3 flex gap-2 bg-gray-50">
      <button
        @click="handleLanguageSelect('en')"
        class="flex-1 py-2 rounded-xl bg-[#C76950] text-white"
      >
        English
      </button>
      <button
        @click="handleLanguageSelect('ar')"
        class="flex-1 py-2 rounded-xl bg-[#C76950] text-white"
      >
        العربية
      </button>
    </div>

    <!-- Input Bar -->
    <div v-else class="p-3 bg-gray-50 flex items-center gap-2 rounded-b-2xl">
      <input
        type="text"
        v-model="input"
        @keydown.enter="handleSend"
        class="flex-grow bg-white px-3 py-2 rounded-xl border"
        :placeholder="
          language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'
        "
      />

      <!-- Trash -->
      <button @click="clearChat" class="p-2">
        <Icon
          icon="mdi:trash-can"
          width="22"
          height="22"
          class="text-[#C76950]"
        />
      </button>

      <!-- Send -->
      <button @click="handleSend" :disabled="isTyping" class="p-2">
        <Icon icon="mdi:send" width="24" height="24" class="text-[#C76950]" />
      </button>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #c76950;
  border-radius: 4px;
}
</style>
