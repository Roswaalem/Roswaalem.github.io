document.addEventListener('DOMContentLoaded', function() {

    /**
     * Tab computation
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
     * Permanent banner computation
    */

    // Create buttons
    let wishCountPerma = localStorage.getItem('wish-count-perma') ? parseInt(localStorage.getItem('wish-count-perma')) : 0;

    let btnAdd3NatPerma = document.getElementById('btn-add-3-nat-perma');
    let threeNatCountPerma = localStorage.getItem('three-nat-count-perma') ? parseInt(localStorage.getItem('three-nat-count-perma')) : 0;

    let btnAdd4NatPerma = document.getElementById('btn-add-4-nat-perma');
    let fourNatCountPerma = localStorage.getItem('four-nat-count-perma') ? parseInt(localStorage.getItem('four-nat-count-perma')) : 0;

    let btnAdd5NatPerma = document.getElementById('btn-add-5-nat-perma');
    let fiveNatCountPerma = localStorage.getItem('five-nat-count-perma') ? parseInt(localStorage.getItem('five-nat-count-perma')) : 0;

    let btnRemove3NatPerma = document.getElementById('btn-remove-3-nat-perma');
    let btnRemove4NatPerma = document.getElementById('btn-remove-4-nat-perma');
    let btnRemove5NatPerma = document.getElementById('btn-remove-5-nat-perma');

    if (!btnAdd3NatPerma || !btnAdd4NatPerma || !btnAdd5NatPerma || !btnRemove3NatPerma || !btnRemove4NatPerma || !btnRemove5NatPerma) {
        console.error('One or more buttons are missing in the DOM.');
        return;
    }

    // Display wish counts
    let wishCountDisplayPerma = document.createElement('span');
    wishCountDisplayPerma.textContent = `Wish count: ${wishCountPerma} (value: ${wishCountPerma * 160})`;
    document.getElementById('wish-count-perma').appendChild(wishCountDisplayPerma);

    let threeNatCountDisplayPerma = document.createElement('span');
    threeNatCountDisplayPerma.style.marginLeft = '10px';
    threeNatCountDisplayPerma.style.marginRight = '6px';
    threeNatCountDisplayPerma.textContent = threeNatCountPerma;
    btnAdd3NatPerma.parentNode.insertBefore(threeNatCountDisplayPerma, btnAdd3NatPerma.nextSibling);

    let fourNatCountDisplayPerma = document.createElement('span');
    fourNatCountDisplayPerma.style.marginLeft = '10px';
    fourNatCountDisplayPerma.style.marginRight = '6px';
    fourNatCountDisplayPerma.textContent = fourNatCountPerma;
    btnAdd4NatPerma.parentNode.insertBefore(fourNatCountDisplayPerma, btnAdd4NatPerma.nextSibling);
    
    let fiveNatCountDisplayPerma = document.createElement('span');
    fiveNatCountDisplayPerma.style.marginLeft = '10px';
    fiveNatCountDisplayPerma.style.marginRight = '6px';
    fiveNatCountDisplayPerma.textContent = fiveNatCountPerma;
    btnAdd5NatPerma.parentNode.insertBefore(fiveNatCountDisplayPerma, btnAdd5NatPerma.nextSibling);

    // Adders
    const addWishPerma = () => {
        wishCountPerma++;
        wishCountDisplayPerma.textContent = `Wish count: ${wishCountPerma} (value: ${wishCountPerma * 160})`;
        localStorage.setItem('wish-count-perma', wishCountPerma);
        updateGlobalCounts();
    }

    const add3NatPerma = () => {
        addWishPerma();
        threeNatCountPerma++;
        threeNatCountDisplayPerma.textContent = threeNatCountPerma;
        localStorage.setItem('three-nat-count-perma', threeNatCountPerma);
        updateGlobalCounts();
    }

    const add4NatPerma = () => {
        addWishPerma();
        fourNatCountPerma++;
        fourNatCountDisplayPerma.textContent = fourNatCountPerma;
        localStorage.setItem('four-nat-count-perma', fourNatCountPerma);
        updateGlobalCounts();
    }

    const add5NatPerma = () => {
        addWishPerma();
        fiveNatCountPerma++;
        fiveNatCountDisplayPerma.textContent = fiveNatCountPerma;
        localStorage.setItem('five-nat-count-perma', fiveNatCountPerma);
        updateGlobalCounts();
    }

    // Removers
    const removeWishPerma = () => {
        if (wishCountPerma > 0) {
            wishCountPerma--;
            wishCountDisplayPerma.textContent = `Wish count: ${wishCountPerma} (value: ${wishCountPerma * 160})`;
            localStorage.setItem('wish-count-perma', wishCountPerma);
            updateGlobalCounts();
        }
    }

    const remove3NatPerma = () => {
        if (threeNatCountPerma > 0) {
            removeWishPerma();
            threeNatCountPerma--;
            threeNatCountDisplayPerma.textContent = threeNatCountPerma;
            localStorage.setItem('three-nat-count-perma', threeNatCountPerma);
            updateGlobalCounts();
        }
    }

    const remove4NatPerma = () => {
        if (fourNatCountPerma > 0) {
            removeWishPerma();
            fourNatCountPerma--;
            fourNatCountDisplayPerma.textContent = fourNatCountPerma;
            localStorage.setItem('four-nat-count-perma', fourNatCountPerma);
            updateGlobalCounts();
        }
    }

    const remove5NatPerma = () => {
        if (fiveNatCountPerma > 0) {
            removeWishPerma();
            fiveNatCountPerma--;
            fiveNatCountDisplayPerma.textContent = fiveNatCountPerma;
            localStorage.setItem('five-nat-count-perma', fiveNatCountPerma);
            updateGlobalCounts();
        }
    }

    // Attach event listeners
    btnAdd3NatPerma.addEventListener('click', add3NatPerma);
    btnAdd4NatPerma.addEventListener('click', add4NatPerma);
    btnAdd5NatPerma.addEventListener('click', add5NatPerma);

    btnRemove3NatPerma.addEventListener('click', remove3NatPerma);
    btnRemove4NatPerma.addEventListener('click', remove4NatPerma);
    btnRemove5NatPerma.addEventListener('click', remove5NatPerma);

    /**
     * Weapon banner computation
    */

    // Create buttons
    let wishCountWeapon = localStorage.getItem('wish-count-weapon') ? parseInt(localStorage.getItem('wish-count-weapon')) : 0;

    let btnAdd3NatWeapon = document.getElementById('btn-add-3-nat-weapon');
    let threeNatCountWeapon = localStorage.getItem('three-nat-count-weapon') ? parseInt(localStorage.getItem('three-nat-count-weapon')) : 0;

    let btnAdd4NatWeapon = document.getElementById('btn-add-4-nat-weapon');
    let fourNatCountWeapon = localStorage.getItem('four-nat-count-weapon') ? parseInt(localStorage.getItem('four-nat-count-weapon')) : 0;

    let btnAdd5NatWeapon = document.getElementById('btn-add-5-nat-weapon');
    let fiveNatCountWeapon = localStorage.getItem('five-nat-count-weapon') ? parseInt(localStorage.getItem('five-nat-count-weapon')) : 0;

    let btnRemove3NatWeapon = document.getElementById('btn-remove-3-nat-weapon');
    let btnRemove4NatWeapon = document.getElementById('btn-remove-4-nat-weapon');
    let btnRemove5NatWeapon = document.getElementById('btn-remove-5-nat-weapon');

    if (!btnAdd3NatWeapon || !btnAdd4NatWeapon || !btnAdd5NatWeapon || !btnRemove3NatWeapon || !btnRemove4NatWeapon || !btnRemove5NatWeapon) {
        console.error('One or more buttons are missing in the DOM.');
        return;
    }

    // Display wish counts
    let wishCountDisplayWeapon = document.createElement('span');
    wishCountDisplayWeapon.textContent = `Wish count: ${wishCountWeapon} (value: ${wishCountWeapon * 160})`;
    document.getElementById('wish-count-weapon').appendChild(wishCountDisplayWeapon);

    let threeNatCountDisplayWeapon = document.createElement('span');
    threeNatCountDisplayWeapon.style.marginLeft = '10px';
    threeNatCountDisplayWeapon.style.marginRight = '6px';
    threeNatCountDisplayWeapon.textContent = threeNatCountWeapon;
    btnAdd3NatWeapon.parentNode.insertBefore(threeNatCountDisplayWeapon, btnAdd3NatWeapon.nextSibling);

    let fourNatCountDisplayWeapon = document.createElement('span');
    fourNatCountDisplayWeapon.style.marginLeft = '10px';
    fourNatCountDisplayWeapon.style.marginRight = '6px';
    fourNatCountDisplayWeapon.textContent = fourNatCountWeapon;
    btnAdd4NatWeapon.parentNode.insertBefore(fourNatCountDisplayWeapon, btnAdd4NatWeapon.nextSibling);
    
    let fiveNatCountDisplayWeapon = document.createElement('span');
    fiveNatCountDisplayWeapon.style.marginLeft = '10px';
    fiveNatCountDisplayWeapon.style.marginRight = '6px';
    fiveNatCountDisplayWeapon.textContent = fiveNatCountWeapon;
    btnAdd5NatWeapon.parentNode.insertBefore(fiveNatCountDisplayWeapon, btnAdd5NatWeapon.nextSibling);

    // Adders
    const addWishWeapon = () => {
        wishCountWeapon++;
        wishCountDisplayWeapon.textContent = `Wish count: ${wishCountWeapon} (value: ${wishCountWeapon * 160})`;
        localStorage.setItem('wish-count-weapon', wishCountWeapon);
        updateGlobalCounts();
    }

    const add3NatWeapon = () => {
        addWishWeapon();
        threeNatCountWeapon++;
        threeNatCountDisplayWeapon.textContent = threeNatCountWeapon;
        localStorage.setItem('three-nat-count-weapon', threeNatCountWeapon);
        updateGlobalCounts();
    }

    const add4NatWeapon = () => {
        addWishWeapon();
        fourNatCountWeapon++;
        fourNatCountDisplayWeapon.textContent = fourNatCountWeapon;
        localStorage.setItem('four-nat-count-weapon', fourNatCountWeapon);
        updateGlobalCounts();
    }

    const add5NatWeapon = () => {
        addWishWeapon();
        fiveNatCountWeapon++;
        fiveNatCountDisplayWeapon.textContent = fiveNatCountWeapon;
        localStorage.setItem('five-nat-count-weapon', fiveNatCountWeapon);
        updateGlobalCounts();
    }

    // Removers
    const removeWishWeapon = () => {
        if (wishCountWeapon > 0) {
            wishCountWeapon--;
            wishCountDisplayWeapon.textContent = `Wish count: ${wishCountWeapon} (value: ${wishCountWeapon * 160})`;
            localStorage.setItem('wish-count-weapon', wishCountWeapon);
            updateGlobalCounts();
        }
    }

    const remove3NatWeapon = () => {
        if (threeNatCountWeapon > 0) {
            removeWishWeapon();
            threeNatCountWeapon--;
            threeNatCountDisplayWeapon.textContent = threeNatCountWeapon;
            localStorage.setItem('three-nat-count-weapon', threeNatCountWeapon);
            updateGlobalCounts();
        }
    }

    const remove4NatWeapon = () => {
        if (fourNatCountWeapon > 0) {
            removeWishWeapon();
            fourNatCountWeapon--;
            fourNatCountDisplayWeapon.textContent = fourNatCountWeapon;
            localStorage.setItem('four-nat-count-weapon', fourNatCountWeapon);
            updateGlobalCounts();
        }
    }

    const remove5NatWeapon = () => {
        if (fiveNatCountWeapon > 0) {
            removeWishWeapon();
            fiveNatCountWeapon--;
            fiveNatCountDisplayWeapon.textContent = fiveNatCountWeapon;
            localStorage.setItem('five-nat-count-weapon', fiveNatCountWeapon);
            updateGlobalCounts();
        }
    }

    // Attach event listeners
    btnAdd3NatWeapon.addEventListener('click', add3NatWeapon);
    btnAdd4NatWeapon.addEventListener('click', add4NatWeapon);
    btnAdd5NatWeapon.addEventListener('click', add5NatWeapon);

    btnRemove3NatWeapon.addEventListener('click', remove3NatWeapon);
    btnRemove4NatWeapon.addEventListener('click', remove4NatWeapon);
    btnRemove5NatWeapon.addEventListener('click', remove5NatWeapon);

    /**
     * Event banner computation
     */

    // Create buttons
    let wishCountEvent = localStorage.getItem('wish-count-event') ? parseInt(localStorage.getItem('wish-count-event')) : 0;

    let btnAdd3NatEvent = document.getElementById('btn-add-3-nat-event');
    let threeNatCountEvent = localStorage.getItem('three-nat-count-event') ? parseInt(localStorage.getItem('three-nat-count-event')) : 0;

    let btnAdd4NatEvent = document.getElementById('btn-add-4-nat-event');
    let fourNatCountEvent = localStorage.getItem('four-nat-count-event') ? parseInt(localStorage.getItem('four-nat-count-event')) : 0;

    let btnAdd5NatEvent = document.getElementById('btn-add-5-nat-event');
    let fiveNatCountEvent = localStorage.getItem('five-nat-count-event') ? parseInt(localStorage.getItem('five-nat-count-event')) : 0;

    let btnRemove3NatEvent = document.getElementById('btn-remove-3-nat-event');
    let btnRemove4NatEvent = document.getElementById('btn-remove-4-nat-event');
    let btnRemove5NatEvent = document.getElementById('btn-remove-5-nat-event');

    if (!btnAdd3NatEvent || !btnAdd4NatEvent || !btnAdd5NatEvent || !btnRemove3NatEvent || !btnRemove4NatEvent || !btnRemove5NatEvent) {
        console.error('One or more buttons are missing in the DOM.');
        return;
    }

    // Display wish counts
    let wishCountDisplayEvent = document.createElement('span');
    wishCountDisplayEvent.textContent = `Wish count: ${wishCountEvent} (value: ${wishCountEvent * 160})`;
    document.getElementById('wish-count-event').appendChild(wishCountDisplayEvent);

    let threeNatCountDisplayEvent = document.createElement('span');
    threeNatCountDisplayEvent.style.marginLeft = '10px';
    threeNatCountDisplayEvent.style.marginRight = '6px';
    threeNatCountDisplayEvent.textContent = threeNatCountEvent;
    btnAdd3NatEvent.parentNode.insertBefore(threeNatCountDisplayEvent, btnAdd3NatEvent.nextSibling);

    let fourNatCountDisplayEvent = document.createElement('span');
    fourNatCountDisplayEvent.style.marginLeft = '10px';
    fourNatCountDisplayEvent.style.marginRight = '6px';
    fourNatCountDisplayEvent.textContent = fourNatCountEvent;
    btnAdd4NatEvent.parentNode.insertBefore(fourNatCountDisplayEvent, btnAdd4NatEvent.nextSibling);
    
    let fiveNatCountDisplayEvent = document.createElement('span');
    fiveNatCountDisplayEvent.style.marginLeft = '10px';
    fiveNatCountDisplayEvent.style.marginRight = '6px';
    fiveNatCountDisplayEvent.textContent = fiveNatCountEvent;
    btnAdd5NatEvent.parentNode.insertBefore(fiveNatCountDisplayEvent, btnAdd5NatEvent.nextSibling);

    // Adders
    const addWishEvent = () => {
        wishCountEvent++;
        wishCountDisplayEvent.textContent = `Wish count: ${wishCountEvent} (value: ${wishCountEvent * 160})`;
        localStorage.setItem('wish-count-event', wishCountEvent);
        updateGlobalCounts();
    }

    const add3NatEvent = () => {
        addWishEvent();
        threeNatCountEvent++;
        threeNatCountDisplayEvent.textContent = threeNatCountEvent;
        localStorage.setItem('three-nat-count-event', threeNatCountEvent);
        updateGlobalCounts();
    }

    const add4NatEvent = () => {
        addWishEvent();
        fourNatCountEvent++;
        fourNatCountDisplayEvent.textContent = fourNatCountEvent;
        localStorage.setItem('four-nat-count-event', fourNatCountEvent);
        updateGlobalCounts();
    }

    const add5NatEvent = () => {
        addWishEvent();
        fiveNatCountEvent++;
        fiveNatCountDisplayEvent.textContent = fiveNatCountEvent;
        localStorage.setItem('five-nat-count-event', fiveNatCountEvent);
        updateGlobalCounts();
    }

    // Removers
    const removeWishEvent = () => {
        if (wishCountEvent > 0) {
            wishCountEvent--;
            wishCountDisplayEvent.textContent = `Wish count: ${wishCountEvent} (value: ${wishCountEvent * 160})`;
            localStorage.setItem('wish-count-event', wishCountEvent);
            updateGlobalCounts();
        }
    }

    const remove3NatEvent = () => {
        if (threeNatCountEvent > 0) {
            removeWishEvent();
            threeNatCountEvent--;
            threeNatCountDisplayEvent.textContent = threeNatCountEvent;
            localStorage.setItem('three-nat-count-event', threeNatCountEvent);
            updateGlobalCounts();
        }
    }

    const remove4NatEvent = () => {
        if (fourNatCountEvent > 0) {
            removeWishEvent();
            fourNatCountEvent--;
            fourNatCountDisplayEvent.textContent = fourNatCountEvent;
            localStorage.setItem('four-nat-count-event', fourNatCountEvent);
            updateGlobalCounts();
        }
    }

    const remove5NatEvent = () => {
        if (fiveNatCountEvent > 0) {
            removeWishEvent();
            fiveNatCountEvent--;
            fiveNatCountDisplayEvent.textContent = fiveNatCountEvent;
            localStorage.setItem('five-nat-count-event', fiveNatCountEvent);
            updateGlobalCounts();
        }
    }

    // Attach event listeners
    btnAdd3NatEvent.addEventListener('click', add3NatEvent);
    btnAdd4NatEvent.addEventListener('click', add4NatEvent);
    btnAdd5NatEvent.addEventListener('click', add5NatEvent);

    btnRemove3NatEvent.addEventListener('click', remove3NatEvent);
    btnRemove4NatEvent.addEventListener('click', remove4NatEvent);
    btnRemove5NatEvent.addEventListener('click', remove5NatEvent);

    /**
     * Global tab computation
     */

    let wishCountGlobal = document.getElementById('wish-count-global');
    let wishCountDisplayGlobal = document.createElement('span');
    wishCountGlobal.appendChild(wishCountDisplayGlobal);

    let threeNatCountGlobal = document.getElementById('three-nat-count-global');
    let threeNatCountDisplayGlobal = document.createElement('span');
    threeNatCountGlobal.appendChild(threeNatCountDisplayGlobal);

    let fourNatCountGlobal = document.getElementById('four-nat-count-global');
    let fourNatCountDisplayGlobal = document.createElement('span');
    fourNatCountGlobal.appendChild(fourNatCountDisplayGlobal);

    let fiveNatCountGlobal = document.getElementById('five-nat-count-global');
    let fiveNatCountDisplayGlobal = document.createElement('span');
    fiveNatCountGlobal.appendChild(fiveNatCountDisplayGlobal);

    const updateGlobalCounts = () => {
        wishCountDisplayGlobal.textContent = `Global wish count: ${wishCountPerma + wishCountWeapon + wishCountEvent} (value: ${(wishCountPerma + wishCountWeapon + wishCountEvent) * 160})`;
        threeNatCountDisplayGlobal.textContent = `Global 3 Nat count: ${threeNatCountPerma + threeNatCountWeapon + threeNatCountEvent}`;
        fourNatCountDisplayGlobal.textContent = `Global 4 Nat count: ${fourNatCountPerma + fourNatCountWeapon + fourNatCountEvent}`;
        fiveNatCountDisplayGlobal.textContent = `Global 5 Nat count: ${fiveNatCountPerma + fiveNatCountWeapon + fiveNatCountEvent}`;
    };

    updateGlobalCounts();


    /**
     * Clear button
     */

    let clearHref = document.getElementById('clear');

    clearHref.addEventListener('click', () => {
        if (confirm('Do you want to clear local storage ? (no backup possible)')) {
            localStorage.clear();

            wishCountPerma = 0;
            threeNatCountPerma = 0;
            fourNatCountPerma = 0;
            fiveNatCountPerma = 0;
            wishCountDisplayPerma.textContent = 'Wish count: 0 (value: 0)';
            threeNatCountDisplayPerma.textContent = '0';
            fourNatCountDisplayPerma.textContent = '0';
            fiveNatCountDisplayPerma.textContent = '0';

            wishCountWeapon = 0;
            threeNatCountWeapon = 0;
            fourNatCountWeapon = 0;
            fiveNatCountWeapon = 0;
            wishCountDisplayWeapon.textContent = 'Wish count: 0 (value: 0)';
            threeNatCountDisplayWeapon.textContent = '0';
            fourNatCountDisplayWeapon.textContent = '0';
            fiveNatCountDisplayWeapon.textContent = '0';

            wishCountEvent = 0;
            threeNatCountEvent = 0;
            fourNatCountEvent = 0;
            fiveNatCountEvent = 0;
            wishCountDisplayEvent.textContent = 'Wish count: 0 (value: 0)';
            threeNatCountDisplayEvent.textContent = '0';
            fourNatCountDisplayEvent.textContent = '0';
            fiveNatCountDisplayEvent.textContent = '0';

            updateGlobalCounts();
        }
    });


    /**
     * Export button
     */

    let exportHref = document.getElementById('export');

    exportHref.addEventListener('click', () => {
        let data = {
            'wish-count-global': wishCountPerma + wishCountWeapon + wishCountEvent,
            'three-nat-count-global': threeNatCountPerma + threeNatCountWeapon + threeNatCountEvent,
            'four-nat-count-global': fourNatCountPerma + fourNatCountWeapon + fourNatCountEvent,
            'five-nat-count-global': fiveNatCountPerma + fiveNatCountWeapon + fiveNatCountEvent,
            'wish-count-perma': wishCountPerma,
            'three-nat-count-perma': threeNatCountPerma,
            'four-nat-count-perma': fourNatCountPerma,
            'five-nat-count-perma': fiveNatCountPerma,
            'wish-count-weapon': wishCountWeapon,
            'three-nat-count-weapon': threeNatCountWeapon,
            'four-nat-count-weapon': fourNatCountWeapon,
            'five-nat-count-weapon': fiveNatCountWeapon,
            'wish-count-event': wishCountEvent,
            'three-nat-count-event': threeNatCountEvent,
            'four-nat-count-event': fourNatCountEvent,
            'five-nat-count-event': fiveNatCountEvent
        };

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
     * Import button
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
                        wishCountPerma = data['wish-count-perma'] || 0;
                        threeNatCountPerma = data['three-nat-count-perma'] || 0;
                        fourNatCountPerma = data['four-nat-count-perma'] || 0;
                        fiveNatCountPerma = data['five-nat-count-perma'] || 0;
                        wishCountWeapon = data['wish-count-weapon'] || 0;
                        threeNatCountWeapon = data['three-nat-count-weapon'] || 0;
                        fourNatCountWeapon = data['four-nat-count-weapon'] || 0;
                        fiveNatCountWeapon = data['five-nat-count-weapon'] || 0;
                        wishCountEvent = data['wish-count-event'] || 0;
                        threeNatCountEvent = data['three-nat-count-event'] || 0;
                        fourNatCountEvent = data['four-nat-count-event'] || 0;
                        fiveNatCountEvent = data['five-nat-count-event'] || 0;

                        // Update the display and localStorage
                        wishCountDisplayPerma.textContent = `Wish count: ${wishCountPerma} (value: ${wishCountPerma * 160})`;
                        threeNatCountDisplayPerma.textContent = threeNatCountPerma;
                        fourNatCountDisplayPerma.textContent = fourNatCountPerma;
                        fiveNatCountDisplayPerma.textContent = fiveNatCountPerma;
                        wishCountDisplayWeapon.textContent = `Wish count: ${wishCountWeapon} (value: ${wishCountWeapon * 160})`;
                        threeNatCountDisplayWeapon.textContent = threeNatCountWeapon;
                        fourNatCountDisplayWeapon.textContent = fourNatCountWeapon;
                        fiveNatCountDisplayWeapon.textContent = fiveNatCountWeapon;
                        wishCountDisplayEvent.textContent = `Wish count: ${wishCountEvent} (value: ${wishCountEvent * 160})`;
                        threeNatCountDisplayEvent.textContent = threeNatCountEvent;
                        fourNatCountDisplayEvent.textContent = fourNatCountEvent;
                        fiveNatCountDisplayEvent.textContent = fiveNatCountEvent;

                        localStorage.setItem('wish-count-perma', wishCountPerma);
                        localStorage.setItem('three-nat-count-perma', threeNatCountPerma);
                        localStorage.setItem('four-nat-count-perma', fourNatCountPerma);
                        localStorage.setItem('five-nat-count-perma', fiveNatCountPerma);
                        localStorage.setItem('wish-count-weapon', wishCountWeapon);
                        localStorage.setItem('three-nat-count-weapon', threeNatCountWeapon);
                        localStorage.setItem('four-nat-count-weapon', fourNatCountWeapon);
                        localStorage.setItem('five-nat-count-weapon', fiveNatCountWeapon);
                        localStorage.setItem('wish-count-event', wishCountEvent);
                        localStorage.setItem('three-nat-count-event', threeNatCountEvent);
                        localStorage.setItem('four-nat-count-event', fourNatCountEvent);
                        localStorage.setItem('five-nat-count-event', fiveNatCountEvent);

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

    
});
