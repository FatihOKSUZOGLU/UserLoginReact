import  i18n from "i18next";
import { initReactI18next } from "react-i18next"; 

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations:{
                'Sign Up':'Sign Up',
                'Password missmatch' :  'Password missmatch' ,
                "Username" : "Username",
                "Display Name" :"Display Name",
                "Password" : "Password",
                "Password Repeat" : "Password Repeat" ,
                "Log in" : "Log in"
            }
        },
        tr:{
            translations:{
                 'Sign Up':'Kayıt Ol' ,  
                 'Password missmatch' :  'Ayni sifreyi giriniz.',
                "Username" : "Kullanici Adi",
                "Display Name" :"Goruntulenen Ad" ,
                 "Password" :"Sifre" ,
                 "Password Repeat" : "Sifre Tekrar",
                 "Log in" : "Giris"
            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false ,
        formatSeparator: ','

    },
    react:{
        wait: true
    }
});

export default i18n;