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
  showModal = false;
  detailCas: Cas = {
    _id: '',
    id_cas: '',
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
    classification : ''
  };
  casModif: Cas = {
    _id: '',
    id_cas: '',
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
    classification : ''
  };
  
  nouveauCas: Cas = {
    _id: '',
    id_cas: '',
    nom_dossier: 'Alien à la miage',
    zone: 'France',
    zone_code: '02',
    zone_type: 'Departement',
    annee: '1920',
    mois: '12',
    jous: '10',
    resume_desc: 'Le directeur serait il un reptilien ?',
    resume_short: 'Michel Buffa=> affuble chim ?  ',
    nb_temoignage: '150',
    nb_temoin: '150',
    nb_pan: '1',
    date_maj: Date.now().toString(),
    etrangete: '0.9',
    etrangete_calc: '',
    etrangete_err: '',
    fiabilite: '1',
    fiabilite_calc: '',
    qte_info: '0.9',
    qte_info_calc: '',
    consitance: '0',
    consistance_calc: '',
    consistance_calc_err: '',
    classification : 'A'
  };
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
      console.log(response);
      // console.log(response.data);
      this.listCas = response.data;
      // console.log(this.listCas.length);
      this.nbCas = response.count;
      this.nbPagesDeResultats = Math.ceil(this.nbCas / this.pagesize);
    });
  }

  deleteCas(index) {
    var id = this.listCas[index].id_cas;
    console.log("on supprime le cas id=" + id);

    this.casService.deleteCas(id).then(response => {
      console.log(response.msg);

      this.getCas();
    });
  }

  modifierCas(index) {
    this.casModif = this.listCas[index];
    document.getElementById('divModification').style.display = "initial";
  }

  saveModif() {
    console.log(this.casModif);

    this.casService.updateCas(this.casModif).then(response => {
      console.log(response.msg);
      console.log(response);
      this.getCas();
    });

    document.getElementById('divModification').style.display = "none";
  }

  cancelModif(){
    document.getElementById('divModification').style.display = "none";
  }

  newCas(){
    document.getElementById('btnNewCas').style.display = "none";
    document.getElementById('divAjout').style.display = "initial";
  }

  cancelNewCas(){
    document.getElementById('btnNewCas').style.display = "initial";
    document.getElementById('divAjout').style.display = "none";
  }

  saveNewCas(){
    
    this.casService.insertCas(this.nouveauCas).then(response => {
      console.log(response.msg);
      console.log(response);
      this.getCas();
    });
    document.getElementById('divAjout').style.display = "none";
  }

  detailsCas(index) {
    var id = this.listCas[index].id_cas;
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

  getColor(i) {
    return i % 2 ? "red" : "green";
  }
}
