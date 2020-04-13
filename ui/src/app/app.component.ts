import { Component, OnInit, ViewChild } from '@angular/core';
import { CasService } from './cas.service';
import { Cas } from './models/cas.model';

import { ModalService } from './modal/modal.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  // modèles
  listCas: Cas[] = [];
  nbCas = 0;
  nbPagesDeResultats = 0;
  pagesize = 10;
  page = 0;
  detailCas: Cas = {
    _id: '',
    nom_dossier: '',
    zone: '',
    zone_code: '',
    zone_type: '',
    annee: '',
    mois: '',
    jous: '',
    resume_desc: '',
    resume_short: '',
    nb_temoignage: '',
    nb_temoin: '',
    nb_pan: '',
    date_maj: '',
    etrangete: '',
    etrangete_calc: '',
    etrangete_err: '',
    fiabilite: '',
    fiabilite_calc: '',
    qte_info: '',
    qte_info_calc: '',
    consitance: '',
    consistance_calc: '',
    consistance_calc_err: '',
  }
  private bodyText: string;
  // title: string = "cours Angular";
  // prof = "Michel Buffa";
  // elements: string[] = ["Tennis", "foot", "jeux vidéo", "cinéma", "vélo"];
  // nouvelElement: string = "";

  // On "injecte le service" qui servira par la suite à
  // récupérer des données sur le Web
  constructor(private casService: CasService, private modalService: ModalService) {
   }

  // Appelé lorsque le composant est créé
  ngOnInit(): void {
    this.getCas();
    this.bodyText = 'This text can be updated in modal 1';
  }

  getCas() {
    this.casService.getCasByPageAndSize(this.page, this.pagesize).then(response => {
      console.log(response.msg);
      console.log(response.data);
      this.listCas = response.data;
      // console.log(this.listCas.length);
      this.nbCas = this.listCas.length;
      this.nbPagesDeResultats = Math.ceil(this.nbCas / this.pagesize);
    });
  }

  deleteCas(index) {    
    var id = this.listCas[index]._id;
    console.log("on supprime le cas id=" + id);
    
    this.casService.deleteCas(id).then(response => {
      console.log(response.msg);
      
      this.getCas();
    });
  }

  detailsCas(index) {
    var id = this.listCas[index]._id;
    console.log("on affiche les details du cas id=" + id);

    var cas = this.listCas[index];

    this.detailCas = cas;

    this.openModal("detail-modal");
    
  }

  onFirstPage() {
    this.page = 0;
    this.getCas();
  }

  onPagePrecedente() {
    if (this.page !== 0) {
      this.page--;
      this.getCas();
    }
  }

  onPageSuivante() {
    if (this.page < this.nbPagesDeResultats) {
      this.page++;
      this.getCas();
    }
  }

  onLastPage() {
    this.page = this.nbPagesDeResultats - 1;
    this.getCas();
  }


  openModal(id: string) {
    console.log(this.modalService);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  // // méthodes
  // onAddElement() {
  //   //this.elements.push("" + this.elements.length);
  //   this.elements.push(this.nouvelElement);
  // }

  onDeleteElement(i) {
    // this.elements.splice(i, 1);
  }

  getColor(i) {
    return i % 2 ? "red" : "green";
  }

  // onUserWasClicked(nom) {
  //   alert("On a a clické sur le composant <app-username> : " + nom);
  // }

  // getHobbies() {
  //   this.hobbyService.getHobbies().then(response => {
  //     this.elements = response.data;
  //   });
  // }
}
