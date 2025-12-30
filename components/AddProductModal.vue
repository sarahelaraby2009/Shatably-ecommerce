<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { collection, getDocs } from "firebase/firestore";

// --------------------------------------------------------------------
const emit = defineEmits(["close", "save"]);
const props = defineProps({
  show: { type: Boolean, default: false },
  initial: { type: Object, default: null },
  categories: { type: Array, default: () => [] },
});

let $db = null;
if (process.client) {
  $db = useNuxtApp().$db ?? null;
}

// --------------------------------------------------------------------------
const id = ref(null);
const name = ref("");
const description = ref("");
const price = ref("");
const sellerId = ref("");
const brand = ref("");
const errorMessages = ref("");
const fileInput = ref(null);
const selectedImage = ref(null);
const isDragging = ref(false);
const selectedCategoryId = ref("");
const subcategories = ref([]);
const selectedSubcategory = ref("");

// ----------------------------------------------------------------------------
function resetForm() {
  id.value = null;
  name.value = "";
  description.value = "";
  price.value = "";
  sellerId.value = "";
  brand.value = "";
  errorMessages.value = "";
  selectedImage.value = null;
  if (fileInput.value) fileInput.value.value = "";
  selectedCategoryId.value = "";
  subcategories.value = [];
  selectedSubcategory.value = "";
}

// -------------------------------------------------------------------------------
watch(
  () => props.initial,
  async (val) => {
    if (val) {
      id.value = val.id ?? null;
      name.value = val.name ?? "";
      description.value = val.description ?? "";
      price.value = val.price ?? "";
      sellerId.value = val.sellerId ?? "";
      brand.value = val.brand ?? "";
      selectedImage.value = val.image ?? null;

      selectedCategoryId.value = val.categoryId ?? "";
      if (!selectedCategoryId.value && val.categoryName) {
        const found = props.categories.find((c) => c.name === val.categoryName);
        if (found) selectedCategoryId.value = found.id;
      }

      selectedSubcategory.value = val.subcategory ?? "";

      if (selectedCategoryId.value) {
        try {
          if (process.client && $db) {
            const subsCol = collection(
              $db,
              "categories",
              selectedCategoryId.value,
              "subcategories"
            );
            const snap = await getDocs(subsCol);
            const list = [];
            snap.forEach((docSnap) => {
              const d = docSnap.data();
              list.push({
                id: docSnap.id,
                name: d.name ?? d.title ?? "Unnamed",
              });
            });
            subcategories.value = list;
          }
        } catch (err) {
          console.error("Error loading subcategories:", err);
          subcategories.value = [];
        }
      }
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// -----------------------------------------------------------------
watch(
  () => selectedCategoryId.value,
  async (newId) => {
    subcategories.value = [];
    selectedSubcategory.value = "";

    if (!newId) return;

    try {
      if (!process.client || !$db) {
        subcategories.value = [];
        return;
      }

      const subsCol = collection($db, "categories", newId, "subcategories");
      const snap = await getDocs(subsCol);
      const list = [];

      snap.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          id: docSnap.id,
          name: d.name ?? d.title ?? "Unnamed",
        });
      });

      subcategories.value = list;
    } catch (err) {
      console.error("Error loading subcategories:", err);
      subcategories.value = [];
    }
  }
);

// ------------------------------------------------------------------------
const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    previewImage(file);
  } else {
    errorMessages.value = "Please select a JPG or PNG image";
  }
};

const previewImage = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => (selectedImage.value = e.target.result);
  reader.readAsDataURL(file);
};

const openFileDialog = () => fileInput.value?.click();

const handleDragOver = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (e) => {
  e.preventDefault();
  isDragging.value = false;
  const file = e.dataTransfer.files?.[0];
  if (file && (file.type === "image/jpeg" || file.type === "image/png"))
    previewImage(file);
  else errorMessages.value = "Please drop a JPG or PNG image";
};

const removeImage = () => {
  selectedImage.value = null;
  if (fileInput.value) fileInput.value.value = "";
};

// --------------------------------------------------------------------------
const saveData = () => {
  errorMessages.value = "";

  if (!name.value.trim()) {
    errorMessages.value = "Please enter a product name";
    return;
  }

  if (!selectedCategoryId.value) {
    errorMessages.value = "Please select a category";
    return;
  }

  if (!selectedSubcategory.value) {
    errorMessages.value = "Please select a subcategory";
    return;
  }

  if (!price.value || parseFloat(price.value) <= 0) {
    errorMessages.value = "Please enter a valid price";
    return;
  }

  const categoryName =
    props.categories.find((c) => c.id === selectedCategoryId.value)?.name || "";

  const payload = {
    id: id.value ?? null,
    name: name.value.trim(),
    description: description.value.trim(),
    price: parseFloat(price.value),
    sellerId: sellerId.value.trim() || "",
    brand: brand.value.trim() || "",
    image: selectedImage.value || null,
    uploadDate: new Date().toISOString().slice(0, 10),
    categoryId: selectedCategoryId.value,
    categoryName: categoryName,
    subcategory: selectedSubcategory.value,
  };

  emit("save", payload);
  resetForm();
};

// --------------------------------------------------------------------
const close = () => {
  emit("close");
  resetForm();
};

// --------------------------------------------------------------------
const onKeyDown = (e) => {
  if (e.key === "Escape" && props.show) close();
};

onMounted(() => window.addEventListener("keydown", onKeyDown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));

// -----------------------------------------------------------------------
watch(
  () => props.show,
  (v) => {
    document.body.style.overflow = v ? "hidden" : "";
  }
);
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div class="absolute inset-0 bg-black/40" @click="close"></div>
        <div
          @click.stop
          class="relative z-10 max-w-3xl w-[90%] md:w-[800px] mx-4"
        >
          <div
            class="p-5 rounded-[24px] bg-white shadow-lg flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-[#3E3E3E]">
                {{ id ? "Edit Product" : "Add New Product" }}
              </h3>
              <button
                @click="close"
                class="text-gray-500 hover:text-gray-700 rounded-full w-9 h-9 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form @submit.prevent="saveData">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <label class="font-bold text-sm text-[#3E3E3E]">Name</label>
                  <input
                    v-model="name"
                    required
                    class="font-semibold text-sm border rounded-[12px] p-3 outline-none h-[44px]"
                    type="text"
                    placeholder="enter product name"
                  />
                </div>

                <div class="flex flex-col">
                  <label class="font-bold text-sm text-[#3E3E3E]">Price</label>
                  <input
                    v-model="price"
                    required
                    class="font-semibold text-sm border rounded-[12px] p-3 outline-none h-[44px]"
                    type="number"
                    placeholder="enter product price"
                  />
                </div>

                <div class="flex flex-col md:col-span-2">
                  <label class="font-bold text-sm text-[#3E3E3E]"
                    >Description</label
                  >
                  <input
                    v-model="description"
                    class="font-semibold text-sm border rounded-[12px] p-3 outline-none h-[44px]"
                    type="text"
                    placeholder="enter product description"
                  />
                </div>

                <div class="flex flex-col">
                  <label class="font-bold text-sm text-[#3E3E3E]"
                    >Seller ID</label
                  >
                  <input
                    v-model="sellerId"
                    class="font-semibold text-sm border rounded-[12px] p-3 outline-none h-[44px]"
                    type="text"
                    placeholder="enter your ID"
                  />
                </div>

                <div class="flex flex-col">
                  <label class="font-bold text-sm text-[#3E3E3E]">Brand</label>
                  <input
                    v-model="brand"
                    class="font-semibold text-sm border rounded-[12px] p-3 outline-none h-[44px]"
                    type="text"
                    placeholder="enter product brand"
                  />
                </div>

                <!-- Category dropdown -->
                <div class="flex flex-col">
                  <label class="font-bold text-sm text-[#3E3E3E]"
                    >Category</label
                  >
                  <select
                    v-model="selectedCategoryId"
                    class="font-semibold text-sm border rounded-[12px] p-3 outline-none h-[44px] bg-white"
                  >
                    <option value="">Choose category</option>
                    <option
                      v-for="c in props.categories"
                      :key="c.id"
                      :value="c.id"
                    >
                      {{ c.name }}
                    </option>
                  </select>
                </div>

                <!-- Subcategory dropdown -->
                <div class="flex flex-col">
                  <label class="font-bold text-sm text-[#3E3E3E]">
                    Subcategory
                  </label>
                  <select
                    v-model="selectedSubcategory"
                    :disabled="subcategories.length === 0"
                    class="font-semibold text-sm border rounded-[12px] p-3 outline-none h-[44px] bg-white"
                  >
                    <option value="" disabled v-if="subcategories.length === 0">
                      Select a category first
                    </option>
                    <option value="" v-else>Choose subcategory</option>
                    <option
                      v-for="s in subcategories"
                      :key="s.id"
                      :value="s.id"
                    >
                      {{ s.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mt-4">
                <label class="font-bold text-sm text-[#3E3E3E]"
                  >Upload Photo</label
                >
                <div
                  @click="openFileDialog"
                  @dragover="handleDragOver"
                  @dragleave="handleDragLeave"
                  @drop="handleDrop"
                  :class="[
                    'border-2 border-dashed rounded-[12px] p-4 text-center cursor-pointer transition-all',
                    isDragging
                      ? 'border-[#C76950] bg-rose-50'
                      : 'border-gray-300 bg-gray-50',
                    'hover:border-[#C76950] hover:bg-rose-50',
                  ]"
                >
                  <div v-if="selectedImage" class="relative">
                    <img
                      :src="selectedImage"
                      alt="Preview"
                      class="max-h-48 mx-auto rounded-lg"
                    />
                    <button
                      @click.stop="removeImage"
                      type="button"
                      class="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                  <div v-else>
                    <p class="text-sm text-gray-600">
                      <span class="text-[#C76950] font-medium">Click</span>
                      <span class="text-gray-500"
                        >to upload or drag & drop (.JPG/.PNG)</span
                      >
                    </p>
                  </div>
                </div>

                <input
                  ref="fileInput"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  @change="handleFileSelect"
                  class="hidden"
                />
              </div>

              <p v-if="errorMessages" class="text-red-400 mt-3">
                {{ errorMessages }}
              </p>

              <div class="mt-5 flex gap-3">
                <button
                  type="submit"
                  class="flex-1 text-white h-10 rounded-[10px] bg-[#C76950] hover:bg-[#b55a42] transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
