import {
  createApp,
  type App,
  type Component,
  type ComponentPublicInstance,
} from "vue";
import DynamicComponentContainer from "../DynamicComponent.vue";

type DynamicComponentProps = Record<string, unknown>;

export type DynamicComponentHandle<T = unknown> = {
  el: ComponentPublicInstance;
  destroy: () => void;
  close: (payload?: T) => void;
  result: Promise<T | undefined>;
};

export const useDynamicComponent = {
  open<T = unknown>(
    component: Component,
    props: DynamicComponentProps = {},
    options?: { container?: HTMLElement },
  ): DynamicComponentHandle<T> {
    const container = options?.container ?? document.createElement("div");
    let closed = false;
    let resolvePromise: (value: T | undefined) => void = () => {};
    let componentElement: App<Element>;

    const close = (payload?: T) => {
      if (closed) return;
      closed = true;
      componentElement.unmount();

      if (!options?.container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      resolvePromise(payload);
    };

    if (!options?.container) {
      document.body.appendChild(container);
    }

    componentElement = createApp(DynamicComponentContainer, {
      component,
      componentProps: {
        ...props,
        onClose: close,
      },
    });

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
