import renderWorksPreview from './worksPreview.js';

export default async function home () {
    const worksPreview = await renderWorksPreview();

    return `
        <section class="about" id="about">
            <h1 class="title">ABOUT</h1>
            <h2 class="desc">Self-introduction</h2>
            <div class="about__wrapper">
                <!-- Phần About như cũ -->
                <div class="about__item">
                    <h1 class="about__item__name">Kimeru / Kimeyu</h1>
                    <p class="about__item__title">
                        Video Creator / <span>Motion Graphics Designer</span>
                    </p>
                    <p class="about__item__skill">
                        <span>SKILL</span> MotionGraphics // MusicVideo // Graphics Design
                    </p>
                    <div class="about__item__link">
                        <a href="https://www.facebook.com/kimerukirisu/">Facebook</a>
                        <a href="https://www.youtube.com/@kimeru_kirisu8572">Youtube</a>
                        <a href="https://x.com/Kimeru2001">X</a>
                    </div>
                </div>
                <div class="about__icon">
                    <div class="wrap__icon">
                        <img src="assets/imgs/pfp.webp" alt="">
                    </div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                </div>
            </div>
        </section>

        <section class="works">
            <h1 class="title">WORKS</h1>
            <h2 class="desc">Click on the thumbnail for more details</h2>
            ${worksPreview}
            <div class="works__viewmore">
                <a data-route="works" href="#works" class="works__viewmore__link">View more</a>
            </div>
        </section>

        <section class="contact">
            <h1 class="title">CONTACT</h1>
            <h2 class="desc">
                If you are interested, please contact me via email or discord below
            </h2>
            <div class="contact__wrapper">
                <span class="contact__social">Email</span>
                <div class="contact__wrapper__email">
                    <a href="mailto:kimeyukawa@gmail.com" class="contact__mail">
                        kimeyukawa@gmail.com
                    </a>
                    <svg class="copy__email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onclick="copyText('.contact__mail');">
                        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                    </svg>
                </div> 
            </div>
            <div class="contact__wrapper">
                <span class="contact__social">Discord</span>
                <div class="contact__wrapper__discord">
                    <a href="https://discordapp.com/users/683574461147906078" class="contact__discord">
                        kimeyu_39
                    </a>
                    <svg class="copy__discord" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onclick="copyText('.contact__discord');">
                        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                    </svg>
                    <div id="msg__copy" class="msg__copy">Copied!</div>
                </div>
            </div>
        </section>
    `;
}
