// On déclare les variables dont on va avoir besoin
var isformvalid = false; // Booléen faux
var date = new Date(); // Variable prenant la date actuelle
var d = date.getDate() + 1; // Variable du jour + 1
var m = date.getMonth() + 1; // Variable du mois + 1
var aaaa = date.getFullYear(); // Variable de l'année actuelle

if (d < 10) {
    d = '0' + d
  }
if (m < 10) // Permet l'ajout du 0 quand le mois et le jour sont inférieurs à 10
  {
    m = '0' + m // Par exemple janvier est le mois 01 au format date
  }

ajd = aaaa + '-' + m + '-' + d; // Création de la date actuelle au bon format

// fonction pour définir la date minimale de Réservation
// ainsi que la date pré-réglée sur le calendrier

function current_date() {
    document.reservation.Date_reser.min = ajd;
    document.reservation.Date_reser.value = ajd;
}

// Fonction définissant la vérification du formulaire
function veriform() {
    isvalidnom = document.reservation.Nom;     // Déclaration de variable pour la validité
    isvalidprenom = document.reservation.prenom;
    isvalidtel = document.reservation.tel;
    isvalidmail = document.reservation.mail;
    isvalidage = document.reservation.age;
/*    isdatereser = document.reservation.Date_reser;*/

/* On vérifie avec l'ajout d'un événement lorsqu'on tape sur les champs en questions
check validity permettant de vérifier si les contraintes posées sur ces champs sont respectés*/

    document.reservation.Nom.addEventListener('keyup', function(event) {
        isvalidnom = isvalidnom.checkValidity();
    });
    document.reservation.prenom.addEventListener('keyup', function(event) {
        isvalidprenom = isvalidprenom.checkValidity();
    });
    document.reservation.tel.addEventListener('keyup', function(event) {
        isvalidtel = isvalidtel.checkValidity();
    });
    document.reservation.mail.addEventListener('keyup', function(event) {
        isvalidmail = isvalidmail.checkValidity();
    });
    document.reservation.age.addEventListener('keyup', function(event) {
        isvalidage = isvalidage.checkValidity();

/* Boucle conditionnelle permettant de vérifier à chaque champ que tous les autres
sont remplis de manière valides. Lorsque ce n'est pas valide, le bouton "Réserver"
est désactivé */

        if (isvalidnom) {
            if (isvalidprenom) {
                if (isvalidtel) {
                    if (isvalidmail) {
                        if (isvalidage) {
                            document.reservation.soumettre.disabled = false;
                            isformvalid = true;
                        } else {
                            document.reservation.soumettre.disabled = true;
                            isformvalid = false;
                        }
                    }
                }
            }
        }
    });
}

// Fonction permettant le résumé de la réservation selon les choix de l'utilisateur
function resume_reservation() {
    var nom = "Nom : " + document.reservation.Nom.value + "<br\>";
    var prenom = "Prénom : " + document.reservation.prenom.value + "<br\>";
    var tel = "Numéro de téléphone : " + document.reservation.tel.value + "<br\>";
    var mail = "Mail : " + document.reservation.mail.value + "<br\>";
    var sexe = "Sexe : " + "'" + document.reservation.sexe.value +"'" + "<br\>";
    var age = "Âge : " + document.reservation.age.value + "<br\>";
    var nb_adulte = "Nombre de membres du groupe : " + document.reservation.Adultes.value + " adulte(s) ";
    var nb_enfant = "et " + document.reservation.Enfants.value + " enfant(s).<br\>";
    var date_choisie = "Date de réservation : " + document.reservation.Date_reser.value + "<br\>"

    // Création d'une variable contenant tout le texte du résumé de confirmation
    resumé = nom + prenom + tel + mail + sexe + age + nb_adulte + nb_enfant + date_choisie;
}

// Fonction permettant l'ouverture et l'écriture dans une nouvelle fenêtre d'un résumé
function confirmation() {
    if (isformvalid) {
        ouv_conf = window.open('./Confirmation_reservation.html', 'confirmation');
        ouv_conf.document.write("<h2> Récapitulatif : </h2>" + resumé)
    }
}

/* Fonction permettant la création de nouveau champ selon le nombre d'adulte et
d'enfants */
function nb_adulte() {
    /* Nombre d'adulte pris */
    nb_ad = document.reservation.Adultes.value;
    /* Nombre d'enfants pris */
    nb_en = document.reservation.Enfants.value;
    /* Nombre total de personnes */
    nb_tot = Number(nb_ad) + Number(nb_en);
    /* la "div" où va être placé notre nouveau contenu, les champs d'écritures: */
    div_test = document.getElementById("div_test");
    /* Supprime le contenu précédent de la "div", la boucle while va supprimer chaque
    node existant jusqu'à qu'il n'yen ai plus */
    while (div_test.hasChildNodes()) {
        div_test.removeChild(div_test.lastChild);
    }
    // On déclare une variable qui va vérifier si l'on dépasse les 10 individus
    compteur_tot = nb_tot > 10;
    if (compteur_tot == true) {
    // Si l'on dépasse ces 10 individus, alors on ouvre une fenêtre d'alerte
        alert("Pour un groupe de plus de 10 personnes, veuillez nous contacter par téléphone ou par mail.");
    } else {
        for (i = 0; i < nb_ad; i++) {
            compteur_i = i + 1 >= 1 && i + 1 < document.reservation.Adultes.length;
            // On vérifie à nouveau le nombre de personne
            if (compteur_i == false) {
                alert("Pour un groupe de plus de 10 personnes, veuillez nous contacter par téléphone ou par mail.");
            } else if (i > 0) {
                /* On indique ici la catégorie...*/
                titre = document.createTextNode("Adulte " + (i + 1) + " : ");
                // On ajoute la catégorie
                div_test.appendChild(titre);
                // On ajoute une balise <br>
                div_test.appendChild(document.createElement("br"));
                /* On créée des variables contenant les champs d'écritures, leur nom et leur paramètres*/
                var nom_adulte = document.createElement("input");
                var prenom_adulte = document.createElement("input");
                nom_adulte.type = "text";
                nom_adulte.size = "8";
                prenom_adulte.type = "text";
                prenom_adulte.size = "8";
                nom_adulte.nom = "Nom " + i;
                prenom_adulte.prenom = " Prénom " + i;
                // On ajoute ces champs et ces paramètres
                div_test.appendChild(document.createTextNode("Nom : "));
                div_test.appendChild(nom_adulte);
                div_test.appendChild(document.createTextNode(" Prénom : "));
                div_test.appendChild(prenom_adulte);
                /* Saut de ligne */
                div_test.appendChild(document.createElement("br"));
                div_test.appendChild(document.createElement("br"));

            }
        }
        for (j = 0; j < nb_en; j++) {
            compteur_j = j + 1 >= 1 && j + 1 < document.reservation.Adultes.length;
            if (compteur_j == false) {
                alert("Pour un groupe de plus de 10 personnes, veuillez nous contacter par téléphone ou par mail.");
            } else if (compteur_j) {
                titre2 = document.createTextNode("Enfant " + (j + 1) + " : ");
                // On ajoute la catégorie
                div_test.appendChild(titre2);
                // On ajoute une balise <br>
                div_test.appendChild(document.createElement("br"));
                /* On créée des variables contenant les champs d'écritures, leur nom et leur paramètres*/
                var nom_enfant = document.createElement("input");
                var prenom_enfant = document.createElement("input");
                nom_enfant.type = "text";
                nom_enfant.size = "8"
                prenom_enfant.type = "text";
                prenom_enfant.size = "8";
                // On ajoute ces champs et ces paramètres
                div_test.appendChild(document.createTextNode("Nom : "));
                div_test.appendChild(nom_enfant);
                div_test.appendChild(document.createTextNode(" Prénom : "));
                div_test.appendChild(prenom_enfant);
                /* Saut de ligne */
                div_test.appendChild(document.createElement("br"));
                div_test.appendChild(document.createElement("br"));

            }
        }
    }
}

// Fonction permettant d'empêcher l'envoie par "Entrée" des champs
function pasentrer() {
    if (!event && window.event) {
        event = window.event;
    }
    if (event.which == 13) {        // L'event 13 correspond à 'entrée'
        event.preventDefault();     // Empêche l'évenement entrée
        event.stopPropagation();    // Evite la propagation de l'évenement tant
                                    // que "réserver" n'est pas utilisable
    }
}

// Fonction permettant l'ajout de commentaire par écriture dans innerHTML
function ajoutcom() {
    nom_comm = document.commentaire.nom_com.value;
    pre_comm = document.commentaire.pre_com.value;
    comm = document.commentaire.com.value;
    div = document.getElementById("zonecom");
    div.innerHTML += comm + "<br\>" + "<i\>" + "<br\>" + nom_comm + " " +
        pre_comm + " " + ajd + "</i\> <br\><br\>";
}

function recommencer() {
  document.reservation.reset();
  current_date();
  window.scrollTo(0,0);
}
