export class Affichage {
    constructor(jCourant, materielGrille) {
        this.jCourant = jCourant;
        this.fonctionJoueurCourant();
        this.materielGrille = materielGrille;
    }

    fonctionConstructionGrille() {
        const grille = document.createElement('div')
        grille.id = 'grille';
        grille.style.display = "flex";
        grille.style.flexWrap = "wrap";
        grille.style.backgroundColor = "blue";
        grille.style.border = "2px solid navy";
        grille.style.borderTop = "none";
        grille.style.margin = "50px auto";

        let largeur = (this.materielGrille.taille + this.materielGrille.marge) * this.materielGrille.COL;
        let hauteur = (this.materielGrille.taille + this.materielGrille.marge) * this.materielGrille.LGN;

        grille.style.width = largeur + "px";
        grille.style.height = hauteur + "px";
    
        document.querySelector('body').appendChild(grille);
    }

    fonctionJoueurCourant() {
        const affichagejCourant = document.createElement('div');
        affichagejCourant.id = "affiche-joueur-courant";
        affichagejCourant.innerText = "C'est au tour du joueur : " + this.jCourant;
        affichagejCourant.style.color = "white";
        document.querySelector('body').appendChild(affichagejCourant);
    }

    fonctionMAJ(jCourant) {
        document.getElementById('affiche-joueur-courant').innerText = "C'est au tour du joueur : " + jCourant;
    
    }

    fonctionScore(j1, j2) {
        const score = document.createElement('div');
        score.style.color = "white";
        score.id = 'score';
        score.innerText = `
        Score(s) :\n 
        Joueur ${j1.id} : ${j1.compteurVictoire}\n
        Joueur ${j2.id} : ${j2.compteurVictoire}
        `;
        document.querySelector('body').appendChild(score);
    }

    fonctionMAJscore(j1, j2) {
        document.getElementById('score').innerText = `
        Score(s) :\n 
        Joueur ${j1.id} : ${j1.compteurVictoire}\n
        Joueur ${j2.id} : ${j2.compteurVictoire}
        `;
    
    }
}