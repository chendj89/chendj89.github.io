import { useLoadingBar, NLoadingBarProvider } from 'naive-ui';

const Test = defineComponent({
  setup() {
    const loadingBar = useLoadingBar();
    loadingBar.start();
    const fish = () => {
      loadingBar.finish();
    };
    return {
      fish,
    };
  },
  render() {
    return (
      <div style="position: relative;display: inline-block;width:300px" onClick={this.fish}>
        123
      </div>
    );
  },
});

export default defineComponent({
  setup() {
    let bar: any = ref(null);
    return {
      bar,
    };
  },
  render() {
    return (
      <div ref="bar" class='x2' style={{width:"300px"}}>
        <NLoadingBarProvider to={this.bar} container-style="position: absolute;">
          <Test ></Test>
        </NLoadingBarProvider>
      </div>
    );
  },
});
