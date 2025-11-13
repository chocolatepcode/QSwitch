(function() {
    'use strict';

    // ======================================================================
    // === CONFIGURATION START ==============================================
    // ======================================================================

    // 1. QUALITY MAP: Key -> Target Quality Text (MUST match YouTube's menu exactly!)
    const qualityMap = {
        'q': '144p',
        'w': '360p',
        'e': '720p',
        'r': '1080p'
    };

    // CHANGE THIS IF YOUR YOUTUBE IS NOT ENGLISH
    const QUALITY_TEXT_FOR_LOCALE = 'Quality';

    // ======================================================================
    // === CONFIGURATION END ================================================
    // ======================================================================


    /**
     * A helper function to safely wait for an element to appear in the DOM.
     * @param {string} selector - The CSS selector for the element.
     * @param {number} timeout - Maximum time (ms) to wait.
     * @returns {Promise<Element|null>} - Resolves with the element or null if timed out.
     */
    function waitForElement(selector, timeout = 5000) {
        return new Promise(resolve => {
            const startTime = Date.now();

            const check = () => {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                } else if (Date.now() - startTime < timeout) {
                    requestAnimationFrame(check);
                } else {
                    resolve(null);
                }
            };
            requestAnimationFrame(check);
        });
    }

    /**
     * Attempts to click a button and navigate the YouTube quality menu.
     * @param {string} targetQualityText - The text of the desired quality (e.g., '720p').
     */
    async function setVideoQuality(targetQualityText) {
        console.log(`[QSwitch] Attempting to set quality to: ${targetQualityText}`);

        // 1. Locate and click the Settings button (the gear icon)
        const settingsButton = await waitForElement('.ytp-settings-button');
        if (!settingsButton) {
            console.error('[QSwitch] Settings button not found.');
            return;
        }
        settingsButton.click();
        console.log('[QSwitch] Clicked Settings button.');

        // 2. Locate the 'Quality' option by text
        const allMenuItems = await waitForElement('.ytp-panel-menu .ytp-menuitem');

        let qualityMenuItem = null;
        document.querySelectorAll('.ytp-panel-menu .ytp-menuitem').forEach(item => {
            if (item.textContent.includes(QUALITY_TEXT_FOR_LOCALE)) {
                qualityMenuItem = item;
            }
        });

        if (!qualityMenuItem) {
            console.error(`[QSwitch] Quality menu item containing "${QUALITY_TEXT_FOR_LOCALE}" not found.`);
            settingsButton.click(); // Close the menu
            return;
        }
        qualityMenuItem.click();
        console.log('[QSwitch] Clicked Quality menu item.');

        // 3. Find the target quality by text
        const targetOption = await waitForElement('.ytp-quality-menu .ytp-menuitem', 2000);

        let targetQualityElement = null;
        document.querySelectorAll('.ytp-quality-menu .ytp-menuitem').forEach(option => {
            if (option.textContent.includes(targetQualityText)) {
                targetQualityElement = option;
            }
        });

        if (targetQualityElement) {
            // 4. Click the target quality
            targetQualityElement.click();
            console.log(`[QSwitch] Successfully switched quality to ${targetQualityText}`);
        } else {
            console.error(`[QSwitch] Target quality option '${targetQualityText}' not found in the list.`);
            // Click the back button/first item to close the menu
            document.querySelector('.ytp-quality-menu .ytp-menuitem').click();
        }
    }


    // Add the global keyboard listener
    document.addEventListener('keydown', (event) => {
        // Guardrails: Don't run if typing or using modifiers
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable || event.target.getAttribute('role') === 'textbox') {
            return;
        }
        if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
            return;
        }

        const key = event.key.toLowerCase();

        if (qualityMap[key]) {
            event.preventDefault();
            setVideoQuality(qualityMap[key]);
        }
    });

})();