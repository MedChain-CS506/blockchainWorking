var contractMed = null;
App = {
    web3Provider: null,
    contracts: {},
    med_chain: null,

    initWeb3: async function() {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        console.log(web3);

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('./med_chain.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var med_chain_Artifact = data;
            //console.log(med_chain_Artifact);
            App.contracts.med_chain = TruffleContract(med_chain_Artifact);

            App.contracts.med_chain.setProvider(App.web3Provider);
            App.med_chain = TruffleContract(med_chain_Artifact);
            App.med_chain.setProvider(App.web3Provider);
            contractMed = App.contracts.med_chain;

            console.log(App.contracts.med_chain);
            //console.log(App.contracts.med_chain.deployed());

            return App.add_paitent();

            // Set the provider for our contract


            // Use our contract to retrieve and mark the adopted pets

        });
    },

    add_paitent: function() {
        var add_paitent_instance;
        var contract = App.contracts.med_chain;

        var temp = web3.toAscii("Name");
        var samplePatient = {
            aadhaar: 19,
            age: 20,
            name: temp,
            dob: temp,
            weight: 100,
            allergies: [temp, temp]
        };

       

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {

                console.log(error);
            }

            var account = accounts[0];
            console.log(App.contracts.med_chain);

            
            //App.med_chain = App.med_chain.deployed();
            console.log(contractMed);
            contractMed.deployed().then(function(instance) {
                add_paitent_instance = instance;
                console.log(add_paitent_instance);
                // Execute adopt as a transaction by sending account
                return add_paitent_instance.add_paitent(samplePatient.aadhaar, samplePatient.age, samplePatient.name,
                    samplePatient.dob, samplePatient.weight, samplePatient.allergies, {
                        from: account
                    });
            }).then(function(result) {
                return App.add_paitent();
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    }

};

$(function() {
    $(window).on("load", function() {
        App.initWeb3();
    });
});