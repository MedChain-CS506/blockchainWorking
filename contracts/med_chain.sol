pragma solidity ^0.5.8;

contract med_chain {
    address private oracle;

    constructor() public {
        oracle = msg.sender;
    }

    struct admin {
        uint id;
        address admin_address;
    }

    struct paitent {
        uint aadhaar;
        uint age;
        bytes32 name;
        bytes32 dob;
        uint weight;
        bytes32 allergies;
        bytes32[] disease_history;
        uint[] prescription_ids;
        uint[] doctor_ids;
        address paitent_address;
    }

    struct doctor {
        uint id;
        uint license_no;
        bytes32 name;
        bytes32 specialisation;
        address doctor_address;
    }

    struct pharmacy {
        uint id;
        uint license_no;
        address phar_addr;
    }

    struct prescription {
        uint doctor_id;
        uint paitent_aadhaar;
        bytes32 disease;
        bytes32 symptoms;
        bytes32 medicine;
        bytes32 timestamp_prescribed;
        uint pharmacy_id;
        bytes32 timestamp_marked;
        bool marked;
    }

    mapping (uint => paitent) paitent_aadhaar_mapping;
    mapping (uint => doctor) doctor_id_mapping;
    mapping (uint => pharmacy) pharmacy_id_mapping;
    mapping (uint => prescription) prescription_id_mapping;
    mapping (uint => admin) admin_id_mapping;

    modifier only_doctor(uint d_id) {
        if(doctor_id_mapping[d_id].doctor_address == msg.sender){
            _;
        }
        else {
            revert();
        }
    }

    modifier only_pharmacy(uint f_id) {
        if(pharmacy_id_mapping[f_id].phar_addr == msg.sender){
            _;
        }
        else {
            revert();
        }
    }

    modifier only_admin(uint a_id) {
        if (admin_id_mapping[a_id].admin_address == msg.sender) {
            _;
        }
        else {
            revert();
        }
    }

    function add_paitent(uint aadhaar, uint age, bytes32 name, bytes32 dob, uint weight, bytes32 allergies) public {
        paitent_aadhaar_mapping[aadhaar].aadhaar = aadhaar;
        paitent_aadhaar_mapping[aadhaar].age = age;
        paitent_aadhaar_mapping[aadhaar].name = name;
        paitent_aadhaar_mapping[aadhaar].dob = dob;
        paitent_aadhaar_mapping[aadhaar].weight = weight;
        paitent_aadhaar_mapping[aadhaar].paitent_address = msg.sender;
        paitent_aadhaar_mapping[aadhaar].allergies = allergies;
    }

    function add_doctor(uint id, uint license_no, bytes32 name, bytes32 specialisation, address d_addr) public {
        doctor_id_mapping[id].id = id;
        doctor_id_mapping[id].license_no = license_no;
        doctor_id_mapping[id].name = name;
        doctor_id_mapping[id].specialisation = specialisation;
        doctor_id_mapping[id].doctor_address = d_addr;
    }

    function add_pharmacy(uint id, uint license_no, address p_addr) public {
        pharmacy_id_mapping[id].id = id;
        pharmacy_id_mapping[id].license_no = license_no;
        pharmacy_id_mapping[id].phar_addr = p_addr;
    }

    function lookup_paitent(uint aadhaar) view public returns (uint, uint, bytes32, bytes32, uint, bytes32[] memory, bytes32[] memory)
    {
        bytes32[] memory allergies;
        bytes32[] memory disease;

        for (uint i = 0; i < paitent_aadhaar_mapping[aadhaar].allergies.length; i++) {
            allergies[i] = paitent_aadhaar_mapping[aadhaar].allergies[i];
        }

        for (uint i = 0; i < paitent_aadhaar_mapping[aadhaar].disease_history.length; i++) {
            disease[i] = paitent_aadhaar_mapping[aadhaar].disease_history[i];
        }
         
        return (
            paitent_aadhaar_mapping[aadhaar].aadhaar,
            paitent_aadhaar_mapping[aadhaar].age,
            paitent_aadhaar_mapping[aadhaar].name,
            paitent_aadhaar_mapping[aadhaar].dob,
            paitent_aadhaar_mapping[aadhaar].weight,
            allergies,
            disease
        );
    }
    
    function doctor_last_prescription(uint aadhaar) view public returns (bytes32, uint, bytes32){
        return (
            prescription_id_mapping[paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].medicine,
            prescription_id_mapping[paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].doctor_id,
            prescription_id_mapping[paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].symptoms
        );
    }
    

    function medical_history(uint aadhaar) view public returns (uint[] memory, bytes32[] memory, bytes32[] memory, bytes32[] memory, bytes32[] memory) {
        
        uint[] memory doctor_id;
        bytes32[] memory disease;
        bytes32[] memory symptoms;
        bytes32[] memory medicine;
        bytes32[] memory timestamp_prescribed;
        
        for (uint i = 0; i < paitent_aadhaar_mapping[aadhaar].prescription_ids.length ; i++) {
            
            uint presc_id = paitent_aadhaar_mapping[aadhaar].prescription_ids[i];
            
            doctor_id[i] = prescription_id_mapping[presc_id].doctor_id;
            disease[i] = prescription_id_mapping[presc_id].disease;
            symptoms[i] = prescription_id_mapping[presc_id].symptoms;
            medicine[i] = prescription_id_mapping[presc_id].medicine;
            timestamp_prescribed[i] = prescription_id_mapping[presc_id].timestamp_prescribed;
        
        }

        return (
            doctor_id,
            disease,
            symptoms,
            medicine,
            timestamp_prescribed
        );
    }

    function add_prescription() public {
        
    }

    function last_prescription(uint aadhaar) view public returns (bytes32) {
        uint last_presc_id = paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length -1];
        return ( prescription_id_mapping[last_presc_id].medicine);
                
    }

    function mark_prescription(uint aadhaar, uint pharmacy_id, bytes32 time) public {
        uint last_presc_id = paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length -1];
        prescription_id_mapping[last_presc_id].pharmacy_id = pharmacy_id;
        prescription_id_mapping[last_presc_id].marked = true;
        prescription_id_mapping[last_presc_id].timestamp_marked = time;
    }

}