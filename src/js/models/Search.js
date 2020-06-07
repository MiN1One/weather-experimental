import axios from 'axios';
import uniqid from 'uniqid';
import { p } from '../keys';
import sjcl from 'sjcl';

export default class Search {
    constructor(location, metric = 'M', lang = 'en') {
        this.location = location;
        this.metric = metric;
        this.lang = lang;
        this.id = uniqid('weather_', '-app');
    }

    async getMainData() {
        try {
            const wb = await axios(`https://api.weatherbit.io/v2.0/current?key=${sjcl.decrypt(p, '{"iv":"i91WuY4B1pYqAIjOlmqm9Q==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"uC/0o0o5lyc=","ct":"o2VpGWMokX9o4+Zi+Dg5oI/aZvd6Kr/aZgMq4DXnWRzixW8RFgjQhw=="}')}&lang=${this.lang}&units=${this.metric}&city=${this.location}`);
            this.data = wb.data.data[0];
            this.country = parseCountryCodes(this.data.country_code);
            console.log(this.data);
        } catch(error) {
            console.log(error);
        }
    }

    async getForecast() {
        try {
            const wbForecast = await axios(`https://api.weatherbit.io/v2.0/forecast/daily?key=${sjcl.decrypt(p, '{"iv":"i91WuY4B1pYqAIjOlmqm9Q==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"uC/0o0o5lyc=","ct":"o2VpGWMokX9o4+Zi+Dg5oI/aZvd6Kr/aZgMq4DXnWRzixW8RFgjQhw=="}')}&lang=${this.lang}&units=${this.metric}&city=${this.location}`);
            this.forecast = wbForecast.data.data;
            console.log(this.forecast);
        } catch(error) {
            console.log(error);
        }
    }
}

export const parseCountryCodes = (code, lang = 'en') => {
    const codes = 'AF,AX,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BH,BS,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BQ,BA,BW,BV,BR,IO,BN,BG,BF,BI,KH,CM,CA,CV,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CW,CY,CZ,DK,DJ,DM,DO,EC,EG,SV,GQ,ER,EE,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GG,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IM,IL,IT,JM,JP,JE,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MK,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,ME,MS,MA,MZ,MM,NA,NR,NP,NL,NC,NZ,NI,NE,NG,NU,NF,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,BL,SH,KN,LC,MF,PM,VC,WS,SM,ST,SA,SN,RS,SC,SL,SG,SX,SK,SI,SB,SO,ZA,GS,SS,ES,LK,SD,SR,SJ,SZ,SE,CH,SY,TW,TJ,TZ,TH,TL,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,ZM,ZW';
    
    const states = 'Afghanistan,Åland Islands,Albania,Algeria,American Samoa,Andorra,Angola,Anguilla,Antarctica,Antigua and Barbuda,Argentina,Armenia,Aruba,Australia,Austria,Azerbaijan,Bahrain,Bahamas,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bermuda,Bhutan,Bolivia,Bonaire,Bosnia and Herzegovina,Botswana,Bouvet Island,Brazil,British Indian Ocean Territory,Brunei Darussalam,Bulgaria,Burkina Faso,Burundi,Cambodia,Cameroon,Canada,Cape Verde,Cayman Islands,Central African Republic,Chad,Chile,China,Christmas Island,Cocos Islands,Colombia,Comoros,Congo,Congo,Cook Islands,Costa Rica,Côte d\'Ivoire,Croatia,Cuba,Curaçao,Cyprus,Czech Republic,Denmark,Djibouti,Dominica,Dominican Republic,Ecuador,Egypt,El Salvador,Equatorial Guinea,Eritrea,Estonia,Ethiopia,Falkland Islands,Faroe Islands,Fiji,Finland,France,French Guiana,French Polynesia,French Southern Territories,Gabon,Gambia,Georgia,Germany,Ghana,Gibraltar,Greece,Greenland,Grenada,Guadeloupe,Guam,Guatemala,Guernsey,Guinea,Guinea-Bissau,Guyana,Haiti,Heard Island and McDonald Islands,Holy See,Honduras,Hong Kong,Hungary,Iceland,India,Indonesia,Iran,Iraq,Ireland,Isle of Man,Israel,Italy,Jamaica,Japan,Jersey,Jordan,Kazakhstan,Kenya,Kiribati,Korea,Korea,Kuwait,Kyrgyzstan,Lao People\'s Democratic Republic,Latvia,Lebanon,Lesotho,Liberia,Libya,Liechtenstein,Lithuania,Luxembourg,Macao,Macedonia,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Marshall Islands,Martinique,Mauritania,Mauritius,Mayotte,Mexico,Micronesia,Moldova,Monaco,Mongolia,Montenegro,Montserrat,Morocco,Mozambique,Myanmar,Namibia,Nauru,Nepal,Netherlands,New Caledonia,New Zealand,Nicaragua,Niger,Nigeria,Niue,Norfolk Island,Northern Mariana Islands,Norway,Oman,Pakistan,Palau,Palestine,Panama,Papua New Guinea,Paraguay,Peru,Philippines,Pitcairn,Poland,Portugal,Puerto Rico,Qatar,Réunion,Romania,Russian Federation,Rwanda,Saint Barthélemy,Saint Helena,Saint Kitts and Nevis,Saint Lucia,Saint Martin,Saint Pierre and Miquelon,Saint Vincent and the Grenadines,Samoa,San Marino,Sao Tome and Principe,Saudi Arabia,Senegal,Serbia,Seychelles,Sierra Leone,Singapore,Sint Maarten,Slovakia,Slovenia,Solomon Islands,Somalia,South Africa,South Georgia,South Sudan,Spain,Sri Lanka,Sudan,Suriname,Svalbard and Jan Mayen,Swaziland,Sweden,Switzerland,Syrian Arab Republic,Taiwan,Tajikistan,Tanzania,Thailand,Timor-Leste,Togo,Tokelau,Tonga,Trinidad and Tobago,Tunisia,Turkey,Turkmenistan,Turks and Caicos Islands,Tuvalu,Uganda,Ukraine,United Arab Emirates,United Kingdom,United States,United States Minor Outlying Islands,Uruguay,Uzbekistan,Vanuatu,Venezuela,Viet Nam,Virgin Islands,Virgin Islands,Wallis and Futuna,Western Sahara,Yemen,Zambia,Zimbabwe';

    const statesDE = 'Afghanistan, Ålandinseln, Albanien,Algerien,Amerikanisch-Samoa,Andorra,Angola,Anguilla,Antarktis,Antigua und Barbuda,Argentinien,Armenien,Aruba,Australien,Österreich,Aserbaidschan,Bahrain,Bahamas,Bangladesch,Barbados,Weißrussland,Belgien,Belize,Benin,Bermuda,Bhutan,Bolivien,Bonaire,Bosnien und Herzegowina,Botswana,Bouvet Island,Brasilien,Britisches Territorium im Indischen Ozean,Brunei Darussalam,Bulgarien,Burkina Faso,Burundi,Kambodscha,Kamerun,Kanada,Kap Verde,Kaimaninseln,Zentralafrika Republik,Tschad,Chile,China,Weihnachtsinsel,Kokosinseln,Kolumbien,Komoren,Kongo,Kongo,Kochinseln,Costa Rica,Elfenbeinküste,Kroatien,Kuba,Curaçao,Zypern,Tschechische Republik,Dänemark,Dschibuti,Dominica ,Dominikanische Republik,Ecuador,Ägypten,El Salvador,Äquatorialguinea,Eritrea,Estland,Äthiopien,Falklandinseln,Färöer,Fidschi,Finnland,Frankreich,Französisch-Guayana,Französisch-Polynesien,Französisch-Südterritorien,Gabun,Gambia,Georgien,Deutschland,Ghana,Gibraltar,Griechenland,Grönland,Grenada,Guadeloupe,Guam,Guatemala,Guernsey,Guinea,Guinea-Bissau,Guyana,Haiti,Gehört Insel und McDonald-Inseln,Heiliger Stuhl,Honduras,Hongkong,Ungarn,Island,Indien,Indonesien,Iran,Irak,Irland,Insel Man,Israel,Italien,Jamaika,Japan,Jersey,Jordanien,Kasachstan,Kenia,Kiribati,Korea ,Korea,Kuwait,Kirgisistan,Demokratische Volksrepublik Laos,Lettland,Libanon,Lesotho,Liberia,Libyen,Liechtenstein,Litauen,Luxemburg,Macao,Mazedonien,Madagaskar,Malawi,Malaysia,Malediven,Mali,Malta,Marshallinseln,Martinique,Mauretanien,Mauritius,Mayotte,Mexiko,Mikronesien,Moldawien,Monaco,Mongolei,Montenegro,Montserrat,Marokko,Mosambik,Myanmar,Namibia,Nauru,Nepal,Niederlande,Neukaledonien,Neuseeland,Nicaragua,Niger,Nigeria,Niue,Norfolk Island,Nördliche Marianen,Norwegen,Oman,Pakistan,Palau,Palästina,Panama,Papua-Neuguinea,Paraguay,Peru,Philippinen,Pitcairn,Polen,Portugal,Puerto Rico,Katar,Réunion,Rumänien,Russische Föderation,Ruanda,Saint Barthélemy,St. Helena,St. Kitts und Nevis,St. Lucia,St. Martin,St. Pierre und Miquelon,St. Vincent und die Grenadinen,Samoa,San Marino,Sao Tome und P. Rincipe,Saudi-Arabien,Senegal,Serbien,Seychellen,Sierra Leone,Singapur,Sint Maarten,Slowakei,Slowenien,Salomonen,Somalia,Südafrika,Südgeorgien,Südsudan,Spanien,Sri Lanka,Sudan,Suriname,Spitzbergen und Jan Mayen,Swasiland,Schweden,Schweiz,Arabische Republik Syrien,Taiwan,Tadschikistan,Tansania,Thailand,Timor-Leste,Togo,Tokelau,Tonga,Trinidad und Tobago,Tunesien,Türkei,Turkmenistan,Turks- und Caicosinseln,Tuvalu,Uganda,Ukraine,Vereinigte Arabische Emirate,Vereinigtes Königreich,Vereinigte Staaten,Kleinere Außeninseln der Vereinigten Staaten,Uruguay,Usbekistan,Vanuatu,Venezuela,Vietnam,Jungferninseln,Jungferninseln,Wallis und Futuna,Westsahara,Jemen,Sambia,Simbabwe';
    
    let splitCodes = codes.split(',');
    let en = states.split(',');
    let de = statesDE.split(',');

    const codeIndex = splitCodes.findIndex(el => el.includes(code));

    if (lang === 'en') return en[codeIndex];
    else if (lang === 'de') return de[codeIndex];
};

/******** CURRENT CONDITIONS ********
 * Normal temp
 * Real temp
 * City name
 * Description
 * Country code - name
 * Date
 * Cloud cover
 * Observation time
 * Pressure
 * Pecipitation
 * Time zone
 * UV index
 * Wind direction
 * Wind speed m/s
 * Sunset time 
 * Sunrise time
 */

/********** FORECAST ***********
 * Date
 * Max temp
 * Min temp
 * Cloud cover max
 * Cloud cover min
 * Normal temp
 * Description
 * Wether Icon
 * Description
 * Wind direction
 * Wind direction lang
 * Wind speed
 * Cloud cover
 * Pressure
 * Precipitation
 */

// **** FORECAST *****
// const wb = await axios(`https://api.weatherbit.io/v2.0/forecast/daily?key=${key.wbKey}&lang=${this.lang}&units=${this.metric}&city=Tashkent`);