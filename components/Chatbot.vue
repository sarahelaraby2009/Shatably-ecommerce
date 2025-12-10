<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";


const isOpen = ref(false);
const language = ref(null);
const messages = ref([]);
const input = ref("");
const isTyping = ref(false);
const messagesEndRef = ref(null);
const showGreeting = ref(true);

const apiKey = "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";

const closeGreeting = () => {
  showGreeting.value = false;
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  showGreeting.value = false;

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

<div
  v-if="!isOpen && showGreeting"
  class="greeting-box"
>
  <button @click="closeGreeting" class="greeting-close">×</button>

  <h3 class="font-semibold text-gray-800 text-base mb-1">AI-Powered Advisor</h3>
  <p class="text-gray-600 text-sm leading-snug">
    Hello! I am your advisor, happy to assist you.
    <strong>Ask me now!</strong>
  </p>

 
  <div class="greeting-arrow"></div>
</div>


 
  <button
    @click="toggleChat"
    class="chat-button"
  >
    <img
      src="/public/chatbot 1.png"
      class="chat-image"
      :class="{ 'is-floating': !isOpen }"
      alt="Chat"
    />
  </button>

 
  <div
    v-if="isOpen"
    class="fixed bottom-20 right-4 w-80 bg-white rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col"
  >
  
    <div class="bg-[#C76950] text-white text-center py-3 text-lg font-semibold">
      Your advisor
    </div>

   
    <div class="p-4 h-64 overflow-y-auto space-y-3 text-sm text-gray-700">
      <p
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="msg.from === 'bot' ? 'text-left' : 'text-right text-[#C76950] font-semibold'"
      >
        {{ msg.text }}
      </p>

      <p v-if="isTyping" class="italic text-gray-500">Typing...</p>
      <div ref="messagesEndRef"></div>
    </div>

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

  
    <div v-else class="p-3 bg-gray-50 flex items-center gap-2 rounded-b-2xl">
      <input
        type="text"
        v-model="input"
        @keydown.enter="handleSend"
        class="flex-grow bg-white px-3 py-2 rounded-xl border"
        :placeholder="language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'"
      />

   
      <button @click="clearChat" class="p-2">
        <Icon icon="mdi:trash-can" width="22" height="22" class="text-[#C76950]" />
      </button>

     
      <button @click="handleSend" :disabled="isTyping" class="p-2">
        <Icon icon="mdi:send" width="24" height="24" class="text-[#C76950]" />
      </button>
    </div>
  </div>
</template>

<style scoped>

.chat-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 50;
  background: white;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.chat-image {
  width: 5rem;
  height: 5rem;
  pointer-events: none;
  will-change: transform;
  backface-visibility: hidden;
  display: block;
  transition: transform 0.3s ease;
}


.chat-image.is-floating {
  animation: float-image 2.5s ease-in-out infinite;
}


@keyframes float-image {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}


.chat-button:active {
  transform: scale(0.95);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}


::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #c76950;
  border-radius: 4px;
}

.greeting-box {
  position: fixed;

 
  bottom: 116px;   

  right: 1rem;     
  
  width: 250px;
  background: white;
  padding: 14px 16px;
  border-radius: 14px;

  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  z-index: 60;

  animation: fadeIn 0.25s ease-out;
}


.greeting-close {
  position: absolute;
  top: 6px;
  right: 8px;
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
}


.greeting-arrow {
  position: absolute;
  bottom: -10px;
  right: 28px;   

  width: 0;
  height: 0;

  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;

  filter: drop-shadow(0 -2px 2px rgba(0,0,0,0.1));
}


@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

</style>