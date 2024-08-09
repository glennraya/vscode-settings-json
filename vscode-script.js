const TARGET_DIV_CLASS = '.monaco-workbench';
const COMMAND_CENTER_DIV_CLASS = '.quick-input-widget';
const BLUR_BACKGROUND_DIV_ID = 'command-blur';

document.addEventListener('DOMContentLoaded', () => {
    const checkMonacoWorkbench = setInterval(() => {
        const targetDiv = document.querySelector(TARGET_DIV_CLASS);

        if (!targetDiv) {
            return;
        }

        // Clear the interval once the targetDiv is found.
        clearInterval(checkMonacoWorkbench);

        // Observer to listen to children being added/removed from targetDiv.
        const targetObserver = new MutationObserver((targetMutations) => {
            for (const parentMutation of targetMutations) {
                if (parentMutation.type !== 'childList') {
                    continue;
                }

                const commandCenterDiv = document.querySelector(COMMAND_CENTER_DIV_CLASS);

                // Go to the next iteration if the command dialog is not found.
                if (!commandCenterDiv) {
                    continue;
                }

                // Disconnect the child list observer once the command dialog is found.
                targetObserver.disconnect();

                // Handle the initial open of the command center.
                handleCommandCenterOpen();

                // Observer to detect when the command center is opened/closed.
                const commandCenterObserver = new MutationObserver((commandCenterMutations) => {
                    for (const mutation of commandCenterMutations) {
                        if (mutation.type !== 'attributes') {
                            continue;
                        } else if (mutation.attributeName !== 'style') {
                            continue;
                        }

                        // @ts-expect-error • Style exists but can't be inferred.
                        if (commandCenterDiv.style.display === 'none') {
                            // If the command center `display` style is set to
                            // `none`, remove the blurred background.
                            handleCommandCenterClose();
                        } else {
                            // Otherwise, add the blurred background.
                            handleCommandCenterOpen();
                        }
                    }
                });

                commandCenterObserver.observe(commandCenterDiv, {
                    attributes: true,
                });
            }
        });

        targetObserver.observe(targetDiv, {
            childList: true,
        });
    }, 100); // Check every 100ms

    function handleCommandCenterOpen() {
        const targetDiv = document.querySelector(TARGET_DIV_CLASS);

        // Delete the existing element if it already exists.
        const existingElement = document.getElementById(BLUR_BACKGROUND_DIV_ID);
        if (existingElement) {
            existingElement.remove();
        }

        // Create and configure the new element.
        const backgroundDiv = document.createElement('div');
        backgroundDiv.setAttribute('id', BLUR_BACKGROUND_DIV_ID);

        // Add an event listener to remove the element on clicked.
        backgroundDiv.addEventListener('click', function () {
            backgroundDiv.remove();
        });

        // Append the new element as a child of the targetDiv.
        targetDiv?.appendChild(backgroundDiv);
    }

    // Remove the backdrop blur.
    function handleCommandCenterClose() {
        const element = document.getElementById(BLUR_BACKGROUND_DIV_ID);

        // Trigger the click handler that will remove the element.
        if (element) {
            element.click();
        }
    }
});
