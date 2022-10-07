if(!window.canvas) {
    window.canvas = document.getElementById("myCanvas");
}

export let canvas = window.canvas;
export let context = window.canvas.getContext("2d"); 

