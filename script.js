// Dictionnaire des traductions
const translations = {
    fr: {
        accueil: 'ACCUEIL',
        oeuvres: 'OEUVRES',
        contact: 'CONTACT',
        billeterie: 'BILLETERIE',
        actualites: 'ACTUALITES',
        bienvenue: 'Bienvenue au Musée Fabi',
        decouvrez: 'Découvrez nos collections exceptionnelles et nos expositions temporaires.',
        connexion: 'Connexion à votre compte',
        email: 'Adresse email:',
        password: 'Mot de passe:',
        se_souvenir: 'Se souvenir de moi',
        bouton_connexion: 'Connexion',
        mdp_oublie: 'Mot de passe oublié?',
        creer_compte: 'Créer un compte',
        apropos: 'À propos',
        apropos_texte: 'Le Musée Fabi est un espace dédié à l\'art et à la culture.',
        horaires: 'Horaires',
        horaires_texte: 'Lundi - Dimanche: 9h00 - 18h00',
        ferme: 'Fermé les jours fériés',
        telephone: 'Tél: +33 (0)1 23 45 67 89',
        email_contact: 'Email: info@museefabi.fr',
        suivez: 'Suivez-nous',
        copyright: '© 2024 Musée Fabi. Tous droits réservés.'
    },
    en: {
        accueil: 'HOME',
        oeuvres: 'ARTWORKS',
        contact: 'CONTACT',
        billeterie: 'TICKETING',
        actualites: 'NEWS',
        bienvenue: 'Welcome to Fabi Museum',
        decouvrez: 'Discover our exceptional collections and temporary exhibitions.',
        connexion: 'Log in to your account',
        email: 'Email address:',
        password: 'Password:',
        se_souvenir: 'Remember me',
        bouton_connexion: 'Log in',
        mdp_oublie: 'Forgot password?',
        creer_compte: 'Create an account',
        apropos: 'About',
        apropos_texte: 'Fabi Museum is a space dedicated to art and culture.',
        horaires: 'Hours',
        horaires_texte: 'Monday - Sunday: 9am - 6pm',
        ferme: 'Closed on public holidays',
        telephone: 'Phone: +33 (0)1 23 45 67 89',
        email_contact: 'Email: info@museefabi.fr',
        suivez: 'Follow us',
        copyright: '© 2024 Fabi Museum. All rights reserved.'
    },
    es: {
        accueil: 'INICIO',
        oeuvres: 'OBRAS',
        contact: 'CONTACTO',
        billeterie: 'ENTRADAS',
        actualites: 'NOTICIAS',
        bienvenue: 'Bienvenido al Museo Fabi',
        decouvrez: 'Descubre nuestras colecciones excepcionales y exposiciones temporales.',
        connexion: 'Inicia sesión en tu cuenta',
        email: 'Dirección de correo:',
        password: 'Contraseña:',
        se_souvenir: 'Recuérdame',
        bouton_connexion: 'Iniciar sesión',
        mdp_oublie: '¿Olvidaste tu contraseña?',
        creer_compte: 'Crear una cuenta',
        apropos: 'Acerca de',
        apropos_texte: 'El Museo Fabi es un espacio dedicado al arte y la cultura.',
        horaires: 'Horario',
        horaires_texte: 'Lunes - Domingo: 9:00 - 18:00',
        ferme: 'Cerrado en días festivos',
        telephone: 'Teléfono: +33 (0)1 23 45 67 89',
        email_contact: 'Correo: info@museefabi.fr',
        suivez: 'Síguenos',
        copyright: '© 2024 Museo Fabi. Todos los derechos reservados.'
    }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
    // Sauvegarder la langue dans le localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // Mettre à jour l'attribut lang du document HTML
    document.documentElement.lang = lang;
    
    // Appliquer les traductions
    applyTranslations(lang);
}

// Fonction pour appliquer les traductions
function applyTranslations(lang) {
    const trans = translations[lang];
    
    // Traduire les éléments de navigation
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html') {
            link.textContent = trans.accueil;
        } else if (href === 'oeuvres.html') {
            link.textContent = trans.oeuvres;
        } else if (href === 'contact.html') {
            link.textContent = trans.contact;
        } else if (href === 'billeterie.html') {
            link.textContent = trans.billeterie;
        } else if (href.toLowerCase().includes('actualité') || href.toLowerCase().includes('actualites')) {
            link.textContent = trans.actualites;
        }
    });
    
    // Traduire les titres et contenus principaux
    const mainHeadings = document.querySelectorAll('main h1');
    const mainParagraphs = document.querySelectorAll('main p:first-of-type');
    
    if (mainHeadings.length > 0) {
        if (document.querySelector('.login-container')) {
            mainHeadings[0].textContent = trans.connexion;
        } else {
            mainHeadings[0].textContent = trans.bienvenue;
        }
    }
    
    if (mainParagraphs.length > 0 && !document.querySelector('.login-container')) {
        mainParagraphs[0].textContent = trans.decouvrez;
    }
    
    // Traduire les labels et buttons du formulaire
    const emailLabel = document.querySelector('label[for="email"]');
    if (emailLabel) emailLabel.textContent = trans.email;
    
    const passwordLabel = document.querySelector('label[for="password"]');
    if (passwordLabel) passwordLabel.textContent = trans.password;
    
    const rememberLabel = document.querySelector('label[for="remember"]');
    if (rememberLabel) rememberLabel.textContent = trans.se_souvenir;
    
    const loginButton = document.querySelector('.login-button');
    if (loginButton) loginButton.textContent = trans.bouton_connexion;
    
    // Traduire les liens de connexion
    const loginLinks = document.querySelectorAll('.login-links a');
    if (loginLinks.length >= 2) {
        loginLinks[0].textContent = trans.mdp_oublie;
        loginLinks[1].textContent = trans.creer_compte;
    }
    
    // Traduire les sections du footer
    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections.length >= 4) {
        footerSections[0].querySelector('h3').textContent = trans.apropos;
        footerSections[0].querySelector('p').textContent = trans.apropos_texte;
        
        footerSections[1].querySelector('h3').textContent = trans.horaires;
        const horairesPs = footerSections[1].querySelectorAll('p');
        if (horairesPs.length >= 2) {
            horairesPs[0].textContent = trans.horaires_texte;
            horairesPs[1].textContent = trans.ferme;
        }
        
        footerSections[2].querySelector('h3').textContent = 'Contact';
        const contactPs = footerSections[2].querySelectorAll('p');
        if (contactPs.length >= 2) {
            contactPs[0].textContent = trans.telephone;
            contactPs[1].textContent = trans.email_contact;
        }
        
        footerSections[3].querySelector('h3').textContent = trans.suivez;
    }
    
    // Traduire le footer bottom
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) footerBottom.textContent = trans.copyright;
}

// --- AUTH: register / login avec API (JWT) ---
function saveAuthToken(token) {
    localStorage.setItem('authToken', token);
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

function clearAuthToken() {
    localStorage.removeItem('authToken');
}

const API_BASE_URL = 'http://localhost:3000/api';

function isAuthenticated() {
    return !!getAuthToken();
}

async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    if (!email || !password) return alert('Email et mot de passe requis.');
    try {
        const res = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST', headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ name, email, password })
        });
        const json = await res.json();
        if (!res.ok) return alert(json.message || 'Erreur inscription');
        saveAuthToken(json.token);
        alert('Inscription réussie. Vous êtes connecté.');
        try { await syncPendingReservations(); } catch(e) { /* ignore */ }
        window.location.href = 'account.html';
    } catch (e) {
        console.error(e);
        alert('Impossible de contacter le serveur d\'authentification.');
    }
}

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    if (!email || !password) return alert('Email et mot de passe requis.');
    try {
        const res = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST', headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ email, password })
        });
        const json = await res.json();
        if (!res.ok) return alert(json.message || 'Erreur connexion');
        saveAuthToken(json.token);
        if (remember) localStorage.setItem('userEmail', email);
        else localStorage.removeItem('userEmail');
        alert('Connexion réussie.');
        try { await syncPendingReservations(); } catch(e) { /* ignore */ }
        window.location.href = 'account.html';
    } catch (e) {
        console.error(e);
        alert('Impossible de contacter le serveur d\'authentification.');
    }
}

// Restaurer la langue et le préférences au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    const languageSelect = document.getElementById('language');
    
    if (languageSelect) {
        languageSelect.value = savedLanguage;
    }
    
    applyTranslations(savedLanguage);
    document.documentElement.lang = savedLanguage;
    
    // Restaurer l'email si "Se souvenir de moi" était coché
    const emailInput = document.getElementById('email');
    const savedEmail = localStorage.getItem('userEmail');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (emailInput && savedEmail && rememberMe) {
        emailInput.value = savedEmail;
        document.getElementById('remember').checked = true;
    }
    
    // Charger les données (oeuvres + artistes) et rendre la page en conséquence
    loadData().then(async data => {
        const page = window.location.pathname.split('/').pop();
        if (page === 'oeuvres.html' || page === '') {
            renderOeuvres(data);
        } else if (page.toLowerCase() === 'artiste.html') {
            const params = new URLSearchParams(window.location.search);
            const artistId = params.get('artist');
            renderArtist(data, artistId);
        } else if (page.toLowerCase() === 'account.html') {
            const feedback = await fetchUserFeedback();
            renderAccountPage(data, feedback);
        }
    }).catch(err => console.error('Erreur chargement données :', err));
});

// Charge `sources.json` et retourne les données
function loadData() {
    return fetch('sources.json')
        .then(res => {
            if (!res.ok) throw new Error('Impossible de charger sources.json');
            return res.json();
        });
}

async function fetchUserFeedback() {
    if (!isAuthenticated()) return [];
    try {
        const res = await fetch(`${API_BASE_URL}/feedback`, {
            headers: { 'Authorization': 'Bearer ' + getAuthToken() }
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error('Erreur lecture feedback utilisateur', e);
        return [];
    }
}

function getArtistNameById(data, id) {
    const a = data.artists.find(x => x.id === id);
    return a ? a.name : 'Artiste inconnu';
}

function renderAccountPage(data, feedbacks) {
    const container = document.getElementById('liked-works-list');
    if (!container) return;
    if (!isAuthenticated()) {
        container.innerHTML = '<p>Vous devez vous connecter pour voir vos œuvres aimées.</p>';
        return;
    }

    container.innerHTML = '';
    const likedFeedbacks = feedbacks.filter(f => f.type === 'like');
    if (!likedFeedbacks.length) {
        container.innerHTML = '<p>Aucune œuvre aimée pour le moment.</p>';
        return;
    }

    likedFeedbacks.forEach(f => {
        const oeuvre = data.oeuvres.find(o => o.id === f.oeuvre_id);
        const card = document.createElement('article');
        card.className = 'liked-work-card';
        card.innerHTML = `
            <h3>${oeuvre ? oeuvre.title : f.oeuvre_id}</h3>
            <p><strong>Commentaire :</strong> ${f.comment || 'Aucun commentaire'}</p>
            <p><strong>Date :</strong> ${new Date(f.updated_at).toLocaleDateString()}</p>
        `;
        container.appendChild(card);
    });
}

// Rend la liste des oeuvres sur la page `oeuvres.html`
function renderOeuvres(data) {
    const container = document.getElementById('oeuvres-list');
    if (!container) return;
    container.innerHTML = '';

    data.oeuvres.forEach(oeuvre => {
        const card = document.createElement('article');
        card.className = 'oeuvre-card';

        const title = document.createElement('h3');
        title.textContent = oeuvre.title + (oeuvre.year ? ' (' + oeuvre.year + ')' : '');

        const artistLink = document.createElement('a');
        artistLink.href = 'Artiste.html?artist=' + encodeURIComponent(oeuvre.artistId);
        artistLink.textContent = getArtistNameById(data, oeuvre.artistId);
        artistLink.className = 'artist-link';

        const feedback = document.createElement('div');
        feedback.className = 'oeuvre-feedback';

        const commentLabel = document.createElement('label');
        commentLabel.className = 'feedback-label';
        commentLabel.textContent = 'Commentaire:';

        const commentTextarea = document.createElement('textarea');
        commentTextarea.className = 'feedback-comment';
        commentTextarea.rows = 3;
        commentTextarea.placeholder = 'Ajouter un commentaire...';

        const buttons = document.createElement('div');
        buttons.className = 'feedback-actions';

        const likeButton = document.createElement('button');
        likeButton.type = 'button';
        likeButton.className = 'feedback-button like-button';
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', () => submitFeedback(oeuvre.id, 'like', commentTextarea.value));

        const dislikeButton = document.createElement('button');
        dislikeButton.type = 'button';
        dislikeButton.className = 'feedback-button dislike-button';
        dislikeButton.textContent = 'Dislike';
        dislikeButton.addEventListener('click', () => submitFeedback(oeuvre.id, 'dislike', commentTextarea.value));

        const feedbackMessage = document.createElement('div');
        feedbackMessage.className = 'feedback-message';
        feedbackMessage.id = `feedback-msg-${oeuvre.id}`;

        buttons.appendChild(likeButton);
        buttons.appendChild(dislikeButton);

        feedback.appendChild(commentLabel);
        feedback.appendChild(commentTextarea);
        feedback.appendChild(buttons);
        feedback.appendChild(feedbackMessage);

        card.appendChild(title);
        card.appendChild(artistLink);
        card.appendChild(feedback);
        container.appendChild(card);
    });
}

// Rend la page artiste : détails et ses oeuvres
function renderArtist(data, artistId) {
    const container = document.getElementById('artist-container');
    if (!container) return;

    if (!artistId) {
        container.innerHTML = '<p>Aucun artiste sélectionné.</p>';
        return;
    }

    const artist = data.artists.find(a => a.id === artistId);
    if (!artist) {
        container.innerHTML = '<p>Artiste introuvable.</p>';
        return;
    }

    const header = document.createElement('header');
    const name = document.createElement('h1');
    name.textContent = artist.name;
    header.appendChild(name);

    const bio = document.createElement('p');
    bio.textContent = artist.bio || '';

    const worksTitle = document.createElement('h2');
    worksTitle.textContent = "Oeuvres de cet artiste";

    const list = document.createElement('ul');
    const works = data.oeuvres.filter(o => o.artistId === artistId);
    works.forEach(w => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = 'oeuvres.html#' + encodeURIComponent(w.id);
        link.textContent = w.title + (w.year ? ' (' + w.year + ')' : '');
        li.appendChild(link);
        list.appendChild(li);
    });

    container.innerHTML = '';
    container.appendChild(header);
    container.appendChild(bio);
    container.appendChild(worksTitle);
    container.appendChild(list);
}

async function submitFeedback(oeuvreId, type, comment) {
    if (!isAuthenticated()) {
        window.location.href = 'compte.html?next=oeuvres.html';
        return;
    }

    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ oeuvre_id: oeuvreId, type, comment })
        });
        const result = await response.json();
        const messageEl = document.getElementById(`feedback-msg-${oeuvreId}`);
        if (response.ok) {
            if (messageEl) {
                messageEl.textContent = 'Feedback enregistré.';
                messageEl.style.color = '#064d31';
            }
        } else {
            if (messageEl) {
                messageEl.textContent = result.message || 'Erreur lors de l\'enregistrement.';
                messageEl.style.color = '#a20e0e';
            }
        }
    } catch (error) {
        console.error(error);
        const messageEl = document.getElementById(`feedback-msg-${oeuvreId}`);
        if (messageEl) {
            messageEl.textContent = 'Impossible de contacter le serveur.';
            messageEl.style.color = '#a20e0e';
        }
    }
}

// --- BILLETERIE : logique de réservation ---
function initReservation() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    // vérifier l'authentification
    if (!isAuthenticated()) {
        // rediriger vers la page compte pour se connecter / enregistrer
        window.location.href = 'compte.html?next=billeterie.html';
        return;
    }

    // définir la date min à aujourd'hui
    const dateInput = document.getElementById('visit-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleReservationSubmit(form);
    });
}

function handleReservationSubmit(form) {
    const date = form.querySelector('#visit-date').value;
    const time = form.querySelector('#time-slot').value;
    const count = parseInt(form.querySelector('#tickets-count').value, 10) || 1;
    const type = form.querySelector('#ticket-type').value;
    const name = form.querySelector('#visitor-name').value.trim();
    const email = form.querySelector('#visitor-email').value.trim();

    if (!date || !time || !name || !email) {
        showReservationMessage('Veuillez remplir tous les champs requis.', true);
        return;
    }

    // calcul simple du prix
    const prices = { adult: 12, reduced: 8 };
    const unit = prices[type] || prices.adult;
    const total = unit * count;

    // créer l'objet réservation
    const reservation = {
        id: 'res-' + Date.now(),
        date, time, count, type, name, email, total,
        createdAt: new Date().toISOString()
    };

    // essayer d'envoyer la réservation au serveur API (avec JWT)
    const token = getAuthToken();
    const payload = Object.assign({}, reservation);

    const apiUrl = 'http://localhost:3000/api/reservations';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? ('Bearer ' + token) : ''
        },
        body: JSON.stringify(payload)
    }).then(async res => {
        if (res.ok) {
            const json = await res.json();
            showReservationMessage(`Réservation enregistrée côté serveur. Réf: ${json.id}`);
            form.reset();
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('visit-date').setAttribute('min', today);
            return;
        }
        // si non ok (401, 500...), fallback en local
        const text = await res.text();
        savePendingReservation(reservation);
        showReservationMessage('Le serveur a répondu une erreur. Réservation sauvegardée localement.', true);
    }).catch(err => {
        console.warn('Erreur réseau ou serveur indisponible, sauvegarde locale', err);
        savePendingReservation(reservation);
        showReservationMessage('Serveur indisponible — réservation sauvegardée localement.', true);
    });
}

function savePendingReservation(reservation) {
    const pending = JSON.parse(localStorage.getItem('reservations_pending') || '[]');
    pending.push(reservation);
    localStorage.setItem('reservations_pending', JSON.stringify(pending));
}


function showReservationMessage(msg, isError = false) {
    const container = document.getElementById('reservation-confirm');
    if (!container) return;
    container.style.background = isError ? '#ffe9e9' : '#e9fff2';
    container.style.borderColor = isError ? '#f5c6c6' : '#b7f0d1';
    container.style.color = isError ? '#5d1212' : '#064d31';
    // conserver les sauts de ligne
    container.textContent = msg;
}

// initialiser la billeterie à DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initReservation();
    if (isAuthenticated()) {
        syncPendingReservations();
    }
});

// Envoi en attente si le serveur devient disponible
async function syncPendingReservations() {
    const pending = JSON.parse(localStorage.getItem('reservations_pending') || '[]');
    if (!pending.length) return;
    const token = getAuthToken();
    if (!token) return;

    const apiUrl = 'http://localhost:3000/api/reservations';
    const remaining = [];
    for (const resv of pending) {
        try {
            const r = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify(resv)
            });
            if (!r.ok) {
                remaining.push(resv);
            }
        } catch (e) {
            remaining.push(resv);
        }
    }
    localStorage.setItem('reservations_pending', JSON.stringify(remaining));
    if (remaining.length === 0) {
        console.log('Toutes les réservations en attente ont été synchronisées.');
    } else {
        console.log(remaining.length + ' réservations restent en attente.');
    }
}

