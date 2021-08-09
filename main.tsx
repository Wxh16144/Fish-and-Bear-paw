import type { Ref } from 'vue';
import type { MaybeRef } from './type';
import { createApp, defineComponent, ref, Fragment, computed, isRef, unref } from 'vue';


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
 * mutually exclusive boolean
 * @param [initialValue=false]
 */
function useMutex (initialValue?: MaybeRef<boolean>): [Ref<boolean>, Ref<boolean>];
function useMutex<X, Y> (value: [initialValue: MaybeRef<X>, versaValue: MaybeRef<Y>]): () => Y | X;
function useMutex<X, Y> (value: [initialValue: MaybeRef<X>, versaValue: MaybeRef<Y>]): [Y, X];
function useMutex (value: MaybeRef<boolean> | [any, any] = false) {
  if (Array.isArray(value))
    return () => {
      const [initialValue, versaValue] = value.reverse()
      return isRef(initialValue)
        ? initialValue.value = unref(versaValue)
        : unref(versaValue)
    }

  const boolean = ref<boolean>(unref(value));
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

    const toggleBg = useMutex(['white', 'black'])
    const backgroundColor = ref(toggleBg())

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
        <button
          style={{ backgroundColor: backgroundColor.value }}
          onClick={() => toggleAll()}
        >
          {all.value ? '重新选择' : '全都要'}
        </button>
      </Fragment>
    );
  }
});

createApp(App).mount('#app');
