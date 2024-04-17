// Tableau de couleurs possibles
const couleursPossibles = ["blue", "red", "yellow"];
// Déclaration  et initialisation de variables pour les vies du joueur, les couleursdevinées,
// le pointage
let viesRestantes = document.getElementById("affichageViesRestantes");
let couleursCorrectes = document.getElementById("affichageJetonCorrect");
let pointage = document.getElementById("affichagePoints");
pointage.textContent = "0";
// Déclaration du tableau de couleursMysteres
let couleursMysteres = {};


// Récupération du canvas1 
let canvas = document.getElementById("monCanvas1");
let ctx = canvas.getContext("2d");
// Création du gradient
let grd = ctx.createLinearGradient(0,0, canvas.width, 0);
grd.addColorStop(0, "blue");
grd.addColorStop(0.5, "red");
grd.addColorStop(1, "yellow");
ctx.font = "60px Comic Sans MS";
ctx.fillStyle = grd;
// Calcul de la position x pour centrer le texte horizontalement
const text = "Trouve-Couleurs";
const textWidth = ctx.measureText(text).width;
const x = (canvas.width - textWidth) / 2;
// Calcul de la position y pour centrer le texte verticalement
const y = canvas.height / 2 + 15;
ctx.fillText(text, x, y);

// Fonction qui initialise les jetons mysteres
// en noir avec un ?
function initialiserJetonMystere(){
    // Récupération des 3 tokens mysteres
    let tokenMystere1 = document.getElementById("token1");
    let tokenMystere2 = document.getElementById("token2");
    let tokenMystere3 = document.getElementById("token3");
    // Changement de la couleur des tokens pour le noir avec ?
    tokenMystere1.style.backgroundColor = "black";
    tokenMystere2.style.backgroundColor = "black";
    tokenMystere3.style.backgroundColor = "black";
    // Ajout du ? sur le token
    tokenMystere1.textContent = "?";
    tokenMystere2.textContent = "?";
    tokenMystere3.textContent = "?";
    // Positionnement du texte au centre des jetons a l'horizontal
    tokenMystere1.style.textAlign = "center";
    tokenMystere2.style.textAlign = "center";
    tokenMystere3.style.textAlign = "center";
    // Positionnement du texte au centre des jetons a la verticale
    tokenMystere1.style.lineHeight = tokenMystere1.clientHeight + "px";
    tokenMystere2.style.lineHeight = tokenMystere2.clientHeight + "px";
    tokenMystere3.style.lineHeight = tokenMystere3.clientHeight + "px";
    // Ajout d'une couleur blanche au texte (point d'interrogation)
    tokenMystere1.style.color = "white";
    tokenMystere2.style.color = "white";
    tokenMystere3.style.color = "white";

}
// fonction qui génere les couleurs mysteres
function genererCouleursTokens() {
        const couleursMysteres = {
            token1: "",
            token2: "",
            token3: ""
        };
    
        for (let i = 1; i <= 3; i++) {
            const indiceCouleurAleatoire = Math.floor(Math.random() * couleursPossibles.length);
            couleursMysteres["token" + i] = couleursPossibles[indiceCouleurAleatoire];
        }
        return couleursMysteres;
}

// fonction qui initialise la partie
function initialiserPartie(){
    reinitialiserControles();
    initialiserJetonMystere();
    couleursMysteres = genererCouleursTokens();
    initialisationTokenJoueur();
    console.log("Couleurs mystères générées : ", couleursMysteres);
}

// Fonction lorsque cliqué sur jeton du joueur clickedToken
// on change sa couleur
function alternerCouleurToken(clickedToken) {
    // Récupération de la couleur actuelle du token
    let couleurActuelle = window.getComputedStyle(clickedToken).backgroundColor;
    
    // Vérifiez la couleur actuelle en utilisant une condition
    if (couleurActuelle === "rgb(0, 0, 255)") { // Bleu
        clickedToken.style.backgroundColor = "red";
    } else if (couleurActuelle === "rgb(255, 0, 0)") { // Rouge
        clickedToken.style.backgroundColor = "yellow";
    } else if (couleurActuelle === "rgb(255, 255, 0)") { // Jaune
        clickedToken.style.backgroundColor = "blue";
    }
    // Mise à jour la variable de la couleur du jeton 
    const tokenId = clickedToken.id; // Récupérez l'ID du jeton
    couleursMysteres[tokenId] = window.getComputedStyle(clickedToken).backgroundColor;
}

// fonction qui vérifie la couleurs des jetons du joueur avec ceux mysteres
// lorsque cliqué sur vérifier
function verifierJeton() {
    // Variable pour savoir lorsque le joueur gagne
    let correspondances = 0;
    couleursCorrectes.textContent = 0;
    // Réduit le nombre de vies restantes a chaque
    viesRestantes.textContent--;
    // Récupération des couleurs des jetons du joueur
    let couleurJeton4 = document.getElementById("token4").style.backgroundColor;
    let couleurJeton5 = document.getElementById("token5").style.backgroundColor;
    let couleurJeton6 = document.getElementById("token6").style.backgroundColor;
    // Récupération des couleurs des jetons mystères
    let couleurMystere1 = couleursMysteres.token1;
    let couleurMystere2 = couleursMysteres.token2;
    let couleurMystere3 = couleursMysteres.token3;

    // Comparaison des couleurs jeton du joueur pour jeton deviné
    if (couleurJeton4 === couleurMystere1) {
        correspondances++;
        couleursCorrectes.textContent++;
        
    }
    if (couleurJeton5 === couleurMystere2) {
        correspondances++;
        couleursCorrectes.textContent++;
    }
    if (couleurJeton6 === couleurMystere3) {
        correspondances++;
        couleursCorrectes.textContent++;
    }
    // Si on a plus de vies restantes, Défaite
    if(viesRestantes.textContent == 0){
        document.getElementById("message").textContent = "Vous n'avez plus de vie, Défaite!";
        // appel de la fonction qui affiche les couleurs mysteres
        afficherCouleursMysteres();
        // disable le bouton verifier
        document.getElementById("btnVerifier").disabled = true;
        // attente de deux secondes puis on recommence
        setTimeout(function() {
            initialiserPartie();
        }, 7000);
    }

    // Si 3 correspondances victoire, else
    if (correspondances === 3) {
        pointage.textContent = (parseInt(pointage.textContent) + 5).toString();
        // Pour afficher "Vous avez gagné !" lorsque le joueur gagne
        document.getElementById("message").textContent = "Vous avez gagné!";
        // Appel de la fonction pour montrer les couleurs
        afficherCouleursMysteres();
        // disable le bouton verifier
        document.getElementById("btnVerifier").disabled = true;
        // attente de 2 secondes puis on recommence
        setTimeout(function() {
            initialiserPartie();
        }, 7000);      
    } 
}

// fonction qui initialise la couleur de base du token du joueur a bleu
function initialisationTokenJoueur(){
    // Initialiser les couleurs des jetons du joueur
    document.getElementById("token4").style.backgroundColor = "blue";
    document.getElementById("token5").style.backgroundColor = "blue";
    document.getElementById("token6").style.backgroundColor = "blue";
}
// fonction qui réinitialise les jetons découverts corrects,
// les vies du joueur, le message de jeu et le bouton verifier
function reinitialiserControles(){
    couleursCorrectes.textContent = 0;
    viesRestantes.textContent = 5;
    document.getElementById("message").textContent = "Trouver les couleurs!";
    document.getElementById("btnVerifier").disabled = false;
}
// Fonction appeler qui repart une nouvelle partie
function nouvellePartie(){
    pointage.textContent = 0;
    initialiserPartie();
}

// fonction qui affiche les vrais couleurs mysteres
// et enleve le ?
function afficherCouleursMysteres(){
    document.getElementById("token1").style.backgroundColor = couleursMysteres.token1;
    document.getElementById("token2").style.backgroundColor = couleursMysteres.token2;
    document.getElementById("token3").style.backgroundColor = couleursMysteres.token3;
    //Réinitialisation du texte des jetons mysteres
    document.getElementById("token1").textContent = "";
    document.getElementById("token2").textContent = "";
    document.getElementById("token3").textContent = "";
}

