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
                <m-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></m-list>
            </slot>
        </m-notification>
    </div>
</template>

<script setup lang="ts">
import { list, actions } from './data'

let clickItem = (val:any) => { 
    console.log(val); 
}
let clickAction = (val: any) => { 
    console.log(val);
    
}
</script>

<style scoped>

</style>