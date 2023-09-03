<template>
    <!-- <m-menu 
        :data="data1" defaultActive="1"
        name="a"
        index="b"
        icon="c"
        children="d"
    ></m-menu> -->
    <m-infinite-menu :data="data2" defaultActive="1" name="a" index="s" icon="d" children="f">
    </m-infinite-menu>
</template>

<script setup lang="ts">
// let data1 = [
//     {
//         a: '导航1',
//         b: '1',
//         c: 'document'
//     },
//     {
//         a: '导航2',
//         b: '2',
//         c: 'document'
//     },
//     {
//         a: '导航3',
//         b: '3',
//         c: 'document',
//         d: [
//             {
//                 a: '导航3-1',
//                 b: '3-1',
//                 c: 'document',
//             }
//         ]
//     }
// ];
let data2 = [
    {
        a: '导航1',
        s: '1',
        d: 'Document'
    },
    {
        a: '导航2',
        s: '2',
        d: 'Document'
    },
    {
        a: '导航3',
        s: '3',
        d: 'Document',
        f: [
            {
                a: '导航3-1',
                s: '3-1',
                d: 'Document',
                f: [
                    {
                        a: '导航3-1-1',
                        s: '3-1-1',
                        d: 'Document',
                        f: [
                            {
                                a: '导航3-1-1-1',
                                s: '3-1-1-1',
                                d: 'Document',
                                f: [
                                    {
                                        a: '导航3-1-1-1-1',
                                        s: '3-1-1-1-1',
                                        d: 'Document',
                                    }
                                ],
                            }
                        ],
                    }
                ],
            }
        ],
    }
]
</script>

<style scoped></style>