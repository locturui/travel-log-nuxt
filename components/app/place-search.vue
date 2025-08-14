<script lang="ts" setup>
import type { FetchError } from "ofetch";

import type { NominatimRes } from "~/lib/types";

import { QuerySchema } from "~/lib/zod-schemas";

const emit = defineEmits<{
  resultSelected: [result: NominatimRes];
}>();

const form = useTemplateRef("form");

const results = ref<NominatimRes[]>([]);

const loading = ref(false);

const errorMessage = ref("");

const hasSearched = ref(false);

function setResult(result: NominatimRes) {
  emit("resultSelected", result);
  results.value = [];
  if (form.value) {
    form.value.resetForm();
  }
  hasSearched.value = false;
  errorMessage.value = "";
}

async function onSubmit(query: Record<string, string>) {
  loading.value = true;
  hasSearched.value = true;
  results.value = [];
  errorMessage.value = "";
  try {
    const res = await $fetch("/api/search", {
      query,
    });
    results.value = res;
  }
  catch (e) {
    const error = e as FetchError;
    errorMessage.value = getFetchErrorMessage(error);
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <Form
      ref="form"
      v-slot="{ errors }"
      class="flex flex-col items-center"
      :validation-schema="toTypedSchema(QuerySchema)"
      :initial-values="{ q: '' }"
      @submit="onSubmit"
    >
      <div class="join">
        <div>
          <label class="input join-item">
            <Icon name="tabler:search" />
            <Field
              type="text"
              name="q"
              placeholder="Search for a location..."
              :class="{
                'input-error': errors.q,
              }"
              :disabled="loading"
            />
          </label>
          <div v-if="errors.q" class="validator-hint text-error visible">
            {{ errors.q }}
          </div>
        </div>
        <button class="btn btn-neutral join-item" :disabled="loading">
          Search
        </button>
      </div>
    </Form>

    <div
      v-if="hasSearched && !results.length && !loading"
      role="alert"
      class="alert alert-warning alert-soft"
    >
      <span>No results</span>
    </div>

    <div v-if="loading" class="flex justify-center">
      <div class="loading loading-lg" />
    </div>

    <div
      v-if="errorMessage"
      role="alert"
      class="alert alert-error alert-soft"
    >
      <span>{{ errorMessage }}</span>
    </div>

    <div class="flex flex-col gap-2 overflow-auto max-h-50 mt-2">
      <div
        v-for="result in results"
        :key="result.place_id"
        class="card bg-base-100 card-sm"
      >
        <div class="card-body">
          <h4 class="card-title">
            {{ result.display_name }}
          </h4>
          <div class="card-action">
            <button class="btn btn-warning btn-sm" @click="setResult(result)">
              Set Location
              <Icon name="tabler:map-pin-share" size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
