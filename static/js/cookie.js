window.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('cookieConsentAccepted')) {
        const lang = navigator.language || navigator.userLanguage;
        const isHungarian = lang.startsWith('hu');

        const message = isHungarian
            ? `Ez a weboldal sütiket használ a jobb felhasználói élmény érdekében. <a href="/adatvedelem" style="color: #0d6efd;">További információ</a>`
            : `This website uses cookies to improve user experience. <a href="/privacy" style="color: #0d6efd;">Learn more</a>`;

        const buttonText = isHungarian ? "Értettem" : "Got it";

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
