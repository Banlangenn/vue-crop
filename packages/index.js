
import progresschart from './progresschart.vue';

// const components = [progresschart];

// 定义 install 方法
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    // 遍历并注册全局组件
    // components.map(component => {
        Vue.component(progresschart.name, progresschart)
    // })
}

//  全局引用可自动安装
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    install,
    progresschart
};
export { progresschart };