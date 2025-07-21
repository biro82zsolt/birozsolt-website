window.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('cookieConsentAccepted')) {
        const lang = document.documentElement.lang || 'hu';
        const isEnglish = lang.startsWith('en');

        const message = isEnglish
            ? `This website uses cookies to improve user experience. <a href="/privacy" style="color: #0d6efd;">Learn more</a>`
            : `Ez a weboldal sütiket használ a jobb felhasználói élmény érdekében. <a href="/adatvedelem" style="color: #0d6efd;">További információ</a>`;

        const buttonText = isEnglish ? "Got it" : "Értettem";

        const banner = document.createElement('div');
        banner.innerHTML = `
        <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #222; color: #fff; padding: 1rem; text-align: center; z-index: 10000;">
            ${message}
            <button style="margin-left: 1rem;" class="btn btn-sm btn-primary" onclick="this.parentElement.remove(); localStorage.setItem('cookieConsentAccepted', 'true')">${buttonText}</button>
        </div>
        `;
        document.body.appendChild(banner);
    }
});
