// script.js
const rootDataset = document.documentElement.dataset;
const modeToggleBtn = document.getElementById('mode-toggle');
const icon = document.getElementById('icon');

modeToggleBtn.addEventListener('click', () => {
    const inDarkMode = (rootDataset.theme === 'dark');
    rootDataset.theme = inDarkMode ? '' : 'dark';

    // Ganti ikon sesuai dengan mode
    if (inDarkMode) {
        icon.src = 'src/icons/sun.svg';
        icon.alt = 'Light Icon';
    } else {
        icon.src = 'src/icons/moon.svg';
        icon.alt = 'Dark Icon';
    }
});

// navigasi
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 4) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === current) {
            link.classList.add("active");
        }
    });
});


// certificates
document.addEventListener("DOMContentLoaded", function () {
  const certificatesInner = document.getElementById("certificates-inner");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let currentIndex = 0;

  // Memuat data dari file JSON secara asinkron
  fetch("src/certificates/certificates.json")
    .then((response) => response.json())
    .then((data) => {
      const certificatesData = data;

      function renderCertificate(index) {
        certificatesInner.innerHTML = `
          <img src="${certificatesData[index].img.src}" alt="${certificatesData[index].img.alt}">
        `;
      }

      function showPreviousCertificate() {
        currentIndex = (currentIndex - 1 + certificatesData.length) % certificatesData.length;
        renderCertificate(currentIndex);
      }

      function showNextCertificate() {
        currentIndex = (currentIndex + 1) % certificatesData.length;
        renderCertificate(currentIndex);
      }

      prevBtn.addEventListener("click", showPreviousCertificate);
      nextBtn.addEventListener("click", showNextCertificate);

      // Tampilkan sertifikat pertama saat hal
      renderCertificate(currentIndex);
    });
});
