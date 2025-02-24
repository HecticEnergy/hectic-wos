// Utilities
import { defineStore } from "pinia";

interface AlertState {
  id: string;
  message: string;
  severity: Severity;
  show: boolean;
}

type Severity = "info" | "warning" | "error" | "success";

const DEFAULT_TIMEOUT = 5000;

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alerts: [] as AlertState[],
  }),
  actions: {
    show(message: string, severity: Severity) {
      const id = Date.now().toString();
      const newMessage = {
        id,
        message,
        severity,
        show: true,
      };

      this.$state.alerts = this.$state.alerts.filter((a) => a.show);
      this.$state.alerts.push(newMessage);
    },
    hide(id: string) {
      this.$state.alerts = this.$state.alerts.filter(
        (message) => message.id !== id && message.show,
      );
    },
    getMessages() {
      return [...this.$state.alerts];
    },
    getTimeout(id: string) {
      const length = this.$state.alerts.length;
      const alertIndex = this.$state.alerts.findIndex((a) => a.id === id);
      if (alertIndex >= 0) {
        return DEFAULT_TIMEOUT * (length - alertIndex);
      }
      return DEFAULT_TIMEOUT;
    },
    error(message: string, exception?: Error) {
      console.error("alert error: " + message, exception);
      this.show(message, "error");
    },
    success(message: string) {
      this.show(message, "success");
    },
    info(message: string) {
      this.show(message, "info");
    },
    warning(message: string) {
      console.warn("alert warn: " + message);
      this.show(message, "warning");
    },
  },
});
