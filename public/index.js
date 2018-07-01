"use strict";

var set = false;

function displayDate() {
    document.getElementById("date").innerHTML = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
  if(!set) {
    set = true;
    setInterval(() => {
      document.getElementById("date").innerHTML = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }, 1000);
    });
  }
  }