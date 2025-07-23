<script setup lang="ts">
definePageMeta({
  layout: "settings",
});
</script>

<template>
  <h1 class="text-lg font-bold pt-5">Professional Profile</h1>
  <p class="text-muted-foreground mb-8 text-sm">
    Manage your professional profile settings, including work experience and
    skills.
  </p>
  <form @submit.prevent="" class="py-6 space-y-4">
    <Textarea placeholder="Headline" label="Headline" :rows="1" />
    <Textarea placeholder="About me" label="About me" />
    <Input
      type="text"
      placeholder="Specialty (e.g., Cardiology, Pediatrics)"
      class="w-full mb-4"
      label="Specialty"
    />
    <Input
      type="text"
      placeholder="Current role or position"
      class="w-full mb-4"
      label="Current Role"
    />
  </form>

  <h2 class="text-lg font-semibold my-2">Work Experience</h2>
  <section class="space-y-3.5 mb-8 border rounded-lg p-4">
    <div
      class="flex flex-col items-center justify-center text-center mb-6 py-3 rounded-lg border cursor-pointer hover-bg"
    >
      <Icon
        name="ic:outline-add"
        size="24"
        class="text-muted-foreground mb-2"
      />
      <p class="py-2">Add work experience</p>
    </div>

    <div>
      <div class="flex items-center justify-between">
        <p class="text-muted-foreground">RNlinked</p>
        <span>
          <Button
            size="icon"
            variant="ghost"
            icon="solar:pen-line-duotone"
            icon-size="24"
            class="text-muted-foreground hover:text-primary"
            @click="() => {}"
          />
          <Button
            icon="solar:trash-bin-minimalistic-line-duotone"
            size="icon"
            variant="ghost"
            class="text-muted-foreground hover:text-destructive"
            @click="() => {}"
          />
        </span>
      </div>
      <p class="text-accent-foreground">Software Engineer</p>
      <p class="text-muted-foreground text-sm">
        Developing and maintaining the RNlinked web application, focusing on
        user experience and performance optimization.
      </p>
      <p class="text-muted-foreground text-xs">2018 - Present</p>
    </div>
  </section>
  <h2 class="text-lg font-semibold my-2">Skills</h2>
  <section class="space-y-3.5 mb-8 border rounded-lg p-4">
    <div
      class="flex flex-col items-center justify-center text-center mb-6 py-3 rounded-lg border cursor-pointer hover-bg"
    >
      <Icon
        name="ic:outline-add"
        size="24"
        class="text-muted-foreground mb-2"
      />
      <p class="py-2">Add skill</p>
    </div>

    <div>
      <div class="flex items-center justify-between">
        <p class="text-muted-foreground">JavaScript</p>
        <span>
          <Button
            size="icon"
            variant="ghost"
            icon="solar:pen-line-duotone"
            icon-size="24"
            class="text-muted-foreground hover:text-primary"
            @click="() => {}"
          />
          <Button
            icon="solar:trash-bin-minimalistic-line-duotone"
            size="icon"
            variant="ghost"
            class="text-muted-foreground hover:text-destructive"
            @click="() => {}"
          />
        </span>
      </div>
      <p class="text-muted-foreground text-sm">
        Proficient in JavaScript, with extensive experience in building web
        applications using modern frameworks.
      </p>
      <p class="text-muted-foreground text-xs">Expert</p>
    </div>
  </section>

  <h2 class="text-lg font-semibold my-2">Education</h2>
  <section class="space-y-3.5 mb-8 border rounded-lg p-4">
    <div
      class="flex flex-col items-center justify-center text-center mb-6 py-3 rounded-lg border cursor-pointer hover-bg"
    >
      <Icon
        name="ic:outline-add"
        size="24"
        class="text-muted-foreground mb-2"
      />
      <p class="py-2">Add education</p>
    </div>

    <div>
      <div class="flex items-center justify-between">
        <p class="text-muted-foreground">University of Example</p>
        <span>
          <Button
            size="icon"
            variant="ghost"
            icon="solar:pen-line-duotone"
            icon-size="24"
            class="text-muted-foreground hover:text-primary"
            @click="() => {}"
          />
          <Button
            icon="solar:trash-bin-minimalistic-line-duotone"
            size="icon"
            variant="ghost"
            class="text-muted-foreground hover:text-destructive"
            @click="() => {}"
          />
        </span>
      </div>
      <p class="text-accent-foreground">
        Bachelor of Science in Computer Science
      </p>
      <p class="text-muted-foreground text-sm">
        Focused on software development and web technologies, graduating with
        honors.
      </p>
      <p class="text-muted-foreground text-xs">2014 - 2018</p>
    </div>
  </section>
</template>
