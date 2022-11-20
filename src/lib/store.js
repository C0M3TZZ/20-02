import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const userLogin = writable(null);

export const nofitication = writable([]);

export const addNotification = (message, type, timeout) => {
  let id = -1;
  nofitication.update((n) => {
    n.push({ message, type });
    id = n.length - 1;
    return n;
  });

  setTimeout(() => {
    nofitication.update((n) => {
      n.splice(id, 1);
      return n;
    });
  }, timeout);
};

if (browser) {
  userLogin.set(localStorage.getItem("userLogin"));

  userLogin.subscribe(value => {
    if (value == null) {
      localStorage.removeItem("userLogin");
    } else {
      localStorage.setItem("userLogin", value);
    }
  });
}

