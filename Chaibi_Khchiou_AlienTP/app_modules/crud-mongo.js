var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';
// DataCollection
const dbCollectionCas = "cas";
const dbCollectionTemoignage = "temoignage"

exports.connexionMongo = function(callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		
		assert.equal(null, err);
		callback(err, db);
	});
}

// ------------------------- Cas part ---------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------

exports.findCas = function(page, pagesize, callback) {
    MongoClient.connect(url, function(err, client) {
    	    console.log("pagesize = " + pagesize);
			console.log("page = " + pagesize);
			var count=0;
			var db = client.db(dbName);
			db.collection(dbCollectionCas).count().then(val => {count = val;});

        if(!err){
			var arr = db.collection(dbCollectionCas)
			.find()
            .skip(page*pagesize)
            .limit(pagesize)
            .toArray().then(arr =>{
			let message = {
				succes: true,
				msg:"Details du cas envoyés",
				data : arr,
				count : count,
                error : null,
				}
			callback(message)});
        }
        else{
            callback(-1);
        }
    });
};

exports.findCasById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "id_cas": id};

            db.collection(dbCollectionCas) 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        restaurant : data,
                        error : null,
                        msg:"Details du cas envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}
exports.createCas = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				id_cas:Math.floor(Math.random() * 1000000), 
				nom_dossier: formData.nom_dossier,
				zone: formData.zone,
				zone_code: formData.zone_code,
				zone_type: formData.zone_type,
				annee: formData.annee,
				mois: formData.mois,
				jous: formData.jous,
				date_maj: new Date(),
				resume_desc: formData.resume_desc,
				resume_short: formData.resume_short,
				nb_temoignage: formData.nb_temoignage,
				nb_temoin: formData.nb_temoin,
				nb_pan: formData.nb_pan,
				date_maj: formData.date_maj,
				etrangete: formData.etrangete,
				fiabilite: formData.fiabilite,
				qte_info: formData.qte_info,
				consitance: formData.consitance,
				classification: formData.classification,
				numEtude: formData.annee +"_"+formData.mois+"_"+formData.jous+""+Math.floor(Math.random() * 10000)
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection(dbCollectionCas)
		    .insertOne(toInsert, function(err, result) {
		    	let reponse;

		        if(!err){
		            reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Ajout réussi " + result
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updateCas = function(id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "id_cas": id};
	        let newvalues = {
				id_cas: id,
				nom_dossier: formData.nom_dossier,
				zone: formData.zone,
				zone_code: formData.zone_code,
				zone_type: formData.zone_type,
				annee: formData.annee,
				mois: formData.mois,
				jous: formData.jous,
				date_maj: new Date(),
				resume_desc: formData.resume_desc,
				resume_short: formData.resume_short,
				nb_temoignage: formData.nb_temoignage,
				nb_temoin: formData.nb_temoin,
				nb_pan: formData.nb_pan,
				date_maj: formData.date_maj,
				etrangete: formData.etrangete,
				fiabilite: formData.fiabilite,
				qte_info: formData.qte_info,
				consitance: formData.consitance,
				classification: formData.classification,
				numEtude: formData.annee +"_"+formData.mois+"_"+formData.jous+""+Math.floor(Math.random() * 10000)
	        };


			db.collection(dbCollectionCas)
			.replaceOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deleteCas= function(id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		exports.deleteTemoignageFromCas(id);
		console.log("suppression de cas id:"+id);
		if(!err) {
            let myquery = { "id_cas": id};
	        
			db.collection(dbCollectionCas)
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

// ---------------------- Temoignage part ----------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------

exports.findTemoignage = function(page, pagesize, callback) {
    MongoClient.connect(url, function(err, client) {
    	    console.log("pagesize = " + pagesize);
			console.log("page = " + pagesize);
			
			var db = client.db(dbName);

			var db = client.db(dbName);
			db.collection(dbCollectionTemoignage).count().then(val => {count = val;});

        if(!err){
			var arr = db.collection(dbCollectionTemoignage)
			.find()
            .skip(page*pagesize)
            .limit(pagesize)
            .toArray().then(arr =>{
			let message = {
				succes: true,
				msg:"Details du Temoignage envoyés",
				data : arr,
				count : count,
                error : null,
				}
			callback(message)});
        }
        else{
            callback(-1);
        }
    });
};

exports.findTemoignageById = function(id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "id_cas": id};

            db.collection(dbCollectionTemoignage) 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        restaurant : data,
                        error : null,
                        msg:"Details du temoignage envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}

exports.createTemoignage = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				id_cas: formData.id_cas,
				numEtude: formData.numEtude,
				id_temoignage: Math.floor(Math.random() * 1000000),
				tem_chrono: formData.tem_chrono,
				obs_chrono: formData.obs_chrono,
				nom_dossier: formData.nom_dossier,
				title_type: formData.title_type,
				resume: formData.resume,
				age:formData.age,
				genre: formData.genre,
				adr_commune: formData.adr_commune,
				adr_cp: formData.adr_cp,
				adr_dpt: formData.adr_dpt,
				adr_pays: formData.adr_pays,
				activite_pro: formData.activite_pro,
				exp_astro: formData.exp_astro,
				lvl_astro: formData.lvl_astro,
				exp_ufo: formData.exp_ufo,
				lvl_ufo: formData.lvl_ufo,
				emotion_obs: formData.emotion_obs,
				activite_obs: formData.activite_obs,
				interpretation: formData.interpretation,
				interet: formData.interet,
				avis_science: formData.avis_science,
				id_observ: Math.floor(Math.random() * 1000000),
				obs_desc: formData.obs_desc,
				obs_depl_vitess: formData.obs_depl_vitess,
				obs_annee: formData.obs_annee,
				obs_mois: formData.obs_mois,
				obs_jour: formData.obs_jour,
				obs_date_heure: formData.obs_date_heure,
				obs_heure: formData.obs_heure,
				obs_duree: formData.obs_duree,
				obs_type: formData.obs_type,
				obs_adr_commune: formData.obs_adr_commune,
				obs_adr_CP: formData.obs_adr_CP,
				obs_adr_dpt: formData.obs_adr_dpt,
				obs_cadre_ref: formData.obs_cadre_ref,
				obs_cadre_type: formData.obs_cadre_type,
				obs_lat: formData.obs_lat,
				obs_lon: formData.obs_lon,
				obs_sol: formData.obs_sol,
				obs_sol_type: formData.obs_sol_type,
				obs_relief_type: formData.obs_relief_type,
				obs_azimut: formData.obs_azimut,
				obs_azimut_libel: formData.obs_azimut_libel,
				obs_elevation: formData.obs_elevation,
				obs_elevation_lib: formData.obs_elevation_lib,
				obs_dist_lib: formData.obs_dist_lib,
				obs_dist: formData.obs_dist,
				obs_alt: formData.obs_alt,
				obs_alt_libel: formData.obs_alt_libel,
				obs_traj: formData.obs_traj,
				obs_dynamique_type: formData.obs_dynamique_type,
				obs_vitesse_libel: formData.obs_vitesse_libel,
				obs_vitesse_type: formData.obs_vitesse_type,
				obs_taille_eng: formData.obs_taille_eng,
				obs_taille_type: formData.obs_taille_type,
				obs_emotion: formData.obs_emotion,
				obs_condition: formData.obs_condition,
				obs_meteo: formData.obs_meteo,
				obs_meteo_libel: formData.obs_meteo_libel,
				obs_nature_type: formData.obs_nature_type,
				obs_couleur: formData.obs_couleur,
				obs_couleur_type: formData.obs_couleur_type,
				obs_luminosite_lib: formData.obs_luminosite_lib,
				obs_luminosite_type: formData.obs_luminosite_type,
				obs_taille_eng: formData.obs_taille_eng
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection(dbCollectionTemoignage)
		    .insertOne(toInsert, function(err, result) {
		    	let reponse;

		        if(!err){
		            reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Ajout réussi " + result
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updateTemoignage = function(id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "id_temoignage": id};
	        let newvalues = {
				id_temoignage: id,
				id_cas: formData.id_cas,
				tem_chrono: formData.tem_chrono,
				obs_chrono: formData.obs_chrono,
				nom_dossier: formData.nom_dossier,
				title_type: formData.title_type,
				resume: formData.resume,
				age:formData.age,
				genre: formData.genre,
				adr_commune: formData.adr_commune,
				adr_cp: formData.adr_cp,
				adr_dpt: formData.adr_dpt,
				adr_pays: formData.adr_pays,
				activite_pro: formData.activite_pro,
				exp_astro: formData.exp_astro,
				lvl_astro: formData.lvl_astro,
				exp_ufo: formData.exp_ufo,
				lvl_ufo: formData.lvl_ufo,
				emotion_obs: formData.emotion_obs,
				activite_obs: formData.activite_obs,
				interpretation: formData.interpretation,
				interet: formData.interet,
				avis_science: formData.avis_science,
				obs_desc: formData.obs_desc,
				obs_depl_vitess: formData.obs_depl_vitess,
				obs_annee: formData.obs_annee,
				obs_mois: formData.obs_mois,
				obs_jour: formData.obs_jour,
				obs_date_heure: formData.obs_date_heure,
				obs_heure: formData.obs_heure,
				obs_duree: formData.obs_duree,
				obs_type: formData.obs_type,
				obs_adr_commune: formData.obs_adr_commune,
				obs_adr_CP: formData.obs_adr_CP,
				obs_adr_dpt: formData.obs_adr_dpt,
				obs_cadre_ref: formData.obs_cadre_ref,
				obs_cadre_type: formData.obs_cadre_type,
				obs_lat: formData.obs_lat,
				obs_lon: formData.obs_lon,
				obs_sol: formData.obs_sol,
				obs_sol_type: formData.obs_sol_type,
				obs_relief_type: formData.obs_relief_type,
				obs_azimut: formData.obs_azimut,
				obs_azimut_libel: formData.obs_azimut_libel,
				obs_elevation: formData.obs_elevation,
				obs_elevation_lib: formData.obs_elevation_lib,
				obs_dist_lib: formData.obs_dist_lib,
				obs_dist: formData.obs_dist,
				obs_alt: formData.obs_alt,
				obs_alt_libel: formData.obs_alt_libel,
				obs_traj: formData.obs_traj,
				obs_dynamique_type: formData.obs_dynamique_type,
				obs_vitesse_libel: formData.obs_vitesse_libel,
				obs_vitesse_type: formData.obs_vitesse_type,
				obs_taille_eng: formData.obs_taille_eng,
				obs_taille_type: formData.obs_taille_type,
				obs_emotion: formData.obs_emotion,
				obs_condition: formData.obs_condition,
				obs_meteo: formData.obs_meteo,
				obs_meteo_libel: formData.obs_meteo_libel,
				obs_nature_type: formData.obs_nature_type,
				obs_couleur: formData.obs_couleur,
				obs_couleur_type: formData.obs_couleur_type,
				obs_luminosite_lib: formData.obs_luminosite_lib,
				obs_luminosite_type: formData.obs_luminosite_type,
				obs_taille_eng: formData.obs_taille_eng
	        };


			db.collection(dbCollectionTemoignage)
			.replaceOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deleteTemoignageFromCas= function(id) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		console.log("suppression de temoignage id:"+id);
		if(!err) {
            let myquery = { "id_cas": id};
	        
			db.collection(dbCollectionTemoignage)
			.deleteMany(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
		}
	});
}

exports.deleteTemoignage= function(id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		console.log("suppression de temoignage id:"+id);
		if(!err) {
            let myquery = { "id_temoignage": id};
	        
			db.collection(dbCollectionTemoignage)
			.deleteMany(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}