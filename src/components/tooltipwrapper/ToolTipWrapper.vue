<template>
    <n-tooltip trigger="hover">
        <template #trigger>
            <slot></slot>
        </template>
        {{ props.tip }}
    </n-tooltip>
</template>

<script setup lang="ts">

const props = defineProps(['tip'])

</script>

<style scoped>

</style>