/**
 * KARKA AI & TECH ACADEMY — WEBSITE INTERACTIVE SCRIPT
 * Competition: SiteSprint 2026 | Team: Tech duo
 * Features: Mobile Navigation, ScrollSpy, Track Filtering, FAQ Accordion, GSAP reveals
 */

document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------------------------
    // 1. MOBILE NAVIGATION TOGGLE & ACCESSIBILITY
    // --------------------------------------------------------------------------
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const siteHeader = document.getElementById("siteHeader");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.classList.toggle("open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        // Close mobile menu when clicking any nav link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close on clicking outside header
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("active") && !siteHeader.contains(e.target)) {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Close on Escape key press
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.focus();
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2. SCROLL SPY: ACTIVE NAVIGATION STATE ON SCROLL
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-item");

    if ("IntersectionObserver" in window && sections.length > 0 && navItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute("id");
                    navItems.forEach((link) => {
                        const href = link.getAttribute("href");
                        if (href === `#${currentId}`) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach((section) => sectionObserver.observe(section));
    }

    // --------------------------------------------------------------------------
    // 3. CAREER TRACK CATEGORY FILTERING
    // --------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const trackCards = document.querySelectorAll(".track-card");

    if (filterButtons.length > 0 && trackCards.length > 0) {
        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                // Update active filter button state
                filterButtons.forEach((btn) => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-selected", "false");
                });
                button.classList.add("active");
                button.setAttribute("aria-selected", "true");

                const targetFilter = button.getAttribute("data-filter");

                // Filter cards with subtle staggered reveal
                trackCards.forEach((card) => {
                    const category = card.getAttribute("data-category");
                    const isMatch = targetFilter === "all" || category === targetFilter;

                    if (isMatch) {
                        card.classList.remove("hidden");
                        card.style.opacity = "0";
                        card.style.transform = "translateY(8px)";
                        setTimeout(() => {
                            card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 20);
                    } else {
                        card.classList.add("hidden");
                    }
                });
            });
        });
    }

    // --------------------------------------------------------------------------
    // 4. ACCESSIBLE FAQ ACCORDION
    // --------------------------------------------------------------------------
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (button && answer) {
            button.addEventListener("click", () => {
                const isCurrentlyActive = item.classList.contains("active");

                // Close all other accordion items for clean presentation
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item && otherItem.classList.contains("active")) {
                        otherItem.classList.remove("active");
                        const otherBtn = otherItem.querySelector(".faq-question");
                        const otherAns = otherItem.querySelector(".faq-answer");
                        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                        if (otherAns) otherAns.style.maxHeight = null;
                    }
                });

                // Toggle current item
                if (isCurrentlyActive) {
                    item.classList.remove("active");
                    button.setAttribute("aria-expanded", "false");
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add("active");
                    button.setAttribute("aria-expanded", "true");
                    answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
                }
            });
        }
    });

    // --------------------------------------------------------------------------
    // 5. SMOOTH BACK-TO-TOP BUTTON
    // --------------------------------------------------------------------------
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --------------------------------------------------------------------------
    // 6. THIRUVALLUVAR STATUE -> KARKA AI LOGO SCROLL TRANSITION
    // --------------------------------------------------------------------------
    const karkaCenterLogo = document.getElementById("karkaCenterLogo");
    const thiruvalluvarSvg = document.getElementById("thiruvalluvarSvg");
    const auraRing1 = document.getElementById("auraRing1");
    const auraRing2 = document.getElementById("auraRing2");
    const auraRing3 = document.getElementById("auraRing3");
    const cardTerminal = document.getElementById("cardTerminal");
    const cardOutcome = document.getElementById("cardOutcome");
    const cardPipeline = document.getElementById("cardPipeline");
    const heroVisualStage = document.getElementById("heroVisualStage");

    // Native High-Performance Scroll Transition with rAF
    let ticking = false;

    function updateStatueLogoTransition() {
        if (!karkaCenterLogo || !heroVisualStage) return;

        const scrollY = window.scrollY || window.pageYOffset;
        const heroHeight = heroVisualStage.offsetHeight || 600;
        // Progress from 0 (top) to 1 (scrolled past hero)
        const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.85)));

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            // 1. Karka AI Center Logo Scales and Transitions Outward
            const logoScale = 1 + progress * 1.6; // Scales from 1x to 2.6x
            const logoGlow = 40 + progress * 60;
            karkaCenterLogo.style.transform = `translate(-50%, -50%) scale(${logoScale.toFixed(3)})`;
            karkaCenterLogo.style.filter = `drop-shadow(0 0 ${logoGlow.toFixed(0)}px rgba(0, 242, 254, ${(0.45 + progress * 0.5).toFixed(2)}))`;

            // 2. Concentric Aura Rings Radiate Outwards
            if (auraRing1) {
                const r1Scale = 1 + progress * 1.5;
                auraRing1.style.transform = `translate(-50%, -50%) scale(${r1Scale.toFixed(3)})`;
                auraRing1.style.opacity = `${(1 - progress * 0.4).toFixed(2)}`;
            }
            if (auraRing2) {
                const r2Scale = 1 + progress * 2.2;
                auraRing2.style.transform = `translate(-50%, -50%) scale(${r2Scale.toFixed(3)})`;
                auraRing2.style.opacity = `${(0.8 - progress * 0.3).toFixed(2)}`;
            }
            if (auraRing3) {
                const r3Scale = 1 + progress * 2.8;
                auraRing3.style.transform = `translate(-50%, -50%) scale(${r3Scale.toFixed(3)})`;
                auraRing3.style.opacity = `${(0.6 - progress * 0.3).toFixed(2)}`;
            }

            // 3. Thiruvalluvar Statue Recedes with Parallax & Cyber Highlights
            if (thiruvalluvarSvg) {
                const statueScale = 1 - progress * 0.08;
                const statueTranslate = progress * 25;
                thiruvalluvarSvg.style.transform = `scale(${statueScale.toFixed(3)}) translateY(${statueTranslate.toFixed(1)}px)`;
                thiruvalluvarSvg.style.filter = `brightness(${(1 + progress * 0.4).toFixed(2)}) drop-shadow(0 20px 45px rgba(0, 0, 0, ${(0.7 - progress * 0.2).toFixed(2)}))`;
            }

            // 4. Floating Badges Glide Outwards
            if (cardTerminal) {
                cardTerminal.style.transform = `translateX(${(progress * 45).toFixed(1)}px) translateY(${(-progress * 25).toFixed(1)}px)`;
            }
            if (cardOutcome) {
                cardOutcome.style.transform = `translateX(${(-progress * 45).toFixed(1)}px) translateY(${(progress * 25).toFixed(1)}px)`;
            }
            if (cardPipeline) {
                cardPipeline.style.transform = `translateX(${(-progress * 35).toFixed(1)}px)`;
            }
        }

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateStatueLogoTransition);
            ticking = true;
        }
    }, { passive: true });

    // Initial trigger
    updateStatueLogoTransition();

    // --------------------------------------------------------------------------
    // 7. GSAP PROGRESSIVE ENHANCEMENT & SCROLLTRIGGER ANIMATIONS
    // --------------------------------------------------------------------------
    if (typeof gsap !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        // ── HERO: Page-Load Entrance ─────────────────────────────────────────
        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTimeline
            .from(".hero-header-centered > *", {
                opacity: 0, y: 30,
                duration: 0.85,
                stagger: 0.12,
                clearProps: "all"
            })
            .from(".monument-container", {
                opacity: 0, scale: 0.88, y: 30,
                duration: 1.1,
                ease: "power2.out"
            }, "-=0.5")
            .from(".hero-metrics-centered", {
                opacity: 0, y: 18,
                duration: 0.6
            }, "-=0.4")
            .from(".scroll-cue", {
                opacity: 0, y: 10,
                duration: 0.5
            }, "-=0.2");

        // ── PARTNERS MARQUEE ─────────────────────────────────────────────────
        gsap.from(".marquee-heading", {
            scrollTrigger: { trigger: ".partners-marquee", start: "top 88%" },
            opacity: 0, y: 25,
            duration: 0.7, ease: "power2.out"
        });
        gsap.from(".marquee-container", {
            scrollTrigger: { trigger: ".partners-marquee", start: "top 80%" },
            opacity: 0, y: 20,
            duration: 0.65, ease: "power2.out", delay: 0.15
        });

        // ── CAREER TRACKS SECTION ─────────────────────────────────────────────
        gsap.from(".tracks-section .section-heading", {
            scrollTrigger: { trigger: ".tracks-section", start: "top 82%" },
            opacity: 0, y: 40,
            duration: 0.8, ease: "power3.out"
        });
        gsap.from(".tracks-filter", {
            scrollTrigger: { trigger: ".tracks-filter", start: "top 88%" },
            opacity: 0, y: 20,
            duration: 0.6, ease: "power2.out"
        });
        gsap.from(".track-card", {
            scrollTrigger: { trigger: ".tracks-grid", start: "top 85%", toggleActions: "play none none none" },
            opacity: 0, y: 45, scale: 0.96,
            duration: 0.65, ease: "power3.out",
            stagger: { each: 0.1, from: "start" }
        });
        gsap.from(".tracks-footer-banner", {
            scrollTrigger: { trigger: ".tracks-footer-banner", start: "top 90%" },
            opacity: 0, y: 18,
            duration: 0.55, ease: "power2.out"
        });

        // ── PAY AFTER PLACEMENT SECTION ──────────────────────────────────────
        gsap.from(".payment-intro > *", {
            scrollTrigger: { trigger: ".payment-section", start: "top 80%" },
            opacity: 0, y: 35,
            duration: 0.8, ease: "power3.out",
            stagger: 0.12
        });
        gsap.from(".pap-timeline", {
            scrollTrigger: { trigger: ".pap-timeline", start: "top 82%" },
            opacity: 0, y: 35,
            duration: 0.85, ease: "power3.out"
        });
        gsap.from(".pap-step", {
            scrollTrigger: { trigger: ".pap-timeline", start: "top 80%" },
            opacity: 0, y: 30,
            duration: 0.65, ease: "back.out(1.2)",
            stagger: 0.15
        });

        // ── 4 PILLARS SECTION ─────────────────────────────────────────────────
        gsap.from(".pillars-section .section-heading", {
            scrollTrigger: { trigger: ".pillars-section", start: "top 82%" },
            opacity: 0, y: 40,
            duration: 0.8, ease: "power3.out"
        });
        gsap.from(".pillar-card", {
            scrollTrigger: { trigger: ".pillars-grid", start: "top 85%" },
            opacity: 0, y: 50, scale: 0.95,
            duration: 0.7, ease: "power3.out",
            stagger: { each: 0.12, from: "start" }
        });

        // ── PROJECTS / INTERNSHIP SHOWCASE ────────────────────────────────────
        gsap.from(".projects-header > *", {
            scrollTrigger: { trigger: ".projects-section", start: "top 82%" },
            opacity: 0, y: 35,
            duration: 0.75, ease: "power3.out",
            stagger: 0.1
        });
        gsap.from(".project-card", {
            scrollTrigger: { trigger: ".projects-grid", start: "top 85%" },
            opacity: 0, y: 45,
            duration: 0.7, ease: "power3.out",
            stagger: { each: 0.13, from: "start" }
        });

        // ── PLACEMENT SPOTLIGHT ───────────────────────────────────────────────
        const spotlightSection = document.querySelector(".placement-section, .spotlight-section, [id='placements']");
        if (spotlightSection) {
            gsap.from(spotlightSection.querySelectorAll("*"), {
                scrollTrigger: { trigger: spotlightSection, start: "top 82%" },
                opacity: 0, y: 30,
                duration: 0.7, ease: "power2.out",
                stagger: 0.08
            });
        }

        // ── ECOSYSTEM SECTION (Infini AI + Spike AI) ──────────────────────────
        const ecosystemSection = document.querySelector(".ecosystem-section, [id='ecosystem']");
        if (ecosystemSection) {
            gsap.from(ecosystemSection.querySelectorAll(".ecosystem-card, .eco-card, .platform-card"), {
                scrollTrigger: { trigger: ecosystemSection, start: "top 82%" },
                opacity: 0, scale: 0.93, y: 30,
                duration: 0.75, ease: "back.out(1.4)",
                stagger: 0.15
            });
            gsap.from(ecosystemSection.querySelectorAll("h2, p.section-description, .section-label"), {
                scrollTrigger: { trigger: ecosystemSection, start: "top 88%" },
                opacity: 0, y: 25,
                duration: 0.7, ease: "power2.out",
                stagger: 0.1
            });
        }

        // ── FAQ ACCORDION ─────────────────────────────────────────────────────
        gsap.from(".faq-section .section-heading, .faq-section h2", {
            scrollTrigger: { trigger: ".faq-section", start: "top 82%" },
            opacity: 0, y: 35,
            duration: 0.75, ease: "power3.out"
        });
        gsap.from(".faq-item", {
            scrollTrigger: { trigger: ".faq-section", start: "top 80%" },
            opacity: 0, y: 20,
            duration: 0.55, ease: "power2.out",
            stagger: { each: 0.1, from: "start" }
        });

        // ── CONTACT / CTA SECTION ─────────────────────────────────────────────
        const ctaSection = document.querySelector(".contact-section, .cta-section, [id='contact']");
        if (ctaSection) {
            gsap.from(ctaSection, {
                scrollTrigger: { trigger: ctaSection, start: "top 85%" },
                opacity: 0, y: 40,
                duration: 0.85, ease: "power3.out"
            });
            gsap.from(ctaSection.querySelectorAll("h2, p, .primary-btn, .contact-form, input, textarea, button"), {
                scrollTrigger: { trigger: ctaSection, start: "top 80%" },
                opacity: 0, y: 25,
                duration: 0.65, ease: "power2.out",
                stagger: 0.1
            });
        }

        // ── SECTION LABELS & HEADINGS (generic, any section) ─────────────────
        document.querySelectorAll(".section-label").forEach((el) => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: "top 90%" },
                opacity: 0, y: 12, letterSpacing: "6px",
                duration: 0.6, ease: "power2.out",
                clearProps: "all"
            });
        });

        // ── FOOTER ────────────────────────────────────────────────────────────
        gsap.from(".site-footer .footer-col", {
            scrollTrigger: { trigger: ".site-footer", start: "top 90%" },
            opacity: 0, y: 30,
            duration: 0.6, ease: "power2.out",
            stagger: 0.1
        });
        gsap.from(".footer-bottom", {
            scrollTrigger: { trigger: ".footer-bottom", start: "top 95%" },
            opacity: 0, y: 16,
            duration: 0.5, ease: "power1.out"
        });

        // ── HIGHLIGHT ROWS (PAP bullets) ──────────────────────────────────────
        gsap.from(".highlight-row", {
            scrollTrigger: { trigger: ".payment-highlights-box", start: "top 84%" },
            opacity: 0, y: 20,
            duration: 0.6, ease: "power2.out",
            stagger: 0.14
        });

        // ── STAT / METRIC COUNTERS (number-up effect) ─────────────────────────
        document.querySelectorAll(".metric-item strong, .stat-value").forEach((el) => {
            const finalText = el.textContent.trim();
            const numMatch = finalText.match(/([\d.]+)/);
            if (!numMatch) return;
            const finalNum = parseFloat(numMatch[1]);
            const prefix = finalText.split(numMatch[1])[0] || "";
            const suffix = finalText.split(numMatch[1])[1] || "";
            gsap.from({ val: 0 }, {
                scrollTrigger: { trigger: el, start: "top 88%" },
                val: finalNum,
                duration: 1.4,
                ease: "power1.out",
                onUpdate: function () {
                    const v = this.targets()[0].val;
                    el.textContent = prefix + (Number.isInteger(finalNum) ? Math.round(v) : v.toFixed(1)) + suffix;
                }
            });
        });

        // ── PILLAR ICON BOUNCE ON ENTER ───────────────────────────────────────
        gsap.from(".pillar-icon-box", {
            scrollTrigger: { trigger: ".pillars-grid", start: "top 82%" },
            scale: 0, rotation: -15,
            duration: 0.55, ease: "back.out(2)",
            stagger: 0.12
        });

        // ── PARTNER PILLS (stagger float-in) ─────────────────────────────────
        gsap.from(".partner-pill", {
            scrollTrigger: { trigger: ".marquee-container", start: "top 90%" },
            opacity: 0, y: 12,
            duration: 0.45, ease: "power2.out",
            stagger: 0.04
        });

        // ── PROJECT CARD ART (subtle scale) ──────────────────────────────────
        gsap.from(".project-art", {
            scrollTrigger: { trigger: ".projects-grid", start: "top 88%" },
            scale: 0.85,
            duration: 0.8, ease: "power2.out",
            stagger: 0.12
        });

        // ── FILTER BUTTONS POP-IN ─────────────────────────────────────────────
        gsap.from(".filter-btn", {
            scrollTrigger: { trigger: ".tracks-filter", start: "top 90%" },
            opacity: 0, scale: 0.88, y: 10,
            duration: 0.4, ease: "back.out(1.5)",
            stagger: 0.07
        });

    }
});
