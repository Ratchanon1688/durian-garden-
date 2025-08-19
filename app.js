// เปลี่ยนหน้าเมื่อกดเมนู
const navLinks = document.querySelectorAll("nav a");
const pages = document.querySelectorAll(".page");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const pageId = link.getAttribute("data-page");

    pages.forEach(page => {
      page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
  });
});

// ระบบรดน้ำจำลอง
const waterButtons = document.querySelectorAll("#water .btn");
waterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    alert(`คำสั่ง: ${btn.innerText}`);
  });
});

