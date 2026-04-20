import {
  createApp,
  type App,
  type Component,
  type ComponentPublicInstance,
} from "vue";
import DynamicBottomSheet from "../DynamicBottomSheet.vue";

type DynamicComponentBottomSheetProps = Record<string, unknown>;

export type DynamicComponentBottomSheetHandle<T = unknown> = {
  el: ComponentPublicInstance;
  destroy: () => void;
  close: (payload?: T) => void;
  result: Promise<T | undefined>;
};

export const useDynamicComponentBottomSheet = {
  open<T = unknown>(
    component: Component,
    props: DynamicComponentBottomSheetProps = {},
    options?: { container?: HTMLElement },
  ): DynamicComponentBottomSheetHandle<T> {
    const container = options?.container ?? document.createElement("div");
    let closed = false;
    let resolvePromise: (value: T | undefined) => void = () => {};
    let componentElement: App<Element>;

    const close = (payload?: T) => {
      if (closed) return;
      closed = true;

      const unmountApp = () => {
        //TODO Сделать unmount когда анимация закончится
        unmount();
      };

      requestAnimationFrame(unmountApp);
      resolvePromise(payload);
    };

    componentElement = createApp(DynamicBottomSheet, {
      component,
      componentProps: props,
      onClose: close,
    });

    const unmount = () => {
      componentElement.unmount();
      container.remove();
    };

    const el = componentElement.mount(container);

    const result = new Promise<T | undefined>((resolve) => {
      resolvePromise = resolve;
    });

    return {
      el,
      destroy: () => close(undefined),
      close,
      result,
    };
  },
};
