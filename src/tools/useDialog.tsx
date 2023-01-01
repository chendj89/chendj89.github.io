import { createVNode, getCurrentInstance, render, defineComponent, ref } from 'vue';

import { NModal, NConfigProvider, zhCN, dateZhCN } from 'naive-ui';
const tpl = defineComponent({
  props: ['com', 'opts'],
  setup() {
    const show = ref(false);
    const loaded = ref(false);
    const args = ref(null);
    const closeFn = () => {
      show.value = false;
    };
    // 显示
    setTimeout(() => {
      show.value = true;
    }, 300);
    // 加载子组件
    setTimeout(() => {
      loaded.value = true;
    }, 320);
    return {
      show,
      loaded,
      args,
      closeFn,
    };
  },
  render() {
    const close = () => {
      this.closeFn();
      setTimeout(() => {
        // @ts-ignore
        this.$.appContext?.$close(this.args);
      }, 300);
    };
    const successFn = (args: any) => {
      this.args = args;
      close();
    };
    const cancelFn = () => {
      close();
    };
    return (
      <NConfigProvider locale={zhCN} date-locale={dateZhCN}>
        <NModal v-model:show={this.show} onClose={this.closeFn} preset="dialog" title="Dialog" maskClosable={false} style="--n-padding:16px;--n-close-margin:16px 16px 0 0;margin-top:200px" show-icon={false}>
          {{
            action: () => <div id="footer"></div>,
            default: () => (this.loaded ? h(this.$props.com, { successFn, cancelFn }) : null),
            header: () => this.$props.opts.title,
          }}
        </NModal>
      </NConfigProvider>
    );
  },
});

export default function useDialog(com: any, ins: any, opts: any) {
  return new Promise((resolve) => {
    let container = document.createElement('div');
    const app: any = createVNode(tpl, { com: com, opts });
    app.appContext = ins.appContext.app._context;
    app.appContext.$close = (result: any = true) => {
      render(null, container);
      container.parentNode?.removeChild(container);
      resolve(result);
    };
    render(app, container);
    document.body.appendChild(container);
  });
}
