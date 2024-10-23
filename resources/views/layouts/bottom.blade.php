        <?php
        $fileVersion = 27;
        ?>
        <footer>
            <div class="top-footer">
                <img width="103" height="60" src="/images/goalnu-logo.png" alt="Logo">
            </div>
            <div class="container">
                <div class="staticpage-section">
                    <div>
                        <p><a href="/about" title="">About Us</a></p>
                        <p><a href="/contact" title="">Contact Us</a></p>
                        <p><a href="/upcomingEvents" title="">Upcoming Events</a></p>
                    </div>
                    <ul class="desktop-view">
                        <li><a href="/certifications" title="">Certifications</a></li>
                        <li><a href="/developments" title="">Developement</a></li>
                        <li><a href="/article-blogs" title="">Articles & Blogs</a></li>
                        <li><a href="/sitemap" title="">Sitemap</a></li>
                    </ul>
                    <ul class="mobile-view">
                        <li><a href="/certifications" title="">Certifications</a></li>
                        <li><a href="/developments" title="">Developement</a></li>
                        <li><a href="/article-blogs" title="">Articles & Blogs</a></li>
                    </ul>
                </div>
                <div class="section-copyright">
                    <p>@2024 Goalsnu.com. All Right Reserved.</p>
                </div>
            </div>
            <div class="sticky-container">
            <button onclick="Samvaarta.common.initWhatsApp();" class="btn">
                <span class="desktop-view">Need Help</span>
                <span class="whatsapp-icon sprite-icon-img"></span>
            </button>
            </div>
        </footer>
        <script>
            var Samvaarta = Samvaarta || {};
        </script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="{{ asset('js/common.js?mod='.$fileVersion)}}"></script>
        </body>

        </html>