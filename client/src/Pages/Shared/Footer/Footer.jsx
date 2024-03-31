import './Footer.css';

const Footer = () => {
    return (
        <div class="footer-bottom">
            <footer class="footer p-10 bg-base-200 text-base-content">
                <nav class="flex flex-col mr-10">
                    <h6 class="footer-title mb-4">Services</h6>
                    <a href="#" class="link link-hover mb-2">Domestic Waste Collection</a>
                    <a href="#" class="link link-hover mb-2">Waste-to-Energy Initiatives</a>
                    <a href="#" class="link link-hover mb-2">International Partnerships</a>
                </nav>
                <nav class="flex flex-col mr-10">
                    <h6 class="footer-title mb-4">Company</h6>
                    <a href="#" class="link link-hover mb-2">About Dhaka North City Corporation</a>
                    <a href="#" class="link link-hover mb-2">Contact DNCC</a>
                    <a href="#" class="link link-hover mb-2">Join Our Team</a>
                    <a href="#" class="link link-hover mb-2">Press Kit</a>
                </nav>
                <nav class="flex flex-col mr-10">
                    <h6 class="footer-title mb-4">Legal</h6>
                    <a href="#" class="link link-hover mb-2">Terms of Use</a>
                    <a href="#" class="link link-hover mb-2">Privacy Policy</a>
                    <a href="#" class="link link-hover mb-2">Cookie Policy</a>
                </nav>
                <form class="flex flex-col">
                    <h6 class="footer-title mb-4">Newsletter</h6>
                    <fieldset class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Subscribe to Our Newsletter</span>
                        </label>
                        <div class="join flex mb-2">
                            <input type="text" placeholder="username@site.com" class="input input-bordered join-item mr-2" />
                            <button class="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
        </div>

    );
};

export default Footer;