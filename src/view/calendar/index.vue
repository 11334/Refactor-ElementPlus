<template>
    <m-calendar :events="events"></m-calendar>
</template>

<script setup lang="ts">
import { EventItem } from '../../components/calendar/src/type';

let events: EventItem[] = [
    {
        title: '购物',
        start: '2023-9-8 08:00',
        end:'2023-9-8 12:00'
    },
    {
        title: '敲代码',
        start: '2023-9-9 10:00',
        end:'2023-9-9 14:00'
    },
]
</script>

<style scoped>

</style>