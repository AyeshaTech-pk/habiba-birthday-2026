const pages = document.querySelectorAll('.page');
const passcodeInput = document.getElementById('passcode');
const giftModal = document.getElementById('giftModal');
const mediaModal = document.getElementById('mediaModal');
const mediaContent = document.getElementById('mediaContent');
const mediaTitle = document.getElementById('mediaTitle');

function showPage(pageId) {
    pages.forEach((page) => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);

    if (!targetPage) {
        return;
    }

    targetPage.classList.add('active');
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function checkPasscode() {
    const value = passcodeInput.value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\//g, '-');

    const validPasscodes = [
        '25-08',
        '25-8',
        '2508',
        '25august',
        '25-august',
        '25aug'
    ];

    if (validPasscodes.includes(value)) {
        showPage('questionPage');
        createSparkles();
        return;
    }

    showPage('wrongPage');
}

function createSparkles() {
    const symbols = ['✦', '♡', '♥', '✧'];

    for (let index = 0; index < 14; index += 1) {
        const sparkle = document.createElement('span');

        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.animationDuration = `${2.3 + Math.random() * 2}s`;
        sparkle.style.fontSize = `${12 + Math.random() * 18}px`;

        document.body.appendChild(sparkle);

        window.setTimeout(() => {
            sparkle.remove();
        }, 4800);
    }
}

function openGift() {
    giftModal.classList.add('open');
    giftModal.setAttribute('aria-hidden', 'false');
}

function closeGift() {
    giftModal.classList.remove('open');
    giftModal.setAttribute('aria-hidden', 'true');
}

function continueFromWish() {
    closeGift();
    showPage('hugPage');
}

function openMedia(type, source, title) {
    mediaContent.innerHTML = '';
    mediaTitle.textContent = title || '';

    if (type === 'image') {
        const image = document.createElement('img');

        image.src = source;
        image.alt = title || 'Memory';

        mediaContent.appendChild(image);
    }

    if (type === 'video') {
        const video = document.createElement('video');

        video.src = source;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;

        mediaContent.appendChild(video);
    }

    mediaModal.classList.add('open');
    mediaModal.setAttribute('aria-hidden', 'false');
}

function closeMedia(event) {
    if (event && event.target !== mediaModal) {
        return;
    }

    mediaModal.classList.remove('open');
    mediaModal.setAttribute('aria-hidden', 'true');
    mediaContent.innerHTML = '';
}

passcodeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkPasscode();
    }
});

giftModal.addEventListener('click', (event) => {
    if (event.target === giftModal) {
        closeGift();
    }
});

mediaModal.addEventListener('click', (event) => {
    if (event.target === mediaModal) {
        closeMedia();
    }
});
