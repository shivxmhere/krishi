export const Footer = () => (
    <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container px-4 mx-auto grid md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-white font-bold text-lg mb-4">Krishi</h3>
                <p>Empowering farmers with AI technology.</p>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                    <li>Features</li>
                    <li>Pricing</li>
                    <li>API</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                    <li>About</li>
                    <li>Blog</li>
                    <li>Careers</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                    <li>Privacy</li>
                    <li>Terms</li>
                </ul>
            </div>
        </div>
        <div className="container px-4 mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            © 2024 Krishi Inc. All rights reserved.
        </div>
    </footer>
);
