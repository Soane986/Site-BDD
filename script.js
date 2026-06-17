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

// Fonction pour gérer la connexion
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validation basique
    if (!email || !password) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Sauvegarder les données si "Se souvenir de moi" est coché
    if (remember) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('rememberMe');
    }
    
    // Simuler une connexion réussie
    alert('Connexion en cours... (Fonctionnalité de démonstration)');
    console.log('Tentative de connexion:', { email, remember });
    
    // Réinitialiser le formulaire
    document.querySelector('.login-form').reset();
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
});
