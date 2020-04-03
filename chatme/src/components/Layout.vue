<template>
 <div id="layout">
    <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>
            <router-view></router-view>
        </a-layout-content>
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
        </a-layout>
 </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
    background: #7dbcea;
    color: #fff;
}
#layout {
    margin: 0 auto;
}
</style>