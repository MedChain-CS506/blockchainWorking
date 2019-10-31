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
        string name;
        string dob;
        uint weight;
        string allergies;
        string disease_history;
        uint[] prescription_ids;
        uint[] doctor_ids;
        string sex;
    }

    struct doctor {
        uint id;
        uint license_no;
        string name;
        string specialisation;
        address doctor_address;
    }

    struct pharmacy {
        uint id;
        uint license_no;
        address phar_addr;
    }

    struct prescription {
        uint id;
        uint doctor_id;
        uint paitent_aadhaar;
        string disease;
        string symptoms;
        string medicine;
        string timestamp_prescribed;
        uint pharmacy_id;
        string timestamp_marked;
        bool marked;
    }

    mapping (uint => paitent) paitent_aadhaar_mapping;
    mapping (uint => doctor) doctor_id_mapping;
    mapping (uint => pharmacy) pharmacy_id_mapping;
    mapping (uint => prescription) prescription_id_mapping;
    mapping (uint => admin) admin_id_mapping;
    uint current_pres_id = 1;

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

    function add_paitent(uint aadhaar, uint age, string memory name, string memory dob, uint weight, string memory sex, string memory allergies) public {
        paitent_aadhaar_mapping[aadhaar].aadhaar = aadhaar;
        paitent_aadhaar_mapping[aadhaar].age = age;
        paitent_aadhaar_mapping[aadhaar].name = name;
        paitent_aadhaar_mapping[aadhaar].dob = dob;
        paitent_aadhaar_mapping[aadhaar].weight = weight;
        paitent_aadhaar_mapping[aadhaar].sex = sex;
        paitent_aadhaar_mapping[aadhaar].allergies = allergies;
    }

    function add_doctor(uint id, uint license_no, string memory name, string memory specialisation, address d_addr) public {
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

    function lookup_paitent(uint aadhaar) view public returns (uint, uint, string memory, string memory, string memory, uint, string memory) {         
        return (
            paitent_aadhaar_mapping[aadhaar].aadhaar,
            paitent_aadhaar_mapping[aadhaar].age,
            paitent_aadhaar_mapping[aadhaar].name,
            paitent_aadhaar_mapping[aadhaar].sex,
            paitent_aadhaar_mapping[aadhaar].dob,
            paitent_aadhaar_mapping[aadhaar].weight,
            paitent_aadhaar_mapping[aadhaar].allergies
        );
    }
    
    function doctor_last_prescription(uint aadhaar) view public returns (string memory, uint, string memory){
        return (
            prescription_id_mapping[paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].medicine,
            prescription_id_mapping[paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].doctor_id,
            prescription_id_mapping[paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].symptoms
        );
    }
    

    function medical_history() public {
        
    }

    function add_prescription(uint d_id, uint p_aadhar, string memory disease, string memory symptoms, string memory medicine, string memory time) public {
        paitent_aadhaar_mapping[p_aadhar].prescription_ids.push(current_pres_id);
        prescription_id_mapping[current_pres_id].id = current_pres_id;
        prescription_id_mapping[current_pres_id].doctor_id = d_id;
        prescription_id_mapping[current_pres_id].paitent_aadhaar = p_aadhar;
        prescription_id_mapping[current_pres_id].disease = disease;
        prescription_id_mapping[current_pres_id].symptoms = symptoms;
        prescription_id_mapping[current_pres_id].medicine = medicine;
        prescription_id_mapping[current_pres_id].timestamp_prescribed = time;
    }

    function last_prescription(uint aadhaar) view public returns (string memory) {
        uint last_presc_id = paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length -1];
        return ( prescription_id_mapping[last_presc_id].medicine);
                
    }

    function mark_prescription(uint aadhaar, uint pharmacy_id, string memory time) public {
        uint last_presc_id = paitent_aadhaar_mapping[aadhaar].prescription_ids[paitent_aadhaar_mapping[aadhaar].prescription_ids.length -1];
        prescription_id_mapping[last_presc_id].pharmacy_id = pharmacy_id;
        prescription_id_mapping[last_presc_id].marked = true;
        prescription_id_mapping[last_presc_id].timestamp_marked = time;
    }

}
