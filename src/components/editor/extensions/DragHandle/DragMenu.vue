<template>
    <n-dropdown :options="options" trigger="click">
        <n-button quaternary>
            <template #icon>
                <n-icon><GripVertical /></n-icon>
            </template>
        </n-button>
    </n-dropdown>
</template>

<script setup lang="ts">
import { GripVertical, Trash  } from '@vicons/tabler'
import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'


const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const options = [
    {
        label: 'Delete',
        key: 'Delete',
        icon: renderIcon(Trash)
    }
]

</script>

<style scoped>

</style>