<template>
    <n-scrollbar style="padding: 0.35rem; border: 1px solid rgb(229, 229, 229); background-color: white; border-radius: 0.5rem; max-height: 384px; width: 256px;" class="slash-menu">
        <div v-for="(item, index) in props.items" v-bind:key="index" class="hello">
            <div class="part-title">{{ item.title }}</div>
            <div v-for="(opt, opt_index) in item.commands" v-bind:key="opt_index">
                <n-button strong secondary style="width: 100%; justify-content: left;" @click="handleClick(index, opt_index)">
                    <template #icon>
                        <n-icon :component="opt.iconName"/>
                    </template>
                    {{ opt.label }}
                </n-button>
            </div>
        </div>
    </n-scrollbar>
</template>
<script setup lang="ts">
const props = defineProps(['items', "editor", "command"])
// console.log(props.items)
const handleClick = (index, opt_index) => {
    // console.log(props.command)
    props.command(props.items[index].commands[opt_index])
    // props.items[index].commands[opt_index].action(props.editor)
    // console.log(index, opt_index, props.editor)
}
</script>
<style scoped>
.part-title {
    padding-top: 8px;
    padding-left: 14px;
    font-size: .65rem;
    font-weight: 600;
    text-transform: uppercase;
    color: rgb(115, 115, 115);
    font-family: Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
}

button {
    background-color: white;
}

</style>