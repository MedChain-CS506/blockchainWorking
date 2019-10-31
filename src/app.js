var contractMed = null;

App = {
    web3Provider: null,
    contracts: {},
    med_chain: null,

    initWeb3: async function () {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.error("User denied account access")
            }
        }
        else if (window.web3) {
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
                console.log(add_paitent_instance);
                return add_paitent_instance.add_paitent(samplePatient.aadhaar, samplePatient.age, samplePatient.name,
                    samplePatient.dob, samplePatient.weight, samplePatient.sex, samplePatient.allergies, {
                        from: account
                    });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    lookup_paitent: function(){
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
                console.log(lookup_paitent_instance);
                return lookup_paitent_instance.lookup_paitent(samplePatient.aadhaar, {
                        from: account
                    });
            }).then( function(res){
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
            time: 100
        };

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            contractMed.deployed().then(function (instance) {
                add_paitent_instance = instance;
                console.log(add_paitent_instance);
                return add_paitent_instance.add_prescription(samplePres.d_id, samplePres.aadhaar, samplePres.disease,
                    samplePres.symptoms, samplePres.medicine, samplePres.time, {
                        from: account
                    });
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    doctor_last_prescription: function(){
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
                console.log(doctor_last_prescription_instance);
                return doctor_last_prescription_instance.doctor_last_prescription(samplePatient.aadhaar, {
                        from: account
                    });
            }).then( function(res){
                console.log(res);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    last_prescription: function(){
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
                console.log(last_prescription_instance);
                return last_prescription_instance.last_prescription(samplePatient.aadhaar, {
                        from: account
                    });
            }).then( function(res){
                console.log(res);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    medical_history: function(){
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
                console.log(medical_history_instance);
                return medical_history_instance.medical_history(samplePatient.aadhaar, {
                        from: account
                    });
            }).then( function(res){
                console.log(res);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    }

};

$(function () {
    $(window).on("load", function () {
        App.initWeb3();
    });
});