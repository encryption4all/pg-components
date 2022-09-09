export interface AttributeType {
    ident: string;
    type: string;
    options?: string[];
    img?: string;
}

export const ALLOWED_ATTRIBUTE_TYPES: { [key: string]: AttributeType[] } = {
    mobile: [
        { ident: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber', type: 'string', img: 'phone.svg' }
    ],
    personalData: [
        //       { ident: 'pbdf.gemeente.personalData.initials', type: 'string' },
        //       { ident: 'pbdf.gemeente.personalData.firstnames', type: 'string' },
        //       { ident: 'pbdf.gemeente.personalData.prefix', type: 'string' },
        { ident: 'pbdf.gemeente.personalData.familyname', type: 'string', img: 'personal.svg' },
        { ident: 'pbdf.gemeente.personalData.fullname', type: 'string', img: 'personal.svg' },
        { ident: 'pbdf.gemeente.personalData.gender', type: 'string', options: ['M', 'V'] },
        //       { ident: 'pbdf.gemeente.personalData.nationality', type: 'string' },
        //       { ident: 'pbdf.gemeente.personalData.surname', type: 'string' },
        { ident: 'pbdf.gemeente.personalData.dateofbirth', type: 'string', img: 'calendar.svg' },
        //       { ident: 'pbdf.gemeente.personalData.cityofbirth', type: 'string' },
        //       { ident: 'pbdf.gemeente.personalData.countryofbirth', type: 'string' },
        { ident: 'pbdf.gemeente.personalData.over12', type: 'boolean' },
        { ident: 'pbdf.gemeente.personalData.over16', type: 'boolean' },
        { ident: 'pbdf.gemeente.personalData.over18', type: 'boolean' },
        { ident: 'pbdf.gemeente.personalData.over21', type: 'boolean' },
        { ident: 'pbdf.gemeente.personalData.over65', type: 'boolean' }
        //       { ident: 'pbdf.gemeente.personalData.bsn', type: 'string' },
        //       {
        //           ident: 'pbdf.gemeente.personalData.digidlevel',
        //           type: 'string',
        //           options: ['Basis', 'Midden', 'Substantieel', 'Hoog']
        //       }
    ]
};
