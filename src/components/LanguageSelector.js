import React from "react";
import { withTranslation } from 'react-i18next';
import { changeLanguage } from "../api/apicalls";


const LanguageSelector =(props)=>{

    const onChangelanguage = language => {
        const { i18n } = props; 
        i18n.changeLanguage(language);
        changeLanguage(language); 
    }

    return(
        <div className="container">
            <div>
                <img src="https://www.countryflags.io/tr/flat/24.png" alt ="Turkey Flag" onClick = {() => onChangelanguage('tr')} style={{cursor :"pointer"}} ></img>
                <img src="https://www.countryflags.io/us/flat/24.png" alt = "USA flag" onClick = {() => onChangelanguage('en')} style={{cursor :"pointer"}} ></img>
            </div>
        </div>
    );  
        
        
};

export default withTranslation()(LanguageSelector);