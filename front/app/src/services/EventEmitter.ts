export type EventHandler = (event: CustomEventInit) => any;

export default class EventEmitter<T extends string = string> {
  emit(type: T, data?: any) {
    try {
      window.dispatchEvent(new CustomEvent(type, { detail: data }));
    } catch (err) {
      console.error(err);
    }
  }

  on(type: T, handler: EventHandler) {
    window.addEventListener(type, handler as EventListener, false);
  }

  off(type: T, handler: EventHandler) {
    window.removeEventListener(type, handler as EventListener, false);
  }
}
