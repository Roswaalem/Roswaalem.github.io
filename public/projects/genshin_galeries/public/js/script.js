document.addEventListener('DOMContentLoaded', function() {

    /**
     * Wishes computation by banner
     */

    let banners = ['event', 'weapon', 'perma'];

    const getButton = (banner) => {
        for (let i = 3; i <= 5; i++) {
            let buttonAdd = document.getElementById(`btn-add-${i}-nat-${banner}`);
            let buttonRemove = document.getElementById(`btn-remove-${i}-nat-${banner}`);

            buttonAdd.addEventListener('click', () => {
                addWish(banner, i);
            });

            buttonRemove.addEventListener('click', () => {
                removeWish(banner, i);
            });

            showValues(banner, i);
        }
    }

    const showValues = (banner, nat) => {
        if (nat === 3) {
            let wishCount = localStorage.getItem(`wish-count-${banner}`) || 0;
            document.getElementById(`wish-count-${banner}`).textContent = `Wish count: ${wishCount} (value: ${wishCount * 160})`;
        }

        let natCount = localStorage.getItem(`${nat}-nat-count-${banner}`) || 0;
        document.getElementById(`${nat}-nat-count-${banner}`).textContent = natCount;
    }

    const updateValues = (banner) => {
        for (let i = 3; i <= 5; i++) {
            showValues(banner, i);
        }
    }

    const addWish = (banner, nat) => {
        let wishCount = localStorage.getItem(`wish-count-${banner}`) || 0;
        let natCount = localStorage.getItem(`${nat}-nat-count-${banner}`) || 0;

        wishCount++;
        natCount++;

        localStorage.setItem(`wish-count-${banner}`, wishCount);
        localStorage.setItem(`${nat}-nat-count-${banner}`, natCount);

        updateValues(banner);
        updateGlobalCounts();
    }

    const removeWish = (banner, nat) => {
        let wishCount = localStorage.getItem(`wish-count-${banner}`) || 0;
        let natCount = localStorage.getItem(`${nat}-nat-count-${banner}`) || 0;

        if (natCount > 0) {
            natCount--;
            wishCount--;
        }

        localStorage.setItem(`wish-count-${banner}`, wishCount);
        localStorage.setItem(`${nat}-nat-count-${banner}`, natCount);

        updateValues(banner);
        updateGlobalCounts();
    }

    const updateGlobalCounts = () => {
        let wishCount = 0;
        let threeNatCount = 0;
        let fourNatCount = 0;
        let fiveNatCount = 0;

        banners.forEach(banner => {
            wishCount += parseInt(localStorage.getItem(`wish-count-${banner}`)) || 0;
            threeNatCount += parseInt(localStorage.getItem(`3-nat-count-${banner}`)) || 0;
            fourNatCount += parseInt(localStorage.getItem(`4-nat-count-${banner}`)) || 0;
            fiveNatCount += parseInt(localStorage.getItem(`5-nat-count-${banner}`)) || 0;
        });

        document.getElementById('wish-count-global').textContent = `Global wish count: ${wishCount} (value: ${wishCount * 160})`;
        document.getElementById('three-nat-count-global').textContent = `Global 3* count: ${threeNatCount}`;
        document.getElementById('four-nat-count-global').textContent = `Global 4* count: ${fourNatCount}`;
        document.getElementById('five-nat-count-global').textContent = `Global 5* count: ${fiveNatCount}`;
    }

    banners.forEach(banner => {
        getButton(banner);
    });

    updateGlobalCounts();


    /**
     * Tab functioning assignment
     */

    // Tab radios selector
    let tabRadios = document.querySelectorAll('input[name="tab"]');

    // Display tab labels on change
    tabRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            let label = document.querySelector(`label[for="${radio.id}"]`);
            console.log("Currently open tab: ", label.textContent);
        });
    });

    // Check for saved tab in localStorage
    let savedTab = localStorage.getItem('active-tab');
    if (savedTab) {
        document.getElementById(savedTab).checked = true;
        let label = document.querySelector(`label[for="${savedTab}"]`);
        console.log("Currently open tab: ", label.textContent);
    } else {
        let defaultTab = document.querySelector('label[for="tab-global"]');
        if (defaultTab) {
            document.getElementById(defaultTab.htmlFor).checked = true;
            console.log("Currently open tab: ", defaultTab.textContent);
        }
    }

    // Save active tab to localStorage on change
    tabRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            localStorage.setItem('active-tab', radio.id);
        });
    });


    /**
     * Clear button click event
     */

    let clearHref = document.getElementById('clear');

    clearHref.addEventListener('click', () => {
        if (confirm('Do you want to clear local storage ? (no backup possible)')) {
            localStorage.clear();

            banners.forEach(banner => {
                updateValues(banner);
            });

            updateGlobalCounts();
        }
    });


    /**
     * Exportation functionality
     */

    let exportHref = document.getElementById('export');

    exportHref.addEventListener('click', () => {
        let data = {};

        banners.forEach(banner => {
            data[`wish-count-${banner}`] = localStorage.getItem(`wish-count-${banner}`) || 0;
            data[`three-nat-count-${banner}`] = localStorage.getItem(`3-nat-count-${banner}`) || 0;
            data[`four-nat-count-${banner}`] = localStorage.getItem(`4-nat-count-${banner}`) || 0;
            data[`five-nat-count-${banner}`] = localStorage.getItem(`5-nat-count-${banner}`) || 0;
        });

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        let downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);

        let date = new Date();
        let clientDate = date.toLocaleDateString().replace(/\//g, '-');
        let clientTime = date.toLocaleTimeString().replace(/:/g, '-');

        downloadAnchorNode.setAttribute("download", `genshin-data-export-${clientDate}-${clientTime}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });


    /**
     * Importation functionality
     */

    let importHref = document.getElementById('import');
    importHref.addEventListener('click', () => {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.addEventListener('change', (event) => {
            let file = event.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        let data = JSON.parse(e.target.result);
                        // Process the imported data
                        banners.forEach(banner => {
                            localStorage.setItem(`wish-count-${banner}`, data[`wish-count-${banner}`] || 0);
                            localStorage.setItem(`3-nat-count-${banner}`, data[`three-nat-count-${banner}`] || 0);
                            localStorage.setItem(`4-nat-count-${banner}`, data[`four-nat-count-${banner}`] || 0);
                            localStorage.setItem(`5-nat-count-${banner}`, data[`five-nat-count-${banner}`] || 0);
                        });

                        banners.forEach(banner => {
                            updateValues(banner);
                        });

                        updateGlobalCounts();
                    } catch (error) {
                        console.error('Error parsing JSON file:', error);
                        alert('Invalid JSON file.');
                    }
                };
                reader.readAsText(file);
            }
        });
        fileInput.click();
    });


    /**
     * "About" modal box functionality
     */

    let aboutHref = document.getElementById('about');
    let modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
        <div id="modal-content">
            <span id="close">❌</span>
            <h2>About</h2>
            <p class="modal-text">This is a simple web application for tracking your Genshin Impact wishes. It allows you to keep track of your wishes on different banners and see the total count of 3*, 4* and 5* characters/weapons you have obtained. You can also export your data in a .json file and import it anytime on any other web navigator.</p>
            <p class="author-line">Developed by <a href="https://github.com/Roswaalem">@Roswaalem</a></p>
        </div>`;

    document.body.appendChild(modal);

    aboutHref.addEventListener('click', () => {
        modal.classList.add(`modal-visible`);
    });

    let closeBtn = document.getElementById('close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove(`modal-visible`);
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.classList.remove(`modal-visible`);
        }
    });
});
