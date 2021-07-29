import { createApp, defineComponent, ref, Fragment, computed, isRef, Ref } from 'vue';

/**
 * A boolean ref with a toggler
 *
 * @see https://vueuse.org/useToggle
 * @param [initialValue=false]
 */
function useToggle (value: Ref<boolean>): (value?: boolean) => boolean;
function useToggle (initialValue?: boolean): [Ref<boolean>, (value?: boolean) => boolean];
function useToggle (initialValue: boolean | Ref<boolean> = false) {
  if (isRef(initialValue)) {
    return (value?: boolean) => {
      initialValue.value =
        typeof value === 'boolean' ? value : !initialValue.value;
    };
  } else {
    const boolean = ref(initialValue);
    const toggle = (value?: boolean) => {
      boolean.value = typeof value === 'boolean' ? value : !boolean.value;
    };

    return [boolean, toggle] as const;
  }
}

/**
 * A boolean ref with a toggler
 * @param [initialValue=false]
 */
function useMutex (initialValue = false): [Ref<boolean>, Ref<boolean>] {
  const boolean = ref<boolean>(initialValue);
  const versa = computed<boolean>({
    get: () => !boolean.value,
    set: () => (boolean.value = versa.value)
  });
  return [boolean, versa];
}

const App = defineComponent({
  name: 'App',
  setup () {
    const [all, toggleAll] = useToggle(false);
    const [fish, bearPaw] = useMutex();
    const toggleFish = useToggle(fish);
    const toggleBearPaw = useToggle(bearPaw);

    const FishComp = () =>
      <span onClick={() => toggleFish()}>{`${fish.value ? '你得到' : '虽然你失去'}了鱼，`}</span>

    const BearPawComp = () =>
      <span onClick={() => toggleBearPaw()}>{`${bearPaw.value ? '但是你得到' : '却失去'}了熊掌！`}</span>

    const Content = () => (
      <Fragment>
        <FishComp />
        <BearPawComp />
      </Fragment>
    )

    return () => (
      <Fragment>
        {all.value ? <span>做你的白日梦去吧！</span> : <Content />}
        <button onClick={() => toggleAll()}>{all.value ? '重新选择' : '全都要'}</button>
      </Fragment>
    );
  }
});

createApp(App).mount('#app');
