var contractMed = null;

App = {
    web3Provider: null,
    contracts: {},
    med_chain: null,
    medical_hist: {},
    paitent_page_data: {},

    initWeb3: async function () {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.error("User denied account access")
            }
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        console.log(web3);

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('./med_chain.json', function (data) {
            var med_chain_Artifact = data;
            App.contracts.med_chain = TruffleContract(med_chain_Artifact);
            App.contracts.med_chain.setProvider(App.web3Provider);
            App.med_chain = TruffleContract(med_chain_Artifact);
            App.med_chain.setProvider(App.web3Provider);
            contractMed = App.contracts.med_chain;
        });
    },


    add_paitent: function () {
        var add_paitent_instance;
        var temp = "temp";
        var samplePatient = {
            aadhaar: 19,
            age: 20,
            name: temp,
            dob: temp,
            weight: 100,
            sex: temp,
            allergies: temp
        };

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                add_paitent_instance = instance;
                return add_paitent_instance.add_paitent(samplePatient.aadhaar, samplePatient.age, samplePatient.name,
                    samplePatient.dob, samplePatient.weight, samplePatient.sex, samplePatient.allergies, {
                        from: account
                    });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    lookup_paitent: function () {
        var lookup_paitent_instance;
        var samplePatient = {
            aadhaar: 19,
            age: 20
        };
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                lookup_paitent_instance = instance;
                return lookup_paitent_instance.lookup_paitent(samplePatient.aadhaar, {
                    from: account
                });
            }).then(function (res) {
                console.log(res);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    add_prescription: function () {
        var add_paitent_instance;
        var temp = "temp";
        var samplePres = {
            d_id: 1,
            aadhaar: 19,
            disease: temp,
            symptoms: temp,
            medicine: temp,
            time: temp
        };

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                add_paitent_instance = instance;
                return add_paitent_instance.add_prescription(samplePres.d_id, samplePres.aadhaar, samplePres.disease,
                    samplePres.symptoms, samplePres.medicine, samplePres.time, {
                        from: account
                    });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    doctor_last_prescription: function () {
        var doctor_last_prescription_instance;
        var samplePatient = {
            aadhaar: 19,
            age: 20
        };
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                doctor_last_prescription_instance = instance;
                return doctor_last_prescription_instance.doctor_last_prescription(samplePatient.aadhaar, {
                    from: account
                });
            }).then(function (res) {
                console.log(res);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    last_prescription: function () {
        var last_prescription_instance;
        var samplePatient = {
            aadhaar: 19,
            age: 20
        };
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                last_prescription_instance = instance;
                return last_prescription_instance.last_prescription(samplePatient.aadhaar, {
                    from: account
                });
            }).then(function (res) {
                console.log(res);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    medical_history: function () {
        var medical_history_instance;
        var samplePatient = {
            aadhaar: 19,
            age: 20
        };
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                medical_history_instance = instance;
                return medical_history_instance.medical_history(samplePatient.aadhaar, {
                    from: account
                });
            }).then(function (res) {
                console.log(res);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    medical_history_details: function () {
        var medical_history_instance;
        var samplePatient = {
            aadhaar: 19,
            age: 20
        };
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                medical_history_instance = instance;
                return medical_history_instance.medical_history_details(samplePatient.aadhaar, {
                    from: account
                });
            }).then(function (res) {
                console.log(res);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    paitent_page: function () {
        var lookup_paitent_instance;
        var samplePatient = {
            aadhaar: 19,
            age: 20
        };
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                lookup_paitent_instance = instance;
                return lookup_paitent_instance.lookup_paitent(samplePatient.aadhaar, {
                    from: account
                });
            }).then(function (res) {
                App.paitent_page_data.aadhaar = res[0].c[0]; 
                App.paitent_page_data.age = res[1].c[0]; 
                App.paitent_page_data.name = res[2]; 
                App.paitent_page_data.sex = res[3]; 
                App.paitent_page_data.dob = res[4]; 
                App.paitent_page_data.weight = res[5].c[0];                 
                App.paitent_page_data.allergies = res[6];                 
                var doctor_last_prescription_instance;
                web3.eth.getAccounts(function (error, accounts) {
                    if (error) {
                        console.log(error);
                    }
                    var account = accounts[0];
                    contractMed.deployed().then(function (instance) {
                        doctor_last_prescription_instance = instance;
                        return doctor_last_prescription_instance.doctor_last_prescription(samplePatient.aadhaar, {
                            from: account
                        });
                    }).then(function (res) {
                        App.paitent_page_data.last_pres_id = res[0].c[0];
                        App.paitent_page_data.last_pres_medicine = res[1];
                        App.paitent_page_data.last_pres_doc_id = res[2].c[0];
                        App.paitent_page_data.last_pres_symptoms = res[3];
                        App.paitent_page_data.last_pres_timestamp = res[4];
                        console.log(App.paitent_page_data);                        
                    }).catch(function (err) {
                        console.log(err.message);
                    });
                });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    medical_history_combined: function () {
        var medical_history_instance;
        var samplePatient = {
            aadhaar: 19,
            age: 20
        };
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                medical_history_instance = instance;
                return medical_history_instance.medical_history_details(samplePatient.aadhaar, {
                    from: account
                });
            }).then(function (res) {
                App.medical_hist.ids = res[0];
                App.medical_hist.doctor_ids = res[1];
                App.medical_hist.symptoms = res[2];
                web3.eth.getAccounts(function (error, accounts) {
                    if (error) {
                        console.log(error);
                    }
                    var account = accounts[0];
                    contractMed.deployed().then(function (instance) {
                        medical_history_instance = instance;
                        return medical_history_instance.medical_history(samplePatient.aadhaar, {
                            from: account
                        });
                    }).then(function (res) {
                        App.medical_hist.disease = res[0];
                        App.medical_hist.medicine = res[1];
                        App.medical_hist.timestamp = res[2];
                        App.format_medical_data(App.medical_hist);
                    }).catch(function (err) {
                        console.log(err.message);
                    });
                });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    format_medical_data: function (data) {
        data.ids = App.getString(data.ids).map(Number);
        data.doctor_ids = App.getString(data.doctor_ids).map(Number);
        data.symptoms = App.getString(data.symptoms);
        data.disease = App.getString(data.disease);
        data.medicine = App.getString(data.medicine);
        data.timestamp = App.getString(data.timestamp);
        console.log(data);
    },

    getString: function (str) {
        var newStr = str.split("-");
        newStr.splice(0, 2);
        return newStr;
    }

};

$(function () {
    $(window).on("load", function () {
        App.initWeb3();
    });
});