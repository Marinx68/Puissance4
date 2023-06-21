export class Jeton {
    constructor(x, y, taille) {
        this.jetonAffichage = document.createElement('div');
        this.jetonAffichage.id = x + "-" + y;
        this.jetonAffichage.style.backgroundColor = "white";
        this.jetonAffichage.style.margin = "5px";
        this.jetonAffichage.style.border = "2px solid navy";
        this.jetonAffichage.style.borderRadius = "50%";
        this.jetonAffichage.style.width = taille + "px";
        this.jetonAffichage.style.height = taille + "px";
    }
}