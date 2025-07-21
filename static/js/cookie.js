window.onload = function () {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.innerHTML = `
        <div style="position:fixed;bottom:0;width:100%;background:#222;color:#fff;padding:1rem;text-align:center;z-index:9999;">
            Ez a weboldal sütiket használ. <a href="/adatvedelem.html" style="color:#0d6efd;">További info</a>
            <button style="margin-left:1rem;" onclick="this.parentElement.style.display='none'; localStorage.setItem('cookieConsent', true);" class="btn btn-sm btn-primary">Értettem</button>
        </div>`;
        document.body.appendChild(banner);
    }
};
