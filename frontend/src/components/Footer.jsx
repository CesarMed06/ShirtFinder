import React from 'react';

function Footer() {
    return (
        <footer className="sf-footer">
            <span>© 2025 ShirtFinder</span>
            <span>FAQS</span>
            <span>COOKIES</span>
            <span>CRÉDITOS</span>

            <div className="sf-footer__icons-container">
                <a href="https://www.facebook.com" className="sf-social-link" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391527/LOGO_FACEBOOK_c9qszl.png"
                        alt="Facebook"
                        className="sf-social-icon"
                    />
                </a>

                <a href="https://www.instagram.com" className="sf-social-link" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391526/LOGO_INSTAGRAM_nw1r0s.png"
                        alt="Instagram"
                        className="sf-social-icon"
                    />
                </a>

                <a href="https://www.tiktok.com" className="sf-social-link" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391530/LOGO_TIKTOK_qun7pd.png"
                        alt="TikTok"
                        className="sf-social-icon"
                    />
                </a>

                <a href="https://www.twitter.com" className="sf-social-link" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391530/LOGO_TWITTER_rulef3.png"
                        alt="Twitter"
                        className="sf-social-icon"
                    />
                </a>
            </div>
        </footer>
    );
}

export default Footer;