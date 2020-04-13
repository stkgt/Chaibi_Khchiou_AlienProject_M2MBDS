const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const mongoose = require("mongoose");
const fileCas = "Ressource/cas_pub.csv"
const fileTemoignage = "Ressource/temoignages_pub.csv"
const url = "mongodb://localhost:27017/";

try {
 ImportCas();
 ImportTemoingnage();
}
catch(e) {
  console.log(e);
  // expected output: ReferenceError: test is not defined
}
function ImportCas(){
let stream = fs.createReadStream(fileCas,{delimiter: ';' });
let csvData = [];
let count =1;
let csvStream = fastcsv
  .parse({ delimiter: ';' })
  .on("data", function(data) {
	console.log(count)
	count++;
    csvData.push({
      id_cas: data[0],
      nom_dossier: data[1],
      zone: data[2],
      zone_code: data[3],
	  zone_type: data[4],
	  annee: data[5],
	  mois: data[6],
	  jous: data[7],
	  resume_desc: data[8],
	  resume_short: data[9],
	  nb_temoignage: data[11],
	  nb_temoin: data[12],
	  nb_pan: data[14],
	  date_maj: data[19],
	  etrangete: data[20],
	  etrangete_calc: data[22],
	  etrangete_err: data[23],
	  fiabilite: data[24],
	  fiabilite_calc: data[26],
	  qte_info: data[27],
	  qte_info_calc: data[28],
	  consitance: data[29],
	  consistance_calc: data[30],
	  consistance_calc_err: data[31],
	  classification: data[32],
	  numEtude: data[34]
    });
  })
  .on("error", function(error) {
    console.log(error);    
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);
	
	mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    client
      .db("test")
      .collection("cas")
      .insertMany(csvData, (err, res) => {
        if (err) throw err;
        console.log(`Inserted: ${res.insertedCount} rows`);
        client.close();
      });
  }
);

  });
  stream.pipe(csvStream);
}

function resolveAfter5Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 5000);
  });
}

function ImportTemoingnage(){
let stream = fs.createReadStream(fileTemoignage,{ delimiter: ';' });
let csvData = [];
let count =1;
let csvStream = fastcsv
  .parse({ delimiter: ';' })
  .on("data", function(data) {
	console.log(count)
	count++;
    csvData.push({
      id_cas: data[0],
      numEtude: data[1],
      id_temoignage: data[2],
      tem_chrono: data[4],
	  obs_chrono: data[5],
	  nom_dossier: data[6],
	  title_type: data[8],
	  resume: data[9],
	  age:data[14],
	  genre: data[15],
	  adr_commune: data[16],
	  adr_cp: data[17],
	  adr_dpt: data[18],
	  adr_pays: data[19],
	  activite_pro: data[21],
	  exp_astro: data[24],
	  lvl_astro: data[25],
	  exp_ufo: data[28],
	  lvl_ufo: data[29],
	  emotion_obs: data[31],
	  activite_obs: data[32],
	  interpretation: data[33],
	  interet: data[34],
	  avis_science: data[36],
	  id_observ: data[49],
	  obs_desc: data[51],
	  obs_depl_vitess: data[55],
	  obs_annee: data[56],
	  obs_mois: data[57],
	  obs_jour: data[58],
	  obs_date_heure: data[59],
	  obs_heure: data[60],
	  obs_duree: data[67],
	  obs_type: data[69],
	  obs_adr_commune: data[70],
	  obs_adr_CP: data[71],
	  obs_adr_dpt: data[72],
	  obs_cadre_ref: data[78],
	  obs_cadre_type: data[79],
	  obs_lat: data[80],
	  obs_lon: data[81],
	  obs_sol: data[83],
	  obs_sol_type: data[84],
	  obs_relief_type: data[85],
	  obs_azimut: data[89],
	  obs_azimut_libel: data[90],
	  obs_elevation: data[91],
	  obs_elevation_lib: data[92],
	  obs_dist_lib: data[93],
	  obs_dist: data[94],
	  obs_alt: data[95],
	  obs_alt_libel: data[96],
	  obs_traj: data[99],
	  obs_dynamique_type: data[101],
	  obs_vitesse_libel: data[103],
	  obs_vitesse_type: data[104],
	  obs_taille_eng: data[105],
	  obs_taille_type: data[106],
	  obs_emotion: data[109],
	  obs_condition: data[111],
	  obs_meteo: data[116],
	  obs_meteo_libel: data[117],
	  obs_nature_type: data[124],
	  obs_couleur: data[126],
	  obs_couleur_type: data[127],
	  obs_luminosite_lib: data[128],
	  obs_luminosite_type: data[128],
	  obs_taille_eng: data[129],
    });
  })
  .on("error", function(error) {
    console.log(error);    
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);
	
	mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    client
      .db("test")
      .collection("temoignage")
      .insertMany(csvData, (err, res) => {
        if (err) throw err;
        console.log(`Inserted: ${res.insertedCount} rows`);
        client.close();
      });
  }
);

    
  });
  stream.pipe(csvStream);
};



