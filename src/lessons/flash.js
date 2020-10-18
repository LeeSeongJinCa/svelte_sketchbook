export default function flash(element) {
  requestAnimationFrame(() => {
    const style = element.style;
    style.transition = "none";
    style.color = "rgba(255,62,0,1)";
    style.backgroundColor = "rgba(255,62,0,0.2)";

    setTimeout(() => {
      style.transition = "color 1s, background 1s";
      style.color = "";
      style.backgroundColor = "";
    });
  });
}
