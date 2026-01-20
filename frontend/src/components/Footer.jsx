import React from 'react';

function Footer() {
    return (
    <footer className="sf-footer">
        {}
        <div className="sf-footer__box">© 2025 ShirtFinder</div>

        {}
        <div className="sf-footer__box">FAQS</div>
        <div className="sf-footer__box">COOKIES</div>
        <div className="sf-footer__box">CRÉDITOS</div>

        {}
        <div className="sf-footer__icons-container">
        <a href="#" className="sf-social-link">
            <img 
                src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391527/LOGO_FACEBOOK_c9qszl.png" 
                alt="Facebook" 
                className="sf-social-icon" 
            />
        </a>
        <a href="#" className="sf-social-link">
            <img 
                src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391526/LOGO_INSTAGRAM_nw1r0s.png" 
                alt="Instagram" 
                className="sf-social-icon" 
            />
        </a>
        <a href="#" className="sf-social-link">
            <img 
                src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391530/LOGO_TWITTER_rulef3.png" 
                alt="Twitter" 
                className="sf-social-icon" 
            />
        </a>
        <a href="#" className="sf-social-link">
            <img 
                src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391530/LOGO_TIKTOK_qun7pd.png" 
                alt="TikTok" 
                className="sf-social-icon" 
            />
        </a>
        </div>
    </footer>
    );
}

export default Footer;