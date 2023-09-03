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
                <m-list></m-list>
            </slot>
        </m-notification>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>