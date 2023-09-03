<template>
    <div>
        <!-- <m-notification :value="66"></m-notification>
        <br/>
        <br/>
        <m-notification :value="66" :max="30"></m-notification>
        <br/>
        <br/>
        <m-notification :value="66" isDot></m-notification>
        <br/>
        <br/>
        <m-notification icon="ChatRound" :value="66" ></m-notification> -->

        <m-notification :value="66">
            <slot>
                <m-list :list="list" :actions="actions"></m-list>
            </slot>
        </m-notification>
    </div>
</template>

<script setup lang="ts">
import {list,actions} from './data'
</script>

<style scoped>

</style>