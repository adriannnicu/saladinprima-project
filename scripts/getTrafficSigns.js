const displayTrafficSigns = document.getElementById('all-traffic-signs');
const displayModal = document.getElementById('display-modal');

async function getTrafficSigns() {
    const url = "https://adriannnicu.github.io/sdp-api/traffic-signs.json";
    const response = await fetch(url);
    const signs = await response.json();

    signs.forEach(sign => { 
        const trafficSignBox = document.createElement('div');
        trafficSignBox.className = 'traffic-sign-box';

        const signName = document.createElement('div');
        signName.className = 'sign-name';
        signName.textContent = sign.name;

        signName.addEventListener('click', function() {
            displayModal.innerHTML = '';

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            const signModalImg = document.createElement('img');
            signModalImg.src = sign.image;
            signModalImg.className = 'modal-sign-img';

            const signModalTitle = document.createElement('h3');
            signModalTitle.className = 'sign-title';
            signModalTitle.textContent = sign.name;

            const signCategory = document.createElement('div');
            signCategory.className = 'sign-category';
            signCategory.textContent = sign.category;

            const signContent = document.createElement('div');
            signContent.className = 'sign-content';
            signContent.textContent = sign.content;

            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-btn';
            closeBtn.textContent = 'X'; 
            closeBtn.addEventListener('click', function() {
                displayModal.style.display = 'none';
            });

            modalContent.appendChild(closeBtn);
            modalContent.appendChild(signModalImg);
            modalContent.appendChild(signModalTitle);
            modalContent.appendChild(signCategory);
            modalContent.appendChild(signContent);

            document.body.appendChild(displayModal);

            displayModal.appendChild(modalContent);
            displayModal.style.display = 'block';
        });

        const signImg = document.createElement('img');
        signImg.className = 'sign-image';
        signImg.src = sign.image;

        trafficSignBox.appendChild(signImg);
        trafficSignBox.appendChild(signName);  

        displayTrafficSigns.appendChild(trafficSignBox);
    });
}

function searchTrafficSigns() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const trafficSigns = document.getElementsByClassName('traffic-sign-box');

    for (let i = 0; i < trafficSigns.length; i++) {
        const signName = trafficSigns[i].getElementsByClassName('sign-name')[0];
        const name = signName.textContent.toLowerCase();
        
        if (name.includes(input)) {
            trafficSigns[i].style.display = 'block';
        } else {
            trafficSigns[i].style.display = 'none';
        }
    }
}

document.getElementById('searchInput').addEventListener('keyup', searchTrafficSigns);

getTrafficSigns();