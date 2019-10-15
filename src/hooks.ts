enum EHooks {
  MESSAGE_BEFORE_SENT = "message::before-sent",
  MESSAGE_AFTER_SENT = "message::after-sent",
  MESSAGE_BEFORE_RECEIVED = "message::before-received"
}
interface IHook<T = unknown> {
  (payload: T): T | Promise<T>;
}
interface Subscription {
  (): void;
}

export enum Hooks {
  MESSAGE_BEFORE_RECEIVED = "message::before-received",
  MESSAGE_BEFORE_SENT = "message::before-sent",
  MESSAGE_AFTER_SENT = "message::after-sent"
}

export function hookAdapterFactory() {
  const hooks: { [key: string]: IHook[] } = {};
  const get = (hook: string) => {
    if (!Array.isArray(hooks[hook])) hooks[hook] = [];
    return hooks[hook];
  };
  return {
    triggerFor<T>(hook: Hooks, payload: T): Promise<T> {
      return get(hook).reduce(
        (acc: Promise<T>, fn: IHook<T>) => Promise.resolve(acc).then(fn),
        Promise.resolve(payload)
      );
    },
    onHooks<T>(hook: Hooks, callback: IHook<T>): Subscription {
      get(hook).push(callback);

      const index = get(hook).length;
      return () => get(hook).splice(index, 1);
    }
  };
}
