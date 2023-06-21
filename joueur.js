export class Joueur {
    constructor(id, couleur){
        this.id = id;
        this.couleur = couleur;
        this.compteurVictoire = 0;
    }

    fonctionJoueur(autreJoueur) {
        const joueurInfo = document.createElement('div');
        joueurInfo.id = 'info-' + this.id;
        joueurInfo.innerHTML = `<h1>` + this.id + `</h1>`;
        joueurInfo.style.display = "flex";

        const choixCouleur = document.createElement('input');
        choixCouleur.id = 'couleur-' + this.id;
        choixCouleur.type = 'color';
        choixCouleur.value = this.couleur;

        choixCouleur.addEventListener('change', (e) => {
            this.couleur = e.target.value;
            if (this.couleurSelectionner(autreJoueur)) {
                autreJoueur.couleur = "#" + Math.floor(Math.random() * 16777215).toString(16);
            }
            document.getElementById('couleur-'+autreJoueur.id).value = autreJoueur.couleur;
        })

        joueurInfo.appendChild(choixCouleur);
        document.querySelector('body').append(joueurInfo);

    }

    couleurSelectionner(autreJoueur) {
        if (this.couleur == autreJoueur.couleur) {
            return true;
        } else {
            return false;
        }
    }

    couleurVisibiliter(j1, j2, visibiliter) {
        if(visibiliter){
            document.getElementById(`couleur-`+ j1.id).style.display = 'block';
            document.getElementById(`couleur-`+ j2.id).style.display = 'block';
        } else {
            document.getElementById(`couleur-`+ j1.id).style.display = 'none';
            document.getElementById(`couleur-`+ j2.id).style.display = 'none';
        }
    }



}