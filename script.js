import { Joueur } from "./joueur.js";
import { Affichage } from "./affichage.js";
import { Jeton } from "./jeton.js ";

export class puissance4 {
  constructor(COL = 7, LGN = 6, jetonTaille = 50, tableauJoueur = [{id : "j1", color: "#FF0000"}, {id: "j2", color: "#EDD400"}]) {
    this.COL = COL;
    this.LGN = LGN;
    this.jetonTaille = jetonTaille;
    this.grilleDonnees = [];
    this.gameOver = false;
    this.j1 = new Joueur(tableauJoueur[0].id, tableauJoueur[0].color);
    this.j2 = new Joueur(tableauJoueur[1].id, tableauJoueur[1].color);
    this.jCourant = this.j1.id;
    this.colonneCourante = [];
    this.nul = 0;
    
    this.affichageJoueur = new Affichage(this.jCourant, { taille: jetonTaille, marge: 14, LGN: LGN, COL: COL});
    this.affichageJoueur.fonctionConstructionGrille();
    this.j1.fonctionJoueur(this.j2);
    this.j2.fonctionJoueur(this.j1);
    this.affichageJoueur.fonctionScore(this.j1, this.j2);
    this.creationBoutton();
  }

  fonctionJeu() {
    this.fonctionCascadeJeton();
    for (let i = 0; i < this.LGN; i++) {
      let ligne = [];
      for (let j = 0; j < this.COL; j++) {
        ligne.push(' ');
        let jeton = new Jeton(i.toString(), j.toString(), this.jetonTaille);
        jeton.jetonAffichage.addEventListener('click', (e) => {
          this.fonctionPlacementJeton(e);
        })
        document.getElementById('grille').appendChild(jeton.jetonAffichage);
      }
      this.grilleDonnees.push(ligne);
    }
  }

  fonctionPlacementJeton(e) {
    if (this.gameOver) {
      return;
    }

    document.getElementById('couleur-' + this.j1.id).style.display = "none";
    document.getElementById('couleur-' + this.j2.id).style.display = "none";

    let coordonnees = e.target.id.split("-");
    let ligne = parseInt(coordonnees[0]);
    let colonne = parseInt(coordonnees[1]);

    if (ligne < 0) {
      return;
    }

    
    ligne = this.colonneCourante[colonne];
    
    this.grilleDonnees[ligne][colonne] = this.jCourant;
    let jeton = document.getElementById(ligne.toString() + "-" + colonne.toString());
    
    if (this.jCourant == this.j1.id) {
      jeton.style.backgroundColor = this.j1.couleur;
      this.jCourant = this.j2.id;
    } else {
      jeton.style.backgroundColor = this.j2.couleur;
      this.jCourant = this.j1.id;
    }
    
    ligne--;
    this.nul++;
    console.log(this.nul);
    this.colonneCourante[colonne] = ligne;
    this.affichageJoueur.fonctionMAJ(this.jCourant);
    this.fonctionVerifVictoire();
  }

  fonctionCascadeJeton() {
    for (let i = 0; i < this.COL; i++) {
      this.colonneCourante[i] = this.LGN -1;      
    }
  }

  fonctionVerifVictoire() {
    for (let ligne = 0; ligne < this.LGN; ligne++) {
      for (let colonne = 0; colonne < this.COL - 3; colonne++) {
        if (this.grilleDonnees[ligne][colonne] != " ") {
          if (
            this.grilleDonnees[ligne][colonne] == this.grilleDonnees[ligne][colonne + 1] &&
            this.grilleDonnees[ligne][colonne + 1] == this.grilleDonnees[ligne][colonne + 2] &&
            this.grilleDonnees[ligne][colonne + 2] == this.grilleDonnees[ligne][colonne + 3]
          ) {
            this.jetonGagnant(ligne, colonne);
            return;
          }
        }
      }
    }

    for (let colonne = 0; colonne < this.COL; colonne++) {
      for (let ligne = 0; ligne < this.LGN - 3; ligne++) {
        if (this.grilleDonnees[ligne][colonne] != " ") {
          if (
            this.grilleDonnees[ligne][colonne] == this.grilleDonnees[ligne + 1][colonne] &&
            this.grilleDonnees[ligne + 1][colonne] == this.grilleDonnees[ligne + 2][colonne] &&
            this.grilleDonnees[ligne + 2][colonne] == this.grilleDonnees[ligne + 3][colonne]
          ) {
            this.jetonGagnant(ligne, colonne);
            return;
          }
        }
      }
    }

    for (let ligne = 0; ligne < this.LGN - 3; ligne++) {
      for (let colonne = 0; colonne < this.COL - 3; colonne++) {
        if (this.grilleDonnees[ligne][colonne] != " ") {
          if (
            this.grilleDonnees[ligne][colonne] == this.grilleDonnees[ligne + 1][colonne + 1] &&
            this.grilleDonnees[ligne + 1][colonne + 1] == this.grilleDonnees[ligne + 2][colonne + 2] &&
            this.grilleDonnees[ligne + 2][colonne + 2] == this.grilleDonnees[ligne + 3][colonne + 3]
          ) {
            this.jetonGagnant(ligne, colonne);
            return;
          }
        }
      }
    }

    for (let ligne = 3; ligne < this.LGN; ligne++) {
      for (let colonne = 0; colonne < this.COL - 3; colonne++) {
        if (this.grilleDonnees[ligne][colonne] != " ") {
          if (
            this.grilleDonnees[ligne][colonne] == this.grilleDonnees[ligne - 1][colonne + 1] &&
            this.grilleDonnees[ligne - 1][colonne + 1] == this.grilleDonnees[ligne - 2][colonne + 2] &&
            this.grilleDonnees[ligne - 2][colonne + 2] == this.grilleDonnees[ligne - 3][colonne + 3]
          ) {
            this.jetonGagnant(ligne, colonne);
            return;
          }
        }
      }
    }

    if (this.nul == (this.COL * this.LGN)) {
      this.gameOver = true;
      document.getElementById('recommencer').style.display = "block";
      document.getElementById('affiche-joueur-courant').innerText = "Match Nul";
      document.getElementById('couleur-' + this.j1.id).style.display = "block";
      document.getElementById('couleur-' + this.j2.id).style.display = "block";
    }
  }
  
  jetonGagnant(ligne, colonne) {
    if (this.grilleDonnees[ligne][colonne] == this.j1.id) {
      document.getElementById('affiche-joueur-courant').innerText = "Le joueur " + this.j1.id + " à gagné !";
      this.j1.compteurVictoire++;
      this.affichageJoueur.fonctionMAJscore(this.j1, this.j2);
      document.getElementById('couleur-' + this.j1.id).style.display = "block";
      document.getElementById('couleur-' + this.j2.id).style.display = "block";
      document.getElementById('recommencer').style.display = "block";
    } else {
      document.getElementById('affiche-joueur-courant').innerText = "Le joueur " + this.j2.id + " à gagné !";
      this.j2.compteurVictoire++;
      this.affichageJoueur.fonctionMAJscore(this.j1, this.j2);
      document.getElementById('couleur-' + this.j1.id).style.display = "block";
      document.getElementById('couleur-' + this.j2.id).style.display = "block";
      document.getElementById('recommencer').style.display = "block";
    }
    this.gameOver = true;
  }

  fonctionVideur() {
    for (let ligne = 0; ligne < this.LGN; ligne++) {
      for (let colonne = 0; colonne < this.COL; colonne++) {
          this.grilleDonnees[ligne][colonne] = " ";
      }
    }

    const enfant = document.getElementById('grille').childNodes;
    for (let i = 0; i < enfant.length; i++) {
      enfant[i].style.backgroundColor = "white";      
    }

    document.getElementById('affiche-joueur-courant').innerText = "C'est au tour du joueur : " + this.jCourant;
    this.fonctionCascadeJeton();
    this.nul = 0;
    this.gameOver = false;
  }

  creationBoutton() {
    const btnRecommencer = document.createElement('button');
    btnRecommencer.innerText = "Nouvelle Partie";
    btnRecommencer.id = "recommencer";
    btnRecommencer.style.display = "none";
    btnRecommencer.addEventListener('click', () => {
      this.fonctionVideur();
    })
    document.querySelector('body').appendChild(btnRecommencer);
  }

}