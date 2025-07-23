<script setup lang="ts">
const props = defineProps<{
  label?: string;
}>();

const { signIn, loading } = useAuth();
</script>

<template>
  <Button
    type="button"
    variant="outline"
    class="dark-border rounded-full tracking-wide w-full"
    :label="props.label ?? 'Continue with Google'"
    icon="logos:google-icon"
    iconSize="22"
    @click="() => signIn({ provider: 'google' })"
    :loading="loading"
    :disabled="loading"
  />
</template>
