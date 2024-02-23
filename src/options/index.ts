import "../assets/style.css";
import Designer from "./Designer.svelte"


// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/

function render() {
    const target = document.getElementById("app");

    if (target) {
        new Designer({target})
    }

}

document.addEventListener("DOMContentLoaded", render);
